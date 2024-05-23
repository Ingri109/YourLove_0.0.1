'use client';
import { useState, useEffect } from "react";
import EyeOpen from '@/assets/icon/mdi--eye-outline.svg';
import EyeClose from '@/assets/icon/mdi--eye-off.svg';
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from 'next/navigation';

export default function Reset() {

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

        console.log(password)
        typeof password === 'string'
        console.log(password)

        try {
            const { data: resetData, error } = await supabase.auth.updateUser({
                password: data.password
            })

            if (resetData) console.log(resetData)
            if (error) console.log("Your hava error")
            if (!error) redirect('/login');
        } catch (error) {
            console.error(error);
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
                <div className="flex flex-col items-center justify-start bg-color3_3 rounded-lg shadow-md bg-opacity-40 backdrop-blur-[12px] animate-scaleIn px-9 pb-10 pt-4">
                    <h1 className="text-white text-[26px]">Будь ласка введіть новий пароль</h1>
                    <div className="flex flex-col justify-start items-center w-3/4">
                        <div className="w-full relative pt-[15px] mt-[10px]">
                            <input type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="from__field text-xl" placeholder="password" id="password" required></input>
                            <label className="from__label top-0 absolute block text-color4_2 transition-[0.2s]">New Password</label>
                            <label className="absolute block left-[286px] top-[24px] w-[26px] h-[26px]" onClick={() => setShowPassword(!showPassword)}>
                                <Image alt="checkPassword" className=" w-[26px] h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                            </label>
                            <div className={`${progress} h-[3px] rounded-[2px] transition-all duration-500`}></div>
                        </div>
                        <div className="w-full relative pt-[15px] mt-[10px]">
                            <input type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                className="from__field text-xl" placeholder="confirmPassword" id="confirmPassword" required></input>
                            <label className="from__label top-0 absolute block text-color4_2 transition-[0.2s]">Confirm New Password</label>
                            <div className="bg-color4_2 w-full h-[3px] rounded-[2px] transition-all duration-500"></div>
                        </div>
                    </div>
                    <button type="button" className="text-[18px] text-center text-white bg-color4_1 py-0.5 px-4 mt-3 rounded-md" onClick={confitmPassword}>Змінити пароль</button>
                </div>
            </div>
        </>
    )
}

