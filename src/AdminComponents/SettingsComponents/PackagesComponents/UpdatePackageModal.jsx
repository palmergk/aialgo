import React, { useRef, useState } from 'react'
import { FaXmark } from 'react-icons/fa6';
import Loading from '../../../GeneralComponents/Loading';
import ModalLayout from '../../../utils/ModalLayout';
import { ErrorAlert, SuccessAlert } from '../../../utils/utils';
import { Apis, PostApi, UserPutApi } from '../../../services/API';
import StatusSelector from '../../../GeneralComponents/StatusSelector';


const UpdatePackageModal = ({ closeView, singlePlan, refetchTradingPlans }) => {
    const [type, setType] = useState(singlePlan?.duration_type)
    const [select, setSelect] = useState(false)
    const [deleteState, setDeleteState] = useState(false)
    const [commit, setCommit] = useState(false)
    const [loading, setLoading] = useState(false)
    const toggler = useRef()

    const DurationTypes = [
        "minutes",
        "hours",
        "days",
    ]

    const [form, setForm] = useState({
        title: singlePlan?.title,
        price_start: Number(singlePlan?.price_start).toLocaleString(),
        price_limit: Number(singlePlan?.price_limit).toLocaleString(),
        profit_return: Number(singlePlan?.profit_return).toLocaleString(),
        plan_bonus: Number(singlePlan?.plan_bonus).toLocaleString(),
        duration: Number(singlePlan?.duration).toLocaleString(),
    })

    const inputHandler = e => {
        const { name, value } = e.target
        if (name === 'title') {
            setForm({ ...form, title: value })
        } else if (name === 'profit_return') {
            const formatVal = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            setForm({ ...form, [name]: formatVal })
        }
        else {
            const formatVal = value.replace(/\D/g, '')
            const formatted = Number(formatVal).toLocaleString()
            setForm({ ...form, [name]: formatted })
        }
    }

    const CommitHandlerForText = () => {
        if (form.title === singlePlan.title && parseFloat(form.price_start) === singlePlan.price_start && parseFloat(form.price_limit) === singlePlan.price_limit && parseFloat(form.profit_return) === singlePlan.profit_return && parseFloat(form.plan_bonus) === singlePlan.plan_bonus && parseFloat(form.duration) === singlePlan.duration && type === singlePlan.duration_type) {
            setCommit(false)
        } else {
            setCommit(true)
        }
    }

    const CommmitHandlerForStatus = (item) => {
        setType(item)
        if (item === singlePlan.duration_type && form.title === singlePlan.title && parseFloat(form.price_start) === singlePlan.price_start && parseFloat(form.price_limit) === singlePlan.price_limit && parseFloat(form.profit_return) === singlePlan.profit_return && parseFloat(form.plan_bonus) === singlePlan.plan_bonus && parseFloat(form.duration) === singlePlan.duration) {
            setCommit(false)
        } else {
            setCommit(true)
        }
    }

    const UpdateTradingPlan = async () => {
        if (!form.title || !form.price_limit || !form.price_start || !form.profit_return || !form.plan_bonus || !form.duration) return ErrorAlert('Enter all fields')

        const psamt = parseFloat(form.price_start.replace(/,/g, ''))
        const plamt = parseFloat(form.price_limit.replace(/,/g, ''))
        const pramt = parseFloat(form.profit_return.replace(/,/g, ''))
        const pbamt = parseFloat(form.plan_bonus.replace(/,/g, ''))
        const damt = parseFloat(form.duration.replace(/,/g, ''))

        const formbody = {
            plan_id: singlePlan.id,
            title: form.title,
            price_start: psamt,
            price_limit: plamt,
            profit_return: pramt,
            plan_bonus: pbamt,
            duration: damt,
            duration_type: type
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_trading_plan, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchTradingPlans()
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

    const DeleteTradingPlan = async () => {
        const formbody = {
            plan_id: singlePlan.id
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.delete_trading_plan, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchTradingPlans()
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
            <div className='max-w-md h-fit mx-auto bg-white rounded-lg overflow-x-hidden relative py-5' ref={toggler}>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                <div className='text-xl uppercase text-center font-bold border-b'>update trading plan</div>
                <div className='flex flex-col w-11/12 mx-auto mt-5 md:text-[0.9rem] text-[0.8rem]'>
                    <div className='flex flex-col gap-4 relative'>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>title:</div>
                            <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.title} name='title' onChange={inputHandler} onKeyUp={CommitHandlerForText}></input>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>price start ($):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.price_start} name='price_start' onChange={inputHandler} onKeyUp={CommitHandlerForText}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>price limit ($):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.price_limit} name='price_limit' onChange={inputHandler} onKeyUp={CommitHandlerForText}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>profit return (%):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.profit_return} name='profit_return' onChange={inputHandler} onKeyUp={CommitHandlerForText}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>plan bonus ($):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.plan_bonus} name='plan_bonus' onChange={inputHandler} onKeyUp={CommitHandlerForText}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>duration:</div>
                            <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.duration} name='duration' onChange={inputHandler} onKeyUp={CommitHandlerForText}></input>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>duration type:</div>
                            <StatusSelector Statuses={DurationTypes} status={type} HandleFunction={CommmitHandlerForStatus} select={select} toggle={() => setSelect(!select)} />
                        </div>
                    </div>
                    <div className='flex items-center mt-8 relative'>
                        {commit && <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateTradingPlan}>update</button>}
                        <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ml-auto' onClick={() => setDeleteState(true)}>delete</button>
                        {deleteState && <div className='bg-white w-fit h-fit flex flex-col gap-4 items-center justify-center absolute bottom-0 right-0 p-3 rounded-md text-xs popsha'>
                            <div className='text-sm text-center font-semibold'>Are you sure you want to Delete Plan?</div>
                            <div className='flex items-center gap-6'>
                                <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 hover:bg-green-600 text-white rounded-md font-medium' onClick={() => setDeleteState(false)}>cancel</button>
                                <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 hover:bg-red-600 text-white rounded-md font-medium' onClick={DeleteTradingPlan}>proceed</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default UpdatePackageModal