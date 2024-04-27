import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Chat from "./chat";

export default async function ChatPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('profiles').select('*');

  const { data: { session } } = await supabase.auth.getSession();

    return (
     <>
     <Chat/>
     </>
    );
  }