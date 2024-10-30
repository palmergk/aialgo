import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { NOTIFICATIONS, UNREADNOTIS } from '../store'
import { MdContentCopy } from 'react-icons/md'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import Loading from '../GeneralComponents/Loading'
import { ErrorAlert, SuccessAlert } from '../utils/utils'
import { Apis, PostApi } from '../services/API'
import QRCode from 'react-qr-code'
import CryptoSelector from '../GeneralComponents/CryptoSelector'

const PayTaxModal = ({ closeView, setScreen, refetchTaxes }) => {
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [amount, setAmount] = useState('')
    const [cryptoWallets, setCryptoWallets] = useState({})
    const [copy, setCopy] = useState(false)
    const [loading, setLoading] = useState(false)

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(cryptoWallets?.address)
        setCopy(true)
    }

    const ConfirmTaxPayment = async () => {
        if (!amount) return ErrorAlert('Enter an amount')
        if (isNaN(amount)) return ErrorAlert('Amount must be a number')
        if (amount < 1) return ErrorAlert('Minimum tax payment is $1')
        if (Object.values(cryptoWallets).length === 0) return ErrorAlert('Choose cryptocurrency')

        const formbody = {
            amount: parseFloat(amount),
            wallet_id: cryptoWallets.id
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.tax.pay_tax, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchTaxes()
                setNotifications(response.notis)
                setUnreadNotis(response.unread)
                setScreen(2)
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
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#0c091aa4] z-20'>
            <div className='w-96 h-fit bg-white rounded-lg py-4 overflow-hidden relative'>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                <div className='font-bold uppercase border-b w-full text-center'>pay tax</div>
                <div className='flex flex-col items-center gap-5 md:px-4 px-2 mt-5 text-[0.8rem]'>
                    <div className='flex flex-col gap-1'>
                        <div className='capitalize font-medium'>tax amount ($)</div>
                        <div className='relative'>
                            <input className='outline-none border lg:text-sm text-base w-52 h-8 rounded-[4px] pl-2 pr-16 bg-[#ebeaea] border-[#5BB4FD]' value={amount} onChange={e => setAmount(e.target.value)} ></input>
                            <div className='text-xs absolute top-2 right-2'>min: 0.99</div>
                        </div>
                    </div>
                    <div>
                        <CryptoSelector setCryptoWallets={setCryptoWallets} />
                    </div>
                    {Object.values(cryptoWallets).length !== 0 &&
                        <div className='flex flex-col gap-2 items-center'>
                            <div className='text-center'><span className='capitalize'>{cryptoWallets.crypto_name}</span> deposit address for <span className='capitalize'>{cryptoWallets.network} network</span> below. Make the exact amount entered to the address.</div>
                            <div className='flex gap-1.5 items-center'>
                                <div className='md:text-xs text-[0.65rem] text-[#5BB4FD]'>{cryptoWallets.address}</div>
                                <button className='outline-none w-fit h-fit py-1.5 px-2 text-semi-white text-xs bg-[#252525] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                                    {!copy ? <MdContentCopy /> : <FaCheck />}
                                </button>
                            </div>
                        </div>
                    }
                    {Object.values(cryptoWallets).length !== 0 &&
                        <QRCode value={cryptoWallets.address} className='h-32 w-auto mx-auto' />
                    }
                    <div className='mx-auto my-3'>
                        <button className='outline-none w-fit h-fit py-2 px-14 text-xs text-semi-white bg-[#252525] rounded-md capitalize font-medium' onClick={ConfirmTaxPayment}>confirm payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayTaxModal