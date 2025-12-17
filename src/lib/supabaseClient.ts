import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    // We don't throw error here to prevent build failure during static generation
    // But we log it to console for debugging
    console.warn("Supabase URL or Anon Key is missing");
}

// Safe initialization to prevent app crash if keys are missing
const getSupabaseClient = () => {
    if (supabaseUrl && supabaseAnonKey) {
        return createClient(supabaseUrl, supabaseAnonKey);
    }
    console.warn("Supabase keys missing. Database features will not work.");
    // Return a dummy object that warns on usage
    return {
        from: () => ({
            insert: async () => ({ error: new Error("Database not connected. Please set Supabase keys.") }),
            select: async () => ({ error: new Error("Database not connected. Please set Supabase keys.") }),
        }),
    } as any;
};

export const supabase = getSupabaseClient();
