import React, { useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { MdContentCopy } from 'react-icons/md'
import { useAtom } from 'jotai'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'
import { Apis, PostApi } from '../../services/API'
import { ADMINSTORE, NOTIFICATIONS, UNREADNOTIS } from '../../store'
import QRCode from "react-qr-code";
import CryptoSelector from '../../GeneralComponents/CryptoSelector'


const FundModal = ({ closeModal, setScreen, refetchDeposits }) => {
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)
  const [adminStore] = useAtom(ADMINSTORE)

  const [amount, setAmount] = useState('')
  const [cryptoWallets, setCryptoWallets] = useState({})
  const [copy, setCopy] = useState(false)
  const [check, setCheck] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const copyFunction = () => {
    setTimeout(() => {
      setCopy(false)
    }, 2000)

    navigator.clipboard.writeText(cryptoWallets?.address)
    setCopy(true)
  }

  const CreateDeposit = async () => {
    setTimeout(() => {
      setError('')
    }, 1000)

    if (!amount) return setError('amount')
    if (isNaN(amount)) return setError('amount')
    if (amount < adminStore.deposit_minimum) return setError('minimum')
    if (Object.values(cryptoWallets).length === 0) return setError('select')
    if (!check) return setError('check')

    const formbody = {
      amount: parseFloat(amount),
      wallet_id: cryptoWallets.id
    }

    setLoading(true)
    try {
      const response = await PostApi(Apis.deposit.create_deposit, formbody)
      if (response.status === 200) {
        SuccessAlert(response.msg)
        refetchDeposits()
        setNotifications(response.notis)
        setUnreadNotis(response.unread)
        setScreen(2)
        closeModal()
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
        <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeModal()} />
        <div className='font-bold uppercase border-b w-full text-center'>fund wallet</div>
        <div className='flex flex-col gap-5 items-center px-4 mt-5 text-[0.8rem]'>
          <div className='flex flex-col gap-1'>
            <div className='capitalize font-medium'>deposit amount ($)</div>
            <div className='relative'>
              <input className={`outline-none border lg:text-sm text-base w-52 h-8 rounded-[4px] pl-2 pr-16 bg-[#ebeaea] ${error === 'amount' ? 'border-[red]' : 'border-[#5BB4FD]'}`} value={amount} onChange={e => setAmount(e.target.value)} ></input>
              <div className={`text-xs absolute top-2 right-2 ${error === 'minimum' ? 'text-[red]' : 'text-black'}`}>min: {adminStore?.deposit_minimum}</div>
            </div>
          </div>
          <div>
            <CryptoSelector setCryptoWallets={setCryptoWallets} error={error} />
          </div>
          {Object.values(cryptoWallets).length !== 0 &&
            <div className='flex flex-col gap-2 items-center'>
              <div className='text-center text-[0.85rem]'><span className='capitalize'>{cryptoWallets.crypto_name}</span> deposit address for <span className='capitalize'>{cryptoWallets.network} network:</span></div>
              <div className='flex gap-1.5 items-center'>
                <div className='md:text-xs text-[0.65rem] text-[#5BB4FD]'>{cryptoWallets.address}</div>
                <button className='outline-none w-fit h-fit py-1.5 px-2 text-semi-white text-xs bg-[#252525] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                {!copy ? <MdContentCopy />: <FaCheck />}
                </button>
              </div>
            </div>
          }
          {Object.values(cryptoWallets).length !== 0 &&
            <div>
              <div className='text-center text-[0.85rem] italic mb-1'>or scan qr code:</div>
              <div className='flex items-center justify-center'>
                <QRCode value={cryptoWallets.address} className='h-32 w-auto' />
              </div>
            </div>
          }
          <div className='flex flex-col gap-1 items-center mt-2'>
            <div className='flex gap-1.5 items-center'>
              <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${error === 'check' && 'outline outline-1 outline-[red]'}`}></input>
              <div>Confirm you've made this deposit</div>
            </div>
            <div className='relative'>
              <button className='py-2 px-16 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={CreateDeposit}>
                confirm deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundModal