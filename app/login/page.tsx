'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Arrow from '@/assets/icon/arrow.svg';
import DiscordSVG from '@/assets/icon/ic--round-discord.svg';
import GoogleSVG from '@/assets/icon/bxl--google.svg';
import GitHubSVG from '@/assets/icon/mingcute--github-line.svg';
import EyeOpen from '@/assets/icon/mdi--eye-outline.svg';
import EyeClose from '@/assets/icon/mdi--eye-off.svg';

export default function Login() {
    const [data, setData] = useState<{ password: string, email: string, confirmPassword: string }>({ password: '', email: '', confirmPassword: '' })
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [messageStyle, setMessageStyle] = useState('');
    const [errorStyle, setErrorStyle] = useState(false);
    const [mesagePasswordStyle, setMesagePasswordStyle] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userSession, setUserSession] = useState<any>(null);
    const [checkSend, setCheckSend] = useState<boolean>(false);
    const [checkLogin, setCheckLogin] = useState(true);
    const [progress, setProgress] = useState('bg-color2_2 w-full');
    const router = useRouter()
    const [resetPassword, setResetPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const clearConfirmPassword = () => {
        setData(prevData => ({
            ...prevData,
            confirmPassword: ''
        }));
    };

    const GitHud = async () => {
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });

    };

    const Discord = () => {
        supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })

    }

    const Google = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: `${window.location.origin}/auth/callback`
            },
        })
    }


    useEffect(() => {
        // async function getSession() {
        //     const { data: { session } } = await supabase.auth.getSession();
        //     setUserSession(session)
        //     if (session) {
        //         // router.push('/');
        //     }
        //     setLoading(false)
        // }

        if (!data.email && !data.password && !data.confirmPassword) {
            setErrorStyle(false);
            setProgress('bg-color2_2 w-full');
            setMesagePasswordStyle(false);
            setMessageError('');
        }


        if (data.password.length === 0) {
            setProgress('bg-color2_2 w-full')
            setMessage('')
            setMessageStyle('')
        } else if (data.password.length < 6) {
            setProgress('bg-[#D13232] w-1/3')
            setMessage('Пароль занадто короткий')
            setMessageStyle('text-[#D13232]')
        } else if (!/[A-Z]/.test(data.password) || !/[\W_]/.test(data.password) || !/\d/.test(data.password)) {
            setProgress('bg-[#F19829] w-2/3')
            setMessage('Додайте Велику букву або симоли, для складності')
            setMessageStyle('text-[#F19829]')
        } else if (data.password.length >= 12) {
            setProgress('bg-[#26C318] w-full')
            setMessage('Чудовий пароль')
            setMessageStyle('text-[#26C318]')
        }


        // getSession();
    }, [data.password, data.email, data.confirmPassword, router])



    const handleSignUp = async () => {
        const { password, confirmPassword, email } = data;
        if (!email || !password) {
            setMessageError("Будь ласка, введіть email та пароль.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage('');
            setMessageError('Ваші паролі невірні');
            setProgress('bg-[#D13232] w-full');
            setMesagePasswordStyle(true);
        } else {
            try {
                // Перевіряємо чи існує вже акаунт з таким email
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (signInError && signInError.message !== 'Invalid login credentials') {
                    setMessageError('Цей email вже зареєстрований. Спробуйте увійти або скористайтесь іншим email.');
                    setErrorStyle(true);
                    setMessage('');
                    setProgress('bg-[#D13232] w-full');
                    setMesagePasswordStyle(true);
                    return;
                }

                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`
                    }
                });

                if (error) {
                    console.log(error);
                    setErrorStyle(true);
                    setMessage('');
                    setProgress('bg-[#D13232] w-full');
                    setMesagePasswordStyle(true);
                    switch (error.message) {
                        case 'Password should be at least 6 characters':
                            setMessageError('Пароль має містити щонайменше 6 символів.');
                            break;
                        case 'User already registered':
                            setMessageError('Цей email вже зареєстрований. Спробуйте увійти або скористайтесь іншим email.');
                            break;
                        case 'Invalid email format':
                            setMessageError('Невірний формат email. Перевірте ваш email та спробуйте ще раз.');
                            break;
                        default:
                            setMessageError('Виникла помилка під час реєстрації. Спробуйте пізніше.');
                    }
                } else {
                    setErrorStyle(false);
                    setProgress('bg-color2_2 w-full');
                    setMesagePasswordStyle(false);
                    setMessageError('Реєстрація успішна! Будь ласка, перевірте ваш email для підтвердження.');
                }
            } catch (error) {
                console.log('Невідома помилка під час реєстрації:', error);
                setMessageError('Невідома помилка. Будь ласка, зверніться до підтримки.');
            }
        }
    };



    const handleSignIn = async () => {
        const { password, email } = data
        if (!email || !password) {
            setMessageError("Будь ласка, введіть email та пароль.");
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                console.log(error);
                setErrorStyle(true);
                switch (error.message) {
                    case 'Invalid login credentials':
                        setMessageError("Email або пароль є не правильними, перевірте дані.");
                        break;
                    case 'Email not confirmed':
                        setMessageError("Ваш email не підтверджено. Будь ласка, перевірте свою пошту.");
                        break;
                    case 'Network error':
                        setMessageError("Проблема з мережею. Будь ласка, спробуйте пізніше.");
                        break;
                    default:
                        setMessageError("Виникла помилка під час входу. Спробуйте пізніше.");
                }
            } else {
                setErrorStyle(false);
            }

        } catch (error) {
            console.log('Помилка під час входу:', error);
            setMessageError("Невідома помилка. Будь ласка, зверніться до підтримки.");
        }
    }


    const ResetPassworld = async () => {
        try {
            const { data: resetData, error } = await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: `${window.location.href}/reset`
            });
            setCheckSend(true)
        } catch (error) {
            console.log('ResetPassworld error:', error);
        }

    }



    return (
        <div className="h-screen flex items-center justify-center p-6">
            <form className="flex flex-row bg-color3 rounded-xl shadow-md bg-opacity-30 backdrop-blur-[12px] animate-scaleIn md:rounded-lg">

                {resetPassword ?
                    <>
                        <div className=" relative flex flex-col justify-start items-center justify-items-stretch px-2 py-6 mb-2 sm:py-2 sm:pb-5">
                            <div onClick={() => setResetPassword(!resetPassword)} className=" absolute top-[10px] left-[20px] sm:top-[20px]" ><Image alt="Close" src={Arrow} className="w-[20px] h-[20px] cursor-pointer rotate-180 md:w-[24px] md:h-[24px]"></Image></div>
                            <h1 className="text-[28px] font-bold text-color1_2 tracking-wide md:text-[32px]">Змінити пароль</h1>
                            <p className="max-w-[426px] text-[12px] font-medium text-balance text-center text-white tracking-normal mt-2">Для того щоб змінити пароль введіть вашу елктрону скриньку на, яку буде надіслано повідомлення поро відновлення пароля</p>
                            <div className="w-full max-w-[266.6px] relative pt-[15px] mt-[4px]">
                                <input type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="from__field text-xl" placeholder="Email" id="Email" required></input>
                                <label className="from__label top-0 absolute block text-color1 text-[18px] font-medium transition-all duration-500 delay-150">Email</label>
                                <div className="bg-color1 w-full h-[3px] rounded-[2px] transition-all duration-500 delay-150"></div>
                            </div>
                            <button
                                type="button"
                                onClick={ResetPassworld}
                                className="w-full max-w-[266.6px] mt-7 p-3 rounded-md bg-color4 bg-opacity-70 text-[18px] font-medium text-white shadow-color3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-75 delay-150 hover:bg-color4_3 hover:bg-opacity-80 focus:outline-none "
                            >
                                Надіслати повідомлення
                            </button>
                        </div>
                    </>

                    :
                    <div className=" relative flex flex-col justify-start items-center px-10 py-8">
                        <div className="flex flex-row justify-between items-center w-3/4 space-x-4">
                            <button type="button" onClick={() => { setCheckLogin(true), setErrorStyle(false), setMessageError(''), clearConfirmPassword() }} className={` ${checkLogin ? 'bg-color4_3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] shadow-color4_2' : 'bg-color1_2 text-color3 hover:bg-color1_3 hover:text-white hover:shadow-[0_0px_15px_0.1px_rgba(0,0,0,0.2)] hover:shadow-color1_2'} w-full py-1.5 px-1 rounded-[18px] text-cold_season transition-all duration-300 delay-200 text-[16px] font-medium hover:scale-110 `}>Sing in</button>
                            <button type="button" onClick={() => { setCheckLogin(false), setErrorStyle(false), setMessageError('') }} className={` ${checkLogin ? 'bg-color1_2 text-color3 hover:bg-color1_3 hover:text-white hover:shadow-[0_0px_15px_0.1px_rgba(0,0,0,0.2)] hover:shadow-color1_2 ' : 'bg-color4_3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] shadow-color4_2'} w-full py-1.5 px-1 rounded-[18px] text-cold_season transition-all duration-300 delay-200 text-[16px] font-medium hover:scale-110`}>Sing up</button>
                        </div>
                        {checkLogin ?
                            <>

                                <div className="w-full relative pt-[15px] mt-[10px]">
                                    <input type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="from__field text-xl" placeholder="Email" id="Email" required></input>
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color4_2'} text-[18px] transition-all duration-500 delay-150`}>Email</label>
                                    <div className={`${errorStyle ? 'bg-[#D13232]' : 'bg-color4'} w-full h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="w-full relative pt-[15px] mt-[10px]">
                                    <input type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="from__field text-xl" placeholder="password" id="password" required></input>
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color4_2'} transition-all duration-500 delay-150`}>Password</label>
                                    <label className="absolute block left-[228px] top-[24px] w-[26px] h-[26px]" onClick={() => setShowPassword(!showPassword)}>
                                        <Image alt="checkPassword" className=" w-[26px] h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                                    </label>
                                    <div className={`${errorStyle ? 'bg-[#D13232]' : 'bg-color4'} w-full h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="flex justify-start w-full mt-1 max-w-full"><p className={`text-[10px] text-[#D13232] break-words font-medium decoration-2 underline-offset-4 `}>{messageError}</p></div>
                                <div className="flex justify-start w-full mt-0" onClick={() => setResetPassword(!resetPassword)}><p className="text-[14px] cursor-pointer font-medium text-color1_2 decoration-2 underline-offset-4 hover:text-color1 hover:underline">Забули пароль?</p></div>

                                <button
                                    type="button"
                                    onClick={handleSignIn}
                                    className="w-full mt-7 p-3 rounded-md bg-color1 bg-opacity-70 text-[18px] font-medium text-white shadow-color3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-75 delay-150 hover:bg-color1_3 hover:bg-opacity-80 focus:outline-none "
                                >
                                    Sign In
                                </button>
                            </>
                            :
                            <>
                                <div className="w-full relative pt-[15px] mt-[10px]">
                                    <input type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="from__field text-xl" placeholder="Email" id="Email" required></input>
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color2_2'} transition-all duration-500 delay-150`}>Email</label>
                                    <div className={`${errorStyle ? 'bg-[#D13232]' : 'bg-color2_2'} w-full h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="w-full relative pt-[15px] mt-[10px]">
                                    <input type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="from__field text-xl" placeholder="password" id="password" required></input>
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color2_2'} transition-all duration-500 delay-150`}>Password</label>
                                    <label className="absolute block left-[228px] top-[24px] w-[26px] h-[26px]" onClick={() => setShowPassword(!showPassword)}>
                                        <Image alt="checkPassword" className=" w-[26px] h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                                    </label>
                                    <div className={`${progress} h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="flex justify-end w-full mt-1"><p className={`text-[10px] ${messageStyle} font-medium decoration-2 underline-offset-4 break-words`}>{message}</p></div>
                                <div className="w-full relative pt-[16px] mt-1">
                                    <input type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={data.confirmPassword}
                                        onChange={handleChange}
                                        className="from__field text-xl" placeholder="confirmPassword" id="confirmPassword" required></input>
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color2_2'} transition-all duration-500 delay-150`}>Confirm Password</label>
                                    <div className={`${mesagePasswordStyle ? 'bg-[#D13232]' : 'bg-color2_2'}  w-full h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="flex justify-start w-full mt-1 max-w-[250px]"><p className='text-[10px] text-[#D13232] break-words font-medium decoration-2 underline-offset-4'>{messageError}</p></div>
                                <button
                                    type="button"
                                    onClick={handleSignUp}
                                    className="w-full mt-7 p-3 rounded-md bg-color2_1 bg-opacity-70 text-[18px] font-medium text-white shadow-color3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] transition-all duration-75 delay-150 hover:scale-105 hover:bg-color2_3 hover:bg-opacity-80 focus:outline-none"
                                >
                                    Sign Up
                                </button>

                            </>
                        }
                        <div className="flex justify-around items-center mt-[50px] space-x-7 ">
                            <button type="button" className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-color3 shadow-[0_0px_30px_8px_rgba(0,0,0,0.4)] transition-all duration-250 delay-350 hover:scale-110" onClick={GitHud}><Image className="w-[36px] h-[36px]" src={GitHubSVG} alt="GitHub" /></button>
                            <button type="button" className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-color3 shadow-[0_0px_30px_8px_rgba(0,0,0,0.4)] transition-all duration-250 delay-350 hover:scale-110" onClick={Discord}><Image className="w-[36px] h-[36px]" src={DiscordSVG} alt="Discord" /></button>
                            <button type="button" className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-color3 shadow-[0_0px_30px_8px_rgba(0,0,0,0.4)] transition-all duration-250 delay-350 hover:scale-110" onClick={Google}><Image className="w-[36px] h-[36px]" src={GoogleSVG} alt="Google" /></button>
                        </div>
                    </div>
                }

            </form>
        </div>
    )
}
