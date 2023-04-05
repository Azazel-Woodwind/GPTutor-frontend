import "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
    interface User {
        accessLevel: number;
    }
}
