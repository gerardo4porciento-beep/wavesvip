import { google } from "googleapis";

/**
 * Servicio de Google Calendar especializado para reservas simples
 * por capacidad (pax) en distintos calendarios.
 *
 * Usa cuentas de servicio y permite:
 * - Obtener disponibilidad por capacidad
 * - Crear eventos con el formato: RES: [Client Name] - [Boat Capacity]
 */

type Capacity = 6 | 8 | 10 | 12;

interface BaseParams {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export interface CapacityAvailabilityParams extends BaseParams {
  capacity: Capacity;
}

export interface CreateReservationEventParams {
  date: string; // YYYY-MM-DD (inicio del día)
  capacity: Capacity;
  name: string;
  email: string;
}

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${key}`);
  }
  return value;
}

function getCalendarIdForCapacity(capacity: Capacity): string {
  const envKey = `GOOGLE_CALENDAR_ID_${capacity}` as const;
  const specific = process.env[envKey];
  if (specific) return specific;

  // Fallback al calendario principal si no hay uno por capacidad
  return getEnvOrThrow("GOOGLE_CALENDAR_ID");
}

function getJwtClient() {
  const privateKey = getEnvOrThrow("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const clientEmail = getEnvOrThrow("GOOGLE_SERVICE_ACCOUNT_EMAIL");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
  });
}

/**
 * Verifica si un rango de fechas está libre en el calendario
 * correspondiente a la capacidad.
 */
export async function isCapacityAvailable(
  params: CapacityAvailabilityParams
): Promise<boolean> {
  const auth = getJwtClient();
  const calendarId = getCalendarIdForCapacity(params.capacity);
  const calendar = google.calendar({ version: "v3", auth });

  const timeMin = new Date(params.startDate).toISOString();
  const timeMax = new Date(params.endDate).toISOString();

  const res = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = res.data.items || [];
  return events.length === 0;
}

/**
 * Verificación de concurrencia: antes de confirmar el pago,
 * se vuelve a consultar el calendario para asegurarse que
 * sigue libre.
 */
export async function assertCapacityAvailableOrThrow(
  params: CapacityAvailabilityParams
): Promise<void> {
  const available = await isCapacityAvailable(params);
  if (!available) {
    throw new Error(
      "La fecha seleccionada ya fue ocupada por otra reserva. No se puede confirmar este pago."
    );
  }
}

/**
 * Crea un evento de reserva en el calendario correspondiente a la capacidad.
 * Título: RES: [Client Name] - [Boat Capacity]
 */
export async function createReservationEvent(
  params: CreateReservationEventParams
): Promise<{ eventId: string; htmlLink?: string }> {
  const auth = getJwtClient();
  const calendarId = getCalendarIdForCapacity(params.capacity);
  const calendar = google.calendar({ version: "v3", auth });

  const start = new Date(params.date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const event = {
    summary: `RES: ${params.name} - ${params.capacity} Pax`,
    description: `Reserva confirmada para ${params.capacity} personas.\n\nCliente: ${params.name}\nEmail: ${params.email}`,
    start: {
      dateTime: start.toISOString(),
      timeZone: "America/Caracas",
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: "America/Caracas",
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
    sendUpdates: "all",
  });

  if (!response.data.id) {
    throw new Error("No se recibió ID del evento de Google Calendar");
  }

  return {
    eventId: response.data.id,
    htmlLink: response.data.htmlLink || undefined,
  };
}



