'use server';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Chat from "../../components/app_components/chat";


export async function ChatPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log('no session')
    redirect('/login')
  }
  const { data, error } = await supabase.from('requests').select('*').eq('id_user', session?.user.id)
  if (!data) redirect('/account')
  return (
    <>
      <Chat />
    </>
  );
}