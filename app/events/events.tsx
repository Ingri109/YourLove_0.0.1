'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Events() {

  const [users, setUser] = useState<object | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
       if(!user){
        router.push('/login');
      }

    }
    getUser();
    
  }, [users, router, supabase.auth]);
  console.log(users)

  if (!users) return null;
  

  return (
    <>
      <div className=" flex flex-col items-center">
        <div className=" flex flex-col w-[360px] h-[900px] bg-color1 mt-[80px] mb-[100px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:w-[1160px] lg:h-[512px] lg:mb-[142px] sm:m-[60px] animate-scaleIn">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 gap-4 content-start place-content-around items-center w-[310px] h-[790px] bg-color5 rounded-[14px] mt-[25px] shadow-[0_5px_10px_3px_rgba(0,0,0,0.5)] lg:flex-row lg:w-[1060px] lg:h-[190px] lg:justify-between ">
              <div className="flex flex-row justify-start items-center py-4 space-x-[8px] mt-[15px] ml-[20px]">
                <h1 className="text-[22px] text-white font-medium">Твій настрій: </h1>
                <select className="appearance-none py-[4px] pl-[10px] pr-[14px] bg-color2 text-white rounded-[10px]">
                  <option>Не знаю</option>
                  <option>Позитивний</option>
                  <option>Злий</option>
                </select>
              </div>
              <div className="flex flex-row justify-start items-center py-4 space-x-[8px]">
                <h1 className="text-[22px] text-white font-medium">Що робиш зараз: </h1>
                <select className="appearance-none py-[4px] pl-[10px] pr-[14px] bg-color2 text-justify text-white rounded-[10px] ">
                  <option>---------</option>
                  <option>Працюю</option>
                  <option>Відпочиваю</option>
                  <option>Сумую за тобою</option>
                  <option>Нічого</option>
                  <option>Відпочиваю</option>
                  <option>Зайнятий</option>
                </select>
              </div>
              <div className="flex flex-row justify-start items-center py-4 space-x-[8px] ml-[20px]">
                <h1 className="text-[22px] text-white font-medium">Стан мережі: </h1>
                <select className="appearance-none py-[4px] pl-[10px] pr-[14px] bg-color2 text-white rounded-[10px]">
                  <option>Не знаю</option>
                  <option>В мережі</option>
                  <option>Не в мережі</option>
                  <option>Не турбувати</option>
                </select>
              </div>
              <div className="flex flex-row justify-start items-center py-4 space-x-[8px]">
                <h1 className="text-[22px] text-white font-medium">Ваш настрій: </h1>
                <select className="appearance-none py-[4px] pl-[10px] pr-[14px] bg-color2 text-white rounded-[10px]">
                  <option>Не знаю</option>
                  <option>Позитивний</option>
                  <option>Злий</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}