export interface Vessel {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerDay: number;
  images: string[];
  videoUrl?: string;
  features: string[];
  specifications: {
    length: string;
    year: number;
    engine: string;
  };
  available: boolean;
}

export interface Booking {
  id: string;
  vesselId?: string; // Optional now?
  userId?: string; // Optional now?
  customerName?: string; // Added
  customerEmail?: string; // Added
  customerPhone?: string; // Added
  startDate: string;
  endDate: string;
  capacity?: number; // Added
  totalPrice: number;
  status: "PENDING_PAYMENT" | "PENDING_APPROVAL" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "pending" | "confirmed" | "completed" | "cancelled"; // Merged status enums
  paymentStatus?: "pending" | "processing" | "completed" | "failed" | "PENDING" | "PAID" | "FAILED";
  paymentMethod?: "stripe" | "paypal" | "binance" | "UBIPAGOS" | "MANUAL_UPLOAD";
  paymentId?: string;
  googleCalendarEventId?: string;
  calendarId?: string; // Added
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  provider: string;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  providerTransactionId?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: string;
}

export interface CalendarAvailability {
  date: string;
  available: boolean;
  bookingId?: string;
}

