import React from 'react'
import { HiCheckCircle } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { MdError } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Apis, PostApi, UserPutApi } from '../services/API';
import { MoveToTop } from '../utils/utils';

const NotisField = ({ item, refetchNotifications, refetchUnreadNotis }) => {

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
            }
        } catch (error) {
        }
    }

    return (
        <div className={`md:mt-2 mt-4 p-2 ${item.read === 'true' ? 'bg-white' : 'bg-[#c0b9e4]'} relative w-full h-fit md:text-xs text-[0.8rem] cursor-pointer rounded-md overflow-hidden shantf`} >
            <Link to={item.URL} onClick={() => { MarkSingleRead(); MoveToTop() }} className='flex flex-col gap-2'>
                <div className='flex gap-0.5 items-center border-b border-[grey] w-fit'>
                    <div className='capitalize font-extrabold'>{item.title}</div>
                    {item.status !== 'failed' ?
                        <HiCheckCircle className='text-light ' />
                        :
                        <MdError className='text-[#c94747]' />}
                </div>
                <div className='font-semibold'>{item.content}</div>
                <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-2'>{moment(item.createdAt).fromNow()}</div>
            </Link>
            <FaXmark className='text-[#5f5f5f] text-[0.85rem] cursor-pointer hover:bg-[grey] hover:text-[#272727] absolute top-0 right-0 rounded-full' onClick={DeleteNotification} />
        </div>
    )
}

export default NotisField