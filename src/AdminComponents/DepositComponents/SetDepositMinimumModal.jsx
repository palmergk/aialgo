import React, { useRef, useState } from 'react'
import ModalLayout from '../../utils/ModalLayout'
import Loading from '../../GeneralComponents/Loading'
import { useAtom } from 'jotai'
import { ADMINSTORE } from '../../store'
import { Apis, UserPutApi } from '../../services/API'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'
import { FaXmark } from 'react-icons/fa6'

const SetDepositMinimum = ({ closeView }) => {
    const [adminStore, setAdminStore] = useAtom(ADMINSTORE)
    const [amount, setAmount] = useState('')
    const toggler = useRef()
    const [loading, setLoading] = useState(false)

    const SetReferalBonus = async () => {
        if (!amount) return ErrorAlert('Enter an amount')
        if (isNaN(amount)) return ErrorAlert('Must be a number')

        const formbody = {
            deposit_minimum: parseFloat(amount)
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_admin_store, formbody)
            if (response.status === 200) {
                setAdminStore(response.store)
                SuccessAlert('Deposit minimum updated')
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
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-10/12 bg-white rounded-lg overflow-hidden relative py-5' ref={toggler}>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                <div className='md:text-xl text-lg uppercase text-center font-bold border-b w-full'>set deposit minimum</div>
                <div className='flex flex-col gap-2 md:w-[90%] w-11/12 mx-auto mt-5'>
                    <div className='border px-2 py-4 rounded-md'>
                        <div className='flex gap-4 items-center justify-center'>
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-xs'>enter an amount ($)</div>
                                <input className='outline-none border lg:text-[0.85rem] text-base md:w-44 w-36 h-8 rounded-[3px] px-2 bg-[#ebeaea] ipt border-[#9f7ae7]' value={amount} onChange={e => setAmount(e.target.value)}></input>
                            </div>
                            <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-[3px]'>
                                <div>current:</div>
                                {Object.values(adminStore).length !== 0 && <div>${adminStore.deposit_minimum.toLocaleString()}</div>}
                            </div>
                        </div>
                        <div className='italic text-xs mt-4 text-[green] text-center'>- the least amount a user can deposit is {Object.values(adminStore).length !== 0 && <span>${adminStore.deposit_minimum.toLocaleString()}</span>} -</div>
                    </div>
                    <div className='mx-auto mt-4'>
                        <button className='w-fit h-fit py-2.5 px-8 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={SetReferalBonus}>set</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default SetDepositMinimum