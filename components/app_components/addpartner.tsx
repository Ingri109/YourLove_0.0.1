'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from 'next-intl';
import { useState } from "react";

interface UserInfo {
    age: string | null
    created_at: string
    email: string | null
    gender: string | null
    id: string
    id_partner: string | null
    engaged: boolean
    mood: string | null
    name: string | null
    network: string | null
    "what-does": string | null
}

interface InfoUserProps {
    Userdata: any;
}

const AddPartner = ({ Userdata }: InfoUserProps) => {
    const t = useTranslations('Account');
    const [message, setMessage] = useState<string>('');
    const [idPartner, setIdPartner] = useState<string>('');
    const supabase = createClientComponentClient();


    const AddYourLove = async () => {
        if (idPartner != Userdata.id) {
            const { data: partnerData } = await supabase.from('users_info').select('*').eq('id', idPartner || '').single();
            let partnerInfoData: any = partnerData || [];

            if (partnerInfoData != null) {
                
                    if (partnerInfoData.engaged === false) {
                        const { error } = await supabase.from('requests').insert({ id_user: idPartner, id_partner: Userdata.id, name_user: Userdata.name, requests_state: true });
                        console.log(error);
                        setMessage(t('ErrorMessageAddPartner1'));
                    } else if (partnerInfoData.engaged === true) {
                        setMessage(t('ErrorMessageAddPartner2'));
                    }
            
            } else {
                setMessage(t('ErrorMessageAddPartner3'));
            }
        } else {
            setMessage(t('ErrorMessageAddPartner4'));
        }

    }

    return (
        <>
            <div className="basis-0 flex flex-col justify-center items-center justify-items-stretch mt-[36px] lg:basis-1/2 lg:mt-[0px] ">
                <p className="text-[12px] text-white font-normal text-balance tracking-normal hyphens-manual text-center ml-[10px] mr-[10px] xl:text-[16px] lg:text-[14px] lg:mr-[30px] lg:ml-[0px] font-Source"> {t('content1')} <span className="text-color3 font-bold">{t('YourPartner')}</span> {t('content2')} <span className="text-color3 font-bold">ID</span> {t('content3')} <span className="text-color3 font-bold">{t('addPartner')}</span>.
                 {t('content4')} <span className="text-color3 font-bold">{t('invitation')}</span>.
                </p>
                <p className="text-[9px] text-white font-normal text-wrap tracking-normal hyphens-manual text-center mt-[15px] ml-[10px] mr-[10px] lg:text-[12px] lg:mr-[10px] lg:ml-[0px] font-Source"><span className="text-[11px] text-color3_2 font-extrabold text-wrap tracking-normal lg:[12px]">{t('Warning')} </span>{t('WarningContent1')}  <span className=" underline uppercase underline-offset-3 decoration-white"> {t('OnePartner')} </span> , {t('WarningContent2')}  <span className=" font-semibold text-color3">{t('YourPartner')}</span>.</p>
                <div className="flex items-strat justify-center justify-items-stretch  relative mt-[28px] mb-[8px]">
                    <input type="text" value={idPartner} onChange={(e) => setIdPartner(e.target.value)} name="ID" placeholder="ID" className="bg-color3_3 bg-opacity-30 backdrop-blur-md w-full outline-none border-[4px] border-color3_3 rounded-lg text-white p-1 text-[16px] font-medium placeholder:text-transparent" />
                    <label className="bg-color3_3 rounded-t-lg left-[12px] top-[-14px] absolute  block text-white text-[10px] px-[10px] py-[0.5px] md:text-[12px] md:top-[-18px] md:left-[16px]">{t('IDPartner')} </label>

                </div>
                {message !== '' ? <h2 className="text-[10px] uppercase font-semibold text-color3 mb-[2px]">{message}</h2> : null}
                <button onClick={AddYourLove} className="flex items-center bg-color2_2 rounded-[16px] py-[5px] px-[20px] mb-[10px] text-center text-white shadow-[0_6px_10px_1px_rgba(0,0,0,0.3)] transition delay-100 duration-200 ease-in-out hover:bg-color2_1 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_8px_15px_3px_rgba(0,0,0,0.5)]">{t('addPartner')}</button>

            </div>
        </>
    )
}

export default AddPartner;