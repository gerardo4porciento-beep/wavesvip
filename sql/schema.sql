-- Create enum for Booking Status
CREATE TYPE booking_status AS ENUM ('PENDING_PAYMENT', 'PENDING_APPROVAL', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- Create enum for Payment Status
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- Create enum for Payment Provider
CREATE TYPE payment_provider AS ENUM ('BINANCE', 'PAYPAL', 'UBIPAGOS', 'ZELLE_MANUAL', 'PAGO_MOVIL_MANUAL', 'CASH_MANUAL');

-- Create Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Customer Info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Reservation Details
  start_date DATE NOT NULL, -- The date of the trip
  end_date DATE NOT NULL,   -- Usually same as start_date for 1 day trips, but kept for flexibility
  capacity INTEGER NOT NULL, -- 6, 8, 10, 12
  vessel_id TEXT, -- Optional: Specific boat ID if assigned
  
  -- Financials
  total_price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD' NOT NULL,
  
  -- Meta
  status booking_status DEFAULT 'PENDING_PAYMENT' NOT NULL,
  google_event_id TEXT, -- ID of the specific Google Calendar event
  google_calendar_id TEXT, -- ID of the calendar used
  notes TEXT
);

-- Create Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD' NOT NULL,
  
  provider payment_provider NOT NULL,
  provider_transaction_id TEXT, -- PayPal Order ID, Binance Order ID, etc.
  
  status payment_status DEFAULT 'PENDING' NOT NULL,
  
  -- For manual uploads
  image_url TEXT,
  
  raw_response JSONB -- Store full webhook payload or debug info
);

-- RLS Policies (Simple for now: Public insert, but read/update restricted ideally)
-- Note: You might want to enable RLS and add policies via the Supabase Dashboard
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow public creation for now (for the booking wizard)
CREATE POLICY "Enable insert for everyone" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for everyone" ON bookings FOR SELECT USING (true); -- CAREFUL: In production, limit this
CREATE POLICY "Enable insert for everyone" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for everyone" ON payments FOR SELECT USING (true);
