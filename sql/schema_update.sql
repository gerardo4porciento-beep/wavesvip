-- Add booking_date column to bookings table
ALTER TABLE bookings 
ADD COLUMN booking_date DATE;

-- Create a unique index to prevent double bookings for the same capacity on the same day
-- We only care about bookings that are NOT cancelled
-- Note: We use 'capacity' as the resource identifier because specific vessel_id might not be assigned yet
CREATE UNIQUE INDEX bookings_capacity_date_key 
ON bookings (capacity, booking_date) 
WHERE status NOT IN ('cancelled', 'failed');
