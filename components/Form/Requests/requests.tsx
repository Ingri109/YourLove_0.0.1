interface RequestInfo {
    name_user: string; 
}

interface AccountProps {
    requestsInfo: RequestInfo[];
    acceptRequest: () => void;
}

const Requests: React.FC<AccountProps> = ({ requestsInfo, acceptRequest }) => {

    return requestsInfo.map((requestInfo) => (
        <div className="flex flex-col justify-start items-start bg-[#E6BBD0] px-2 py-3 rounded-md shadow-xl text-pretty transition ease-in-out delay-100 hover:scale-105 hover:bg-[#F1D5E3] duration-500 w-[520px]" key={requestInfo.name_user}>
            <h1 className="text-color3 text-[22px] font-bold">Нове запрошеня на створення пари</h1>
            <h2 className="text-[16px] font-medium text-black">Користувач під іменем <span className="text-color4_1 text-[18px] font-bold ">{requestInfo.name_user}</span> хоче створити з вами пару, чи хочете ви додати його?</h2>
            <div className="flex flex-row justify-end items-center w-full">
                <button className="bg-color4_3 bg-opacity-70 rounded-xl text-white text-[16px] font-medium px-3 p-1 mr-[20px] shadow-[0_0_16px_2px_rgba(0,0,0,0.30)] shadow-color4 transition-all delay-100 duration-200 hover:bg-color2 hover:bg-opacity-80 hover:shadow-[0_0_30px_2px_rgba(0,0,0,0.40)] hover:shadow-color1_3" onClick={acceptRequest}>Добавити</button>
            </div>
        </div>
    ))
}

export default Requests;