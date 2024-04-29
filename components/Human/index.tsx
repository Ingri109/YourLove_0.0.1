'use client'
import { useState, useRef, useEffect } from 'react';
import ModalEvents from '../ModalEvent';


const Human = () => {
    const [openModalEvent, setOpenModalEvent] = useState<boolean>(false);
    const [nameModal, setNameModal] = useState<string>('');
   
    return (
        <>
            <div className="flex flex-col justify-center items-center w-[500px] h-[600px] mr-[50px] ">
                {/*head*/}
                <div className="bg-black rounded-full w-[98px] h-[98px] shadow-[4px_6px_4px_1px_rgba(0,0,0,0.3)]" onClick={() => { setOpenModalEvent(true); setNameModal('Head') }}></div>
                <div className="flex flex-row justify-start items-start mt-[10px]">
                    {/*left hand*/}
                    <div className="bg-black w-[45px] h-[182px] rounded-b-[40px] rounded-tl-[80px] shadow-[4px_6px_4px_1px_rgba(0,0,0,0.3)] no-shadow" onClick={() => { setOpenModalEvent(true); setNameModal('Left Hand') }}></div>
                    <div id="item1" className="bg-black w-[12px] h-[40px] z-10 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.2)]" onClick={() => { setOpenModalEvent(true); setNameModal('Left Hand') }}></div>
                    {/*body*/}
                    <div className="bg-black w-[122px] h-[194px] shadow-[4px_4px_4px_1px_rgba(0,0,0,0.3)] no-shadow" onClick={() => { setOpenModalEvent(true); setNameModal('Body') }}></div>
                    {/*right hand*/}
                    <div id="item2" className="bg-black w-[12px] h-[40px] z-10 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.2)]" onClick={() => { setOpenModalEvent(true); setNameModal('Right Hand') }}></div>
                    <div className="bg-black w-[45px] h-[182px] rounded-b-[40px] rounded-tr-[80px] shadow-[4px_6px_4px_1px_rgba(0,0,0,0.3)] no-shadow" onClick={() => { setOpenModalEvent(true); setNameModal('Right Hand') }}></div>
                </div>
                <div className="flex flex-row justify-between items-center space-x-[15px]">
                    {/*left leg*/}
                    <div className="bg-black w-[54px] h-[194px] rounded-b-[40px] shadow-[4px_6px_4px_1px_rgba(0,0,0,0.3)]" onClick={() => { setOpenModalEvent(true); setNameModal('Left Leg') }}></div>
                    {/*right leg*/}
                    <div className="bg-black w-[54px] h-[194px] rounded-b-[40px] shadow-[4px_6px_4px_1px_rgba(0,0,0,0.3)]" onClick={() => { setOpenModalEvent(true); setNameModal('Right Leg') }}></div>
                </div>
            </div>
            {openModalEvent && <ModalEvents name={nameModal} onClose={() => { setOpenModalEvent(false); setNameModal('') }} />}
        </>
    );
}

export default Human;