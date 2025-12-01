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
  vesselId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "processing" | "completed" | "failed";
  paymentMethod?: "stripe" | "paypal" | "binance";
  paymentId?: string;
  googleCalendarEventId?: string;
  createdAt: string;
  updatedAt: string;
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

