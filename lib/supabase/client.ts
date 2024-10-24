import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "@supabase/supabase-js";

export type UserRole = "user" | "admin";

export interface UserMetadata {
  role?: UserRole;
}

let supabaseInstance: SupabaseClient | null = null;

export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createSupabaseClient<any, "public", any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabaseInstance;
};
