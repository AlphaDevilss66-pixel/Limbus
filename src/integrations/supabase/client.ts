// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yawlphlzjkihtylpgzku.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhd2xwaGx6amtpaHR5bHBnemt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODIwNDEsImV4cCI6MjA1NzM1ODA0MX0.kKH6OKnzbOdWQuumNmmSpYQATwBe5HjPG_cGSL-oY4I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);