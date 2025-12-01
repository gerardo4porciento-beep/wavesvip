# Configuración de Google Calendar API

Esta guía te ayudará a configurar Google Calendar API con Service Account para Waves VIP.

## Pasos de Configuración

### 1. Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el **Project ID**

### 2. Habilitar Google Calendar API

1. En el menú lateral, ve a **APIs & Services** > **Library**
2. Busca "Google Calendar API"
3. Haz clic en **Enable**

### 3. Crear una Service Account

1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **Service Account**
3. Completa el formulario:
   - **Name**: `waves-vip-calendar-service`
   - **Service account ID**: Se genera automáticamente
   - **Description**: "Service account para gestionar calendario de Waves VIP"
4. Haz clic en **Create and Continue**
5. En "Grant this service account access to project":
   - Rol: **Editor** (o **Calendar Admin** si existe)
   - Haz clic en **Continue** y luego **Done**

### 4. Crear y Descargar la Clave JSON

1. En la lista de Service Accounts, haz clic en la que acabas de crear
2. Ve a la pestaña **Keys**
3. Haz clic en **Add Key** > **Create new key**
4. Selecciona **JSON** y haz clic en **Create**
5. Se descargará un archivo JSON. **IMPORTANTE**: Guárdalo de forma segura, contiene credenciales sensibles.

### 5. Extraer Información de la Clave JSON

Abre el archivo JSON descargado. Necesitarás:

```json
{
  "type": "service_account",
  "project_id": "tu-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "waves-vip-calendar-service@tu-project-id.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

Extrae estos valores:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY` (mantén los `\n` literalmente)

### 6. Crear un Calendario de Google

Tienes dos opciones:

#### Opción A: Usar un Calendario Existente

1. Ve a [Google Calendar](https://calendar.google.com/)
2. En el menú lateral, encuentra el calendario que quieres usar
3. Haz clic en los tres puntos (...) junto al calendario
4. Selecciona **Settings and sharing**
5. En la sección **Integrate calendar**, copia el **Calendar ID**
   - Formato: `xxxxxxxxxx@group.calendar.google.com`

#### Opción B: Crear un Nuevo Calendario

1. En Google Calendar, haz clic en el **+** junto a "Other calendars"
2. Selecciona **Create new calendar**
3. Completa los detalles:
   - **Name**: "Waves VIP Reservas"
   - **Description**: "Reservas de embarcaciones"
4. Haz clic en **Create calendar**
5. Ve a **Settings and sharing**
6. Copia el **Calendar ID**

### 7. Compartir el Calendario con la Service Account

**CRÍTICO**: Debes compartir el calendario con la Service Account para que pueda crear eventos.

1. En la página de configuración del calendario, ve a **Share with specific people**
2. Haz clic en **Add people**
3. Ingresa el `client_email` de la Service Account (ej: `waves-vip-calendar-service@tu-project-id.iam.gserviceaccount.com`)
4. Permisos: **Make changes to events**
5. Haz clic en **Send**

### 8. Configurar Variables de Entorno

Agrega estas variables a tu archivo `.env.local`:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=waves-vip-calendar-service@tu-project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_PRIVATE_KEY_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=tu-calendar-id@group.calendar.google.com
```

**IMPORTANTE**:
- El `GOOGLE_PRIVATE_KEY` debe incluir los `\n` literales (saltos de línea)
- Usa comillas dobles alrededor de la clave privada
- No compartas estas credenciales públicamente

### 9. Probar la Configuración

Puedes probar la configuración ejecutando:

```bash
npm run dev
```

Y luego visitando: `http://localhost:3000/api/calendar/availability?startDate=2024-01-01&endDate=2024-01-31`

Deberías recibir un JSON con la disponibilidad del calendario.

## Troubleshooting

### Error: "Service account does not have access"

- Verifica que compartiste el calendario con el email de la Service Account
- Verifica que los permisos sean "Make changes to events"

### Error: "Invalid credentials"

- Verifica que el `GOOGLE_PRIVATE_KEY` tenga los `\n` correctamente escapados
- Verifica que el `GOOGLE_SERVICE_ACCOUNT_EMAIL` sea correcto

### Error: "Calendar not found"

- Verifica que el `GOOGLE_CALENDAR_ID` sea correcto
- Verifica que el calendario esté compartido con la Service Account

## Seguridad

- **NUNCA** subas el archivo JSON de la Service Account a un repositorio público
- Usa variables de entorno para todas las credenciales
- Rota las claves periódicamente
- Considera usar Google Secret Manager para producción

## Recursos

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/v3/reference)
- [Service Accounts Guide](https://cloud.google.com/iam/docs/service-accounts)
- [Calendar API Quickstart](https://developers.google.com/calendar/api/quickstart/nodejs)

