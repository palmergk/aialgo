import React, { useRef, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { ErrorAlert, SuccessAlert } from '../../../utils/utils';
import { Apis, PostApi } from '../../../services/API';
import Loading from '../../../GeneralComponents/Loading';
import ModalLayout from '../../../utils/ModalLayout';
import StatusSelector from '../../../GeneralComponents/StatusSelector';


const CreatePackageModal = ({ closeView, refetchTradingPlans }) => {
    const [type, setType] = useState('select')
    const [select, setSelect] = useState(false)
    const [loading, setLoading] = useState(false)
    const toggler = useRef()

    const DurationTypes = [
        "minutes",
        "hours",
        "days",
    ]

    const ProfitReturns = [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
    ]

    const [form, setForm] = useState({
        title: '',
        price_start: '',
        price_limit: '',
        profit_return: '',
        plan_bonus: '',
        duration: '',
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

    const handleReturns = (item) => {
        const returnPercentage = item * 100
        setForm({ ...form, profit_return: Number(returnPercentage).toLocaleString() })
    }

    const CreatePackage = async () => {
        if (!form.title || !form.price_limit || !form.price_start || !form.profit_return || !form.plan_bonus || !form.duration) return ErrorAlert('Enter all fields')
        if (type === 'select') return ErrorAlert('Select duration type')

        const psamt = parseFloat(form.price_start.replace(/,/g, ''))
        const plamt = parseFloat(form.price_limit.replace(/,/g, ''))
        const pramt = parseFloat(form.profit_return.replace(/,/g, ''))
        const pbamt = parseFloat(form.plan_bonus.replace(/,/g, ''))
        const damt = parseFloat(form.duration.replace(/,/g, ''))

        const formbody = {
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
            const response = await PostApi(Apis.admin.create_trading_plan, formbody)
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
            <div className='max-w-md lg:h-fit h-[75vh] overflow-y-auto scroll overflow-x-hidden mx-auto bg-white rounded-lg' ref={toggler}>
                <div className='relative'>
                    {loading && <Loading />}
                    <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                    <div className='text-xl uppercase text-center font-bold border-b pt-5'>create trading plan</div>
                    <div className='flex flex-col w-11/12 mx-auto md:text-[0.9rem] text-[0.8rem] mt-5 pb-5'>
                        <div className='flex flex-col gap-4 relative'>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='italic'>title:</div>
                                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.title} name='title' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='italic'>price start ($):</div>
                                <div>
                                    <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.price_start} name='price_start' onChange={inputHandler}></input>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='italic'>price limit ($):</div>
                                <div>
                                    <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.price_limit} name='price_limit' onChange={inputHandler}></input>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='italic'>profit return (%):</div>
                                <div className='flex flex-col gap-1 items-end'>
                                    <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.profit_return} name='profit_return' onChange={inputHandler}></input>
                                    <div className='w-48 h-fit border border-[#9f7ae7] overflow-x-auto scrollsdown'>
                                        <div className='w-fit flex flex-col'>
                                            <div className='border-b border-[#9f7ae7] truncate text-[0.7rem] text-center italic py-0.5'>profit returns types:</div>
                                            <div className='flex items-center'>
                                                {ProfitReturns.map((item, i) => (
                                                    <div key={i} className={`w-8 text-center text-xs p-1 hover:bg-zinc-200 cursor-pointer ${i !== ProfitReturns.length - 1 && 'border-r border-[#9f7ae7]'}`} onClick={() => handleReturns(item)}>{item}x</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='italic'>plan bonus ($):</div>
                                <div>
                                    <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.plan_bonus} name='plan_bonus' onChange={inputHandler}></input>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='italic'>duration:</div>
                                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.duration} name='duration' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='italic'>duration type:</div>
                                <StatusSelector Statuses={DurationTypes} status={type} HandleFunction={(item) => setType(item)} select={select} toggle={() => setSelect(!select)} />
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-8'>
                            <button className='w-fit h-fit py-2 px-8 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={CreatePackage}>create</button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default CreatePackageModal