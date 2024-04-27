interface UserInfo {
    age: string | null
    created_at: string
    email: string | null
    gender: string | null
    id: string
    id_partner: string | null
    engaged: boolean
    mood: string | null
    name: string | null
    network: string | null
    "what-does": string | null
}

interface InfoUserProps {
    Userdata: UserInfo[];
}

export default function InfoUser({ Userdata }: InfoUserProps) {
    return (
        <>
            <div className="flex flex-row space-x-4 mt-[20px]">
                <div className="w-[80px] h-[80px] rounded-full bg-white border border-color4"></div>
                <div className="flex flex-col justify-start items-start space-y-1">
                    <h1 className="text-[16px] text-white font-semibold tracking-wide">ID: <span className="text-base text-white font-medium">{Userdata[0].id}</span></h1>
                    <h1 className="text-xl text-white font-semibold tracking-wide">Name: <span className="text-[22px] text-white font-semibold ">{Userdata[0].name}</span></h1>
                </div>
            </div>
            <h2 className="text-[18px] text-white font-semibold tracking-wide mt-[15px]">Email: <span className="text-[18px] text-white font-normal">{Userdata[0].email}</span></h2>
            <h2 className="text-[18px] text-white font-semibold tracking-wide mt-[10px]">Дата народження: <span className="text-[18px] text-white font-normal" >{Userdata[0].age}</span></h2>
            <h2 className="text-[18px] text-white font-semibold tracking-wide mt-[10px]">Стать: <span className="text-[18px] text-white font-normal">{Userdata[0].gender === 'Male' ? 'Чоловіча' : Userdata[0].gender === 'Female' ? 'Жіноча' : Userdata[0].gender}</span></h2>

        </>

    )
}








