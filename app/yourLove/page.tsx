'use server';
import YourLove from "../../components/app_components/yourLove"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

 const yourLovePage = async () => {

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login')
  const { data, error } = await supabase.from('requests').select('*').eq('id_user', session?.user.id)
  if (!data) redirect('/account')

  return (
    <YourLove />
  )
}
export default yourLovePage;