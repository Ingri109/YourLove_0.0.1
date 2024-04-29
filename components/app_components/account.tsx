'use client';

import Modal from "@/components/Modal/modal";
import InfoUser from "./infoUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddPartner from "./addpartner";
import InfoPartner from "./infoPartner";
import Link from "next/link";

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

interface AccountProps {
    Userdata: UserInfo[];
    partnerData: UserInfo[];
    requestsInfo: any; // Замініть `any` на біль конкретний тип, якщо можливо
}

export default function Account({ Userdata, partnerData, requestsInfo }: AccountProps) {
    const [opentModal, setOpenModal] = useState(false);
    const [chekModel, setChekModel] = useState('');

    const supabase = createClientComponentClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    }


    if (!Userdata || Userdata.length === 0) return (
        <>
            <div className="flex items-center justify-center w-full h-screen">
                <div className=" w-[900px] flex flex-col justify-center items-center bg-color3_1 bg-opacity-20 backdrop-blur-md rounded-[10px] px-[34px] py-[24px]">
                    <p className="w-[900px] text-balance text-center text-color3_2 text-[28px] font-bold tracking-wide ">Ви не можете зайти в акаунт тому, що у вас немає Aватара.</p>
                    <p className="text-balance text-center text-cold_season text-[16px] font-medium tracking-wide mt-[16px]"><span className="text-color1_2 text-[18px] font-bold"> Аватар</span> це віртальна особистість, яка буде показана вашому партнеру.</p> 
                    <p className="text-balance text-center text-cold_season text-[16px] font-medium tracking-wide mt-[8px]">Для того щоб створити аватара натисність на кнопку <span className="text-color2_2 font-bold">створити аватара</span></p>
                    <Link href={'/registerForm'} className="bg-color4_1 bg-opacity-60 backdrop-blur-md text-white text-[18px] font-semibold px-[40px] py-[6px] mt-9 rounded-[14px] transition-all duration-200 delay-150 ease-out shadow-[0_1px_30px_6px_rgba(0,0,0,0.40)] shadow-color1_3  hover:bg-color4_3 hover:bg-opacity-80 hover:backdrop-blur-m hover:shadow-[0_0_40px_12px_rgba(0,0,0,0.40)] hover:shadow-color1_3">Cтворити аватара</Link>
                </div>
            </div>
        </>)


    return (
        <>
            <div className=" flex flex-col items-center">
                <div className=" flex flex-col w-[360px] h-[900px] bg-color4 bg-opacity-10 backdrop-blur-md mt-[80px] mb-[100px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:w-[1160px] lg:h-[512px] lg:mb-[142px] sm:m-[60px] animate-scaleIn">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col justify-start w-[310px] h-[790px] bg-color1_1  rounded-[14px] mt-[25px] shadow-[0_4px_60px_3px_rgba(0,0,0,0.4)] shadow-color3 lg:flex-row lg:w-[1060px] lg:h-[370px] lg:justify-between ">
                            <div className="basis-0 flex flex-col justify-start items-start mx-2 mt-[10px] lg:ml-[20px] lg:mx-0 lg:basis-1/2 lg:mt-[0px]">
                                <InfoUser Userdata={Userdata} />
                                <div className="flex flex-col justify-start items-center mt-[32px] space-x-0 space-y-3 lg:flex-row lg:space-x-4 lg:space-y-0 lg:mt-[90px] w-full">
                                    <button onClick={() => { setOpenModal(true); setChekModel('Password') }} className="bg-color4 text-white text-[14px] font-bold tracking-wide w-full py-[4px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] lg:w-auto lg:px-[20px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">Змінити пароль</button>
                                    <button onClick={() => { setOpenModal(true); setChekModel('Name') }} className="bg-color4 text-white text-[14px] font-bold tracking-wide w-full py-[4px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] lg:w-auto lg:px-[20px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">Змінити ім’я</button>
                                    {Userdata[0].engaged === false
                                        ?
                                        <button onClick={() => { setOpenModal(true); setChekModel('Requests') }} className="bg-color4 text-white text-[14px] font-bold tracking-wide w-full py-[4px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] lg:w-auto lg:px-[20px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">Запрошення</button>
                                        :
                                        <button onClick={() => { setOpenModal(true); setChekModel('DelRequests') }} className="bg-color4 text-white text-[14px] font-bold tracking-wide w-full py-[4px] rounded-[14px] shadow-[0_0_20px_1px_rgba(0,0,0,0.4)] lg:w-auto lg:px-[20px] lg:py-[5px] transition duration-200 ease-in-out hover:bg-color4_1 hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.35)] hover:scale-105 active:bg-color4 focus:bg-color4">Видалити партнера</button>
                                    }
                                </div>
                            </div>
                            {Userdata[0].engaged === false ? <AddPartner Userdata={Userdata} /> : <InfoPartner partnerData={partnerData} />}

                        </div>
                    </div>

                    <div className="flex justify-end items-end mt-[24px] mr-[20px] lg:mt-[60px]">
                        <button onClick={handleLogout} className="bg-color1 bg-opacity-40 backdrop-blur-lg py-[5px] px-[20px] rounded-[16px] text-white text-[16px] shadow-[0_1px_30px_6px_rgba(0,0,0,0.40)] shadow-color4_3 transition-all delay-100 duration-200 ease-in hover:bg-color1 hover:bg-opacity-70 hover:backdrop-blur hover:scale-110 hover:shadow-[0_1px_30px_1px_rgba(0,0,0,0.20)] hover:shadow-color1_2">Вийти з акаунта</button>
                    </div>
                </div>
            </div>
            {opentModal && <Modal Userdata={Userdata} requestsInfo={requestsInfo} chekModel={chekModel} onClose={() => { setOpenModal(false); setChekModel('') }} />}
        </>
    );

}