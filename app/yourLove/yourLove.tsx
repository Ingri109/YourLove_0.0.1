'use client';

import Human from "@/components/Human";

export default function YourLove ({}) {

    return(
        <>
      <div className=" flex flex-col items-center">
        <div className=" flex flex-col w-[360px] h-[900px] bg-color1_2 bg-opacity-10 backdrop-blur-md mt-[80px] rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] lg:w-[1160px] lg:h-[620px] sm:m-[60px] animate-scaleIn">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-start items-start w-[310px] h-[790px] bg-color4_1 rounded-[14px] mt-[25px] ml-[30px] shadow-[0_5px_10px_3px_rgba(0,0,0,0.5)] lg:w-[460px] lg:h-[548px]">
              <div className='flex flex-row justify-start items-center space-x-4 mt-[10px] ml-[60px]'>
                <div className='bg-online h-[18px] w-[18px] rounded-full border-[1px] border-black'></div>
                <h1 className='text-white text-[30px] font-bold'>Твоє Кохання</h1>
              </div>
              <h2 className='text-[18px] font-medium text-white ml-[20px] mt-[28px]'>Настрій твого партнера: </h2>
              <h2 className='text-[18px] font-medium text-white ml-[20px] mt-[8px]'>Що робить: </h2>
            </div>
            <Human />
          </div>
        </div>
      </div>
    </>
    )
    
}