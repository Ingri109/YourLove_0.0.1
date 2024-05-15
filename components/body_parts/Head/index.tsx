import { Fragment } from "react";


const Head = ({ nameAction }: {nameAction: string}) => {
    const actions: { [key: string]: string[] } = {
        'Cute': [
            'Поцілувати в губи',
            'Поцілувати в щоку',
            'Погладити по голові',
            'Пощупати щочку',
        ],
        'Painful': [
            'Дати підзатильник',
            'Вдарити по щоці',
            'Вкусити за щоку',
            'Вдарити по голові',
        ],
        'Lustful': [
            '-------',
            '-------',
            '-------',
            '-------',
        ],
    };

    const actionItems = actions[nameAction] || [];

    return (
        <>
            {actionItems.map((action, index) => (
                <>
                     <div key={index}
                        className={`bg-color1 bg-opacity-80 backdrop-blur-md py-[6px] text-center text-[16px] font-semibold text-white w-full 
                        ${index === 0 ? 'rounded-t-[12px]' : index === actionItems.length - 1 ? 'rounded-b-[12px]' : ''} ${nameAction === 'Painful' ? 'px-[32px]': 'px-[30px]'}`}>
                        {action}
                    </div>
                </>
            ))}
        </>
    );
}

export default Head;
