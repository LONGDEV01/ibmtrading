
import { createClient } from '@supabase/supabase-js';

// Credentials provided by user
const supabaseUrl = 'https://cjqsxkufhsijuvfkzovk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcXN4a3VmaHNpanV2Zmt6b3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDQ0NzMsImV4cCI6MjA4MzM4MDQ3M30.xLWfL4RdZdgqevtUSWuvZW5Bb_0IVco2_7AaD39iYsw';

export const isSupabaseConfigured = true;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Realtime Helper
export const mockRealtimeSubscription = (
  table: string, 
  callback: (payload: any) => void
) => {
  // We are using real Supabase now, but keep this signature for fallback compatibility if needed
  return {
    unsubscribe: () => {}
  };
};
