import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        // Supabase omitido temporalmente a petición: devolver success mock
        console.log("🟢 Supabase bypass: returning mock success");
        return NextResponse.json({ success: true, data: { mock: true, body } });
    } catch (error: any) {
        console.error("❌ Exception in create-booking API:", error);
        return NextResponse.json(
            { 
                success: false, 
                error: error?.message || "Error desconocido al crear la reserva" 
            },
            { status: 500 }
        );
    }
}

