import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>('https://kofdnslmjplrsyevsgtd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZmRuc2xtanBscnN5ZXZzZ3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjA3MTcsImV4cCI6MjA1NzkzNjcxN30.u0tW_fSV442OB-fepcBkMqYW8g_B3DPQti6auPB2EPk')
