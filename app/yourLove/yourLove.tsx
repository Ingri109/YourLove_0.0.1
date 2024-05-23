'use client';

import Human from "@/components/Human";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; 

export default function YourLove({Events}: any) {
  const supabase = createClientComponentClient();
  console.log(Events.id)
  const handleUPDATES = (payload: any) => {
    console.log('Change received!', payload)
  }
  supabase
  .channel('todos')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users_info', filter: `id=eq.${Events.id}` }, handleUPDATES)
  .subscribe()

  
  return (
    <>
      <div className="flex justify-center items-stretch  justify-items-stretch md:items-center">
        <div className=" flex flex-col justify-between items-center w-full max-h-full px-[14px] py-[12px] bg-color1_2 bg-opacity-10 backdrop-blur-md mt-[80px] mx-[4px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:px-[28px] lg:py-[12px] lg:flex-row md:px-[12px] md:py-[18px] md:w-4/6 md:mx-0 animate-scaleIn">
          <div className="flex flex-col justify-start justify-items-stretch items-start w-full  bg-color1_1 rounded-[14px]  h-[548px] shadow-[0_5px_10px_3px_rgba(0,0,0,0.5)] lg:w-[460px] lg:h-[548px] md:px-[0px] md:w-full">
            <div className='flex flex-row justify-center items-center w-full ml-[0px] mt-[10px] sm:ml-[28px] sm:justify-start'>
              <div className='bg-online h-[16px] w-[16px] rounded-full shadow-[0_0_8px_2px_rgba(0,0,0,0.2)] shadow-online md:h-[18px] md:w-[18px]'></div>
              <h1 className='text-white text-[28px] font-bold tracking-wider ml-[14px] md:text-[32px]'>Your LOVE</h1>
            </div>
            <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[14px] md:mt-[20px] md:text-[18px]'>Настрій твого партнера: </h2>
            <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Остання дія: Полілувати в губи</h2>
            <h2 className='text-[16px] font-medium text-white ml-[20px] mr-[12px] mt-[8px] md:text-[18px]'>Що робить: {Events.WhatDo}</h2>
          </div>
          <Human />
        </div>
      </div>
    </>
  )

}