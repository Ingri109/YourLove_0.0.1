'use client';
import { useState, useEffect } from "react";
import EyeOpen from '@/assets/icon/mdi--eye-outline.svg';
import EyeClose from '@/assets/icon/mdi--eye-off.svg';
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Reset() {
    const t = useTranslations('ResetPassword');

    const [data, setData] = useState<{
        password: string,
        confirmPassword: string
    }>({
        password: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [progress, setProgress] = useState('bg-color4_2 w-full');

    useEffect(() => {

        if (data.password.length === 0) {
            setProgress('bg-color4_2 w-full')
        } else if (data.password.length >= 1 && data.password.length < 6) {
            setProgress('bg-[#D13232] w-1/3')
        } else if (data.password.length >= 6 && data.password.length < 12) {
            setProgress('bg-[#F19829] w-2/3')
        } else if (data.password.length >= 12) {
            setProgress('bg-[#26C318] w-full')
        }


    }, [data.password, data.confirmPassword])

    const confitmPassword = async () => {
        const supabase = createClientComponentClient()
        const { password, confirmPassword } = data
        if (password !== confirmPassword) return alert('Ваші паролі невірні');
        typeof password === 'string'
        try {
            const { data: resetData, error } = await supabase.auth.updateUser({
                password: data.password
            })

            if (resetData) console.log(resetData)
            if (error) console.log("Your hava error")
            if (!error) redirect('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center p-6">
                <div className="flex flex-col items-center justify-starts bg-color3_3 rounded-lg shadow-md bg-opacity-40 backdrop-blur-[12px] px-6 py-3 md:px-7 md:py-8 sm:w-auto ">
                    <h1 className="text-white text-nowrap text-center font-bold text-[20px] sm:text-[28px]">{t('title')}</h1>
                    <h1 className=" text-color3_2 text-nowrap text-center font-light mt-[10px] text-[12px] sm:text-[14px]">{t('Content')}</h1>
                    <div className="w-full relative pt-[15px] ">
                            <input type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="from__field_reset bg-transparent w-full text-white outline-none border-0 py-[4px] text-[14px] sm:text-xl" placeholder="password" id="password" required></input>
                            <label className="from__label_reset text-[10px] top-[8px] absolute block text-color4_2 transition-[0.2s] sm:top-0 sm:text-[16px]">{t('Password')}</label>
                            {data.password === '' && data.confirmPassword === '' ? null :
                                <label className="absolute block left-[174px] bottom-[0px] w-[26px] h-[26px] sm:left-[242px] sm:bottom-[8px]" onClick={() => setShowPassword(!showPassword)}>
                                    <Image alt="checkPassword" className=" w-[18px] h-[18px] sm:w-[26px] sm:h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                                </label>
                            }

                            <div className={`${progress} h-[3px] rounded-[2px] transition-all duration-500`}></div>
                        </div>
                        <div className="w-full relative pt-[15px] mt-[20px]">
                            <input type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                className="from__field_reset bg-transparent w-full text-white outline-none border-0 py-[4px] text-[14px] sm:text-xl" placeholder="confirmPassword" id="confirmPassword" required></input>
                            <label className="from__label_reset text-[10px] top-[8px] absolute block text-color4_2 transition-[0.2s] sm:top-0 sm:text-[16px]">{t('ConfirmPassword')}</label>
                            {data.password === '' && data.confirmPassword === '' ? null :
                                <label className="absolute block left-[174px] bottom-[0px] w-[26px] h-[26px] sm:left-[242px] sm:bottom-[8px]" onClick={() => setShowPassword(!showPassword)}>
                                    <Image alt="checkPassword" className=" w-[18px] h-[18px] sm:w-[26px] sm:h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                                </label>
                            }
                            <div className="bg-color4_2 w-full h-[3px] rounded-[2px] transition-all duration-500"></div>
                        </div>
                        <button type="button" className="text-[18px] text-center font-semibold text-white bg-color4_1 py-0.5 px-4 rounded-md mt-[20px] sm:mt-[34px] sm:py-1.5 sm:px-10 sm:rounded-xl " onClick={confitmPassword}>Змінити пароль</button>


                </div>
            </div>
        </>
    )
}

