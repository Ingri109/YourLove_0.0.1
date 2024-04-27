import React from "react";

const Leg = ({ nameAction }: { nameAction: string }) => {
    const actions: { [key: string]: string[] } = {
        'Cute': [
            'Лягти на ляшку',
            'Легенько шльопнути',
            'Жмякати ляшки',
        ],
        'Painful': [
            'Копнути',
            'Вдрити по жопі',
            'Вкусити за ляшку',
            'Щіпнути',
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
                <div key={index}
                    className={`bg-color1 bg-opacity-80 backdrop-blur-md py-[6px] text-center text-[16px] font-semibold text-white w-full 
                        ${index === 0 ? 'rounded-t-[12px]' : index === actionItems.length - 1 ? 'rounded-b-[12px]' : ''} ${nameAction === 'Painful' ? 'px-[32px]' : 'px-[46px]'}`}>
                    {action}
                </div>
            ))}
        </>
    );
}

export default Leg;