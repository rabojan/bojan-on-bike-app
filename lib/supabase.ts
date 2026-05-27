import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client za browser (javne strani, ambasadorski kotiček)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server client z admin dostopom (samo za server-side kodo)
export function createServiceClient() {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
