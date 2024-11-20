import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { useAtom } from 'jotai'
import { IoMdSettings, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbNotification } from "react-icons/tb";
import { PiNotification } from "react-icons/pi"
import { IoNotificationsOutline } from 'react-icons/io5';
import { Apis, UserGetApi, UserPutApi } from '../../../services/API';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import NotisField from '../../../UserComponents/NotisField';
import { SlSocialDropbox } from 'react-icons/sl';


const Notifications = () => {
    const [notis, setNotis] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [mark, setMark] = useState(false)
    const [showNotis, setShowNotis] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)
    const [dataLoading, setDataloading] = useState(true)
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

    const FetchNotifications = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.notification.user_notifications)
            if (response.status === 200) {
                setNotis(response.msg)
            }
        } catch (error) {
            //
        } finally {
            setDataloading(false)
        }
    }, [])

    useEffect(() => {
        FetchNotifications()
    }, [FetchNotifications])

    const FetchUnreadNotis = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.notification.unread_notis)
            if (response.status === 200) {
                setUnreadNotis(response.msg)
            }
        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchUnreadNotis()
    }, [FetchUnreadNotis])

    const MarkAllRead = async () => {
        try {
            const response = await UserPutApi(Apis.notification.update_all)
            if (response.status === 200) {
                setUnreadNotis(0)
                FetchNotifications()
            }
        } catch (error) {
        }
    }

    let MovePage = () => {
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

    let BackPage = () => {
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
        <div>
            <>
                <div className={`relative ${showNotis ? 'hidden' : 'flex'}`} onClick={() => { setShowNotis(true); setpageend(notis.length / 6) }}>
                    <div className='flex items-center justify-center border w-9 h-9 rounded-full text-xl text-light border-light cursor-pointer'>
                        <IoNotificationsOutline />
                    </div>
                    <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-white text-[0.65rem] font-bold bg-light flex items-center justify-center notisha2'  >
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
                    <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-white text-[0.65rem] font-bold bg-light flex items-center justify-center notisha2'  >
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span><PiNotification
                            /></span>
                        }
                    </div>
                </div>
            </>
            <div className={`md:absolute md:top-14 md:right-0 md:left-auto fixed top-0 left-0 md:w-60 w-full md:h-fit h-screen bg-white overflow-y-auto md:rounded-sm z-50 ${showNotis ? 'block' : 'hidden'}`} ref={toggler}>
                <div className='text-black flex flex-col relative'>
                    <div className='flex justify-between items-center px-2 md:pt-3 pt-5'>
                        <div className='flex gap-1 items-center md:text-base text-2xl capitalize font-extrabold'>
                            <div className='cursor-pointer md:hidden' onClick={() => setShowNotis(false)}><FaAngleLeft /></div>
                            <div>notifications</div>
                        </div>
                        <div className='relative'>
                            <div className='rounded-full w-fit h-fit p-1 bg-zinc-300 cursor-pointer md:text-[0.85rem] text-lg' onClick={() => setMark(!mark)}>
                                <IoMdSettings />
                            </div>
                            {mark && <div className='w-fit h-fit py-1 px-3 truncate flex items-center justify-center gap-1 bg-white shantf2 font-bold absolute md:top-6 top-8 right-0 rounded-md cursor-pointer z-10 hover:bg-gray-100 md:text-xs text-sm' onClick={MarkAllRead}>
                                <span>Mark all as read</span>
                                <IoMdCheckmarkCircleOutline className='text-light' />
                            </div>}
                        </div>
                    </div>
                    {dataLoading ?
                        <>
                            <div className='pt-1 pb-4 px-2'>
                                {new Array(3).fill(0).map((ele, i) => (
                                    <div key={i} className='w-full h-32 bg-slate-300 animate-pulse rounded-md md:mt-2 mt-4'></div>
                                ))}
                            </div>
                        </>
                        :
                        <>
                            {notis.length > 0 ?
                                <div className={`pt-1 pb-4 px-2 ${notis.length > 3 && 'md:h-[28rem]'} overflow-y-auto scroll`}>
                                    {notis.slice(start, end).map((item, i) => (
                                        <NotisField key={i} item={item} refetchNotifications={FetchNotifications} refetchUnreadNotis={FetchUnreadNotis} start={start} setStart={setStart} end={end} setEnd={setEnd} pagestart={pagestart} setpagestart={setpagestart} setpageend={setpageend} setShowNotis={setShowNotis} />
                                    ))}
                                </div>
                                :
                                <div className='pt-24 md:pt-10 pb-4 flex flex-col gap-2 items-center justify-center'>
                                    <SlSocialDropbox className='md:text-4xl text-6xl' />
                                    <div className='font-semibold text-xl md:text-base'>no notifications...</div>
                                </div>
                            }
                        </>
                    }
                </div>
                {notis.length > 0 && <div className='flex gap-2 items-center text-xs md:p-2 px-2 pb-4 justify-end'>
                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                    {Math.ceil(pageend) > 1 && <div className='font-bold text-zinc-700'>{pagestart} of {Math.ceil(pageend)}</div>}
                    {end < notis.length && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                </div>}
            </div>
        </div>
    )
}

export default Notifications