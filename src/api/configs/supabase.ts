import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://nrvanghblqyqtckdgoen.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ydmFuZ2hibHF5cXRja2Rnb2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzQ4MDgsImV4cCI6MTk5NTc1MDgwOH0.CVxRL83Rpora-cbXJq030EwJ1YqFsD8h1CR4_saLDjE"
);

export default supabase;
