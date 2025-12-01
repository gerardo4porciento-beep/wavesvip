# Arquitectura del Proyecto Waves VIP

## Estructura de Carpetas

```
waves-vip/
├── app/                          # Next.js App Router
│   ├── (routes)/                # Rutas agrupadas (opcional para organización)
│   │   ├── reservar/           # Página de reservas
│   │   └── admin/              # Panel de administración (protegido)
│   ├── api/                     # API Routes
│   │   ├── calendar/           # Endpoints de Google Calendar
│   │   │   ├── availability/   # GET - Obtener disponibilidad
│   │   │   └── create-event/   # POST - Crear evento (interno)
│   │   └── webhooks/           # Webhooks de pagos
│   │       ├── stripe/         # Webhook de Stripe
│   │       ├── paypal/         # Webhook de PayPal
│   │       └── binance/        # Webhook de Binance Pay
│   ├── globals.css             # Estilos globales
│   ├── layout.tsx              # Layout raíz
│   └── page.tsx                # Página principal
│
├── components/                  # Componentes React reutilizables
│   ├── ui/                     # Componentes UI básicos (Button, Input, etc.)
│   ├── HeroVideo.tsx           # Componente de video hero optimizado
│   ├── BookingFlow/            # Componentes del flujo de reserva
│   └── Admin/                  # Componentes del panel de admin
│
├── lib/                         # Utilidades y configuraciones
│   ├── google-calendar.ts      # Funciones para Google Calendar API
│   ├── supabase/               # Cliente de Supabase
│   │   ├── client.ts           # Cliente para componentes
│   │   └── server.ts           # Cliente para servidor
│   ├── payments/               # Utilidades de pagos
│   └── utils.ts                # Utilidades generales
│
├── types/                       # Definiciones de TypeScript
│   ├── index.ts                # Tipos principales
│   └── supabase.ts             # Tipos generados de Supabase
│
└── public/                      # Archivos estáticos
```

## Flujo de Reserva

```
1. Usuario selecciona embarcación
   ↓
2. Usuario selecciona fecha (consulta disponibilidad en tiempo real)
   ↓
3. Usuario inicia sesión o se registra
   ↓
4. Usuario selecciona método de pago (Stripe/PayPal/Binance)
   ↓
5. Usuario completa el pago
   ↓
6. Webhook de pago confirma el pago
   ↓
7. Sistema actualiza estado de reserva a "confirmed"
   ↓
8. Sistema crea evento en Google Calendar
   ↓
9. Sistema envía invitación al cliente
   ↓
10. Cliente recibe confirmación por email
```

## Seguridad

### Autenticación
- **NextAuth.js**: Manejo de sesiones y autenticación
- **Supabase Auth**: Autenticación de usuarios
- **Service Account**: Para Google Calendar (sin interacción del usuario)

### Protección de Rutas
- Rutas de administración protegidas con middleware
- Verificación de roles de usuario
- Validación de webhooks con firmas

### Datos Sensibles
- **PCI DSS Compliance**: No almacenamos datos de tarjeta
- Todos los pagos se procesan a través de SDKs oficiales
- Webhooks verificados con firmas criptográficas

## Integraciones

### Google Calendar
- **Service Account**: Autenticación sin OAuth del usuario
- **API V3**: Creación y lectura de eventos
- **Sincronización en tiempo real**: Disponibilidad actualizada automáticamente

### Pagos
- **Stripe**: Tarjetas de crédito/débito
- **PayPal**: PayPal y tarjetas
- **Binance Pay**: Pagos con criptomonedas

### Optimización de Video
- **Cloudinary/Mux**: Streaming adaptativo
- **Lazy Loading**: Carga diferida del video
- **Formatos modernos**: WebM con fallback a MP4
- **Poster image**: Imagen de alta calidad mientras carga

## Performance

### Optimizaciones Implementadas
1. **Video Hero**:
   - Preload: "metadata" (solo metadata inicial)
   - Intersection Observer para lazy loading
   - Formatos WebM/MP4 con detección de soporte
   - Poster image mientras carga

2. **Next.js 14**:
   - App Router para mejor rendimiento
   - Server Components por defecto
   - Optimización automática de imágenes

3. **Base de Datos**:
   - Supabase con índices optimizados
   - Queries eficientes para disponibilidad

## Variables de Entorno Críticas

```env
# Google Calendar (Service Account)
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_CALENDAR_ID

# Webhooks
STRIPE_WEBHOOK_SECRET
WEBHOOK_SECRET (interno)

# Video
NEXT_PUBLIC_HERO_VIDEO_URL (Cloudinary/Mux)
```

## Notas Importantes

1. **Race Conditions**: El sistema lee disponibilidad en tiempo real desde Google Calendar para evitar dobles reservas.

2. **Webhooks**: Los eventos de calendario solo se crean DESPUÉS de confirmación del pago vía webhook.

3. **Service Account**: No requiere OAuth del usuario final, funciona completamente en el servidor.

4. **Video Performance**: El video no bloquea el Time to Interactive (TTI) gracias a lazy loading y carga diferida.

