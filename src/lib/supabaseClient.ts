import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    // We don't throw error here to prevent build failure during static generation
    // But we log it to console for debugging
    console.warn("Supabase URL or Anon Key is missing");
}

export const supabase = createClient(
    supabaseUrl || "",
    supabaseAnonKey || ""
);
