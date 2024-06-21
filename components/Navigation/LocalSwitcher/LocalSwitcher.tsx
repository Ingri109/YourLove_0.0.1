'use client';

import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent, useTransition, useState, useRef, useEffect } from "react";
import { useLocale } from "use-intl";
import { createPortal } from 'react-dom';
import Image from 'next/image';
import World from "@/assets/icon/bx--world.svg";
import Tick from "@/assets/icon/charm--tick.svg";

export default function LocalSwitcher() {
    const modalRootRef = useRef<HTMLDivElement | null>(null);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    const onSelectChange = (nextLocale: string) => {
        const segments = pathname.split('/').filter(Boolean);
        segments[0] = nextLocale;

        const nextPathname = `/${segments.join('/')}`;

        startTransition(() => {
            router.replace(nextPathname);
        });
    };

    useEffect(() => {
        const rootElement = document.getElementById('modal-root');
        if (rootElement instanceof HTMLDivElement) {
            modalRootRef.current = rootElement;
        }
    }, []);

    return (
        <>
            <div className="cursor-pointer mr-[10px] md:mr-[28px]" onClick={() => setOpen(!open)}>
                <Image src={World} alt={'world'} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
            </div>
            {open && modalRootRef.current && createPortal(
                <div className="z-30 fixed top-12 right-[46px] text-white bg-black px-1 py-1 rounded-lg md:right-[78px]">
                    <div className="cursor-pointer w-full flex justify-start items-center bg-transparent rounded-md px-3 py-1.5 hover:bg-[#393937]" onClick={() => onSelectChange('en')}>
                        {locale == 'en' ? <Image src={Tick} alt="tick" className="w-[16px] h-[16px] mr-2"></Image> : <div className="w-[16px] h-[16px] mr-2"></div>}
                        <p className="text-[14px] font-light md:text-[16px]">English</p>
                    </div>
                    <div className="cursor-pointer w-full flex justify-start items-center bg-transparent rounded-md px-3 py-1.5 hover:bg-[#393937]" onClick={() => onSelectChange('ua')}>
                        {locale == 'ua' ? <Image src={Tick} alt="tick" className="w-[16px] h-[16px] mr-2"></Image> : <div className="w-[16px] h-[16px] mr-2"></div>}
                        <p className="text-[14px] font-light md:text-[16px]">Українська</p>
                    </div>
                </div>,
                modalRootRef.current
            )}
        </>
    );
}

{/* <label className="border-2 rounded">
                    <p className="text-white sr-only">LocaL</p>
                    <select defaultValue={localActive} disabled={isPanding} className=" bg-transparent py-2" onChange={onSelectChange}>
                        <option value='en'>EN</option>
                        <option value='ua'>UA</option>
                    </select>
                </label> */}