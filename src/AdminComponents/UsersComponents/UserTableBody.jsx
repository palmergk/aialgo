import moment from 'moment'
import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Apis, PostApi } from '../../services/API'

const UserTableBody = ({ item, setUserFigures, setSingleUser, setModal }) => {

    const GetUserFigures = async () => {
        try {
            const formbody = {
                user_id: item.id
            }
            setSingleUser(item)
            setModal(true)

            const response = await PostApi(Apis.admin.get_user_figures, formbody)
            if (response.status === 200) {
                setUserFigures(response.msg)
            }

        } catch (error) {
            //
        }
    }

    return (
        <div className='w-full h-fit relative sha rounded-lg text-black font-medium'>
            <div className='p-4 bg-semi-white text-sm rounded-t-lg flex justify-between gap-4'>
                <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                <div>
                    <div className='hover:text-[#9f7ae7] cursor-pointer bg-white py-0.5 rounded-[3px]' onClick={GetUserFigures}><BsThreeDotsVertical /></div>
                </div>
            </div>
            <div className='bg-white grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                <div className='flex justify-between gap-4'>
                        <span>full name:</span>
                        <span>{item.full_name}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>username:</span>
                        <span>{item.username}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>email:</span>
                        <span className='lowercase'>{item.email}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-100 overflow-hidden'>
                    <div className='flex justify-between gap-4'>
                        <span>country:</span>
                        <img src={item.country_flag} className='w-6 h-auto'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTableBody