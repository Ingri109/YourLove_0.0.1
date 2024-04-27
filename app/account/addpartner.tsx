'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
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
    Userdata: UserInfo[];
}

const AddPartner = ({ Userdata }: InfoUserProps) => {
    const [message, setMessage] = useState<string>('');
    const [idPartner, setIdPartner] = useState<string>('');
    const supabase = createClientComponentClient();


    const AddYourLove = async () => {
        if (idPartner != Userdata[0].id) {
            const { data: partnerData } = await supabase.from('users_info').select('*').eq('id', idPartner || '');
            let partnerInfoData: UserInfo[] = partnerData || [];

            if (partnerInfoData != null) {
                if (partnerInfoData.length > 0) {
                    if (partnerInfoData[0].engaged === false) {
                        const { error } = await supabase.from('requests').insert({ id_user: idPartner, id_partner:  Userdata[0].id, name_user: Userdata[0].name, requests_state: true });
                        console.log(error);
                        setMessage('Запит надісланий, очікуйте на прийняття.');
                    } else if (partnerInfoData[0].engaged === true) {
                        setMessage('Такий користувач вже зайнятий.');
                    }
                } else {
                    setMessage('Такого користувача не існує.');
                }
            } else {
                setMessage('Такого користувача не існує.');
            }
        } else {
            setMessage('Ви е можете відправити запроження самому собі');
        }

    }

    return (
        <>
            <div className="basis-0 flex flex-col justify-center items-center mt-[36px] lg:basis-1/2 lg:mt-[30px] ">
                <p className="text-[12px] text-white font-normal text-balance tracking-normal hyphens-manual text-center ml-[10px] mr-[10px] lg:text-[15px] lg:mr-[30px] lg:ml-[0px] font-Source">Доброго дня, дякую за те що скористувалися нашою інтернет сторінкою, якщо ви хочете добачити <span className="text-color3 font-bold">свого партнера</span> для цікавого проведення спільного часу на цій сторінці будь ласка можете вести <span className="text-color3 font-bold">ID вашого партнера</span>, він знаходиться на сторінці Акаунта його сторінки, після чого натиснути на кнопку <span className="text-color3 font-bold">“Добавити партнера”</span>.
                    Або прийміть запрошення від вашого партнера натиснувши на кнопку <span className="text-color3 font-bold">“Запрошення”</span>.
                </p>
                <p className="text-[9px] text-white font-normal text-wrap tracking-normal hyphens-manual text-center mt-[15px] ml-[10px] mr-[10px] lg:text-[12px] lg:mr-[10px] lg:ml-[0px] font-Source"><span className="text-[11px] text-color3_2 font-extrabold text-wrap tracking-normal lg:[12px]">ПОПЕРЕДЖЕННЯ: </span>Може бути добавлений лише <span className=" underline underline-offset-4 decoration-white"> одиного партнера</span> , якщо ви хочете його змінити в майбутньому, то потрібно натиснути на кнопку <span className="text-color3">“Покинути партнера”</span>.</p>
                <div className="flex items-center justify-center w-full relative mt-[20px]">
                    <input type="text" value={idPartner} onChange={(e) => setIdPartner(e.target.value)} name="name" placeholder="Name" className="from__field_id bg-color3_3 bg-opacity-30 backdrop-blur-md outline-none border-[4px] border-color3_3 rounded-lg text-white p-1 text-[16px] font-medium placeholder:text-transparent" />
                    <label className="from__label_id bg-color3_3 rounded-t-lg left-[152px] top-[-18px] absolute block text-white text-[12px] transition-all duration-300 delay-50 px-[10px] py-[0.5px]">Name</label>
                </div>
                <button onClick={AddYourLove} className="flex items-center bg-color2_2 rounded-[16px] py-[5px] px-[20px] text-center mt-[16px] text-white shadow-[0_6px_10px_1px_rgba(0,0,0,0.3)]  transition delay-100 duration-200 ease-in-out hover:bg-color2_1 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_8px_15px_3px_rgba(0,0,0,0.5)]">Добавити партнера</button>
                {message !== '' ? <h2 className="text-[10px] text-color3">{message}</h2> : null}
            </div>
        </>
    )
}

export default AddPartner;