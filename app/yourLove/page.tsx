import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import YourLove from "./yourLove";

const YourLovePage = async () => {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) redirect('/login');
      const { data: userData } = await supabase.from('users_info').select('WhatDo, id').eq('id', session?.user.id || '').single();
      const Events: any = userData;
      
      return  Events ;
    }
  
    const Events = await fetchUserData();
    return (
        <YourLove Events={Events}/>
)
}

export default YourLovePage;