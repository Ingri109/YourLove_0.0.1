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
  id_partner: string | null;
  engaged: boolean
  mood: string | null;
  network: string | null;
}


const AccountPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const fetchUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) redirect('/login');
    const { data: userData } = await supabase.from('users_info').select('id, name, email, age, gender, id_partner, engaged, mood, network').eq('id', session?.user.id || '').single();
    const userInfoArray: any = userData || [];
    let partnerInfoData: any = [];
    let requestsInfoData: any = [];

    if (userInfoArray && userInfoArray.length > 0) {
      const { data: requestsInfo } = await supabase.from('requests').select('*').eq('id_user', userInfoArray[0].id).single();
      requestsInfoData = requestsInfo || [];
      if (userInfoArray[0].id_partner) {
        const { data: partnerData } = await supabase.from('users_info').select('*').eq('id', userInfoArray[0].id_partner || '').single();
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