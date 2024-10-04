import React from 'react'
import { HiCheckCircle } from 'react-icons/hi2'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Apis, PostApi, UserPutApi } from '../services/API'
import { MoveToTop } from '../utils/utils'
import { FaXmark } from 'react-icons/fa6'

const AdminNotisField = ({ item, refetchNotifications, refetchUnreadNotis, setShowNotis, start, end, pagestart, setStart, setEnd, setpagestart, setpageend, }) => {

    const MarkSingleRead = async () => {
        const formbody = {
            notification_id: item.id,
        }
        try {
            const response = await UserPutApi(Apis.notification.update_single, formbody)
            if (response.status === 200) {
                refetchNotifications()
                refetchUnreadNotis()
            }
        } catch (error) {
        }
    }

    const DeleteNotification = async () => {
        const formbody = {
            notification_id: item.id,
        }

        try {
            const response = await PostApi(Apis.notification.delete_notification, formbody)
            if (response.status === 200) {
                refetchNotifications()
                refetchUnreadNotis()
                setpageend(response.msg.length / 6)
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
                }
            }
        } catch (error) {
        }
    }

    return (
        <div className='flex flex-col items-center md:pt-2 pt-4 md:text-xs text-[0.8rem] text-black'>
            <div className={`p-2 rounded-md relative shantf w-full h-fit ${item.read === 'true' ? 'bg-white' : 'bg-[#bca2e6]'}`}>
                <Link to={item.URL} onClick={() => { MarkSingleRead(); setShowNotis(false); MoveToTop() }}>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center'>
                            <div className='flex gap-[0.2rem] items-center'>
                                <div className='capitalize font-[800] border-b  border-[grey] w-fit'>{item.title}</div>
                                <HiCheckCircle className='text-[#462c7c] ' />
                            </div>
                        </div>
                        <div className='font-[600]'>{item.content}</div>
                        <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-2'>{moment(item.createdAt).fromNow()}</div>
                    </div>
                </Link>
                <FaXmark className='text-[#5f5f5f] text-[0.85rem] cursor-pointer hover:bg-[grey] hover:text-[#272727] absolute top-0 right-0 rounded-full' onClick={DeleteNotification} />
            </div>
        </div>
    )
}

export default AdminNotisField