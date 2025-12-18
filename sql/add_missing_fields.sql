-- Script para agregar campos faltantes a la tabla bookings
-- Ejecuta este script en el SQL Editor de Supabase si la tabla ya existe

-- Agregar booking_date si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'booking_date'
    ) THEN
        ALTER TABLE bookings ADD COLUMN booking_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
    END IF;
END $$;

-- Agregar payment_status si no existe (para bookings)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE bookings ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed'));
    END IF;
END $$;

-- Agregar payment_method si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE bookings ADD COLUMN payment_method TEXT;
    END IF;
END $$;

-- Agregar user_id si no existe (opcional, para usuarios autenticados)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE bookings ADD COLUMN user_id UUID;
    END IF;
END $$;

-- Verificar que notes existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'notes'
    ) THEN
        ALTER TABLE bookings ADD COLUMN notes TEXT;
    END IF;
END $$;


