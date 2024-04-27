import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Head from "../body_parts/Head";
import Hand from "../body_parts/Hand";
import Body from "../body_parts/Body";
import Leg from "../body_parts/Leg";



const ModalEvents = ({ name, onClose }: { name: string; onClose: () => void }) => {
    const backdrop = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [nameAction, setNameAction] = useState<string>('');
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const modalRootRef = useRef<HTMLDivElement | null>(null);


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
        'Head': <Head nameAction={nameAction} />,
        'Left Hand': <Hand nameAction={nameAction} />,
        'Body': <Body nameAction={nameAction} />,
        'Right Hand': <Hand nameAction={nameAction} />,
        'Left Leg': <Leg nameAction={nameAction} />,
        'Right Leg': <Leg nameAction={nameAction} />,
    };

    const partStyles: { [key: string]: string } = {
        'Head': 'ml-[360px] mt-[100px]',
        'Left Hand': 'ml-[280px] mt-[130px]',
        'Body': 'ml-[340px] mt-[160px]',
        'Right Hand': 'ml-[1130px] mt-[140px]',
        'Left Leg': 'ml-[320px] mt-[390px]',
        'Right Leg': 'ml-[1100px] mt-[390px]',
    };

    const partStyle: string = partStyles[name] || '';

    return isMounted ? createPortal(
        <div ref={backdrop} onClick={onClick} className="fixed top-0 left-0 flex items-start justify-center h-full w-full z-30">
            <div className={`flex justify-start items-start h-[600px] w-[300px] ${partStyle}`}>
                <div className="flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-md py-[4px] px-[4px] rounded-[16px] shadow-color5 shadow-[-1px_2px_20px_2px_rgba(0,0,0,0.3)] animate-scaleIn">
                    <div className="flex flex-col justify-start space-y-[3px] items-center rounded-[12px] shadow-[inset_3px_6px_15px_rgba(0,0,0,0.3)]">
                        {isOpen
                            ?
                            <>
                                <div className="bg-color1 bg-opacity-80 backdrop-blur-md px-[46px] py-[6px] rounded-t-[12px] text-center text-[16px] font-semibold text-white w-full" onClick={() => { setIsOpen(false); setNameAction('Cute') }}>Мілі дії</div>
                                <div className="bg-color1 bg-opacity-80 backdrop-blur-md px-[46px] py-[6px] text-center text-[16px] font-semibold text-white w-full" onClick={() => { setIsOpen(false); setNameAction('Painful') }}>Болючі дії</div>
                                <div className="bg-color1 bg-opacity-80 backdrop-blur-md px-[46px] py-[6px] rounded-b-[12px] text-center text-[16px] font-semibold text-white w-full" onClick={() => { setIsOpen(false); setNameAction('Lustful') }}>Хтиві дії</div>

                            </>
                            :
                            <>
                                {bodyParts[name]}
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>, modalRootRef.current!) : null;


}

export default ModalEvents;
