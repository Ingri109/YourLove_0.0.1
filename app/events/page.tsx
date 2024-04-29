'use server';
import Events from "./events";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


export default async function EventsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login')
  const { data, error } = await supabase.from('requests').select('*').eq('id_user', session?.user.id)
  if (!data) redirect('/account')
    
  return (
    <Events />
  )
}