'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Login from "@/src/app/[locale]/Login";
import NotPartner from "@/components/app_components/NotPartner";
import { useTranslations } from 'next-intl';

interface UserInfo {
  WhatDo: string | null;
  mood: string | null;
  WhatWants: string | null;
  Wellness: string | null;
  PlansForEvening: string | null;
  id: string;
  id_partner: string;
}

export default function Events() {
  const t = useTranslations('events')
  const [mood, setMood] = useState<string>('');
  const [WhatDo, setWhatDo] = useState<string>('');
  const [WhatWants, setWhatWants] = useState<string>('');
  const [Wellness, setWellness] = useState<string>('');
  const [PlansForEvening, setPlansForEvening] = useState<string>('');
  const [data, setData] = useState<UserInfo | null>(null);
  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          const { data, error } = await supabase
            .from('users_info')
            .select('WhatDo, mood, WhatWants, Wellness, PlansForEvening, id, id_partner')
            .eq('id', session.user.id)
            .single();
          if (error) {
            console.log('Fetch error: ', error);
          } else {
            setWhatDo(data.WhatDo ?? 'none');
            setMood(data.mood ?? 'none');
            setWhatWants(data.WhatWants ?? 'none');
            setWellness(data.Wellness ?? 'none');
            setPlansForEvening(data.PlansForEvening ?? 'none');
            setData(data);
          }
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [supabase, setData, setWhatDo, setMood, setWhatWants, setWellness, setPlansForEvening]);

  const updateField = async (field: string, value: string) => {
    if (data?.id) {
      try {
        const { error } = await supabase
          .from('users_info')
          .update({ [field]: value })
          .eq('id', data.id);
        if (error) {
          console.log(`Update ${field} error: `, error);
        } else {
          switch (field) {
            case 'WhatDo':
              setWhatDo(value);
              break;
            case 'Mood':
              setMood(value);
              break;
            case 'WhatWants':
              setWhatWants(value);
              break;
            case 'Wellness':
              setWellness(value);
              break;
            case 'PlansForEvening':
              setPlansForEvening(value);
              break;
          }
        }
      } catch (error) {
        console.log(`Error updating ${field}: `, error);
      }
    }
  };

  
  if (!data) { return <Login/> }
  
  if(data.id_partner === null){
    return (
      <NotPartner/>
    )
  }

  return (
    <>
      <div className="flex justify-center items-stretch mb-[20px] justify-items-stretch md:mb-[10px] md:items-center">
        <div className="flex flex-col justify-start items-start w-full max-h-full px-[14px] py-[12px] pb-[20px] bg-color1_2 bg-opacity-10 backdrop-blur-md mt-[80px] mx-[4px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:pb-[40px] lg:px-[28px] lg:py-[12px] md:px-[12px] md:py-[10px] md:pb-[26px] md:w-11/12 md:mx-0 animate-scaleIn">
          <div className="flex flex-col items-center justify-center justify-items-stretch w-full">
            <h1 className="text-[32px] font-extrabold text-white">{t('EventsTitle')}</h1>
            <p className="text-[16px] font-medium text-white tracking-wide">{t('EventsContent')}</p>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[16px]">{t('WhatDo')}:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setWhatDo('none'), updateField('WhatDo', 'none') }} className={` p-1 rounded-md ${WhatDo === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>{t('Nothing')}</button>
            <button type="button" onClick={() => { setWhatDo('rest'), updateField('WhatDo', 'rest') }} className={` p-1 rounded-md ${WhatDo === 'rest' ? 'bg-pearl_dark shadow-[#DFE315] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#DFE315]'}`}>{t('Rest')}</button>
            <button type="button" onClick={() => { setWhatDo('sleeping'), updateField('WhatDo', 'sleeping') }} className={` p-1 rounded-md ${WhatDo === 'sleeping' ? 'bg-pearl_dark shadow-[#0C6DA3] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0C6DA3]'}`}>{t('Sleeping')}</button>
            <button type="button" onClick={() => { setWhatDo('working'), updateField('WhatDo', 'working') }} className={` p-1 rounded-md ${WhatDo === 'working' ? 'bg-pearl_dark shadow-[#AE97F0] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#AE97F0]'}`}>{t('Working')}</button>
            <button type="button" onClick={() => { setWhatDo('bored'), updateField('WhatDo', 'bored') }} className={` p-1 rounded-md ${WhatDo === 'bored' ? 'bg-pearl_dark shadow-[#B9ECF3] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B9ECF3]'}`}>{t('Bored')}</button>
            <button type="button" onClick={() => { setWhatDo('playing'), updateField('WhatDo', 'playing') }} className={` p-1 rounded-md ${WhatDo === 'playing' ? 'bg-pearl_dark shadow-[#F38562] shadow-[0_0_10px_8px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#F38562]'}`}>{t('Playing')}</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">{t('Mood')}:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setMood('none'), updateField('Mood','none') }} className={` p-1 rounded-md ${mood === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>{t('Unknow')}</button>
            <button type="button" onClick={() => { setMood('positive'), updateField('Mood','positive') }} className={` p-1 rounded-md ${mood === 'positive' ? 'bg-pearl_dark shadow-[#20E400] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#20E400]'}`}>{t('Positive')}</button>
            <button type="button" onClick={() => { setMood('neutral'), updateField('Mood','neutral') }} className={` p-1 rounded-md ${mood === 'neutral' ? 'bg-pearl_dark shadow-[#FFE03E] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#FFE03E]'}`}>{t('Neutral')}</button>
            <button type="button" onClick={() => { setMood('sad'), updateField('Mood','sad') }} className={` p-1 rounded-md ${mood === 'sad' ? 'bg-pearl_dark shadow-[#4C6EE8] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#4C6EE8]'}`}>{t('Sad')}</button>
            <button type="button" onClick={() => { setMood('insulted'), updateField('Mood','insulted') }} className={` p-1 rounded-md ${mood === 'insulted' ? 'bg-pearl_dark shadow-[#7F1888] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#7F1888]'}`}>{t('Insulted')}</button>
            <button type="button" onClick={() => { setMood('angry'), updateField('Mood','angry') }} className={` p-1 rounded-md ${mood === 'angry' ? 'bg-pearl_dark shadow-[#F51D1D] shadow-[0_0_14px_6px_rgba(0,0,0,0.3)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_14px_6px_rgba(0,0,0,0.3)] md:hover:shadow-[#F51D1D]'}`}>{t('Angry')}</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">{t('WhatWants')}:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setWhatWants('none'), updateField('WhatWants','none') }} className={` p-1 rounded-md ${WhatWants === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>{t('Nothing')}</button>
            <button type="button" onClick={() => { setWhatWants('present'), updateField('WhatWants','present') }} className={` p-1 rounded-md ${WhatWants === 'present' ? 'bg-pearl_dark shadow-[#B80202] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B80202]'}`}>{t('Present')}</button>
            <button type="button" onClick={() => { setWhatWants('attention'), updateField('WhatWants','attention') }} className={` p-1 rounded-md ${WhatWants === 'attention' ? 'bg-pearl_dark shadow-[#D97E13] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#D97E13]'}`}>{t('Attention')}</button>
            <button type="button" onClick={() => { setWhatWants('alone'), updateField('WhatWants','alone') }} className={` p-1 rounded-md ${WhatWants === 'alone' ? 'bg-pearl_dark shadow-[#0F57AC] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0F57AC]'}`}>{t('Alone')}</button>
            <button type="button" onClick={() => { setWhatWants('walk'), updateField('WhatWants','walk') }} className={` p-1 rounded-md ${WhatWants === 'walk' ? 'bg-pearl_dark shadow-[#E1BFFB] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#E1BFFB]'}`}>{t('Walk1')}</button>
            <button type="button" onClick={() => { setWhatWants('sleep'), updateField('WhatWants','sleep') }} className={` p-1 rounded-md ${WhatWants === 'sleep' ? 'bg-pearl_dark shadow-[#1E12A2] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#1E12A2]'}`}>{t('Sleep')}</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">{t('Wellness')}: </h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setWellness('none'), updateField('Wellness','none') }} className={` p-1 rounded-md ${Wellness === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>{t('Unknow')}</button>
            <button type="button" onClick={() => { setWellness('good'), updateField('Wellness','good') }} className={` p-1 rounded-md ${Wellness === 'good' ? 'bg-pearl_dark shadow-[#0AB225] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0AB225]'}`}>{t('Good')}</button>
            <button type="button" onClick={() => { setWellness('sick'), updateField('Wellness','sick') }} className={` p-1 rounded-md ${Wellness === 'sick' ? 'bg-pearl_dark shadow-[#0AD2A2] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#0AD2A2]'}`}>{t('Sick')}</button>
            <button type="button" onClick={() => { setWellness('bad'), updateField('Wellness','bad') }} className={` p-1 rounded-md ${Wellness === 'bad' ? 'bg-pearl_dark shadow-[#EA3843] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#EA3843]'}`}>{t('Bad')}</button>
            <button type="button" onClick={() => { setWellness('normal'), updateField('Wellness','normal') }} className={` p-1 rounded-md ${Wellness === 'normal' ? 'bg-pearl_dark shadow-[#cef933] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#cef933]'}`}>{t('Normal')}</button>
            <button type="button" onClick={() => { setWellness('lonely'), updateField('Wellness','lonely') }} className={` p-1 rounded-md ${Wellness === 'lonely' ? 'bg-pearl_dark shadow-[#3458D7] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#3458D7]'}`}>{t('Lonely')}</button>
          </div>
          <h1 className="text-[24px] font-bold text-white mt-[12px]">{t('PlansForEvening')}:</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 w-full justify-between items-center justify-items-stretch max-w-full mt-[10px] xl:gap-x-6 lg:gap-2 md:grid-cols-6 sm:grid-cols-3 sm:gap-2 sm:gap-x-2">
            <button type="button" onClick={() => { setPlansForEvening('none'), updateField('PlansForEvening','none') }} className={` p-1 rounded-md ${PlansForEvening === 'none' ? 'bg-pearl_dark shadow-[#B6B6B6] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B6B6B6]'}`}>{t('None')}</button>
            <button type="button" onClick={() => { setPlansForEvening('timeTogether'), updateField('PlansForEvening','timeTogether') }} className={` p-1 rounded-md ${PlansForEvening === 'timeTogether' ? 'bg-pearl_dark shadow-[#00ECFB] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#00ECFB]'}`}>{t('TimeTogether')}</button>
            <button type="button" onClick={() => { setPlansForEvening('play'), updateField('PlansForEvening','play') }} className={` p-1 rounded-md ${PlansForEvening === 'play' ? 'bg-pearl_dark shadow-[#FF852D] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#FF852D]'}`}>{t('Play')}</button>
            <button type="button" onClick={() => { setPlansForEvening('walk'), updateField('PlansForEvening','walk') }} className={` p-1 rounded-md ${PlansForEvening === 'walk' ? 'bg-pearl_dark shadow-[#F9FD24] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#F9FD24]'}`}>{t('Walk2')}</button>
            <button type="button" onClick={() => { setPlansForEvening('film'), updateField('PlansForEvening','film') }} className={` p-1 rounded-md ${PlansForEvening === 'film' ? 'bg-pearl_dark shadow-[#B159F7] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#B159F7]'}`}>{t('Film')}</button>
            <button type="button" onClick={() => { setPlansForEvening('romance'), updateField('PlansForEvening','romance') }} className={` p-1 rounded-md ${PlansForEvening === 'romance' ? 'bg-pearl_dark shadow-[#FF5454] shadow-[0_0_16px_6px_rgba(0,0,0,0.4)]' : 'bg-pearl shadow-none transition-all duration-200 ease-in delay-100 hover:scale-110 hover:shadow-none md:hover:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:hover:shadow-[#FF5454]'}`}>{t('Romance')}</button>
          </div>
        </div>
      </div>

    </>
  );
}