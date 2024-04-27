import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const UpdatePassword = async () => {
    const new_password = '111222333';
    const supabase = createServerComponentClient({cookies})
    await supabase.auth.updateUser({ password: new_password })
    return(
        <>
        <div className=""></div>
        </>
    )
}

export default UpdatePassword;