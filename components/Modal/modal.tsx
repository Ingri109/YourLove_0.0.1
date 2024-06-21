import { useEffect, useRef, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createPortal } from 'react-dom';
import NewName from '../Form/NewName/newName';
import Requests from '../Form/Requests/requests';
import NewPassword from '../Form/NewPassword/newPassword';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface UserInfo {
    id: string;
    name: string;
    email: string;
    age: string;
    gender: string;
    id_partner: string | null;
    engaged: boolean;
  }
  
  interface RequestInfo {
    id: string;
    id_user: string;
    id_partner: string;
    name_user: string;
    requests_state: boolean;
  }
  
  interface ModalProps {
    Userdata: UserInfo;
    chekModel: string;
    onClose: () => void;
    requestsInfo: RequestInfo[];
  }
  
  const Modal: React.FC<ModalProps> = ({ Userdata, requestsInfo, chekModel, onClose }) => {
    const t = useTranslations('Account');
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
      if (Userdata.id) {
        const { error: error_user } = await supabase
          .from('users_info')
          .update({ id_partner: requestsInfo[0].id_partner, engaged: true })
          .eq('id', requestsInfo[0].id_user);
        console.log('1');
        const { error: error_partner } = await supabase
          .from('users_info')
          .update({ id_partner: requestsInfo[0].id_user, engaged: true })
          .eq('id', requestsInfo[0].id_partner);
        console.log('2');
        const { error: error_delete1 } = await supabase
          .from('requests')
          .delete()
          .eq('id_user', requestsInfo[0].id_user);
        console.log('3');
        const { error: error_delete2 } = await supabase
          .from('requests')
          .delete()
          .eq('id_user', requestsInfo[0].id_partner);
        router.refresh();
      }
    };
  
    const DelPartner = async () => {
      const { error: error_user } = await supabase
        .from('users_info')
        .update({ id_partner: null, engaged: false })
        .eq('id', Userdata.id);
      const { error: error_partner } = await supabase
        .from('users_info')
        .update({ id_partner: null, engaged: false })
        .eq('id', Userdata.id_partner);
      router.refresh();
    };
  
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (backdrop.current === e.target) {
        onClose();
      }
    };
  
    const ResetPassword = async () => {
      try {
        const { data: resetData, error } = await supabase.auth.resetPasswordForEmail(
          Userdata.email,
          {
            redirectTo: `${window.location.href}/reset`,
          }
        );
        setCheckSend(true);
      } catch (error) {
        console.log('ResetPassword error:', error);
      }
    };
  
    const SaveName = async (newName: string) => {
      try {
        const { error } = await supabase
          .from('users_info')
          .update({ name: newName })
          .eq('id', Userdata.id);
        router.refresh();
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log('SaveName error:', error);
      }
    };
  
    return isMounted
      ? createPortal(
          <div
            ref={backdrop}
            onClick={onClick}
            className="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black bg-opacity-40 backdrop-blur-[2px] z-20"
          >
            {chekModel === 'Password' && <NewPassword ResetPassword={ResetPassword} checkSend={checkSend} />}
            {chekModel === 'Name' && <NewName onClose={onClose} SaveName={SaveName} />}
            {chekModel === 'Requests' && (
              <form className="flex flex-col justify-center items-center w-11/12 py-4 px-1 bg-color3 bg-opacity-50 backdrop-blur-2xl rounded-[16px] animate-scaleIn lg:w-auto md:w-10/12 md:py-5 md:px-8">
                {requestsInfo.length > 0 ? (
                  <>
                    <h1 className="text-white text-[24px] font-extrabold tracking-wider mb-5 md:text-[28px] sm:text-[26px]">
                    {t('YourInvitation')}
                    </h1>
                    <Requests requestsInfo={requestsInfo} acceptRequest={acceptRequest} onClose={onClose} />
                  </>
                ) : (
                  <h1 className="text-white text-[28px] font-extrabold tracking-wider">
                   {t('NotInvitation')}
                  </h1>
                )}
              </form>
            )}
            {chekModel === 'DelRequests' && (
              <form className="flex flex-col justify-center items-center w-11/12 bg-color3 bg-opacity-50 backdrop-blur-2xl rounded-[16px] py-6 px-3 space-y-2 animate-scaleIn md:px-6 md:w-auto sm:w-9/12">
                <h1 className="text-white text-[18px] text-center w-full font-semibold tracking-wider mb-3 md:mb-4 md:w-auto">
                {t('DelParnter')}
                </h1>
                <div className="flex justify-center items-center space-x-3 md:space-x-5">
                  <button
                    type="button"
                    onClick={() => {
                      DelPartner(), onClose();
                    }}
                    className="text-ivory text-[14px] font-medium px-3 py-1 bg-color4_1 rounded-lg hover:bg-color4_3 shadow-none hover:shadow-[0_1px_30px_2px_rgba(0,0,0,0.30)] hover:shadow-color4_2 md:rounded-xl md:text-[16px] md:px-4 md:py-2"
                  >
                   {t('DelParnterYes')}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-ivory text-[14px] font-medium px-3 py-1 rounded-lg bg-color3_2 hover:bg-color3_1 shadow-none hover:shadow-[0_1px_30px_2px_rgba(0,0,0,0.30)] hover:shadow-color3_2 md:rounded-xl md:text-[16px] md:px-4 md:py-2"
                  >
                    {t('DelParnterNo')}
                  </button>
                </div>
              </form>
            )}
          </div>,
          modalRootRef.current!
        )
      : null;
  };
export default Modal
