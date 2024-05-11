'use client';

import Human from "@/components/Human";

export default function YourLove({ }) {

  return (
    <>
      <div className="flex justify-center items-center justify-items-stretch">
        <div className=" flex flex-col justify-between items-center max-h-full w-4/5 px-[0px] py-[12px] bg-color1_2 bg-opacity-10 backdrop-blur-md mt-[80px] mx-[20px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:px-[28px] lg:py-[12px] lg:flex-row lg:w-auto md:px-[12px] md:py-[18px] md:mx-0 animate-scaleIn">
          <div className="flex flex-col justify-start justify-items-stretch items-start  bg-color1_1 rounded-[14px] w-4/5 h-[548px] shadow-[0_5px_10px_3px_rgba(0,0,0,0.5)] lg:w-[460px] lg:h-[548px] md:w-4/5">
            <div className='flex flex-row justify-start items-center w-full ml-[28px] mt-[10px]'>
              <div className='bg-online h-[18px] w-[18px] rounded-full shadow-[0_0_8px_2px_rgba(0,0,0,0.2)] shadow-online'></div>
              <h1 className='text-white text-[32px] font-bold tracking-wider ml-[14px]'>Your LOVE</h1>
            </div>
            <h2 className='text-[18px] font-medium text-white ml-[20px] mt-[20px]'>Настрій твого партнера: </h2>
            <h2 className='text-[18px] font-medium text-white ml-[20px] mt-[8px]'>Що робить: </h2>
            <h2 className='text-[18px] font-medium text-white ml-[20px] mt-[8px]'>Остання дія: Полілувати в губи</h2>
          </div>
          <Human />
        </div>
      </div>
    </>
  )

}