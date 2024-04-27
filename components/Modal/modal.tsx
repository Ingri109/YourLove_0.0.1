import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createPortal } from 'react-dom';
import NewName from '../Form/NewName/newName';
import Requests from '../Form/Requests/requests';
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

const Modal = ({ Userdata, requestsInfo, chekModel, onClose }: { Userdata: InfoUserProps, chekModel: string; onClose: () => void }) => {
    const backdrop = useRef<HTMLDivElement>(null);
    const modalRootRef = useRef<HTMLDivElement | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState('');
    const [chekPassword, setChekPassword] = useState(true);
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
        const { error: error_user } = await supabase.from('users_info').update({ id_partner: requestsInfo[0].id_partner, engaged: true }).eq('id', requestsInfo[0].id_user);
        const { error: error_partner } = await supabase.from('users_info').update({ id_partner: requestsInfo[0].id_user, engaged: true }).eq('id', requestsInfo[0].id_partner);
        const { error: error_delete1 } = await supabase.from('requests').delete().eq('id_user', Userdata[0].id)
        const { error: error_delete2 } = await supabase.from('requests').delete().eq('id_user', Userdata[0].id_partner)

    }

    const DelPartner = async () => {
        const { error: error_user } = await supabase.from('users_info').update({ id_partner: null, engaged: false }).eq('id', Userdata[0].id);
        const { error: error_partner } = await supabase.from('users_info').update({ id_partner: null, engaged: false }).eq('id', Userdata[0].id_partner);
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdrop.current === e.target) {
            onClose();
        }
    };

    const ResetPassworld = async () => {
        await supabase.auth.resetPasswordForEmail(Userdata[0].email, {
            redirectTo: 'http://localhost:3000/account/update-password',
        })

    }

    const SaveName = async (newName: string) => {
        try {
            const { error } = await supabase.from('users_info').update({ name: newName }).eq('id', Userdata[0].id);
            router.refresh()
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('SaveName error:', error);
        }
    };
    

    debugger
    console.log()

    return isMounted ? createPortal(
        <div ref={backdrop} onClick={onClick} className="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black bg-opacity-40 z-20">
            {chekModel === 'Password' &&
                <form className="flex flex-col justify-center items-center bg-color3 bg-opacity-20 backdrop-blur-2xl rounded-[16px] py-6 px-10 space-y-2 animate-scaleIn">
                    <h1 className="text-center text-white text-[28px] font-bold tracking-normal mt-[10px]">Змінити пароль</h1>
                    <div className="flex flex-col justify-center space-y-2 mt-[30px]">
                        <div className="flex flex-col justify-center items-start space-y-[0.5]px ">
                            <p className="text-center text-white text-[14px] font-bold tracking-tight ml-[10px]">Ведіть новий пароль</p>
                            <input type="password" placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} className=" bg-color5 border border-color4 rounded-[12px] text-black text-center py-[1px] px-[2px]"></input>
                        </div>
                    </div>
                    <button type="button" onClick={ResetPassworld} className={`flex items-center bg-color2 px-[20px] py-[3px] border-2 border-color4 rounded-[14px] text-color4 text-center text-[16px] font-semibold transition ease-in-out delay-150`}>Зберегти</button>
                </form>
            }
            {chekModel === 'Name' &&
                    <NewName onClose={onClose} SaveName={SaveName}/>
                
            }
            {chekModel === 'Requests' &&
                <form className="flex flex-col justify-center items-center bg-color3 bg-opacity-20 backdrop-blur-2xl rounded-[16px] py-6 px-10 space-y-2 animate-scaleIn">
                    {requestsInfo.length === 0
                        ?
                        <h1 className='text-white text-[28px] font-extrabold tracking-wider'>У вас немає запрошень</h1>
                        :
                        <>
                            <h1 className='text-white text-[28px] font-extrabold tracking-wider mb-5'>Ваші Запрошення</h1>
                            <Requests requestsInfo={requestsInfo} acceptRequest={acceptRequest}></Requests>
                        </>
                    }

                </form>
            }
            {chekModel === 'DelRequests' &&
                <form className="flex flex-col justify-center items-center bg-color3 bg-opacity-20 backdrop-blur-2xl rounded-[16px] py-6 px-6 space-y-2 animate-scaleIn">
                    <h1 className='text-white text-[18px] font-semibold tracking-wider mb-5'>Ви впевнені, що хочете видалити партнера?</h1>
                    <div className='flex justify-center items-center space-x-5'>
                        <button onClick={DelPartner} className='text-ivory text-[16px] font-medium px-4 py-2 bg-color4_1 rounded-xl hover:bg-color4_3 shadow-none hover:shadow-[0_1px_30px_2px_rgba(0,0,0,0.30)] hover:shadow-color4_2'>Так, я хочу видалити</button>
                        <button onClick={onClose} className='text-ivory text-[16px]  font-medium  px-4 py-2 rounded-xl bg-color3_2 hover:bg-color3_1 shadow-none hover:shadow-[0_1px_30px_2px_rgba(0,0,0,0.30)] hover:shadow-color3_2 '>Ні</button>
                    </div>
                </form>
            }

        </div>, modalRootRef.current!) : null;
}

export default Modal