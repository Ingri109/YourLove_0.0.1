import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Head from "../body_parts/Head";
import Hand from "../body_parts/Hand";
import Body from "../body_parts/Body";
import Leg from "../body_parts/Leg";
import { useTranslations } from 'next-intl';

const ModalEvents =  ({ name, onClose }: { name: string; onClose: () => void }) => {
    const t = useTranslations('YourLove')
    const backdrop = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [nameAction, setNameAction] = useState<string>('');
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const modalRootRef = useRef<HTMLDivElement | null>(null);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const rootElement = document.getElementById('modal-root');
        if (rootElement instanceof HTMLDivElement) {
            modalRootRef.current = rootElement;
            setIsMounted(true);
        }

        return () => {
            setIsMounted(false);
        };
    }, []);

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdrop.current === e.target) {
            onClose();
        }
    };

    const bodyParts: { [key: string]: JSX.Element } = {
        'Head': <Head onClose={onClose} nameAction={nameAction} />,
        'Left Hand': <Hand onClose={onClose} nameAction={nameAction} />,
        'Body': <Body onClose={onClose} nameAction={nameAction} />,
        'Right Hand': <Hand onClose={onClose} nameAction={nameAction} />,
        'Left Leg': <Leg onClose={onClose} nameAction={nameAction} />,
        'Right Leg': <Leg onClose={onClose} nameAction={nameAction} />,
    };

    const partStyles: { [key: string]: string } = {
        'Head': 'top-[20px] left-[6px]',
        'Left Hand': 'top-[130px] left-[6px]',
        'Body': 'top-[160px] left-[20px]',
        'Right Hand': 'top-[130px] right-[6px]',
        'Left Leg':'top-[390px] left-[6px]',
        'Right Leg':'top-[390px] right-[6px]',
    };

    const partStyle: string = partStyles[name] || '';

    return isMounted ? 
        <div ref={backdrop} onClick={onClick} className="absolute top-0 left-0 flex items-center justify-center h-full w-full z-30">
            <div className={`absolute ${partStyle}`}>
                <div className="flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-md py-[4px] px-[4px] rounded-[16px] shadow-color5 shadow-[-1px_2px_20px_2px_rgba(0,0,0,0.3)] animate-scaleIn">
                    <div className="flex flex-col justify-start space-y-[3px] items-center rounded-[12px] shadow-[inset_3px_6px_15px_rgba(0,0,0,0.3)]">
                        {isOpen
                            ?
                            <>
                                <div className="bg-color1 bg-opacity-80 backdrop-blur-md px-[46px] py-[6px] rounded-t-[12px] text-center text-[16px] font-semibold text-white w-full" onClick={() => { setIsOpen(false); setNameAction('Cute') }}>{t('Cute')}</div>
                                <div className="bg-color1 bg-opacity-80 backdrop-blur-md px-[46px] py-[6px] text-center text-[16px] font-semibold text-white w-full" onClick={() => { setIsOpen(false); setNameAction('Painful') }}>{t('Painful')}</div>
                                <div className="bg-color1 bg-opacity-80 backdrop-blur-md px-[46px] py-[6px] rounded-b-[12px] text-center text-[16px] font-semibold text-white w-full" onClick={() => { onClose() , alert(t('ErrorLustful')) }}>{t('Lustful')}</div>
                            </>
                            :
                            <>
                                {bodyParts[name]}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div> : null;
}

export default ModalEvents;

