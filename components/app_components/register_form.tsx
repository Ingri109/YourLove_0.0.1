'use client'

import { useState } from "react";
import Image from "next/image";
import Male from '@/assets/img/male.svg'
import Female from '@/assets/img/female.svg'
import Male_act from '@/assets/img/male_act.svg'
import Female_act from '@/assets/img/female_act.svg'

const RegisterForm = ({ addData, }: { addData: (formData: FormData) => Promise<void> }) => {
    const [gender, setGender] = useState('');
    return (
        <>
            <form action={addData} className="flex flex-col">
                <div className="flex flex-col space-y-6 mt-[26px]">
                    <div className="w-full relative ">
                        <input type="text" name="name" placeholder="Name" className="from__field_form bg-transparent outline-none border-[2px] border-color3_2 text-white px-2 py-2 text-[16px] font-medium placeholder:text-transparent" />
                        <label className="from__label_form border-[2px] bg-color3_3 border-color3_2 left-2 top-[-12px] absolute block text-white text-[12px] delay-100 duration-200 transition-all px-1">Name</label>
                    </div>
                    <div className="w-full relative">
                        <input type="date" name="age" placeholder="Age" className="from__field_form bg-transparent outline-none border-[2px] border-color3_2 text-white px-2 py-2 text-[16px] font-medium placeholder:text-transparent" />
                        <label className="from__label_form border-[2px] bg-color3_3 border-color3_2 left-2 top-[-12px] absolute block text-white text-[12px]  px-1">Age</label>
                    </div>
                    <div className="flex flex-row justify-start items-center">
                        <input type="hidden" name="gender" value={gender} />
                        <div onClick={() => setGender('Male')} className={`flex justify-center items-center p-1 bg-white rounded-[16px] ${gender === 'Male' ? 'shadow-[0_0_20px_1px_rgba(0,0,0,0.3)] shadow-[#0ba3ef]' : ''} `}>
                            <Image alt="Male" src={gender === 'Male' ? Male_act : Male} className="w-[32px] h-[32px]" />
                        </div>
                        <div onClick={() => setGender('Female')} className={`flex justify-center items-center p-1 bg-white rounded-[16px] ml-4 ${gender === 'Female' ? 'shadow-[0_0_20px_1px_rgba(0,0,0,0.3)] shadow-[#d605b0]' : ''} `}>
                            <Image alt="Female" src={gender === 'Female' ? Female_act : Female} className="w-[32px] h-[32px]" />
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-color1_1 bg-opacity-70 px-4 py-2 rounded-[12px] text-white text-[18px] font-medium hover:scale-105 hover:bg-color1 hover:bg-opacity-60 transition duration-200 delay-150 ease-in mt-[32px] focus:bg-color1_3">Створити аватара</button>
            </form>
        </>
    )
}

export default RegisterForm;