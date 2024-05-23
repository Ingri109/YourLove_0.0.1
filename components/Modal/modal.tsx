import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createPortal } from 'react-dom';
import NewName from '../Form/NewName/newName';
import Requests from '../Form/Requests/requests';
import NewPassword from '../Form/NewPassword/newPassword';
import { useRouter } from 'next/navigation';

interface UserInfo {
    age: string | null
    created_at: string
    email: string | null
    gender: string | null
    id: string
    id_partner: string | null
    engaged: boolean
    mood: string | null
    name: string | null
    network: string | null
    "what-does": string | null
}

interface InfoUserProps {
    Userdata: UserInfo[];
}

interface ModalProps {
    Userdata: any;
    chekModel: string;
    onClose: () => void;
    requestsInfo: any;
}

const Modal = ({ Userdata, requestsInfo, chekModel, onClose }: ModalProps) => {
    const backdrop = useRef<HTMLDivElement>(null);
    const modalRootRef = useRef<HTMLDivElement | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [checkSend, setCheckSend] = useState<boolean>(false);
    const supabase = createClientComponentClient();
    const router = useRouter();
    

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

    const acceptRequest = async () => {
        debugger
        if (Userdata[0].id) {
            const { error: error_user } = await supabase.from('users_info').update({ id_partner: requestsInfo.id_partner, engaged: true }).eq('id', requestsInfo.id_user);
            console.log('1')
            const { error: error_partner } = await supabase.from('users_info').update({ id_partner: requestsInfo.id_user, engaged: true }).eq('id', requestsInfo.id_partner);
            console.log('2')
            const { error: error_delete1 } = await supabase.from('requests').delete().eq('id_user', requestsInfo.id_user)
            console.log('3')
            const { error: error_delete2 } = await supabase.from('requests').delete().eq('id_user', requestsInfo.id_partner)
            router.refresh()
        }

    }

    const DelPartner = async () => {
        const { error: error_user } = await supabase.from('users_info').update({ id_partner: null, engaged: false }).eq('id', Userdata.id);
        const { error: error_partner } = await supabase.from('users_info').update({ id_partner: null, engaged: false }).eq('id', Userdata.id_partner);
        router.refresh()
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdrop.current === e.target) {
            onClose();
        }
    };

    const ResetPassworld = async () => {
        try {
            const {data: resetData , error} = await supabase.auth.resetPasswordForEmail(Userdata.email, {
                redirectTo: `${window.location.href}/reset`
            });
            setCheckSend(true)
        } catch (error) {
            console.error('ResetPassworld error:', error);
        }

    }

    const SaveName = async (newName: string) => {
        debugger
        try {
            const { error } = await supabase.from('users_info').update({ name: newName }).eq('id', Userdata.id);
            router.refresh()
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('SaveName error:', error);
        }
    };

    return isMounted ? createPortal(
        <div ref={backdrop} onClick={onClick} className="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black bg-opacity-40 backdrop-blur-[2px] z-20">
            {chekModel === 'Password' &&
                <NewPassword ResetPassworld={ResetPassworld} checkSend={checkSend} />
            }
            {chekModel === 'Name' &&
                <NewName onClose={onClose} SaveName={SaveName} />

            }
            {chekModel === 'Requests' &&
                <form className="flex flex-col justify-center items-center bg-color3 bg-opacity-50 backdrop-blur-2xl rounded-[16px] py-6 px-10 space-y-2 animate-scaleIn">
                    {requestsInfo
                        ?
                        <h1 className='text-white text-[28px] font-extrabold tracking-wider'>У вас немає запрошень</h1>
                        :
                        <>
                            <h1 className='text-white text-[28px] font-extrabold tracking-wider mb-5'>Ваші Запрошення</h1>
                            <Requests requestsInfo={requestsInfo} acceptRequest={acceptRequest} onClose={onClose}></Requests>
                        </>
                    }

                </form>
            }
            {chekModel === 'DelRequests' &&
                <form className="flex flex-col justify-center items-center bg-color3 bg-opacity-50 backdrop-blur-2xl rounded-[16px] py-6 px-6 space-y-2 animate-scaleIn">
                    <h1 className='text-white text-[18px] font-semibold tracking-wider mb-5'>Ви впевнені, що хочете видалити партнера?</h1>
                    <div className='flex justify-center items-center space-x-5'>
                        <button type='button' onClick={() => {DelPartner(), onClose()}} className='text-ivory text-[16px] font-medium px-4 py-2 bg-color4_1 rounded-xl hover:bg-color4_3 shadow-none hover:shadow-[0_1px_30px_2px_rgba(0,0,0,0.30)] hover:shadow-color4_2'>Так, я хочу видалити</button>
                        <button type='button' onClick={onClose} className='text-ivory text-[16px]  font-medium  px-4 py-2 rounded-xl bg-color3_2 hover:bg-color3_1 shadow-none hover:shadow-[0_1px_30px_2px_rgba(0,0,0,0.30)] hover:shadow-color3_2 '>Ні</button>
                    </div>
                </form>
            }

        </div>, modalRootRef.current!) : null;
}

export default Modal
