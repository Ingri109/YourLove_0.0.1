import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Head = ({ nameAction, onClose }: { nameAction: string, onClose: () => void }) => {
    const [ID, setID] = useState<any>(null);
    const supabase = createClientComponentClient();

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user?.id) {
                    const { data, error } = await supabase.from('users_info').select('id_partner').eq('id', session.user.id).single();
                    if (error) {
                        console.log('Fetch error: ', error);
                    }
                    if (data?.id_partner != null) {
                        console.log(data.id_partner);
                        setID(data.id_partner);
                    }
                }
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [supabase, setID]);

    const addAction = async (action: string) => {
        console.log('Action:', action);
        console.log(ID);
        if (ID) {
            try {
                const { error } = await supabase.from('users_info').update({ LastAction: action }).eq('id', ID);
                if (error) {
                    console.log('Update error: ', error);
                }
            } catch (error) {
                console.log('Error updating data: ', error);
            }
        }
    };

    return (
        <>
            {actionItems.map((action, index) => (
                <>
                    <div key={index}
                        onClick={() => { addAction(action), onClose() }}
                        className={`bg-color1 bg-opacity-80 backdrop-blur-md py-[6px] text-center text-[16px] font-semibold text-white w-full 
                        ${index === 0 ? 'rounded-t-[12px]' : index === actionItems.length - 1 ? 'rounded-b-[12px]' : ''} ${nameAction === 'Painful' ? 'px-[32px]' : 'px-[30px]'}`}>
                        {action}
                    </div>
                </>
            ))}
        </>
    );
}

export default Head;
