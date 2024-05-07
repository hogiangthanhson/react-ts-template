import { createClient } from "@supabase/supabase-js";
import { Database } from "types";
export const supabaseUrl = "https://mqzyfarbjpcfeootpghn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xenlmYXJianBjZmVvb3RwZ2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3MTYwOTYsImV4cCI6MjAzMDI5MjA5Nn0.87udWAWY-b3GCEHtwxN5qDS2RS5m47M8Xc8Woe2k2bE";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
