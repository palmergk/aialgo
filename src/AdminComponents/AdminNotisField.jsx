import React from 'react'
import { HiCheckCircle } from 'react-icons/hi2'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Apis, PostApi, UserPutApi } from '../services/API'
import { MoveToTop } from '../utils/utils'
import { FaXmark } from 'react-icons/fa6'

const AdminNotisField = ({ item, refetchNotifications, refetchUnreadNotis, setShowNotis, start, end, pagestart, setStart, setEnd, setpagestart, setpageend, }) => {

    const MarkSingleRead = async () => {
        try {
            const response = await UserPutApi(Apis.notification.update_single, { notification_id: item.id })
            if (response.status === 200) {
                refetchNotifications()
                refetchUnreadNotis()
            }
        } catch (error) {
        }
    }

    const DeleteNotification = async () => {
        try {
            const response = await PostApi(Apis.notification.delete_notification, { notification_id: item.id })
            if (response.status === 200) {
                refetchNotifications()
                refetchUnreadNotis()
                if (pagestart > Math.ceil(response.msg.length / 6)) {
                    let altstart = start
                    let altend = end
                    let altlengthstart = pagestart

                    altend -= 6
                    setEnd(altend)
                    altstart -= 6
                    setStart(altstart)
                    altlengthstart -= 1
                    setpagestart(altlengthstart)
                    setpageend(response.msg.length / 6)
                }
            }
        } catch (error) {
        }
    }

    return (
        <div className={`md:mt-2 mt-4 p-2 ${item.read === 'true' ? 'bg-white' : 'bg-[#bca2e6]'} relative w-full h-fit md:text-xs text-[0.8rem] text-black cursor-pointer rounded-md overflow-hidden shantf`}>
            <Link to={item.URL} onClick={() => { MarkSingleRead(); setShowNotis(false); MoveToTop() }} className='flex flex-col gap-2'>
                <div className='flex gap-0.5 items-center'>
                    <div className='capitalize font-extrabold border-b  border-[grey] w-fit'>{item.title}</div>
                    <HiCheckCircle className='text-[#462c7c] ' />
                </div>
                <div className='font-semibold'>{item.content}</div>
                <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-2'>{moment(item.createdAt).fromNow()}</div>
            </Link>
            <FaXmark className='text-[#5f5f5f] text-[0.85rem] cursor-pointer hover:bg-[grey] hover:text-[#272727] absolute top-0 right-0 rounded-full' onClick={DeleteNotification} />
        </div>
    )
}

export default AdminNotisField