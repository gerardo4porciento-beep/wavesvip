import { createServerClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";

type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"];

export async function createBooking(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  capacity: number;
  totalPrice: number;
  calendarId?: string | null;
}): Promise<BookingRow> {
  const supabase = createServerClient();

  const insertData: BookingInsert = {
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    start_date: data.startDate,
    end_date: data.endDate,
    capacity: data.capacity,
    total_price: data.totalPrice,
    status: "PENDING_PAYMENT" as const,
    google_calendar_id: data.calendarId ?? null,
    vessel_id: null,
    user_id: null,
    payment_method: null,
    payment_status: "pending" as const,
    payment_id: null,
    google_calendar_event_id: null,
  };

  const { data: booking, error } = await supabase
    .from("bookings")
    // Nota: tipado relajado para evitar errores de inferencia en build
    .insert(insertData as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    throw new Error(error.message);
  }
  return booking;
}

export async function createPaymentRecord(data: {
  bookingId: string;
  amount: number;
  provider: string;
}) {
  const supabase = createServerClient();

  const insertData: PaymentInsert = {
    booking_id: data.bookingId,
    amount: data.amount,
    provider: data.provider,
    status: "PENDING" as const,
  };

  const { data: payment, error } = await supabase
    .from("payments")
    // Nota: tipado relajado para evitar errores de inferencia en build
    .insert(insertData as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating payment:", error);
    throw new Error(error.message);
  }
  return payment;
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingRow["status"]
) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);

  if (error) throw new Error(error.message);
}
