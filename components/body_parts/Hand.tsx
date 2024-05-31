import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Hand = ({ nameAction, onClose }: { nameAction: string, onClose: () => void }) => {
    const [ID, setID] = useState<any>(null);
    const supabase = createClientComponentClient();

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user?.id) {
                    const { data, error } = await supabase.from('users_info').select('id_partner').eq('id', session.user.id).single();
                    if (error) {
                        console.error('Fetch error: ', error);
                    }
                    if (data?.id_partner != null) {
                        console.log(data.id_partner);
                        setID(data.id_partner);
                    }
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
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
                    console.error('Update error: ', error);
                }
            } catch (error) {
                console.error('Error updating data: ', error);
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
                        ${index === 0 ? 'rounded-t-[12px]' : index === actionItems.length - 1 ? 'rounded-b-[12px]' : ''} ${nameAction === 'Painful' ? 'px-[32px]' : 'px-[46px]'}`}>
                        {action}
                    </div>
                </>
            ))}
        </>
    );
}

export default Hand;