import { useTranslations } from 'next-intl';

interface RequestInfo {
    name_user: string; 
}

interface AccountProps {
    requestsInfo: RequestInfo[];
    acceptRequest: () => void;
    onClose: () => void;
}

const Requests: React.FC<AccountProps> = ({ requestsInfo, acceptRequest,onClose }) => {
    const t = useTranslations('Account');
    return requestsInfo.map((requestInfo) => (
        <div className="flex flex-col justify-start items-start bg-[#E6BBD0] w-11/12 py-3 px-4 rounded-md shadow-xl text-pretty transition ease-in-out delay-100 hover:scale-105 hover:bg-[#F1D5E3] duration-500 xl:w-auto lg:w-11/12 md:w-10/12 md:py-6 md:px-10" key={requestInfo.name_user}>
            <h1 className="text-color3 text-[18px] font-bold md:text-[22px] sm:text-[20px]">{t('NewInvitation')}</h1>
            <h2 className="text-[14px] font-medium text-black md:text-[16px]">{t('InvitationContent1')}  <span className="text-color4_1 text-[16px] font-bold md:text-[18px]">{requestInfo.name_user}</span> {t('InvitationContent2')}</h2>
            <div className="flex flex-row justify-end items-center w-full mt-[10px] md:mt-[18px]">
                <button type="button" className="bg-color4_3 bg-opacity-70 rounded-xl text-white text-[16px] font-medium px-3 p-1 mr-[20px] shadow-[0_0_16px_2px_rgba(0,0,0,0.30)] shadow-color4 transition-all delay-100 duration-200 hover:bg-color2 hover:bg-opacity-80 hover:shadow-[0_0_30px_2px_rgba(0,0,0,0.40)] hover:shadow-color1_3" onClick={() => {acceptRequest(), onClose()}}>{t('InvitationAddPartner')}</button>
            </div>
        </div>
    ))
}

export default Requests;