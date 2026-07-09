import { createClient } from '@supabase/supabase-js';

export function getSupabasePublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publishableKey) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are required.');
    }

    return createClient(url, publishableKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}