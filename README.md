# Waves VIP - Landing Page de Lujo

Landing page para alquiler de embarcaciones deportivas de lujo en el Parque Nacional Morrocoy, Venezuela.

## Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Estilos**: Tailwind CSS + Framer Motion
- **Backend**: Supabase
- **Video**: Cloudinary/Mux (optimizado para performance)
- **Pagos**: Stripe, PayPal, Binance Pay
- **Calendario**: Google Calendar API V3

## Configuración Inicial

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google Calendar
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_WEBHOOK_ID=your_webhook_id

# Binance Pay
BINANCE_API_KEY=your_binance_api_key
BINANCE_SECRET_KEY=your_binance_secret_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
waves-vip/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Rutas agrupadas
│   ├── api/               # API Routes
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y configuraciones
├── types/                 # TypeScript types
└── public/                # Archivos estáticos
```

## Características Principales

- ✅ Video Hero inmersivo optimizado
- ✅ Sistema de reservas completo
- ✅ Integración con Google Calendar
- ✅ Webhooks para confirmación de pagos
- ✅ Panel de administración
- ✅ Diseño de lujo minimalista

