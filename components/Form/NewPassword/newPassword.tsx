import { useState } from "react";

interface NewPasswordProps {
    ResetPassworld: () => void;
    checkSend: boolean;
}

export default function NewPassword({ ResetPassworld, checkSend }: NewPasswordProps) {
    return (
        <>
            <form className="flex flex-col justify-center items-center bg-color3 bg-opacity-50 backdrop-blur-2xl rounded-[16px] py-6 px-10 animate-scaleIn">
                <h1 className="text-center text-color4_2 text-[30px] font-extrabold tracking-normal">Змінити пароль</h1>
                <h2 className="text-white text-center leading-relaxed tracking-wide text-[16px] font-semibold w-[538px]">Якщо ви справді хочете змінити пароль, тоді натисніть на конпку Надіслати повідомлення, після чого на вашу електроу скриньку буде надіслано повідомлення на зміну пароля</h2>
                {checkSend && <p className="text-color1_2 text-[14px] font-light mt-3 ">Повідомлення було успішно відправленне</p>}
                <button type="button" onClick={ResetPassworld} className={`bg-color1 bg-opacity-80 backdrop-blur-md text-white text-[18px] font-semibold px-[30px] py-[6px] mt-3 rounded-[14px] transition-all duration-200 delay-150 ease-out shadow-[0_0px_24px_2px_rgba(0,0,0,0.20)] shadow-color2_2  hover:bg-color1 hover:bg-opacity-60 hover:backdrop-blur-m hover:shadow-[0px_0px_40px_4px_rgba(0,0,0,0.30)] hover:shadow-color2_2`}>Надіслати повідомлення</button>
                
            </form>
        </>
    )
}