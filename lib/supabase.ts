import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

export type Volunteer = {
  id: string
  name: string
  email: string
  phone: string
  area_of_interest: string | null
  message: string | null
  created_at: string
  status: 'pending' | 'contacted' | 'approved' | 'rejected'
}