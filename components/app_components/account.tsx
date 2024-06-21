'use client';

import Modal from "@/components/Modal/modal";
import InfoUser from "./infoUser";
import { useTranslations } from 'next-intl';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddPartner from "./addpartner";
import InfoPartner from "./infoPartner";
import Link from "next/link";


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
  
  interface AccountProps {
    Userdata: UserInfo | null;
    partnerData: PartnerInfo | null;
    requestsInfo: RequestInfo[];
  }
  
  export default function Account({ Userdata, partnerData, requestsInfo }: AccountProps) {
    const t = useTranslations('Account');
    const [opentModal, setOpenModal] = useState<boolean>(false);
    const [chekModel, setChekModel] = useState<string>('');
  
    const supabase = createClientComponentClient();
    const router = useRouter();
  
    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    };
  
    if (!Userdata) return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-[900px] flex flex-col justify-center items-center bg-color3_1 bg-opacity-20 backdrop-blur-md rounded-[10px] px-[34px] py-[24px]">
          <p className="w-[900px] text-balance text-center text-color3_2 text-[28px] font-bold tracking-wide ">
            {t('NotAvatar1')}
          </p>
          <p className="text-balance text-center text-cold_season text-[16px] font-medium tracking-wide mt-[16px]">
            <span className="text-color1_2 text-[18px] font-bold"> {t('NotAvatar2')}</span> {t('NotAvatar3')}.
          </p> 
          <p className="text-balance text-center text-cold_season text-[16px] font-medium tracking-wide mt-[8px]">
          {t('NotAvatar4')} <span className="text-color2_2 font-bold">{t('buttonNotAvater')}</span>.
          </p>
          <Link href={'/registerForm'} className="bg-color4_1 bg-opacity-60 backdrop-blur-md text-white text-[18px] font-semibold px-[40px] py-[6px] mt-9 rounded-[14px] transition-all duration-200 delay-150 ease-out shadow-[0_1px_30px_6px_rgba(0,0,0,0.40)] shadow-color1_3 hover:bg-color4_3 hover:bg-opacity-80 hover:backdrop-blur-m hover:shadow-[0_0_40px_12px_rgba(0,0,0,0.40)] hover:shadow-color1_3">
          {t('buttonNotAvater')}
          </Link>
        </div>
      </div>
    );
  
    return (
      <>
        <div className="flex justify-center items-stretch justify-items-stretch md:items-center">
          <div className="flex flex-col justify-start items-stretch w-full max-h-full px-[10px] py-[12px] bg-color1_2 bg-opacity-10 backdrop-blur-md mb-[20px] mt-[80px] mx-[10px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] xl:w-10/12 lg:px-[20px] lg:py-[18px] lg:w-11/12 md:px-[12px] md:py-[18px] md:w-4/6 md:mx-0 md:mb-[0px] animate-scaleIn">
            <div className="flex">
              <div className="flex flex-col justify-start justify-items-stretch items-start w-full px-[10px] py-[8px] pb-[16px] bg-color1_1 rounded-[14px] shadow-color3 shadow-[0_5px_10px_3px_rgba(0,0,0,0.5)] lg:px-0 lg:pb-[10px] lg:flex-row lg:justify-between">
                <div className="basis-0 flex flex-col justify-between justify-items-stretch h-full w-full items-start px-[16px] lg:px-[12px] lg:basis-1/2">
                  <InfoUser Userdata={Userdata} />
                  <div className="flex flex-col justify-between items-center mb-[16px] space-x-0 lg:space-x-2 lg:flex-row lg:mt-[70px] w-full">
                    <button onClick={() => { setOpenModal(true); setChekModel('Password') }} className="bg-color4 whitespace-nowrap text-white text-[14px] font-bold tracking-wide w-full px-0 py-[6px] mt-[10px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] xl:px-[20px] lg:min-w-min lg:max-w-full lg:w-full lg:mt-0 lg:px-[11px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">
                    {t('newPassword')}
                    </button>
                    <button onClick={() => { setOpenModal(true); setChekModel('Name') }} className="bg-color4 whitespace-nowrap text-white text-[14px] font-bold tracking-wide w-full px-0 py-[6px] mt-[10px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] xl:px-[20px] lg:min-w-min lg:max-w-full lg:w-full lg:mt-0 lg:px-[11px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">
                    {t('newName')}
                    </button>
                    {Userdata.engaged === false
                      ? <button onClick={() => { setOpenModal(true); setChekModel('Requests') }} className="bg-color4 whitespace-nowrap text-white text-[14px] font-bold tracking-wide w-full h-min px-0 py-[6px] mt-[10px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] xl:px-[20px] lg:min-w-min lg:max-w-full lg:w-full lg:mt-0 lg:px-[11px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">
                        {t('invitation')}
                      </button>
                      : <button onClick={() => { setOpenModal(true); setChekModel('DelRequests') }} className="bg-color4 whitespace-nowrap text-white text-[14px] font-bold tracking-wide w-full h-min px-0 py-[6px] mt-[10px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] xl:px-[20px] lg:min-w-min lg:max-w-full lg:w-full lg:mt-0 lg:px-[11px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">
                        {t('DelParnterButton')}
                      </button>
                    }
                  </div>
                </div>
                {Userdata.engaged === false ? <AddPartner Userdata={Userdata} /> : partnerData && <InfoPartner partnerData={partnerData} />}
              </div>
            </div>
            <div className="flex justify-end items-end mt-[24px] mr-[20px] lg:mt-[60px]">
              <button onClick={handleLogout} className="bg-color1 bg-opacity-40 backdrop-blur-lg py-[5px] px-[20px] rounded-[16px] text-white text-[16px] shadow-[0_1px_30px_6px_rgba(0,0,0,0.40)] shadow-color4_3 transition-all delay-100 duration-200 ease-in hover:bg-color1 hover:bg-opacity-70 hover:backdrop-blur hover:scale-110 hover:shadow-[0_1px_30px_1px_rgba(0,0,0,0.20)] hover:shadow-color1_2">
              {t('exit')}
              </button>
            </div>
          </div>
        </div>
        {opentModal && <Modal Userdata={Userdata} requestsInfo={requestsInfo} chekModel={chekModel} onClose={() => { setOpenModal(false); setChekModel('') }} />}
      </>
    );
  }