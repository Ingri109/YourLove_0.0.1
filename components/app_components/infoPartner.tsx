import { useTranslations } from 'next-intl';

interface PartnerInfo {
    id: string;
    name: string;
    age: string;
    gender: string;
    id_partner: string | null;
    engaged: boolean;
  }

interface InfoUserProps {
    partnerData: PartnerInfo  ;
}

const InfoPartner = ({ partnerData }: InfoUserProps) => {
    const t = useTranslations('Account');

    return (
        <>
            <div className="basis-0 flex flex-col justify-start items-start w-full mx-2 px-[16px] mt-[10px] lg:px-[12px] lg:mx-0 lg:basis-1/2 lg:mt-[0px]">
                <div className="flex flex-row items-center space-x-4 mt-[20px]">
                    <div className="flex-shrink-0 w-[64px] h-[64px] rounded-full bg-white lg:w-[80px] lg:h-[80px]"></div>
                    <div className="flex flex-col justify-start items-start space-y-1">
                        <h1 className="text-[14px] text-white font-semibold tracking-wide sm:text-[14px]">ID: <span className="text[12px] text-white font-medium sm:text-[16px] sm:font-light">{partnerData.id}</span></h1>
                        <h1 className="text-lg text-white font-semibold tracking-wide sm:text-xl">{t('name')}: <span className="text-[20px] text-white font-semibold sm:text-[22px]">{partnerData.name}</span></h1>
                    </div>
                </div>
                <h2 className="text-[16px] text-white font-semibold tracking-wide mt-[10px] sm:text-[18px]">{t('dateOfBirth')}: <span className="text-white font-normal" >{partnerData.age}</span></h2>
                <h2 className="text-[16px] text-white font-semibold tracking-wide mt-[10px] sm:text-[18px]">{t('Gender')}: <span className="text-white font-normal">{partnerData.gender === 'Male' ? t('Men') : partnerData.gender === 'Female' ? t('Women') : null}</span></h2>
            </div>
        </>
    )
}

export default InfoPartner;