
import { NextRequest, NextResponse } from "next/server";
import { createBooking, createPaymentRecord } from "@/lib/services/booking/bookingService";
import { getBoatByCapacity } from "@/lib/config/boats";
import { PaymentFactory } from "@/lib/services/payment/PaymentFactory";
import { PaymentMethod } from "@/lib/services/payment/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      capacity,
      date,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod
    } = body;

    const boat = getBoatByCapacity(Number(capacity));
    if (!boat) return NextResponse.json({ error: "Invalid boat" }, { status: 400 });

    // 1. Create Booking in DB (Pending)
    const booking = await createBooking({
      customerName,
      customerEmail,
      customerPhone,
      startDate: date,
      endDate: date,
      capacity: Number(capacity),
      totalPrice: boat.price,
      calendarId: boat.calendarId
    });

    // 2. Initiate Payment Intent
    // Use PaymentFactory
    let paymentResult;
    try {
      const adapter = PaymentFactory.getAdapter(paymentMethod as PaymentMethod);
      paymentResult = await adapter.createPaymentIntent(
        boat.price,
        "USD",
        `Booking for ${boat.name} on ${date}`,
        booking.id // Use booking ID as reference
      );
    } catch (e) {
      // Manual payment might not need an adapter call if logic differs?
      // But we defined simple adapters.
      // If manual, we expect the frontend to handle the uploadUrl logic maybe?
      // For now, assume Adapter returns something valid for Manual too or we skip.
      console.error("Payment Init Failed", e);
      return NextResponse.json({ error: "Payment Initialization Failed" }, { status: 500 });
    }

    // 3. Create Payment Record
    await createPaymentRecord({
      bookingId: booking.id,
      amount: boat.price,
      provider: paymentMethod,
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      payment: paymentResult
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Error" }, { status: 500 });
  }
}

