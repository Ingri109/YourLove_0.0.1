import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function NotPartner() {
    const t = useTranslations('NotAvatar');
    return (
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <div className="flex flex-col justify-center items-center w-11/12 max-h-full px-[2px] py-[12px] bg-color1_2 bg-opacity-10 backdrop-blur-md rounded-[10px] shadow-[0_15px_30px_7px_rgba(0,0,0,0.35)] xl:w-9/12 lg:w-10/12 lg:px-[2px] lg:py-[12px] md:w-11/12 md:px-[2px] md:py-[18px] sm:w-4/6 animate-scaleIn">
                <h1 className="text-[24px] text-white font-bold text-center text-balance w-full md:text-[32px]">{t('title')}</h1>
                <Link href={'/account'} className=" bg-color4 text-white text-[12px] font-semibold mt-[10px] px-[28px] py-1.5 rounded-md hover:bg-color4_1 focus:bg-color4_3 md:mt-[28px] md:text-[18px] md:rounded-xl">{t('button')}</Link>
            </div>
        </div>
    )
}