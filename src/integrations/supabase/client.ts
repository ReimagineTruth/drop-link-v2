// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pgkfqzdapxfnsmharqzv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBna2ZxemRhcHhmbnNtaGFycXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTY4MjgsImV4cCI6MjA2MzM3MjgyOH0.wC3bLnf81t9xuDoxElEu9QRBTwcKfVs3J7sfZJ0g_s4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);