'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.types";

export default function Chat() {

    const [users, setUser] = useState<object | null>(null);
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (!user) {
                router.push('/login');
            }

        }

        getUser();

    }, [users, router]);


    if (!users) return null;

    return (
        <>

        </>
    );
}