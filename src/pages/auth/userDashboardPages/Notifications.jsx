import React, { useEffect, useRef, useState } from 'react'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { useAtom } from 'jotai'
import { IoMdSettings, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbNotification } from "react-icons/tb";
import { PiNotification } from "react-icons/pi"
import { IoNotificationsOutline } from 'react-icons/io5';
import { Apis, UserPutApi } from '../../../services/API';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import nothnyet from '../../../assets/images/nothn.png'
import NotisField from '../../../UserComponents/NotisField';



const Notifications = ({ refetchUnreadNotis, refetchNotifications }) => {
    const [notis] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [mark, setMark] = useState(false)
    const [showNotis, setShowNotis] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)

    const toggler = useRef()

    useEffect(
        () => {
            if (toggler) {
                window.addEventListener('click', (event) => {
                    if (toggler.current !== null) {
                        if (!toggler.current.contains(event.target)) {
                            setShowNotis(false)
                        }
                    }
                }, true)
            }
        }, []
    )

    const MarkAllRead = async () => {
        try {
            const response = await UserPutApi(Apis.notification.update_all)
            if (response.status === 200) {
                refetchNotifications()
                setUnreadNotis(0)
            }
        } catch (error) {
        }
    }

    let MoveNotisPage = () => {

        if (end < notis.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend += 6
            setEnd(altend)
            altstart += 6
            setStart(altstart)
            altlengthstart += 1
            setpagestart(altlengthstart)
        }
    }

    let BackNotisPage = () => {

        if (end > 6) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend -= 6
            setEnd(altend)
            altstart -= 6
            setStart(altstart)
            altlengthstart -= 1
            setpagestart(altlengthstart)
        }
    }

    return (
        <div className='relative'>
            <>
                <div className={`relative ${showNotis ? 'hidden' : 'flex'}`} onClick={() => { setShowNotis(true); setpageend(notis.length / 6) }}>
                    <div className='flex items-center justify-center border w-9 h-9 rounded-full text-xl text-light border-light cursor-pointer'>
                        <IoNotificationsOutline />
                    </div>
                    <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-white text-[0.65rem] font-bold bg-light flex items-center justify-center shlz'  >
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span ><TbNotification /></span>
                        }
                    </div>
                </div>
                <div className={`relative  ${showNotis ? 'flex' : 'hidden'}`}>
                    <div className='flex items-center justify-center border w-9 h-9 rounded-full text-xl text-light border-light cursor-pointer'>
                        <IoNotificationsOutline />
                    </div>
                    <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-white text-[0.65rem] font-bold bg-light flex items-center justify-center shlz'  >
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span><PiNotification
                            /></span>
                        }
                    </div>
                </div>
            </>
            <div className={`md:absolute md:top-12 md:-right-4 md:left-auto md:w-60 md:rounded-sm fixed top-0 left-0 md:h-fit h-screen overflow-y-auto w-full bg-white z-50 ${showNotis ? 'block' : 'hidden'}`} ref={toggler}>
                <div className='text-black flex flex-col relative'>
                    <div className='flex justify-between items-center px-2 md:pt-3 pt-5'>
                        <div className='flex gap-1 items-center md:text-base text-2xl capitalize font-[800]'>
                            <div className='cursor-pointer md:hidden' onClick={() => setShowNotis(false)}><FaAngleLeft /></div>
                            <div>notifications</div>
                        </div>
                        <div className='relative'>
                            <div className='rounded-full w-fit h-fit p-1 bg-[#b4b3b3] cursor-pointer md:text-[0.85rem] text-lg' onClick={() => setMark(!mark)}>
                                <IoMdSettings />
                            </div>
                            {mark && <div className='w-fit h-fit py-1 px-3 truncate flex items-center justify-center gap-1 bg-white shantf2 font-bold absolute md:top-6 top-8 right-0 rounded-md cursor-pointer z-20 hover:bg-[#f1f1f1] md:text-xs text-sm' onClick={MarkAllRead}>
                                <span>Mark all as read</span>
                                <IoMdCheckmarkCircleOutline className='text-light' />
                            </div>}
                        </div>
                    </div>
                    {notis.length > 0 ?
                        <div className={`pt-1.5 pb-4 px-2 ${notis.length > 3 && 'md:h-[28rem]'} overflow-y-auto scroll`}>
                            {notis.slice(start, end).map((item, i) => (
                                <NotisField key={i} item={item} refetchNotifications={refetchNotifications} refetchUnreadNotis={refetchUnreadNotis} start={start} setStart={setStart} end={end} setEnd={setEnd} pagestart={pagestart} setpagestart={setpagestart} setpageend={setpageend} setShowNotis={setShowNotis} />
                            ))}
                        </div>
                        :
                        <div className='pt-24 md:pt-12 pb-4 flex flex-col gap-2 items-center justify-center'>
                            <img src={nothnyet} className='md:h-20 h-48 w-auto'></img>
                            <div className='font-semibold text-xl md:text-base'>No notifications...</div>
                        </div>
                    }
                </div>
                {notis.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm md:p-2 px-2 pb-4 justify-end'>
                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer' onClick={BackNotisPage}><FaAngleLeft /></div>}
                    {Math.ceil(pageend) > 1 && <div className='font-bold text-zinc-700'>{pagestart} of {Math.ceil(pageend)}</div>}
                    {end < notis.length && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer' onClick={MoveNotisPage}><FaAngleRight /></div>}
                </div>}
            </div>
        </div>
    )
}

export default Notifications