import { google } from "googleapis";
import type { Vessel, Booking } from "@/types";

/**
 * Configuración y autenticación con Google Calendar usando Service Account
 */
/**
 * Configuración y autenticación con Google Calendar usando Service Account
 */
export function getGoogleCalendarAuth(calendarIdOverride?: string) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Use the override if provided, otherwise fall back to the env var
  const calendarId = calendarIdOverride || process.env.GOOGLE_CALENDAR_ID;

  if (!privateKey || !clientEmail || !calendarId) {
    throw new Error(
      "Faltan variables de entorno para Google Calendar: GOOGLE_PRIVATE_KEY, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_CALENDAR_ID"
    );
  }

  const jwtClient = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
  });

  return { jwtClient, calendarId };
}

/**
 * Crea un evento en Google Calendar y envía invitación al cliente
 */
export async function createCalendarEvent(params: {
  booking: Booking;
  vessel: Vessel;
  customerEmail: string;
  customerName?: string;
}): Promise<{ eventId: string; htmlLink: string }> {
  const { jwtClient, calendarId } = getGoogleCalendarAuth();
  const calendar = google.calendar({ version: "v3", auth: jwtClient });

  const startDate = new Date(params.booking.startDate);
  const endDate = new Date(params.booking.endDate);

  // Formatear fechas en formato RFC3339 para Google Calendar
  const startDateTime = startDate.toISOString();
  const endDateTime = endDate.toISOString();

  const event = {
    summary: `Reserva: ${params.vessel.name} - Waves VIP`,
    description: `
Reserva confirmada para ${params.vessel.name}

Cliente: ${params.customerName || params.customerEmail}
Fecha de inicio: ${startDate.toLocaleDateString("es-VE")}
Fecha de fin: ${endDate.toLocaleDateString("es-VE")}
Precio total: $${params.booking.totalPrice}

ID de Reserva: ${params.booking.id}
ID de Pago: ${params.booking.paymentId || "N/A"}
    `.trim(),
    start: {
      dateTime: startDateTime,
      timeZone: "America/Caracas", // Zona horaria de Venezuela
    },
    end: {
      dateTime: endDateTime,
      timeZone: "America/Caracas",
    },
    location: "Parque Nacional Morrocoy, Venezuela",
    colorId: "10", // Color azul para reservas
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // Recordatorio 1 día antes
        { method: "popup", minutes: 60 }, // Recordatorio 1 hora antes
      ],
    },
    attendees: [
      {
        email: params.customerEmail,
        displayName: params.customerName || params.customerEmail,
      },
    ],
    sendUpdates: "all" as const, // Enviar invitación a todos los asistentes
  };

  try {
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
      htmlLink: response.data.htmlLink || "",
    };
  } catch (error) {
    console.error("Error creando evento en Google Calendar:", error);
    throw new Error(
      `Error al crear evento en Google Calendar: ${error instanceof Error ? error.message : "Error desconocido"}`
    );
  }
}

/**
 * Lee la disponibilidad del calendario en tiempo real
 * Retorna las fechas ocupadas en un rango de fechas
 */
export async function getCalendarAvailability(params: {
  startDate: string;
  endDate: string;
  calendarId?: string; // Add optional calendarId
}): Promise<{ date: string; available: boolean; bookingId?: string }[]> {
  const { jwtClient, calendarId } = getGoogleCalendarAuth(params.calendarId); // Pass it here
  const calendar = google.calendar({ version: "v3", auth: jwtClient });

  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date(params.startDate).toISOString(),
      timeMax: new Date(params.endDate).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    const availability: { date: string; available: boolean; bookingId?: string }[] =
      [];

    // Crear un mapa de fechas ocupadas
    const occupiedDates = new Set<string>();

    events.forEach((event) => {
      if (!event.start?.dateTime) return;

      const start = new Date(event.start.dateTime);
      const end = event.end?.dateTime
        ? new Date(event.end.dateTime)
        : start;

      // Marcar todas las fechas entre inicio y fin como ocupadas
      const currentDate = new Date(start);
      while (currentDate <= end) {
        const dateString = currentDate.toISOString().split("T")[0];
        occupiedDates.add(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    // Generar array de disponibilidad para el rango solicitado
    const start = new Date(params.startDate);
    const end = new Date(params.endDate);
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split("T")[0];
      availability.push({
        date: dateString,
        available: !occupiedDates.has(dateString),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return availability;
  } catch (error) {
    console.error("Error leyendo disponibilidad del calendario:", error);
    throw new Error(
      `Error al leer disponibilidad: ${error instanceof Error ? error.message : "Error desconocido"}`
    );
  }
}

/**
 * Elimina un evento del calendario (útil para cancelaciones)
 */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const { jwtClient, calendarId } = getGoogleCalendarAuth();
  const calendar = google.calendar({ version: "v3", auth: jwtClient });

  try {
    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: "all",
    });
  } catch (error) {
    console.error("Error eliminando evento del calendario:", error);
    throw new Error(
      `Error al eliminar evento: ${error instanceof Error ? error.message : "Error desconocido"}`
    );
  }
}

