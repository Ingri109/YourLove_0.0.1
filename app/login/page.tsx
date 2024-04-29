'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import DiscordSVG from '@/assets/icon/ic--round-discord.svg';
import GoogleSVG from '@/assets/icon/bxl--google.svg';
import GitHubSVG from '@/assets/icon/mingcute--github-line.svg';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userSession, setUserSession] = useState<any>(null);
    const [checkLogin, setCheckLogin] = useState(true);
    const [progress, setProgress] = useState('bg-color2_2 w-full');
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();

    const GitHud = async () => {
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        });

    };



    const Discord = () => {
        supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
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
                redirectTo: 'http://localhost:3000/auth/callback'
            },
        })
    }


    useEffect(() => {
        // async function getSession() {
        //     const { data: { session } } = await supabase.auth.getSession();
        //     setUserSession(session)
        //     if (session) {
        //         router.push('/');
        //     }
        //     setLoading(false)
        // }

        if (password.length === 0) {
            setProgress('bg-color2_2 w-full')
        } else if (password.length >= 1 && password.length < 6) {
            setProgress('bg-[#D13232] w-1/3')
        } else if (password.length >= 6 && password.length < 12) {
            setProgress('bg-[#F19829] w-2/3')
        } else if (password.length >= 12) {
            setProgress('bg-[#26C318] w-full')
        }

        // getSession();
    }, [password, router])



    const handleSignUp = async () => {
        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })
        console.log(res);
        router.refresh();
        setEmail('')
        setPassword('')
    }

    const handleSignIn = async () => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password
        })
        console.log(res);
        router.refresh();
        setEmail('')
        setPassword('');
    }

    if (userSession) {
        return null
    }
    
    if (loading) {
        return <h1>loading..</h1>
    }

    return (
        <div className="h-screen flex items-center justify-center p-6">
            <div className="flex flex-row bg-color4 rounded-lg shadow-md bg-opacity-10 backdrop-blur animate-scaleIn">
                <div className="relative flex flex-col justify-start items-center px-10 py-8">
                    <div className="relative flex flex-row justify-between items-center w-3/4 space-x-4">
                        <button onClick={() => { setCheckLogin(true); setEmail(''); setPassword('')}} className={` ${checkLogin ? 'bg-color4_3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] shadow-color4_2' : 'bg-color1_2 text-color3 hover:bg-color1_3 hover:text-white hover:shadow-[0_0px_15px_0.1px_rgba(0,0,0,0.2)] hover:shadow-color1_2'} w-full py-1.5 px-1 rounded-[18px] text-cold_season transition-colors duration-300 text-[16px] font-medium`}>Sing in</button>
                        <button onClick={() => { setCheckLogin(false); setEmail(''); setPassword('') }} className={` ${checkLogin ? 'bg-color1_2 text-color3 hover:bg-color1_3 hover:text-white hover:shadow-[0_0px_15px_0.1px_rgba(0,0,0,0.2)] hover:shadow-color1_2 ' : 'bg-color4_3 shadow-[0_0px_30px_0.5px_rgba(0,0,0,0.2)] shadow-color4_2'} w-full py-1.5 px-1 rounded-[18px] text-cold_season transition-colors duration-300 text-[16px] font-medium`}>Sing up</button>
                    </div>
                    {checkLogin ?
                        <>
                            <div className="w-full relative pt-[15px] mt-[10px]">
                                <input type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="from__field text-xl" placeholder="Email" id="Email" required></input>
                                <label className="from__label top-0 absolute block text-color4_2 text-[18px] transition-[0.2s]">Email</label>
                                <div className="bg-color4 w-full h-[3px] rounded-[2px] transition-all duration-500"></div>
                            </div>
                            <div className="w-full relative pt-[15px] mt-[10px]">
                                <input type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="from__field text-xl" placeholder="password" id="password" required></input>
                                <label className="from__label top-0 absolute block text-color4_2 transition-[0.2s]">Password</label>
                                <div className={`bg-color4 w-full h-[3px] rounded-[2px] transition-all duration-500`}></div>
                            </div>
                            <button
                                onClick={handleSignIn}
                                className="w-full mt-10 p-3 rounded-md bg-color1 text-white hover:bg-color2 focus:outline-none bg-opacity-75"
                            >
                                Sign In
                            </button>
                        </>
                        :
                        <>
                            <div className="w-full relative pt-[15px] mt-[10px]">
                                <input type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="from__field text-xl" placeholder="Email" id="Email" required></input>
                                <label className="from__label top-0 absolute block text-color2_2 transition-[0.2s]">Email</label>
                                <div className="bg-color2_2 w-full h-[3px] rounded-[2px] transition-all duration-500"></div>
                            </div>
                            <div className="w-full relative pt-[15px] mt-[10px]">
                                <input type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="from__field text-xl" placeholder="password" id="password" required></input>
                                <label className="from__label top-0 absolute block text-color2_2 transition-[0.2s]">Password</label>
                                <div className={`${progress} h-[3px] rounded-[2px] transition-all duration-500`}></div>
                            </div>

                            <button
                                onClick={handleSignUp}
                                className="w-full mt-10 p-3 rounded-[8px] bg-color2_1 text-white hover:bg-color2_3 focus:outline-none bg-opacity-75"
                            >
                                Sign Up
                            </button>

                        </>}
                    <div className="flex justify-around items-center mt-[50px] space-x-7 ">
                        <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-xl" onClick={GitHud}><Image className="w-[36px] h-[36px]" src={GitHubSVG} alt="GitHub" /></button>
                        <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-xl" onClick={Discord}><Image className="w-[36px] h-[36px]" src={DiscordSVG} alt="Discord" /></button>
                        <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 shadow-xl" onClick={Google}><Image className="w-[36px] h-[36px]" src={GoogleSVG} alt="Google" /></button>
                    </div>
                </div>

            </div>
        </div>
    )

}