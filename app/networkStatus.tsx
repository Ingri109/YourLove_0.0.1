'use client';

import { useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const NetworkStatus = () => {
    const supabase = createClientComponentClient();
    // useEffect(() => {

    //     

    //     const handleOnline = () => {
    //         updateStatus('online');
    //     };

    //     const handleOffline = () => {
    //         updateStatus('offline');
    //     };

    //     window.addEventListener('online', handleOnline);
    //     window.addEventListener('offline', handleOffline);

    //     updateStatus(navigator.onLine ? 'online' : 'offline');

    //     return () => {
    //         window.removeEventListener('online', handleOnline);
    //         window.removeEventListener('offline', handleOffline);
    //     };
    // }, [supabase]);



    // useEffect(() => {
        
    // }, [supabase])




    

    // const updateStatus = async (status: string) => {
    //             const { data: { session } } = await supabase.auth.getSession();
    //             if (session?.user?.id) {
    //                 const { error } = await supabase.from('users_info').update({ network: status }).eq('id', session.user.id);
    //                 if (error) {
    //                     console.log('Update error: ', error);
    //                 }
    //             }
    //         };


    // const roomOne = supabase.channel('room_01')
    //     const roomTwo = supabase.channel('room_02')
    //     const userStatus = {
    //         user: 'user-1',
    //         online_at: new Date().toISOString(),
    //     }

    //     roomOne.on('presence', { event: 'sync' }, () => {
    //         const newState = roomOne.presenceState()
    //         console.log('sync', newState)
    //     }).on('presence', { event: 'join' }, ({ key, newPresences }) => {
    //             updateStatus('onli')
    //             console.log('join', key, newPresences)
    //         })
    //         .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    //             debugger
    //             console.log('leave', key, leftPresences)
    //             updateStatus('off')
    //         })
    //         .subscribe()


    //     roomTwo.subscribe(async (status) => {
    //         if (status !== 'SUBSCRIBED') { return }

    //         const presenceTrackStatus = await roomOne.track(userStatus)
    //         console.log(presenceTrackStatus)
    //     })

    //     const untrackPresence = async () => {
            
    //         const presenceUntrackStatus = await roomOne.untrack()
    //         console.log(presenceUntrackStatus)
    //       }
          
    //       untrackPresence()



    return null;
};

export default NetworkStatus;
