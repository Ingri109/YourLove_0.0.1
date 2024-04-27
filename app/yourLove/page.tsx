'use server';
import YourLove from "./yourLove"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { redirect } from 'next/navigation';

export default async function yourLovePage() {
  
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login')
  const { data, error } = await supabase.from('requests').select('*').eq('id_user', session?.user.id)
  if (!data) redirect('/account')

  return(
    <YourLove/>
  )
}