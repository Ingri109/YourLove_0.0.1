'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Arrow from '@/assets/icon/arrow.svg';
import DiscordSVG from '@/assets/icon/ic--round-discord.svg';
import GoogleSVG from '@/assets/icon/bxl--google.svg';
import GitHubSVG from '@/assets/icon/mingcute--github-line.svg';
import EyeOpen from '@/assets/icon/mdi--eye-outline.svg';
import EyeClose from '@/assets/icon/mdi--eye-off.svg';

interface Data {
    password: string;
    email: string;
    confirmPassword: string;
}


export default function Login() {
    const t = useTranslations('login');
    const [data, setData] = useState<Data>({ password: '', email: '', confirmPassword: '' });
    const [message, setMessage] = useState<string>('');
    const [messageSignUp, setMessageSignUp] = useState<string>('');
    const [messageError, setMessageError] = useState<string>('');
    const [messageStyle, setMessageStyle] = useState<string>('');
    const [errorStyle, setErrorStyle] = useState<boolean>(false);
    const [messagePasswordStyle, setMessagePasswordStyle] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [checkLogin, setCheckLogin] = useState<boolean>(true);
    const [progress, setProgress] = useState<string>('bg-color2_2 w-full');
    const [resetPassword, setResetPassword] = useState<boolean>(false);
    const router = useRouter();
    const supabase = createClientComponentClient();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clearConfirmPassword = () => {
        setData((prevData) => ({
            ...prevData,
            confirmPassword: '',
        }));
    };

    const GitHub = async () => {
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const Discord = () => {
        supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const Google = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    useEffect(() => {
        if (!data.email && !data.password && !data.confirmPassword) {
            setErrorStyle(false);
            setProgress('bg-color2_2 w-full');
            setMessagePasswordStyle(false);
            setMessageError('');
        }

        if (data.password.length === 0) {
            setProgress('bg-color2_2 w-full');
            setMessage('');
            setMessageStyle('');
        } else if (data.password.length < 6) {
            setProgress('bg-[#D13232] w-1/3');
            setMessage(t('MessagePassword1'));
            setMessageStyle('text-[#D13232]');
        } else if (!/[A-Z]/.test(data.password) || !/[\W_]/.test(data.password) || !/\d/.test(data.password)) {
            setProgress('bg-[#F19829] w-2/3');
            setMessage(t('MessagePassword2'));
            setMessageStyle('text-[#F19829]');
        } else if (data.password.length >= 12) {
            setProgress('bg-[#26C318] w-full');
            setMessage(t('MessagePassword3'));
            setMessageStyle('text-[#26C318]');
        }
    }, [data.password, data.email, data.confirmPassword, router]);

    const handleSignUp = async () => {
        const { password, confirmPassword, email } = data;

        if (!email || !password) {
            setMessageError(t('NotPasswordAndEmail'));
            return;
        }

        if (password !== confirmPassword) {
            setMessage('');
            setMessageError(t('ErrorPasswords'));
            setProgress('bg-[#D13232] w-full');
            setMessagePasswordStyle(true);
        } else {
            try {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError && signInError.message !== 'Invalid login credentials') {
                    setMessageError(t('ErrorEmail'));
                    setErrorStyle(true);
                    setMessage('');
                    setProgress('bg-[#D13232] w-full');
                    setMessagePasswordStyle(true);
                    return;
                }

                const { error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                });

                if (error) {
                    console.log(error);
                    setErrorStyle(true);
                    setMessage('');
                    setProgress('bg-[#D13232] w-full');
                    setMessagePasswordStyle(true);
                    switch (error.message) {
                        case 'Password should be at least 6 characters':
                            setMessageError(t('LengthPasswordShort'));
                            break;
                        case 'User already registered':
                            setMessageError(t('ErrorEmail'));
                            break;
                        case 'Invalid email format':
                            setMessageError(t('EmailFormat'));
                            break;
                        case 'Network error':
                            setMessageError(t('NetworkError'));
                            break;
                        default:
                            setMessageError(t('ErrorRegister'));
                    }
                } else {
                    setErrorStyle(false);
                    setProgress('bg-color2_2 w-full');
                    setMessagePasswordStyle(false);
                    setMessageError('');
                    setMessageSignUp(t('MessageReggister'));
                    const timer = setTimeout(() => {
                        setMessageSignUp('');
                    }, 5000);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.log(t('UnknowError'), error);
                setMessageError(t('UnknowError'));
            }
        }
    };

    const handleSignIn = async () => {
        const { password, email } = data;

        if (!email || !password) {
            setMessageError(t('NotPasswordAndEmail'));
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({ email: email, password: password });

            if (error) {
                console.log(error);
                setErrorStyle(true);
                switch (error.message) {
                    case 'Invalid login credentials':
                        setMessageError(t('Credentials'));
                        break;
                    case 'Email not confirmed':
                        setMessageError(t('NotConfirmed'));
                        break;
                    case 'Network error':
                        setMessageError(t('NetworkError'));
                        break;
                    default:
                        setMessageError(t('ErrorLogin'));
                }
            } else {
                setErrorStyle(false);
                router.push('registerForm');
            }
        } catch (error) {
            console.log(t('UnknowError'), error);
            setMessageError(t('UnknowError'));
        }
    };

    const ResetPassword = async () => {
        try {
            const { data: resetData, error } = await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: `${window.location.href}/reset`,
            });
            if (error) {
                console.log('ResetPassword error:', error);
            }
        } catch (error) {
            console.log('ResetPassword error:', error);
        }
    };



    return (
        <div className="h-screen flex items-center justify-center p-6">
            <form className="flex flex-row bg-color3 rounded-xl shadow-md bg-opacity-30 backdrop-blur-[12px] animate-scaleIn md:rounded-lg">

                {resetPassword ?
                    <>
                        <div className=" relative flex flex-col justify-start items-center justify-items-stretch px-2 py-6 mb-2 sm:py-2 sm:pb-5">
                            <div onClick={() => setResetPassword(!resetPassword)} className=" absolute top-[10px] left-[20px] sm:top-[20px]" ><Image alt="Close" src={Arrow} className="w-[20px] h-[20px] cursor-pointer rotate-180 md:w-[24px] md:h-[24px]"></Image></div>
                            <h1 className="text-[28px] font-bold text-color1_2 tracking-wide md:text-[32px]">{t('ResetPasswordTitle')}</h1>
                            <p className="max-w-[426px] text-[12px] font-medium text-balance text-center text-white tracking-normal mt-2">{t('ResetPasswordContent')}</p>
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
                                onClick={ResetPassword}
                                className="w-full max-w-[266.6px] mt-7 p-3 rounded-md bg-color4 bg-opacity-70 text-[18px] font-medium text-white shadow-color3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-75 delay-150 hover:bg-color4_3 hover:bg-opacity-80 focus:outline-none "
                            >
                                {t('ResetPasswordButton')}
                            </button>
                        </div>
                    </>

                    :
                    <div className=" relative flex flex-col justify-start items-center px-10 py-8">
                        <div className="flex flex-row justify-between items-center w-3/4 space-x-4">
                            <button type="button" onClick={() => { setCheckLogin(true), setErrorStyle(false), setMessageError(''), clearConfirmPassword() }} className={` ${checkLogin ? 'bg-color4_3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] shadow-color4_2' : 'bg-color1_2 text-color3 hover:bg-color1_3 hover:text-white hover:shadow-[0_0px_15px_0.1px_rgba(0,0,0,0.2)] hover:shadow-color1_2'} w-full py-1.5 px-1 rounded-[18px] text-cold_season transition-all duration-300 delay-200 text-[16px] font-medium hover:scale-110 `}>Log in</button>
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
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color4_2'} transition-all duration-500 delay-150`}>{t('password')}</label>
                                    {data.password === '' ? null :
                                        <label className="absolute block left-[228px] top-[24px] w-[26px] h-[26px]" onClick={() => setShowPassword(!showPassword)}>
                                            <Image alt="checkPassword" className=" w-[26px] h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                                        </label>
                                    }

                                    <div className={`${errorStyle ? 'bg-[#D13232]' : 'bg-color4'} w-full h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="flex justify-start w-full mt-1 max-w-full"><p className={`text-[10px] text-[#D13232] break-words font-medium decoration-2 underline-offset-4 `}>{messageError}</p></div>
                                <div className="flex justify-start w-full mt-0" onClick={() => setResetPassword(!resetPassword)}><p className="text-[14px] cursor-pointer font-medium text-color1_2 decoration-[1.5px] underline-offset-4 hover:text-color1 hover:underline">{t('ForgotPassword')}</p></div>

                                <button
                                    type="button"
                                    onClick={handleSignIn}
                                    className="w-full mt-7 p-3 rounded-md bg-color1 bg-opacity-70 text-[18px] font-medium text-white shadow-color3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-75 delay-150 hover:bg-color1_3 hover:bg-opacity-80 focus:outline-none "
                                >
                                    {t('login')}
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
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color2_2'} transition-all duration-500 delay-150`}>{t('password')}</label>
                                    {data.password === '' ? null :
                                        <label className="absolute block left-[228px] top-[24px] w-[26px] h-[26px]" onClick={() => setShowPassword(!showPassword)}>
                                            <Image alt="checkPassword" className=" w-[26px] h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                                        </label>
                                    }

                                    <div className={`${progress} h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="flex justify-end w-full mt-1"><p className={`text-[10px] ${messageStyle} font-medium decoration-2 underline-offset-4 break-words`}>{message}</p></div>
                                <div className="w-full relative pt-[16px] mt-1">
                                    <input type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={data.confirmPassword}
                                        onChange={handleChange}
                                        className="from__field text-xl" placeholder="confirmPassword" id="confirmPassword" required></input>
                                    <label className={`from__label top-0 absolute block ${errorStyle ? 'text-[#D13232]' : 'text-color2_2'} transition-all duration-500 delay-150`}>{t('ConfirmPassword')}</label>
                                    {data.password === '' ? null :
                                        <label className="absolute block left-[228px] top-[24px] w-[26px] h-[26px]" onClick={() => setShowPassword(!showPassword)}>
                                            <Image alt="checkPassword" className=" w-[26px] h-[26px]" src={showPassword ? EyeOpen : EyeClose}></Image>
                                        </label>
                                    }
                                    <div className={`${messagePasswordStyle ? 'bg-[#D13232]' : 'bg-color2_2'}  w-full h-[3px] rounded-[2px] transition-all duration-500 delay-150`}></div>
                                </div>
                                <div className="flex justify-start w-full mt-1 max-w-[250px]"><p className='text-[10px] text-[#D13232] break-words font-medium decoration-2 underline-offset-4'>{messageError}</p></div>
                                <div className="flex justify-start w-full mt-1 max-w-[250px]"><p className='text-[10px] text-[#35a43b] break-words font-medium decoration-2 underline-offset-4'>{messageSignUp}</p></div>
                                <button
                                    type="button"
                                    onClick={handleSignUp}
                                    className="w-full mt-7 p-3 rounded-md bg-color2_1 bg-opacity-70 text-[18px] font-medium text-white shadow-color3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] transition-all duration-75 delay-150 hover:scale-105 hover:bg-color2_3 hover:bg-opacity-80 focus:outline-none"
                                >
                                    {t('register')}
                                </button>

                            </>
                        }
                        <div className="flex justify-around items-center mt-[50px] space-x-7 ">
                            <button type="button" className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-color3 shadow-[0_0px_30px_8px_rgba(0,0,0,0.4)] transition-all duration-250 delay-350 hover:scale-110" onClick={GitHub}><Image className="w-[36px] h-[36px]" src={GitHubSVG} alt="GitHub" /></button>
                            <button type="button" className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-color3 shadow-[0_0px_30px_8px_rgba(0,0,0,0.4)] transition-all duration-250 delay-350 hover:scale-110" onClick={Discord}><Image className="w-[36px] h-[36px]" src={DiscordSVG} alt="Discord" /></button>
                            <button type="button" className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-color3 shadow-[0_0px_30px_8px_rgba(0,0,0,0.4)] transition-all duration-250 delay-350 hover:scale-110" onClick={Google}><Image className="w-[36px] h-[36px]" src={GoogleSVG} alt="Google" /></button>
                        </div>
                    </div>
                }

            </form>
        </div>
    )
}
