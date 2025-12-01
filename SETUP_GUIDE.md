# Guía de Configuración - Waves VIP

Esta guía te ayudará a configurar completamente el proyecto Waves VIP desde cero.

## Prerrequisitos

- Node.js 18+ y npm/yarn
- Cuenta de Google Cloud Platform (para Google Calendar)
- Cuenta de Supabase (para base de datos)
- Cuenta de Cloudinary o Mux (para video optimizado)
- Cuentas de Stripe, PayPal y/o Binance Pay (para pagos)

## Instalación Inicial

### 1. Clonar e Instalar Dependencias

```bash
cd "WAVES VIP"
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y completa con tus credenciales:

```bash
cp env.example.txt .env.local
```

Edita `.env.local` y completa todas las variables. Consulta las guías específicas:
- `SETUP_GOOGLE_CALENDAR.md` para Google Calendar
- Documentación de Stripe/PayPal/Binance para pagos
- Documentación de Supabase para base de datos

### 3. Configurar Base de Datos (Supabase)

#### Crear Tablas

Ejecuta estos SQL en el editor SQL de Supabase:

```sql
-- Tabla de Embarcaciones
CREATE TABLE vessels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  price_per_day DECIMAL(10, 2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  features TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Usuarios (se puede integrar con auth.users de Supabase)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Reservas
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vessel_id UUID NOT NULL REFERENCES vessels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal', 'binance')),
  payment_id TEXT,
  google_calendar_event_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (end_date > start_date)
);

-- Índices para mejorar performance
CREATE INDEX idx_bookings_vessel_id ON bookings(vessel_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bookings_status ON bookings(status, payment_status);

-- Políticas RLS (Row Level Security)
ALTER TABLE vessels ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública de embarcaciones disponibles
CREATE POLICY "Public can view available vessels"
  ON vessels FOR SELECT
  USING (available = true);

-- Los usuarios solo pueden ver sus propias reservas
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Los usuarios pueden crear sus propias reservas
CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### Insertar Datos de Ejemplo

```sql
-- Insertar una embarcación de ejemplo
INSERT INTO vessels (name, description, capacity, price_per_day, images, features, specifications)
VALUES (
  'Yate de Lujo Premium',
  'Embarcación de lujo de 50 pies, equipada con todas las comodidades para una experiencia inolvidable.',
  12,
  1500.00,
  ARRAY['https://example.com/yacht1.jpg'],
  ARRAY['Aire acondicionado', 'Cocina completa', 'WiFi', 'Equipo de sonido'],
  '{"length": "50 pies", "year": 2023, "engine": "Twin Diesel 800hp"}'::jsonb
);
```

### 4. Configurar Cloudinary (Para Video)

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. Sube tu video hero a Cloudinary
3. Configura la transformación de video para optimización:
   - Formatos: WebM y MP4
   - Calidad adaptativa
4. Copia la URL del video y actualiza `NEXT_PUBLIC_HERO_VIDEO_URL` en `.env.local`

### 5. Configurar Webhooks de Pago

#### Stripe

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Crea un nuevo webhook
3. URL: `https://tu-dominio.com/api/webhooks/stripe`
4. Eventos a escuchar:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia el **Signing secret** a `STRIPE_WEBHOOK_SECRET`

#### PayPal

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Crea una aplicación
3. Configura webhooks con URL: `https://tu-dominio.com/api/webhooks/paypal`
4. Eventos: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`

#### Binance Pay

1. Ve a [Binance Pay Merchant](https://merchant.binance.com/)
2. Configura webhooks con URL: `https://tu-dominio.com/api/webhooks/binance`
3. Eventos: `PAYMENT_SUCCESS`, `PAYMENT_FAILED`

### 6. Ejecutar el Proyecto

```bash
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000)

## Verificación

### Probar Google Calendar

```bash
curl "http://localhost:3000/api/calendar/availability?startDate=2024-01-01&endDate=2024-01-31"
```

Deberías recibir un JSON con disponibilidad.

### Probar Video Hero

Verifica que el video se carga correctamente en la página principal.

### Probar Base de Datos

Verifica en Supabase que las tablas se crearon correctamente.

## Próximos Pasos

1. **Personalizar Diseño**: Edita los componentes en `components/` para ajustar el diseño
2. **Agregar Más Embarcaciones**: Inserta más datos en la tabla `vessels`
3. **Configurar Autenticación**: Completa la configuración de NextAuth.js
4. **Implementar Flujo de Reservas**: Completa los componentes de reserva
5. **Configurar Emails**: Configura el sistema de notificaciones por email

## Troubleshooting

### Error: "Module not found"

```bash
npm install
```

### Error: "Environment variables not found"

Verifica que `.env.local` existe y tiene todas las variables requeridas.

### Error: "Google Calendar access denied"

Consulta `SETUP_GOOGLE_CALENDAR.md` y verifica que:
- El calendario esté compartido con la Service Account
- Las credenciales sean correctas

## Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Google Calendar API](https://developers.google.com/calendar)
- [Stripe Documentation](https://stripe.com/docs)

