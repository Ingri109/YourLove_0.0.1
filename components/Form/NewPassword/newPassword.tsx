import { useState } from "react";

interface NewPasswordProps {
    ResetPassword: () => void;
    checkSend: boolean;
}

export default function NewPassword({ ResetPassword, checkSend }: NewPasswordProps) {
    return (
        <>
            <form className="flex flex-col justify-center items-center w-11/12 py-4 px-6  bg-color3 bg-opacity-50 backdrop-blur-2xl rounded-[16px] animate-scaleIn lg:w-auto md:w-10/12 md:py-6 md:px-10">
                <h1 className="text-center text-color4_2 text-[24px] font-extrabold tracking-normal lg:text-[30px] md:text-[28px]">Змінити пароль</h1>
                <h2 className="w-11/12 text-white text-center leading-relaxed tracking-wide text-[12px] font-semibold lg:w-[538px] lg:text-[16px] md:w-5/6 md:text-[14px]">Якщо ви справді хочете змінити пароль, тоді натисніть на конпку Надіслати повідомлення, після чого на вашу електроу скриньку буде надіслано повідомлення на зміну пароля</h2>
                {checkSend && <p className="text-color1_2 text-[14px] font-light mt-3 ">Повідомлення було успішно відправленне</p>}
                <button type="button" onClick={ResetPassword} className={`bg-color1 bg-opacity-80 backdrop-blur-md text-white text-[16px] font-semibold px-[20px] py-[4px] mt-3 rounded-[12px] transition-all duration-200 delay-150 ease-out shadow-[0_0px_24px_2px_rgba(0,0,0,0.20)] shadow-color2_2  hover:bg-color1 hover:bg-opacity-60 hover:backdrop-blur-m hover:shadow-[0px_0px_40px_4px_rgba(0,0,0,0.30)] hover:shadow-color2_2 md:text-[18px] md:px-[30px] md:py-[6px] md:mt-4 md:rounded-[14px]`}>Надіслати повідомлення</button>
                
            </form>
        </>
    )
}