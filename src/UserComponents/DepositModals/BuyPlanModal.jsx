import React, { useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { FaXmark } from 'react-icons/fa6'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { Apis, PostApi } from '../../services/API'
import { WALLET } from '../../store'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'

const BuyPlanModal = ({ closeModal, buybal, openModal }) => {
    const [userwallet] = useAtom(WALLET)
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const BuyPlanWithBalance = async () => {
        if (!amount) return ErrorAlert('Enter an amount')
        if (isNaN(amount)) return ErrorAlert('Amount must be a number')
        if (amount < buybal.price_start || amount > buybal.price_limit) return ErrorAlert(`${buybal.title} plan is from $${buybal.price_start.toLocaleString()} - $${buybal.price_limit.toLocaleString()}`)
        if (Object.values(userwallet).length === 0 || amount > userwallet.balance) return ErrorAlert('Insufficient wallet balance')

        const formbody = {
            amount: parseFloat(amount),
            plan_id: buybal.id,
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.investment.create_investment, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                closeModal()
                navigate('/dashboard/investment')
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
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#0c091aa4] z-20'>
            <div className='w-96 h-fit bg-white rounded-lg py-4 relative overflow-hidden'>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeModal()} />
                <div className='flex items-center gap-2 justify-center border-b pb-1.5'>
                    <div className='text-[0.85rem] uppercase font-bold'>{buybal?.title} plan</div>
                    {Object.values(buybal).length !== 0 && <div className='text-xs font-semibold bg-white py-1 px-2 rounded-md sha'>
                        ${buybal.price_start.toLocaleString()} - ${buybal.price_limit.toLocaleString()}
                    </div>}
                </div>
                <div className='flex flex-col gap-4 px-4 mt-5'>
                    <div className='relative flex gap-3 items-center mx-auto'>
                        <div className='flex flex-col gap-1'>
                            <div className='capitalize text-[0.8rem] font-medium'>enter an amount ($)</div>
                            <input className='outline-none border lg:text-[0.85rem] w-full h-8 rounded-[4px] px-2 bg-[#ebeaea] border-[#5BB4FD]' value={amount} onChange={e => setAmount(e.target.value)} ></input>
                        </div>
                        <div className='h-fit w-fit text-nowrap py-2 px-4 bg-[#5BB4FD] flex flex-col gap-1 items-center justify-center text-white text-[0.85rem] rounded-md'>
                            <div className='text-xs italic text-center'>wallet balance:</div>
                            {Object.values(userwallet).length !== 0 && <div>${userwallet.balance.toLocaleString()}</div>}
                        </div>
                    </div>
                    <div className='text-xs text-center font-medium'>low wallet balance? <span className='underline text-[#5BB4FD] cursor-pointer' onClick={() => { closeModal(); openModal() }}>Deposit</span></div>
                    <div className='mb-2 mx-auto'>
                        <button className='py-2 px-14 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={BuyPlanWithBalance}>confirm purchase</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyPlanModal