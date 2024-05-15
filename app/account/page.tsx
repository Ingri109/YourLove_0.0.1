import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Account from "../../components/app_components/account";
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


const AccountPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const fetchUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) redirect('/login');
    const { data: userData } = await supabase.from('users_info').select('*').eq('id', session?.user.id || '');
    const userInfoArray: UserInfo[] = userData || [];
    let partnerInfoData: any = [];
    let requestsInfoData: any = [];

    if (userInfoArray && userInfoArray.length > 0) {
      const { data: requestsInfo } = await supabase.from('requests').select('*').eq('id_user', userInfoArray[0].id);
      requestsInfoData = requestsInfo || [];
      if (userInfoArray[0].id_partner) {
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

export default AccountPage;