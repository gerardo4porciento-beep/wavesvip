import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase no está configurado correctamente (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)"
    );
  }

  return createClient<Database>(url, serviceKey);
}



