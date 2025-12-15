// Este archivo será generado automáticamente por Supabase CLI
// Por ahora, definimos una estructura básica
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      pending_reservations: {
        Row: {
          id: string;
          capacity: number;
          date: string;
          name: string;
          email: string;
          phone: string;
          total: number;
          payment_type: "auto" | "manual";
          payment_method: string;
          payment_status: "pending" | "processing" | "confirmed" | "failed";
          proof_url: string | null;
          google_event_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["pending_reservations"]["Row"],
          "id" | "created_at" | "updated_at" | "google_event_id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["pending_reservations"]["Insert"]
        >;
      };
      vessels: {
        Row: {
          id: string;
          name: string;
          description: string;
          capacity: number;
          price_per_day: number;
          images: string[];
          video_url: string | null;
          features: string[];
          specifications: Json;
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["vessels"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["vessels"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          vessel_id: string;
          user_id: string;
          start_date: string;
          end_date: string;
          total_price: number;
          status: "pending" | "confirmed" | "completed" | "cancelled";
          payment_status: "pending" | "processing" | "completed" | "failed";
          payment_method: "stripe" | "paypal" | "binance" | null;
          payment_id: string | null;
          google_calendar_event_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
    };
  };
}

