const Hand = ({ nameAction }: { nameAction: string }) => {
    const actions: { [key: string]: string[] } = {
        'Cute': [
            'Взяти за руку',
            'Обянти за руку',
            'Ніжно щіпнути',
        ],
        'Painful': [
            'Вкусити за палекь',
            'Вкусити за руку',
            'Боляче щіпнути',
            'Вдарити',
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
                        ${index === 0 ? 'rounded-t-[12px]' : index === actionItems.length - 1 ? 'rounded-b-[12px]' : ''} ${nameAction === 'Painful' ? 'px-[32px]': 'px-[46px]'}`}>
                        {action}
                    </div>
                </>
            ))}
        </>
    );
}

export default Hand;