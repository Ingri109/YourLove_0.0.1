import { useState } from "react";
import { useTranslations } from 'next-intl';


function NewName({ onClose, SaveName }: { onClose: () => void, SaveName: (newName: string) => void }) {
    const [newName, setNewName] = useState('');
    const [message, setMessage] = useState('');
    const t = useTranslations('Account');

    const onSaveName = () => {
        const trimmedName = newName.trim(); 
        if (trimmedName === '') {
            setMessage(t('ModalNewNameMessage1'));
        } else if (trimmedName.length < 4) {
            setMessage(t('ModalNewNameMessage2'));
        } else {
            SaveName(trimmedName);
            onClose();
        }
    }

    return (
        <form className="flex flex-col justify-center items-center bg-color3 bg-opacity-50 backdrop-blur-2xl rounded-[16px] py-6 px-10 animate-scaleIn">
            <h1 className="text-center text-color4_2 text-[30px] font-extrabold tracking-normal ">{t('ModalNewNameTitle')}</h1>
            <div className="flex flex-col justify-center space-y-0.5 w-full mt-[12px]">
                <p className="text-white text-left text-wrap text-[16px] font-semibold">{t('ModalNewNameContent1')}</p>
                <p className="text-color3_2 text-center text-wrap text-[14px] font-medium">{t('ModalNewNameContent2')}</p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-[0.5px] mt-[18px] w-full relative mb-[25px]">
                <input type="text" name="name" value={newName} onSubmit={onSaveName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" className="from__field_newName bg-transparent outline-none border-[2px] rounded-md border-color3_2 text-white px-2 py-2 text-[16px] font-medium placeholder:text-transparent" />
                <label className="from__label_newName border-[2px] rounded-[4px] bg-color3_3 border-color3_2 left-20 top-[-12px] absolute block text-white text-[12px] transition-[5.0s]">{t('ModalNewName')}</label>
                {message && <p className="text-color1_2">{message}</p>}
            </div>
           
            <button type="button" onClick={onSaveName} className="bg-color1 bg-opacity-80 backdrop-blur-md text-white text-[18px] font-semibold px-[60px] py-[6px] rounded-[14px] transition-all duration-200 delay-150 ease-out shadow-[0_0px_24px_2px_rgba(0,0,0,0.20)] shadow-color2_2  hover:bg-color1 hover:bg-opacity-60 hover:backdrop-blur-m hover:shadow-[0px_0px_40px_4px_rgba(0,0,0,0.30)] hover:shadow-color2_2">{t('ModalNewNameSave')}</button>
        </form>

    )
}

export default NewName;