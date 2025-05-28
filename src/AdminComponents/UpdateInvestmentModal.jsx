import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../services/API'
import moment from 'moment';
import { FaXmark } from 'react-icons/fa6';
import Loading from '../GeneralComponents/Loading';
import { ErrorAlert, SuccessAlert } from '../utils/utils';
import avatar from '../assets/images/avatar.png'
import ModalLayout from '../utils/ModalLayout';
import StatusSelector from '../GeneralComponents/StatusSelector';


const UpdateInvestmentModal = ({ closeView, singleInvestment, refetchAllInvestments }) => {
    const toggler = useRef()
    const [status, setStatus] = useState(singleInvestment?.status)
    const [select, setSelect] = useState(false)
    const [update, setUpdate] = useState(false)
    const [beforeshow, setBeforeshow] = useState(true)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        profit: "",
        bonus: ""
    })

    const inputHandler = e => {
        const formatVal = e.target.value.replace(/\D/g, '')
        const formatted = Number(formatVal).toLocaleString()
        setForm({ ...form, [e.target.name]: formatted })
    }

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const Statuses = [
        "running",
        "completed"
    ]

    const MoveToBottom = () => {
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if (!loading) {
            if (select || status !== singleInvestment.status || form.profit !== '' || form.bonus !== '') {
                MoveToBottom()
            }
        }
    }, [MoveToBottom]
    )

    const UpdateHandlerForText = () => {
        if (form.profit === '' && form.bonus === '' && status === singleInvestment.status) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateHandlerForStatus = (item) => {
        setStatus(item)
        if (item === singleInvestment.status && form.bonus === '' && form.profit === '') {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateInvestment = async () => {
        const pamt = parseFloat(form.profit.replace(/,/g, ''))
        const bamt = parseFloat(form.bonus.replace(/,/g, ''))

        const formbody = {
            investment_id: singleInvestment.id,
            profit: pamt,
            bonus: bamt,
            status: status,
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_investments, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchAllInvestments()
                closeView()
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className={`bg-white rounded-lg max-w-2xl mx-auto lg:h-[90vh] h-[75vh] overflow-x-hidden overflow-y-auto scroll ${beforeshow && 'flex items-center justify-center'} move`} ref={toggler}>
                <div className='relative'>
                    {loading && <Loading />}
                    {beforeshow ?
                        <div className='beforeshow'></div>
                        :
                        <>
                            <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                            <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                                <div className='flex flex-col gap-4 border p-1'>
                                    <div className='uppercase font-bold border px-1'>user details:</div>
                                    <div className='md:w-24 md:h-24 w-20 h-20 rounded-full border-2 border-[#c9b8eb] mx-auto'>
                                        {Object.values(singleInvestment).length !== 0 &&
                                            <>
                                                {singleInvestment.investmentUser.image ? <img src={`${imageurl}/profiles/${singleInvestment.investmentUser.image}`} className='w-full h-full rounded-full object-cover'></img>
                                                    :
                                                    <img src={avatar} className='w-full h-full rounded-full object-cover'></img>
                                                }
                                            </>
                                        }
                                    </div>
                                    <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                        <div className='flex justify-between items-center gap-4'>
                                            <div className='italic '>username:</div>
                                            {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleInvestment.investmentUser.username}</div>}
                                        </div>
                                        <div className='flex justify-between items-center gap-4'>
                                            <div className='italic '>email:</div>
                                            {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleInvestment.investmentUser.email}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 border p-1'>
                                    <div className='uppercase font-bold border px-1'>investment details:</div>
                                    <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                        <div className='flex justify-between items-center gap-4'>
                                            <div className='italic '>amount:</div>
                                            {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${singleInvestment.amount.toLocaleString()}</div>}
                                        </div>
                                        <div className='flex justify-between items-center gap-4'>
                                            <div className='italic '>plan:</div>
                                            {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm capitalize'>{singleInvestment.trading_plan}</div>}
                                        </div>
                                        <div className='flex justify-between items-center gap-4'>
                                            <div className='italic '>date / time:</div>
                                            {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleInvestment.createdAt).format('DD-MM-yyyy')} / {moment(singleInvestment.createdAt).format('h:mm')}</div>}
                                        </div>
                                        <div className='flex justify-between items-center gap-4'>
                                            <div className='italic'>add profit:</div>
                                            <div className='flex gap-2 items-center'>
                                                <div>
                                                    <input className='border border-[#9f7ae7] md:w-40 w-28 outline-none py-1 px-2 lg:text-sm text-base rounded-sm' name='profit' value={form.profit} onChange={inputHandler} onKeyUp={UpdateHandlerForText}></input>
                                                </div>
                                                <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-[3px]'>
                                                    <div>so far:</div>
                                                    {Object.values(singleInvestment).length !== 0 && <div>${singleInvestment.profit.toLocaleString()}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center gap-4'>
                                            <div className='italic'>add bonus:</div>
                                            <div className='flex gap-2 items-center'>
                                                <div>
                                                    <input className='border border-[#9f7ae7] md:w-40 w-28 outline-none py-1 px-2 lg:text-sm text-base rounded-sm' name='bonus' value={form.bonus} onChange={inputHandler} onKeyUp={UpdateHandlerForText}></input>
                                                </div>
                                                <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-[3px]'>
                                                    <div>so far:</div>
                                                    {Object.values(singleInvestment).length !== 0 && <div>${singleInvestment.bonus.toLocaleString()}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-6 my-6'>
                                            <div className='flex justify-between items-center gap-4'>
                                                <div className='italic '>status:</div>
                                                {singleInvestment?.status === 'running' ?
                                                    <StatusSelector Statuses={Statuses} status={status} HandleFunction={UpdateHandlerForStatus} select={select} toggle={() => setSelect(!select)} />
                                                    :
                                                    <>
                                                        {Object.values(singleInvestment).length !== 0 && <div className='md:text-base text-sm capitalize text-[green]'>{singleInvestment.status}</div>}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {update && <div className='flex items-center justify-center -mt-4'>
                                    <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ' onClick={UpdateInvestment}>update details</button>
                                </div>}
                            </div>
                        </>
                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default UpdateInvestmentModal