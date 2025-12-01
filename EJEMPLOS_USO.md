# Ejemplos de Uso - Waves VIP

Este documento muestra ejemplos prácticos de cómo usar los componentes y APIs creadas.

## 1. Usar el Componente HeroVideo

### Ejemplo Básico

```tsx
import HeroVideo from "@/components/HeroVideo";

export default function HomePage() {
  return (
    <HeroVideo
      videoUrl="https://res.cloudinary.com/your-cloud/video/upload/v1/hero-video"
      posterUrl="https://res.cloudinary.com/your-cloud/image/upload/v1/poster"
      title="Waves VIP"
      subtitle="Experiencia de lujo en el paraíso"
      showControls={true}
    />
  );
}
```

### Con Variables de Entorno

```tsx
const heroVideoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;
const posterUrl = process.env.NEXT_PUBLIC_HERO_POSTER_URL;

<HeroVideo
  videoUrl={heroVideoUrl!}
  posterUrl={posterUrl}
  title="Waves VIP"
  subtitle="Experiencia de lujo en el paraíso de Morrocoy"
/>
```

## 2. Consultar Disponibilidad del Calendario

### Desde un Componente React

```tsx
"use client";

import { useEffect, useState } from "react";
import CalendarAvailability from "@/components/CalendarAvailability";

export default function BookingPage() {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-31");

  return (
    <div>
      <h1>Selecciona tu fecha</h1>
      <CalendarAvailability
        startDate={startDate}
        endDate={endDate}
        onDateSelect={(date) => {
          console.log("Fecha seleccionada:", date);
        }}
      />
    </div>
  );
}
```

### Desde una API Route o Server Component

```typescript
// En un Server Component o API Route
import { getCalendarAvailability } from "@/lib/google-calendar";

const availability = await getCalendarAvailability({
  startDate: "2024-01-01",
  endDate: "2024-01-31",
});

// availability = [
//   { date: "2024-01-01", available: true },
//   { date: "2024-01-02", available: false },
//   ...
// ]
```

### Desde el Frontend (Fetch)

```typescript
const response = await fetch(
  `/api/calendar/availability?startDate=2024-01-01&endDate=2024-01-31`
);
const data = await response.json();
console.log(data.availability);
```

## 3. Crear Evento en Google Calendar (Después del Pago)

### Desde un Webhook

```typescript
// En app/api/webhooks/stripe/route.ts (ya implementado)
import { createCalendarEvent } from "@/lib/google-calendar";

// Después de confirmar el pago
const { eventId, htmlLink } = await createCalendarEvent({
  booking: {
    id: "booking-123",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    totalPrice: 3000,
    paymentStatus: "completed",
  },
  vessel: {
    id: "vessel-1",
    name: "Yate de Lujo Premium",
    // ... más datos
  },
  customerEmail: "cliente@example.com",
  customerName: "Juan Pérez",
});
```

### Desde una API Route Interna

```typescript
// POST /api/booking/confirm
const webhookSecret = process.env.WEBHOOK_SECRET;

const response = await fetch("/api/calendar/create-event", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${webhookSecret}`,
  },
  body: JSON.stringify({
    booking: bookingData,
    vessel: vesselData,
    customerEmail: customer.email,
    customerName: customer.name,
  }),
});
```

## 4. Manejar Webhooks de Pago

### Estructura de Webhook de Stripe

Los webhooks ya están implementados. Solo necesitas configurar las URLs en cada plataforma:

**Stripe**:
- URL: `https://tu-dominio.com/api/webhooks/stripe`
- Eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`

**PayPal**:
- URL: `https://tu-dominio.com/api/webhooks/paypal`
- Eventos: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`

**Binance Pay**:
- URL: `https://tu-dominio.com/api/webhooks/binance`
- Eventos: `PAYMENT_SUCCESS`, `PAYMENT_FAILED`

### Probar Webhooks Localmente

Usa herramientas como:
- **Stripe CLI**: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- **ngrok**: Para exponer localhost a internet

## 5. Flujo Completo de Reserva (Ejemplo Conceptual)

```tsx
// app/reservar/page.tsx (ejemplo)
"use client";

import { useState } from "react";
import CalendarAvailability from "@/components/CalendarAvailability";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [user, setUser] = useState(null);

  // Paso 1: Seleccionar embarcación
  if (step === 1) {
    return (
      <div>
        <h1>Selecciona tu embarcación</h1>
        {/* Lista de embarcaciones */}
        <button onClick={() => setStep(2)}>Continuar</button>
      </div>
    );
  }

  // Paso 2: Seleccionar fecha
  if (step === 2) {
    return (
      <div>
        <h1>Selecciona tu fecha</h1>
        <CalendarAvailability
          startDate="2024-01-01"
          endDate="2024-12-31"
          onDateSelect={(date) => {
            setSelectedDate(date);
            setStep(3);
          }}
        />
      </div>
    );
  }

  // Paso 3: Login/Registro
  if (step === 3) {
    return (
      <div>
        <h1>Inicia sesión o regístrate</h1>
        {/* Formulario de login/registro */}
        <button onClick={() => setStep(4)}>Continuar</button>
      </div>
    );
  }

  // Paso 4: Pago
  if (step === 4) {
    return (
      <div>
        <h1>Completa tu pago</h1>
        {/* Integración con Stripe/PayPal/Binance */}
      </div>
    );
  }
}
```

## 6. Trabajar con Supabase

### Obtener Embarcaciones

```typescript
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const { data: vessels, error } = await supabase
  .from("vessels")
  .select("*")
  .eq("available", true);
```

### Crear una Reserva

```typescript
const { data: booking, error } = await supabase
  .from("bookings")
  .insert({
    vessel_id: selectedVessel.id,
    user_id: user.id,
    start_date: selectedDate,
    end_date: endDate,
    total_price: calculateTotal(),
    status: "pending",
    payment_status: "pending",
  })
  .select()
  .single();
```

### Actualizar Estado de Pago

```typescript
const { error } = await supabase
  .from("bookings")
  .update({
    payment_status: "completed",
    payment_id: paymentIntentId,
    status: "confirmed",
    google_calendar_event_id: eventId,
  })
  .eq("id", bookingId);
```

## 7. Utilidades

### Formatear Moneda

```typescript
import { formatCurrency } from "@/lib/utils";

const price = formatCurrency(1500, "USD");
// "$1,500 USD"
```

### Formatear Fecha

```typescript
import { formatDate } from "@/lib/utils";

const date = formatDate(new Date("2024-01-15"));
// "15 de enero de 2024"
```

### Clases CSS Condicionales

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)}>
```

## 8. Componente de Ejemplo: Lista de Embarcaciones

```tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Vessel } from "@/types";

export default function VesselList() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVessels() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("vessels")
        .select("*")
        .eq("available", true);

      if (error) {
        console.error(error);
      } else {
        setVessels(data || []);
      }
      setLoading(false);
    }

    fetchVessels();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {vessels.map((vessel) => (
        <div key={vessel.id} className="border rounded-lg overflow-hidden">
          <img src={vessel.images[0]} alt={vessel.name} />
          <div className="p-4">
            <h3 className="text-xl font-bold">{vessel.name}</h3>
            <p>{vessel.description}</p>
            <p className="text-luxury-gold text-2xl font-bold">
              ${vessel.pricePerDay}/día
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 📚 Recursos Adicionales

- Ver `ARCHITECTURE.md` para entender la arquitectura completa
- Ver `SETUP_GUIDE.md` para configuración inicial
- Ver `SETUP_GOOGLE_CALENDAR.md` para configurar Google Calendar

