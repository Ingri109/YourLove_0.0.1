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

interface InfoUserProps {
    Userdata: UserInfo;
}

export default function InfoUser({ Userdata }: InfoUserProps ) {
    const t = useTranslations('Account');
    return (
        <>
            <div className="flex flex-col justify-start items-start justify-items-stretch w-full mt-[10px] lg:ml-[20px] lg:mx-0 lg:mt-[0px]">
                <div className="flex flex-row mt-[20px]">
                    <div className="flex-shrink-0 w-[64px] h-[64px] rounded-full mr-[16px] bg-white lg:w-[80px] lg:h-[80px]"></div>
                    <div className="flex flex-col justify-start items-start space-y-1">
                        <h1 className="text-[14px] text-white font-semibold tracking-wide sm:text-[14px]">ID: <span className="text[12px] text-white font-medium sm:text-[16px] sm:font-light">{Userdata.id}</span></h1>
                        <h1 className="text-lg text-white font-semibold tracking-wide sm:text-xl">{t('name')}: <span className="text-[20px] text-white font-semibold sm:text-[22px]">{Userdata.name}</span></h1>
                    </div>
                </div>
                <h2 className="text-[16px] text-white font-semibold tracking-wide mt-[15px] sm:text-[18px]">Email: <span className="text-white font-normal">{Userdata.email}</span></h2>
                <h2 className="text-[16px] text-white font-semibold tracking-wide mt-[10px] sm:text-[18px]">{t('dateOfBirth')}: <span className="text-white font-normal" >{Userdata.age}</span></h2>
                <h2 className="text-[16px] text-white font-semibold tracking-wide mt-[10px] sm:text-[18px]">{t('Gender')}: <span className="text-white font-normal">{Userdata.gender === 'Male' ? t('Men') : Userdata.gender === 'Female' ? t('Women') : Userdata.gender}</span></h2>
            </div>
        </>
    )
}








