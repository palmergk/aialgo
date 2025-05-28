import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { TbNotification } from 'react-icons/tb'
import { PiNotification } from 'react-icons/pi'
import { useAtom } from 'jotai'
import { Apis, UserGetApi, UserPutApi } from '../../../services/API'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { IoMdCheckmarkCircleOutline, IoMdSettings } from 'react-icons/io'
import AdminNotisField from '../../../AdminComponents/AdminNotisField'
import { SlSocialDropbox } from 'react-icons/sl'


const AdminNotis = () => {
    const [notifications, setNotifications] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [showNotis, setShowNotis] = useState(false)
    const [mark, setMark] = useState(false)
    const [dataLoading, setDataloading] = useState(true)
    const toggler = useRef()
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 6
    const totalPages = Math.ceil(notifications.length / perPage)
    const startIndex = (currentPage - 1) * perPage
    const currentNotifications = notifications.slice(startIndex, startIndex + perPage)

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
                setNotifications(response.msg)
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

    const ChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    useEffect(() => {
        if (!dataLoading) {
            if (currentPage > totalPages) return setCurrentPage(currentPage - 1)
        }
    }, [totalPages])


    return (
        <div>
            <>
                <div className={`relative ${showNotis ? 'hidden' : 'flex'}`} onClick={() => setShowNotis(true)}>
                    <div className='flex items-center justify-center border w-9 h-9 rounded-full text-xl text-white border-white cursor-pointer'>
                        <IoNotificationsOutline />
                    </div>
                    <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-[#462c7c] text-[0.65rem] font-extrabold bg-white flex items-center justify-center notisha'  >
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span ><TbNotification /></span>
                        }
                    </div>
                </div>
                <div className={`relative  ${showNotis ? 'flex' : 'hidden'}`}>
                    <div className='flex items-center justify-center border w-9 h-9 rounded-full text-xl text-white border-white cursor-pointer'>
                        <IoNotificationsOutline />
                    </div>
                    <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-[#462c7c] text-[0.65rem] font-extrabold bg-white flex items-center justify-center notisha'  >
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span><PiNotification
                            /></span>
                        }
                    </div>
                </div>
            </>
            <div className={`md:absolute md:top-14 md:right-0 md:left-auto fixed top-0 left-0 md:h-fit h-screen md:w-60 w-full md:bg-[#bdbcbc] bg-white overflow-y-auto md:rounded-sm z-50 ${showNotis ? 'block' : 'hidden'}`} ref={toggler}>
                <div className='text-black flex flex-col md:w-full w-11/12 mx-auto'>
                    <div className='flex justify-between items-center md:px-2 md:pt-3 pt-5'>
                        <div className='flex gap-1 items-center md:text-base text-2xl capitalize font-extrabold'>
                            <div className='cursor-pointer md:hidden' onClick={() => setShowNotis(false)}><FaAngleLeft /></div>
                            <div>notifications</div>
                        </div>
                        <div className='relative'>
                            {dataLoading ?
                                <div className='md:w-5 md:h-5 w-7 h-7 rounded-full md:bg-slate-100 bg-slate-300 animate-pulse'></div>
                                :
                                <div className='rounded-full w-fit h-fit p-1 bg-zinc-300 cursor-pointer md:text-[0.85rem] text-lg' onClick={() => setMark(!mark)}>
                                    <IoMdSettings />
                                </div>
                            }
                            {mark && <div className='w-fit h-fit py-1 px-3 truncate flex items-center justify-center gap-1 bg-white shantf2 font-bold absolute md:top-6 top-8 right-0 rounded-md cursor-pointer z-10 hover:bg-gray-100 md:text-xs text-sm' onClick={MarkAllRead}>
                                <span>Mark all as read</span>
                                <IoMdCheckmarkCircleOutline className='text-[#462c7c]' />
                            </div>}
                        </div>
                    </div>
                    {dataLoading ?
                        <>
                            <div className='pt-1 pb-4 px-2'>
                                {new Array(3).fill(0).map((ele, i) => (
                                    <div key={i} className='w-full h-32 md:bg-slate-100 bg-slate-300 animate-pulse rounded-md md:mt-2 mt-4'></div>
                                ))}
                            </div>
                        </>
                        :
                        <>
                            {notifications.length > 0 ?
                                <>
                                    <div className={`pt-1 pb-4 md:px-2 md:overflow-y-auto scroll ${notifications.length > 3 && 'md:h-[28rem]'}`}>
                                        {currentNotifications.map((item, i) => (
                                            <AdminNotisField key={i} item={item} refetchNotifications={FetchNotifications} refetchUnreadNotis={FetchUnreadNotis} setShowNotis={setShowNotis} />
                                        ))}
                                    </div>
                                    <div className='flex gap-2 items-center text-xs md:p-2 pb-4 justify-end'>
                                        {currentPage > 1 && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer' onClick={() => ChangePage(currentPage - 1)}><FaAngleLeft /></div>}
                                        {totalPages > 1 && <div className='font-bold text-zinc-700'>{currentPage} of {totalPages}</div>}
                                        {currentPage < totalPages && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer' onClick={() => ChangePage(currentPage + 1)}><FaAngleRight /></div>}
                                    </div>
                                </>
                                :
                                <div className='pt-24 md:pt-10 pb-4 flex flex-col gap-2 items-center justify-center'>
                                    <SlSocialDropbox className='md:text-4xl text-6xl' />
                                    <div className='font-semibold text-xl md:text-base'>no notifications...</div>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminNotis