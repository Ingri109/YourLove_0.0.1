'use client';

import Human from "@/components/Human";
import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function YourLove() {
  const supabase = createClientComponentClient();
  const [data, setData] = useState<any>(null);
  const [WhatDo, setWhatDo] = useState<string>('');
  const [mood, setMood] = useState<string>('');

  const PageWhatDo: { [key: string]: string } = {
    'none': 'Нічого',
    'rest': 'Відпочиває',
    'sleeping': 'Спить',
    'working': 'Працює',
    'bored': 'Нудьгує',
    'playing': 'Грає'
  };

  const PageMood: { [key: string]: string } = {
    'none': 'Не знаю',
    'positive': 'Позитивний',
    'neutral': 'Нейтральний',
    'sad': 'Сумний',
    'insulted': 'Ображений',
    'angry': 'Злий'
  };

  const fetchData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data: data_user, error: userError } = await supabase.from('users_info').select('id_partner').eq('id', session.user.id).single();
        if (userError) {
          console.error('Fetch error: ', userError);
        } else {
          const { data: data_partner, error: partnerError } = await supabase.from('users_info').select('WhatDo, mood, id').eq('id', data_user.id_partner).single();
          if (partnerError) {
            console.error('Fetch error: ', partnerError);
          } else {
            setData(data_partner);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [supabase]);



  const handleUPDATES = useCallback((payload: any) => {
    const newWhatDo = payload.new.WhatDo || 'none';
    setWhatDo(PageWhatDo[newWhatDo]);
    const newMood = payload.new.mood || 'none';
    setMood(PageMood[newMood]);
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data?.id) {
      if (data.WhatDo !== null) {
        setWhatDo(PageWhatDo[data.WhatDo]);
      } else {
        setWhatDo(PageWhatDo['none']);
      }

      if (data.mood !== null) {
        setMood(PageMood[data.mood]);
      } else {
        setMood(PageMood['none']);
      }

      const channel = supabase.channel('todos')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users_info', filter: `id=eq.${data.id}` }, handleUPDATES)
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [data?.id, supabase, handleUPDATES]);


  if (!data) {
    return <div>Login1...</div>;
  }
  

  return (
    <div className="flex justify-center items-stretch md:items-center">
      <div className="flex flex-col justify-between items-center w-full max-h-full px-[14px] py-[12px] bg-color1_2 bg-opacity-10 backdrop-blur-md mt-[80px] mx-[4px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:px-[28px] lg:py-[12px] lg:flex-row md:px-[12px] md:py-[18px] md:w-4/6 md:mx-0 animate-scaleIn">
        <div className="flex flex-col justify-start items-start w-full bg-color1_1 rounded-[14px] h-[548px] shadow-[0_5px_10px_3px_rgba(0,0,0,0.5)] lg:w-[460px] lg:h-[548px] md:w-full">
          <div className='flex flex-row justify-center items-center w-full ml-[0px] mt-[10px] sm:ml-[28px] sm:justify-start'>
            <div className='bg-online h-[16px] w-[16px] rounded-full shadow-[0_0_8px_2px_rgba(0,0,0,0.2)] shadow-online md:h-[18px] md:w-[18px]'></div>
            <h1 className='text-white text-[28px] font-bold tracking-wider ml-[14px] md:text-[32px]'>Your LOVE</h1>
          </div>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Що робить: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{WhatDo}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Настрій твого партнера: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{mood}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Остання дія: Поцілувати в губи</h2>
        </div>
        <Human />
      </div>
    </div>
  );
}
