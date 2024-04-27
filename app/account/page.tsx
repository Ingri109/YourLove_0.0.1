import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Account from "./account";
import { Database } from "@/lib/database.types";
import { redirect } from 'next/navigation';

interface UserInfo {
  id: string;
  name: string | null;
  email: string | null;
  age: string | null;
  gender: string | null;
  created_at: string;
  id_partner: string | null;
  engaged: boolean
  mood: string | null;
  network: string | null;
  "what-does": string | null;
}


export default async function AccountPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const fetchUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) redirect('/login');
    const { data: userData } = await supabase.from('users_info').select('*').eq('id', session?.user.id || '');
    const userInfoArray: UserInfo[] = userData || [];
    let partnerInfoData = [];
    let requestsInfoData = [];

    if (userInfoArray && userInfoArray.length > 0) {
      if (userInfoArray[0].id_partner) {
        const { data: requestsInfo } = await supabase.from('requests').select('*').eq('id_user', userInfoArray[0].id);
        requestsInfoData = requestsInfo || [];
        const { data: partnerData } = await supabase.from('users_info').select('*').eq('id', userInfoArray[0].id_partner || '');
        partnerInfoData = partnerData || [];
      }
    }
    return { userInfoArray, partnerInfoData, requestsInfoData };
  }

  const { userInfoArray, partnerInfoData, requestsInfoData } = await fetchUserData();

  return (
    <>
      <Account Userdata={userInfoArray} partnerData={partnerInfoData} requestsInfo={requestsInfoData} />
    </>
  )
}