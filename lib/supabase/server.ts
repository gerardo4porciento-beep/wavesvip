import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("❌ Supabase config missing:", {
      hasUrl: !!url,
      hasKey: !!serviceKey,
      urlLength: url?.length || 0,
      keyLength: serviceKey?.length || 0
    });
    throw new Error(
      "Supabase no está configurado correctamente (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)"
    );
  }

  try {
    const client = createSupabaseClient<Database>(url, serviceKey);
    console.log("✅ Supabase client created successfully");
    return client;
  } catch (error: any) {
    console.error("❌ Error creating Supabase client:", error);
    throw new Error("Error al crear cliente de Supabase: " + (error?.message || "Error desconocido"));
  }
}

// Export as createClient for compatibility
export const createClient = createServerClient;





