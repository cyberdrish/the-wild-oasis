import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zfxexqqizllmktyysbhe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeGV4cXFpemxsbWt0eXlzYmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MTg4MjYsImV4cCI6MjA0NjI5NDgyNn0.2ETYPjVCBHcIOW1CypF7780feeiJUKhjc_zUqPmYFco";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };
