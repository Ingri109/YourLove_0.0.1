'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default function Events() {
  const [WhatDo, setWhatDo] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          const { data, error } = await supabase.from('users_info').select('WhatDo, id').eq('id', session.user.id).single();
          if (error) {
            console.error('Fetch error: ', error);
          } else {
            setWhatDo(data.WhatDo);
            setData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const updateWhatDo = async (event: string) => {
    debugger
    console.log(data)
    if (data && data.id) {
      try {
        const { error } = await supabase.from('users_info').update({ WhatDo: event }).eq('id', data.id);
        if (error) {
          console.error('Update error: ', error);
        } else {
          setWhatDo(event);
        }
      } catch (error) {
        console.error('Error updating data: ', error);
      }
    }
  }



  if (!data) { return <div>Login1...</div> }

  console.log(WhatDo);

  return (
    <>
      <div className="flex justify-center items-stretch  justify-items-stretch md:items-center">
        <div className="flex flex-col justify-start items-start w-full max-h-full px-[14px] py-[12px] bg-color1_2 bg-opacity-10 backdrop-blur-md mt-[80px] mx-[4px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:5/6 lg:px-[28px] lg:py-[12px] md:px-[12px] md:py-[18px] md:w-5/6 md:mx-0 animate-scaleIn">
          <h1 className="text-[24px] font-bold text-white ">Що робиш:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-3 xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setWhatDo('none'), updateWhatDo('none') }} className={` p-1 rounded-md ${WhatDo === 'none' ? 'bg-pearl_dark shadow-color1_1 shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_10px_8px_rgba(0,0,0,0.4)] md:hover:shadow-color1_1'}`}>Нічого</button>
            <button type="button" onClick={() => { setWhatDo('rest'), updateWhatDo('rest') }} className={` p-1 rounded-md ${WhatDo === 'rest' ? 'bg-pearl_dark shadow-color1_1 shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_10px_8px_rgba(0,0,0,0.4)] md:hover:shadow-color1_1'}`}>Відпочиваю</button>
            <button type="button" onClick={() => { setWhatDo('sleeping'), updateWhatDo('sleeping') }} className={` p-1 rounded-md ${WhatDo === 'sleeping' ? 'bg-pearl_dark shadow-color1_1 shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_10px_8px_rgba(0,0,0,0.4)] md:hover:shadow-color1_1'}`}>Сплю</button>
            <button type="button" onClick={() => { setWhatDo('working'), updateWhatDo('working') }} className={` p-1 rounded-md ${WhatDo === 'working' ? 'bg-pearl_dark shadow-color1_1 shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_10px_8px_rgba(0,0,0,0.4)] md:hover:shadow-color1_1'}`}>Працюю</button>
            <button type="button" onClick={() => { setWhatDo('bored'), updateWhatDo('bored') }} className={` p-1 rounded-md ${WhatDo === 'bored' ? 'bg-pearl_dark shadow-color1_1 shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_10px_8px_rgba(0,0,0,0.4)] md:hover:shadow-color1_1'}`}>Нудьгую</button>
            <button type="button" onClick={() => { setWhatDo('playing'), updateWhatDo('playing') }} className={` p-1 rounded-md ${WhatDo === 'playing' ? 'bg-pearl_dark shadow-color1_1 shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_10px_8px_rgba(0,0,0,0.4)] md:hover:shadow-color1_1'}`}>Граю</button>
          </div>
        </div>
      </div>

    </>
  );
}