import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Account from "../../components/app_components/account";
import { redirect } from 'next/navigation';


interface UserInfo {
  id: string;
  name: string;
  email: string;
  age: string;
  gender: string;
  id_partner: string | null;
  engaged: boolean;
}

interface PartnerInfo {
  id: string;
  name: string;
  age: string;
  gender: string;
  id_partner: string | null;
  engaged: boolean;
}

interface RequestInfo {
  id: string;
  id_user: string;
  id_partner: string;
  name_user: string;
  requests_state: boolean;
}

const AccountPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const fetchUserData = async (): Promise<{
    userInfoArray: UserInfo | null;
    partnerInfoData: PartnerInfo | null;
    requestsInfoData: RequestInfo[];
  }> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) redirect('/login');

    const { data: userData } = await supabase
      .from('users_info')
      .select('id, name, email, age, gender, id_partner, engaged')
      .eq('id', session?.user.id || '')
      .single();

    const userInfoArray: UserInfo | null = userData || null;
    let partnerInfoData: PartnerInfo | null = null;
    let requestsInfoData: RequestInfo[] = [];

    if (userInfoArray) {
      const { data: requestsInfo } = await supabase
        .from('requests')
        .select('*')
        .eq('id_user', userInfoArray.id);

      requestsInfoData = requestsInfo || [];

      if (userInfoArray.id_partner) {
        const { data: partnerData } = await supabase
          .from('users_info')
          .select('id, name, age, gender, id_partner, engaged')
          .eq('id', userInfoArray.id_partner || '')
          .single();

        partnerInfoData = partnerData || null;
      }
    }

    return { userInfoArray, partnerInfoData, requestsInfoData };
  };

  const { userInfoArray, partnerInfoData, requestsInfoData } = await fetchUserData();


  return (
    <>
      <Account Userdata={userInfoArray} partnerData={partnerInfoData} requestsInfo={requestsInfoData} />
    </>
  )
}

export default AccountPage;