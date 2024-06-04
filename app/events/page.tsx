'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Login from "@/app/Login";


export default function Events() {
  const [mood, setMood] = useState<string>('')
  const [WhatDo, setWhatDo] = useState<string>('');
  const [WhatWants, setWhatWants] = useState<string>('');
  const [Wellness, setWellness] = useState<string>('');
  const [PlansForEvening, setPlansForEvening] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          const { data, error } = await supabase.from('users_info').select('WhatDo, mood, WhatWants, Wellness, PlansForEvening, id').eq('id', session.user.id).single();
          if (error) {
            console.log('Fetch error: ', error);
          } else {

            //WHAT DO
            if (data.WhatDo === null) {
              setWhatDo('none');
            } else {
              setWhatDo(data.WhatDo);
            }

            //MOOD
            if (data.mood === null) {
              setMood('none');
            } else {
              setMood(data.mood);
            }

            //WHAT WHATS
            if (data.WhatWants === null) {
              setWhatWants('none');
            } else {
              setWhatWants(data.WhatWants);
            }

            //WELLNESS
            if (data.Wellness === null) {
              setWellness('none');
            } else {
              setWellness(data.Wellness);
            }

            //PLANS FOR EVENING
            if (data.PlansForEvening === null) {
              setPlansForEvening('none')
            } else {
              setPlansForEvening(data.PlansForEvening);
            }

            setData(data.id);
          }
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [supabase, setData, setWhatDo, setMood, setWhatWants, setWellness, setPlansForEvening]);

  const updateWhatDo = async (event: string) => {
    if (data) {
      try {
        const { error } = await supabase.from('users_info').update({ WhatDo: event }).eq('id', data);
        if (error) {
          console.log('Update error: ', error);
        } else {
          setWhatDo(event);
        }
      } catch (error) {
        console.log('Error updating data: ', error);
      }
    }
  }

  const updateMood = async (event: string) => {
    if (data) {
      try {
        const { error } = await supabase.from('users_info').update({ mood: event }).eq('id', data);
        if (error) {
          console.log('Update error: ', error);
        } else {
          setMood(event);
        }
      } catch (error) {
        console.log('Error updating data: ', error);
      }
    }
  }

  const updateWhatWants = async (event: string) => {
    if (data) {
      try {
        const { error } = await supabase.from('users_info').update({ WhatWants: event }).eq('id', data);
        if (error) {
          console.log('Update error: ', error);
        } else {
          setWhatWants(event);
        }
      } catch (error) {
        console.log('Error updating data: ', error);
      }
    }
  }

  const updateWellness = async (event: string) => {
    if (data) {
      try {
        const { error } = await supabase.from('users_info').update({ Wellness: event }).eq('id', data);
        if (error) {
          console.log('Update error: ', error);
        } else {
          setWellness(event);
        }
      } catch (error) {
        console.log('Error updating data: ', error);
      }
    }
  }

  const updatePlansForEvening = async (event: string) => {
    if (data) {
      try {
        const { error } = await supabase.from('users_info').update({ PlansForEvening: event }).eq('id', data);
        if (error) {
          console.log('Update error: ', error);
        } else {
          setPlansForEvening(event);
        }
      } catch (error) {
        console.log('Error updating data: ', error);
      }
    }
  }

  if (!data) { return <Login/> }

  return (
    <>
      <div className="flex justify-center items-stretch  justify-items-stretch md:items-center">
        <div className="flex flex-col justify-start items-start w-full max-h-full px-[14px] py-[12px] pb-[20px] bg-color1_2 bg-opacity-10 backdrop-blur-md mt-[80px] mx-[4px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:pb-[40px] lg:px-[28px] lg:py-[12px] md:px-[12px] md:py-[10px] md:pb-[26px] md:w-11/12 md:mx-0 animate-scaleIn">
          <div className="flex flex-col items-center justify-center justify-items-stretch w-full">
            <h1 className="text-[32px] font-extrabold text-white">Події</h1>
            <p className="text-[16px] font-medium text-white tracking-wide">Тут ви можете вибрати події, щоб ваший портнер знав що ви хочете чи яке самопочуття</p>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[16px]">Що робиш:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setWhatDo('none'), updateWhatDo('none') }} className={` p-1 rounded-md ${WhatDo === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>Нічого</button>
            <button type="button" onClick={() => { setWhatDo('rest'), updateWhatDo('rest') }} className={` p-1 rounded-md ${WhatDo === 'rest' ? 'bg-pearl_dark shadow-[#DFE315] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#DFE315]'}`}>Відпочиваю</button>
            <button type="button" onClick={() => { setWhatDo('sleeping'), updateWhatDo('sleeping') }} className={` p-1 rounded-md ${WhatDo === 'sleeping' ? 'bg-pearl_dark shadow-[#0C6DA3] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0C6DA3]'}`}>Сплю</button>
            <button type="button" onClick={() => { setWhatDo('working'), updateWhatDo('working') }} className={` p-1 rounded-md ${WhatDo === 'working' ? 'bg-pearl_dark shadow-[#AE97F0] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#AE97F0]'}`}>Працюю</button>
            <button type="button" onClick={() => { setWhatDo('bored'), updateWhatDo('bored') }} className={` p-1 rounded-md ${WhatDo === 'bored' ? 'bg-pearl_dark shadow-[#B9ECF3] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B9ECF3]'}`}>Нудьгую</button>
            <button type="button" onClick={() => { setWhatDo('playing'), updateWhatDo('playing') }} className={` p-1 rounded-md ${WhatDo === 'playing' ? 'bg-pearl_dark shadow-[#F38562] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#F38562]'}`}>Граю</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">Який настрій:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setMood('none'), updateMood('none') }} className={` p-1 rounded-md ${mood === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>Не знаю</button>
            <button type="button" onClick={() => { setMood('positive'), updateMood('positive') }} className={` p-1 rounded-md ${mood === 'positive' ? 'bg-pearl_dark shadow-[#20E400] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#20E400]'}`}>Позитивний</button>
            <button type="button" onClick={() => { setMood('neutral'), updateMood('neutral') }} className={` p-1 rounded-md ${mood === 'neutral' ? 'bg-pearl_dark shadow-[#FFE03E] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#FFE03E]'}`}>Нейтральний</button>
            <button type="button" onClick={() => { setMood('sad'), updateMood('sad') }} className={` p-1 rounded-md ${mood === 'sad' ? 'bg-pearl_dark shadow-[#4C6EE8] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#4C6EE8]'}`}>Сумний</button>
            <button type="button" onClick={() => { setMood('insulted'), updateMood('insulted') }} className={` p-1 rounded-md ${mood === 'insulted' ? 'bg-pearl_dark shadow-[#7F1888] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#7F1888]'}`}>Ображений</button>
            <button type="button" onClick={() => { setMood('angry'), updateMood('angry') }} className={` p-1 rounded-md ${mood === 'angry' ? 'bg-pearl_dark shadow-[#F51D1D] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#F51D1D]'}`}>Злий</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">Чого хочеш:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setWhatWants('none'), updateWhatWants('none') }} className={` p-1 rounded-md ${WhatWants === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>Нічого</button>
            <button type="button" onClick={() => { setWhatWants('present'), updateWhatWants('present') }} className={` p-1 rounded-md ${WhatWants === 'present' ? 'bg-pearl_dark shadow-[#B80202] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B80202]'}`}>Подарунок</button>
            <button type="button" onClick={() => { setWhatWants('attention'), updateWhatWants('attention') }} className={` p-1 rounded-md ${WhatWants === 'attention' ? 'bg-pearl_dark shadow-[#D97E13] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#D97E13]'}`}>Уваги</button>
            <button type="button" onClick={() => { setWhatWants('alone'), updateWhatWants('alone') }} className={` p-1 rounded-md ${WhatWants === 'alone' ? 'bg-pearl_dark shadow-[#0F57AC] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0F57AC]'}`}>Усамітнитися</button>
            <button type="button" onClick={() => { setWhatWants('walk'), updateWhatWants('walk') }} className={` p-1 rounded-md ${WhatWants === 'walk' ? 'bg-pearl_dark shadow-[#E1BFFB] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#E1BFFB]'}`}>Гуляти</button>
            <button type="button" onClick={() => { setWhatWants('sleep'), updateWhatWants('sleep') }} className={` p-1 rounded-md ${WhatWants === 'sleep' ? 'bg-pearl_dark shadow-[#1E12A2] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#1E12A2]'}`}>Спатиии</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">Самопочуття: </h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setWellness('none'), updateWellness('none') }} className={` p-1 rounded-md ${Wellness === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>Не знаю</button>
            <button type="button" onClick={() => { setWellness('good'), updateWellness('good') }} className={` p-1 rounded-md ${Wellness === 'good' ? 'bg-pearl_dark shadow-[#0AB225] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0AB225]'}`}>Добре</button>
            <button type="button" onClick={() => { setWellness('sick'), updateWellness('sick') }} className={` p-1 rounded-md ${Wellness === 'sick' ? 'bg-pearl_dark shadow-[#0AD2A2] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0AD2A2]'}`}>Хворію</button>
            <button type="button" onClick={() => { setWellness('bad'), updateWellness('bad') }} className={` p-1 rounded-md ${Wellness === 'bad' ? 'bg-pearl_dark shadow-[#EA3843] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#EA3843]'}`}>Погане</button>
            <button type="button" onClick={() => { setWellness('normal'), updateWellness('normal') }} className={` p-1 rounded-md ${Wellness === 'normal' ? 'bg-pearl_dark shadow-[#cef933] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#cef933]'}`}>Нормальне</button>
            <button type="button" onClick={() => { setWellness('lonely'), updateWellness('lonely') }} className={` p-1 rounded-md ${Wellness === 'lonely' ? 'bg-pearl_dark shadow-[#3458D7] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#3458D7]'}`}>Сумотньо</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">Плани на вечір:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setPlansForEvening('none'), updatePlansForEvening('none') }} className={` p-1 rounded-md ${PlansForEvening === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>Немає</button>
            <button type="button" onClick={() => { setPlansForEvening('timeTogether'), updatePlansForEvening('timeTogether') }} className={` p-1 rounded-md ${PlansForEvening === 'timeTogether' ? 'bg-pearl_dark shadow-[#00ECFB] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#00ECFB]'}`}>Час разом</button>
            <button type="button" onClick={() => { setPlansForEvening('play'), updatePlansForEvening('play') }} className={` p-1 rounded-md ${PlansForEvening === 'play' ? 'bg-pearl_dark shadow-[#FF852D] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#FF852D]'}`}>Грати</button>
            <button type="button" onClick={() => { setPlansForEvening('walk'), updatePlansForEvening('walk') }} className={` p-1 rounded-md ${PlansForEvening === 'walk' ? 'bg-pearl_dark shadow-[#F9FD24] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#F9FD24]'}`}>Прогулянка</button>
            <button type="button" onClick={() => { setPlansForEvening('film'), updatePlansForEvening('film') }} className={` p-1 rounded-md ${PlansForEvening === 'film' ? 'bg-pearl_dark shadow-[#B159F7] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B159F7]'}`}>Фільмик</button>
            <button type="button" onClick={() => { setPlansForEvening('romance'), updatePlansForEvening('romance') }} className={` p-1 rounded-md ${PlansForEvening === 'romance' ? 'bg-pearl_dark shadow-[#FF5454] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#FF5454]'}`}>Романтика</button>
          </div>
        </div>
      </div>

    </>
  );
}