import React, { useEffect, useRef, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { TbNotification } from 'react-icons/tb'
import { PiNotification } from 'react-icons/pi'
import { useAtom } from 'jotai'
import { Apis, UserPutApi } from '../../../services/API'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import nothnyet from '../../../assets/images/nothn.png'
import { IoMdCheckmarkCircleOutline, IoMdSettings } from 'react-icons/io'
import AdminNotisField from '../../../AdminComponents/AdminNotisField'


const AdminNotis = ({ refetchNotifications, refetchUnreadNotis }) => {
    const [notifications] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [showNotis, setShowNotis] = useState(false)
    const [mark, setMark] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)

    const closer = useRef()

    useEffect(
        () => {
            if (closer) {
                window.addEventListener('click', (event) => {
                    if (closer.current !== null) {
                        if (!closer.current.contains(event.target)) {
                            setShowNotis(false)
                        }
                    }
                }, true)
            }
        }, []
    )

    const MarkAllRead = async () => {
        try {
            const response = await UserPutApi(Apis.notification.update_admin_all)
            if (response.status === 200) {
                setUnreadNotis(0)
                refetchNotifications()
            }
        } catch (error) {
        }
    }


    let MoveNotisPage = () => {

        if (end < notifications.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend += 4
            setEnd(altend)

            altstart += 4
            setStart(altstart)

            altlengthstart += 1
            setpagestart(altlengthstart)
        }
    }

    let BackNotisPage = () => {

        if (end > 4) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend -= 4
            setEnd(altend)

            altstart -= 4
            setStart(altstart)

            altlengthstart -= 1
            setpagestart(altlengthstart)
        }
    }

    return (
        <div className='relative'>
            <>
                <div className={`flex items-center justify-center border w-9 h-9 rounded-full text-xl text-white border-white cursor-pointer ${showNotis ? 'hidden' : 'flex'}`} onClick={() => { setShowNotis(true); setpageend(notifications.length / 4) }}>
                    <IoNotificationsOutline />
                </div>
                <div className={`flex items-center justify-center border w-9 h-9 rounded-full text-xl text-white  border-white cursor-pointer  ${showNotis ? 'flex' : 'hidden'}`}>
                    <IoNotificationsOutline />
                </div>
                <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-[#462c7c] text-[0.65rem] font-extrabold bg-white notisha'>
                    <div className={`w-full h-full flex items-center justify-center ${showNotis ? 'hidden' : 'flex'}`} onClick={() => { setShowNotis(true); setpageend(notifications.length / 4) }}>
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span ><TbNotification /></span>
                        }
                    </div>
                    <div className={`w-full h-full flex items-center justify-center ${showNotis ? 'flex' : 'hidden'}`}>
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span><PiNotification
                            /></span>
                        }
                    </div>
                </div>
            </>

            <div className={`md:absolute md:top-12 md:-right-4 md:left-auto md:w-60 md:h-fit md:rounded-sm fixed top-0 left-0 h-screen w-full md:bg-zinc-400 bg-white z-50 py-3 px-2 text-black ${showNotis ? 'block' : 'hidden'}`} ref={closer}>
                <div className='flex justify-between items-center mt-2 md:mt-0'>
                    <div className='flex gap-1 items-center md:text-base text-2xl capitalize font-[800]'>
                        <div className='cursor-pointer md:hidden' onClick={() => setShowNotis(false)}><FaAngleLeft /></div>
                        <div>notifications</div>
                    </div>
                    <div className='relative'>
                        <div className='rounded-full w-fit h-fit p-1 md:bg-semi-white bg-[#b4b3b3] cursor-pointer md:text-[0.85rem] text-lg' onClick={() => setMark(!mark)}>
                            <IoMdSettings />
                        </div>
                        {mark && <div className='w-fit h-fit py-1 px-3 truncate flex items-center justify-center gap-1 bg-white shantf2 font-bold absolute md:top-6 top-8 right-0 rounded-md cursor-pointer z-20 hover:bg-[#f1f1f1] md:text-xs text-sm' onClick={MarkAllRead}>
                            <span>Mark all as read</span>
                            <IoMdCheckmarkCircleOutline className='text-[#462c7c]' />
                        </div>}
                    </div>
                </div>
                {notifications.length > 0 ? <div className='mt-2 md:mt-0'>
                    {notifications.slice(start, end).map((item, i) => (
                        <AdminNotisField key={i} item={item} refetchNotifications={refetchNotifications} refetchUnreadNotis={refetchUnreadNotis} setShowNotis={setShowNotis} start={start} setStart={setStart} end={end} setEnd={setEnd} pagestart={pagestart} setpagestart={setpagestart} setpageend={setpageend} />
                    ))}
                </div>
                    :
                    <div className='mt-32 md:mt-20 flex justify-center'>
                        <img src={nothnyet} className='md:h-20 h-48 w-auto'></img>
                    </div>
                }
                {notifications.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end'>
                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-300 cursor-pointer' onClick={BackNotisPage}><FaAngleLeft /></div>}
                    {Math.ceil(pageend) > 1 && <div className='font-bold md:text-zinc-700 text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                    {end < notifications.length && <div className='py-1 px-2 rounded-md border border-zinc-700 text-zinc-700 hover:bg-zinc-300 cursor-pointer' onClick={MoveNotisPage}><FaAngleRight /></div>}
                </div>}
            </div>
        </div>
    )
}

export default AdminNotis