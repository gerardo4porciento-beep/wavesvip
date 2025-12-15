
import { createClient } from "@supabase/supabase-js";
import { Booking, Payment } from "@/types"; // You might need to update types if they don't match schema exactly

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Use Service Role for backend ops ideally, but anon for client side
// For backend generic ops, we might want SERVICE_ROLE if we have RLS enabled and need admin access.
// Let's assume standard client for now or Service Role if available in future.

const supabase = createClient(supabaseUrl, supabaseKey);

export async function createBooking(data: any) {
    const { data: booking, error } = await supabase
        .from("bookings")
        .insert([{
            customer_name: data.customerName,
            customer_email: data.customerEmail,
            customer_phone: data.customerPhone,
            start_date: data.startDate,
            end_date: data.endDate,
            capacity: data.capacity,
            total_price: data.totalPrice,
            status: "PENDING_PAYMENT",
            google_calendar_id: data.calendarId
        }])
        .select()
        .single();

    if (error) {
        console.error("Error creating booking:", error);
        throw new Error(error.message);
    }
    return booking;
}

export async function createPaymentRecord(data: any) {
    const { data: payment, error } = await supabase
        .from("payments")
        .insert([{
            booking_id: data.bookingId,
            amount: data.amount,
            provider: data.provider,
            status: "PENDING"
        }])
        .select()
        .single();

    if (error) {
        console.error("Error creating payment:", error);
        throw new Error(error.message);
    }
    return payment;
}

export async function updateBookingStatus(bookingId: string, status: string) {
    const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId);

    if (error) throw new Error(error.message);
}
