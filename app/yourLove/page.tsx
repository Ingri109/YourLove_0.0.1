'use client';

import Human from "@/components/Human";
import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Login from "@/app/Login";
import Link from "next/link";

export default function YourLove() {
  const supabase = createClientComponentClient();
  const [data, setData] = useState<any>(null);
  const [IDUser, setIDUser] = useState<any>(null);
  const [IDPartner, setIDPartner] = useState<any>(null);
  const [WhatDo, setWhatDo] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [WhatWants, setWhatWants] = useState<string>('');
  const [Wellness, setWellness] = useState<string>('');
  const [PlansForEvening, setPlansForEvening] = useState<string>('');
  const [LastAction, setLastAction] = useState<string>('');
  const [LastActionYourPartner, setLastActionYourPartner] = useState<string>('');

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

  const PageWhatWants: { [key: string]: string } = {
    'none': 'Нічого',
    'present': 'Подарунок',
    'attention': 'Уваги',
    'alone': 'Усамітнтися',
    'walk': 'Гуляти',
    'sleep': 'Спатиии'
  };

  const PageWellness: { [key: string]: string } = {
    'none': 'Не знаю',
    'good': 'Добре',
    'sick': 'Хворію',
    'bad': 'Пагане',
    'normal': 'Номрмальне',
    'lonely': 'Самотньо'
  };

  const PagePlansForEvening: { [key: string]: string } = {
    'none': 'Немає',
    'timeTogether': 'Час разом',
    'play': 'Грати',
    'walk': 'Прогулянка',
    'film': 'Фільмик',
    'romance': 'Романтика'
  };

  const fetchData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data: data_user, error: userError } = await supabase.from('users_info').select('id_partner, id, LastAction').eq('id', session.user.id).single();
        setIDUser(data_user?.id)
        setIDPartner(data_user?.id_partner)

        if (data_user?.LastAction != null) {
          setLastActionYourPartner(data_user.LastAction)
        } else {
          setLastActionYourPartner('Пусто')
        }
        if (userError) {
          console.log('Fetch error: ', userError);
        }
        if (data_user?.id_partner) {
          const { data: data_partner, error: partnerError } = await supabase.from('users_info').select('WhatDo, mood, LastAction, WhatWants, Wellness, PlansForEvening, id').eq('id', data_user.id_partner).single();

          if (partnerError) {
            console.log('Fetch error: ', partnerError);
          } else {
            setData(data_partner);
          }
          if (data_partner?.LastAction != null) {
            setLastAction(data_partner.LastAction)
          } else {
            setLastAction('Пусто')
          }
        } else {
          console.log("ID_Partner == null")
        }
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, [supabase]);


  const handleUPDATES = useCallback((payload: any) => {
    console.log(payload.new.LastAction)
    const newWhatDo = payload.new.WhatDo || 'none';
    setWhatDo(PageWhatDo[newWhatDo]);
    const newMood = payload.new.mood || 'none';
    setMood(PageMood[newMood]);
    const newWhatWants = payload.new.WhatWants || 'none';
    setWhatWants(PageWhatWants[newWhatWants]);
    const newWellness = payload.new.Wellness || 'none';
    setWellness(PageWellness[newWellness]);
    const newPlansForEvening = payload.new.PlansForEvening || 'none';
    setPlansForEvening(PagePlansForEvening[newPlansForEvening]);
    const newAction = payload.new.LastAction;
    setLastAction(newAction);
  }, []);

  const handleUPDATESPartner = useCallback((payload: any) => {
    const newAction = payload.new.LastAction;
    setLastActionYourPartner(newAction);
  }, []);



  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data?.id) {
      //WHAT DO
      if (data.WhatDo === null) {
        setWhatDo(PageWhatDo['none']);
      } else {
        setWhatDo(PageWhatDo[data.WhatDo]);
      }

      //MOOD
      if (data.mood === null) {
        setMood(PageMood['none']);
      } else {
        setMood(PageMood[data.mood]);
      }

      //WHAT WHATS
      if (data.WhatWants === null) {
        setWhatWants(PageWhatWants['none']);
      } else {
        setWhatWants(PageWhatWants[data.WhatWants]);
      }

      //WELLNESS
      if (data.Wellness === null) {
        setWellness(PageWellness['none']);
      } else {
        setWellness(PageWellness[data.Wellness]);
      }

      //PLANS FOR EVENING
      if (data.PlansForEvening === null) {
        setPlansForEvening(PagePlansForEvening['none'])
      } else {
        setPlansForEvening(PagePlansForEvening[data.PlansForEvening]);
      }

      const channel0 = supabase.channel('todos_user_0');
      const channel1 = supabase.channel('todos_user_1');

      channel0.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users_info', filter: `id=eq.${data.id}` }, handleUPDATES)
        .subscribe();

      channel1.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users_info', filter: `id=eq.${IDUser}` }, handleUPDATESPartner)
        .subscribe();
      return () => {
        supabase.removeChannel(channel0);
        supabase.removeChannel(channel1);
      };

    }
  }, [data?.id, supabase, handleUPDATES, handleUPDATESPartner]);

  if (!data && !IDUser) {
    return <Login />;
  }
  if (IDPartner === null) {
    return (
      <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-11/12 max-h-full px-[2px] py-[12px] bg-color1_2 bg-opacity-10 backdrop-blur-md rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] xl:w-9/12 lg:w-10/12 lg:px-[2px] lg:py-[12px] md:w-11/12 md:px-[2px] md:py-[18px] sm:w-4/6 animate-scaleIn">
          <h1 className="text-[24px] text-white font-bold text-center text-balance w-full md:text-[32px]">У вас ще немає партнера дабавте його і тільки тоід зможете зайти на цю сторінку</h1>
          <Link href={'/account'} className=" bg-color4_1 text-white text-[12px] font-semibold mt-[10px] px-[28px] py-1.5 rounded-md hover:bg-color4 focus:bg-color4_3 md:mt-[28px] md:text-[18px] md:rounded-xl">Перейти на сторінку Акаунта</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-stretch md:items-center">
      <div className="flex flex-col justify-between items-center w-11/12 max-h-full px-[14px] py-[12px] mb-[20px] mt-[80px] bg-color1_2 bg-opacity-10 backdrop-blur-md rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] xl:w-8/12 lg:w-10/12 lg:px-[28px] lg:py-[12px] md:flex-row md:w-11/12 md:px-[12px] md:py-[18px] sm:w-4/6 animate-scaleIn">
        <div className="flex flex-col justify-start items-start w-full bg-color1_1 rounded-[14px] h-auto pb-[28px] shadow-[0_5px_10px_3px_rgba(0,0,0,0.5)] lg:w-[460px] md:h-[548px] md:pb-[0px] md:w-1/2">
          <div className='flex flex-row justify-center items-center w-full ml-[0px] mt-[10px] sm:ml-[28px] sm:justify-start'>
            <div className='bg-online h-[16px] w-[16px] rounded-full shadow-[0_0_8px_2px_rgba(0,0,0,0.2)] shadow-online md:h-[18px] md:w-[18px]'></div>
            <h1 className='text-white text-[28px] font-bold tracking-wider ml-[14px] md:text-[32px]'>Your LOVE</h1>
          </div>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Що робить: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{WhatDo}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Настрій твого партнера: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{mood}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Чого хоче партнер: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{WhatWants}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Самопочуття: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{Wellness}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Плани на вечір: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{PlansForEvening}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Остання дія: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{LastActionYourPartner}</mark></h2>
          <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Ваша остання дія: <mark className="bg-transparent text-[18px] text-white font-bold md:text-[20px]">{LastAction} </mark></h2>

        </div>
        <Human />
      </div>
    </div>
  );
}
