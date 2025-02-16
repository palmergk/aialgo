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

    const [form, setForm] = useState({
        title: '',
        price_start: '',
        price_limit: '',
        profit_return: '',
        plan_bonus: '',
        duration: '',
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const CreatePackage = async () => {
        if (!form.title || !form.price_limit || !form.price_start || !form.profit_return || !form.plan_bonus || !form.duration) return ErrorAlert('Enter all fields')
        if (isNaN(form.price_start) || isNaN(form.price_limit) || isNaN(form.profit_return) || isNaN(form.plan_bonus) || isNaN(form.duration)) return ErrorAlert('Enter valid numbers')
        if (type === 'select') return ErrorAlert('Select duration type')

        const formbody = {
            title: form.title,
            price_start: parseFloat(form.price_start),
            price_limit: parseFloat(form.price_limit),
            profit_return: parseFloat(form.profit_return),
            plan_bonus: parseFloat(form.plan_bonus),
            duration: parseFloat(form.duration),
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
            <div className='max-w-md h-fit mx-auto bg-white rounded-lg overflow-x-hidden relative py-5' ref={toggler}>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                <div className='text-xl uppercase text-center font-bold border-b'>create trading plan</div>
                <div className='flex flex-col md:w-[90%] w-11/12 mx-auto mt-5 md:text-[0.9rem] text-[0.8rem]'>
                    <div className='flex flex-col gap-4 relative'>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>title:</div>
                            <input className='outline-none border border-[#9f7ae7] md:w-48 w-40 py-1 px-2 lg:text-sm text-base' value={form.title} name='title' onChange={inputHandler}></input>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>price start ($):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] md:w-48 w-40 py-1 px-2 lg:text-sm text-base' value={form.price_start} name='price_start' onChange={inputHandler}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>price limit ($):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] md:w-48 w-40 py-1 px-2 lg:text-sm text-base' value={form.price_limit} name='price_limit' onChange={inputHandler}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>profit return (%):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] md:w-48 w-40 py-1 px-2 lg:text-sm text-base' value={form.profit_return} name='profit_return' onChange={inputHandler}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>plan bonus ($):</div>
                            <div>
                                <input className='outline-none border border-[#9f7ae7] md:w-48 w-40 py-1 px-2 lg:text-sm text-base' value={form.plan_bonus} name='plan_bonus' onChange={inputHandler}></input>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <div className='italic'>duration:</div>
                            <input className='outline-none border border-[#9f7ae7] md:w-48 w-40 py-1 px-2 lg:text-sm text-base' value={form.duration} name='duration' onChange={inputHandler}></input>
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
        </ModalLayout>
    )
}

export default CreatePackageModal