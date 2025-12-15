
import { createServerClient } from "@/lib/supabase/server";
import { Booking, Payment } from "@/types";

// Initialize Supabase Client
const supabase = createServerClient();

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
