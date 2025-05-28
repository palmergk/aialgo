import React, { useRef, useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { FaAngleLeft, FaXmark } from 'react-icons/fa6'
import { MdOutlineEdit } from 'react-icons/md'
import { useAtom } from 'jotai'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'
import { Apis, PostApi } from '../../services/API'
import { ADMINSTORE, NOTIFICATIONS, UNREADNOTIS } from '../../store'
import QRCode from "react-qr-code";
import CryptoSelector from '../../GeneralComponents/CryptoSelector'
import { FiUploadCloud } from 'react-icons/fi'
import CopyButton from '../../GeneralComponents/CopyButton'


const FundModal = ({ closeModal, setScreen, refetchDeposits }) => {
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)
  const [adminStore] = useAtom(ADMINSTORE)

  const [phase, setPhase] = useState(1)
  const [amount, setAmount] = useState('')
  const [cryptoWallets, setCryptoWallets] = useState({})
  const imgref = useRef()
  const [proof, setProof] = useState({
    img: null,
    image: null
  })
  const [loading, setLoading] = useState(false)

  const handleAmount = (e) => {
    const formatVal = e.target.value.replace(/\D/g, '')
    const formatted = Number(formatVal).toLocaleString()
    setAmount(formatted)
  }

  const MovePhase = () => {
    const amt = parseFloat(amount.replace(/,/g, ''))
    if (!amt) return ErrorAlert('Enter an amount')
    if (isNaN(amt)) return ErrorAlert('Amount must be a number')
    if (amt < adminStore.deposit_minimum) return ErrorAlert(`Minimum deposit amount is $${adminStore.deposit_minimum.toLocaleString()}`)
    if (Object.values(cryptoWallets).length === 0) return ErrorAlert('Choose cryptocurrency')
    setPhase(2)
  }

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
    }
    setProof({
      img: URL.createObjectURL(file),
      image: file
    })
  }

  const CreateDeposit = async () => {
    if (proof.image === null) return ErrorAlert('Attach a proof of payment')
    const amt = parseFloat(amount.replace(/,/g, ''))
    const formbody = new FormData()
    formbody.append('amount', amt)
    formbody.append('wallet_id', cryptoWallets.id)
    formbody.append('payment_proof', proof.image)

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
        <div className='md:px-4 px-2 mt-5 text-[0.8rem]'>
          {phase === 1 ?
            <div className='flex flex-col gap-5 items-center'>
              <div className='flex flex-col gap-1'>
                <div className='capitalize font-medium'>deposit amount ($)</div>
                <div className='relative w-fit'>
                  <input className='outline-none border lg:text-sm text-base w-52 h-8 rounded-[4px] pl-2 pr-16 bg-[#ebeaea] border-[#5BB4FD]' value={amount} onChange={handleAmount} ></input>
                  <div className='text-xs absolute top-2 right-2'>min: {adminStore?.deposit_minimum}</div>
                </div>
              </div>
              <CryptoSelector setCryptoWallets={setCryptoWallets} />
              {Object.values(cryptoWallets).length !== 0 &&
                <div className='flex flex-col gap-2 items-center'>
                  <div className='text-center'><span className='capitalize'>{cryptoWallets.crypto_name}</span> deposit address for <span className='capitalize'>{cryptoWallets.network} network</span> below. Make the exact amount entered to the address.</div>
                  <div className='flex gap-1.5 items-center'>
                    <div className='md:text-xs text-[0.65rem] text-[#5BB4FD]'>{cryptoWallets.address}</div>
                    <CopyButton content={cryptoWallets.address} />
                  </div>
                </div>
              }
              {Object.values(cryptoWallets).length !== 0 &&
                <QRCode value={cryptoWallets.address} className='h-32 w-auto mx-auto' />
              }
              <button className='my-3 mx-auto w-fit h-fit py-2 px-16 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={MovePhase}>
                confirm deposit
              </button>
            </div>
            :
            <div className='flex flex-col gap-5'>
              <div className='cursor-pointer absolute top-4 left-1.5 text-lg' onClick={() => setPhase(1)}><FaAngleLeft /></div>
              <div className='flex flex-col gap-1.5 border p-2 rounded-md'>
                <div className='flex justify-between'>
                  <span className='italic'>amount:</span>
                  <span>${amount.toLocaleString()}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='italic'>crypto:</span>
                  <span className='capitalize'>{cryptoWallets.crypto_name}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='italic'>network:</span>
                  <span className='capitalize'>{cryptoWallets.network}</span>
                </div>
                <div className='flex gap-1.5 items-center justify-center'>
                  <div className='md:text-xs text-[0.65rem] text-[#5BB4FD]'>{cryptoWallets.address}</div>
                  <CopyButton content={cryptoWallets.address} />
                </div>
              </div>
              <div className='flex flex-col gap-2 items-center'>
                <div className='italic'>attach a proof of payment:</div>
                <label className='cursor-pointer'>
                  {proof.img ?
                    <div className='relative w-fit'>
                      <img src={proof.img} className='h-40 w-auto border border-[#5BB4FD] rounded-md'></img>
                      <div className='absolute top-1 right-1 text-base bg-white border rounded-md p-1'>
                        <MdOutlineEdit />
                      </div>
                    </div>
                    :
                    <div className='border border-dashed border-gray-400 rounded-lg flex flex-col gap-2 items-center justify-center h-40 w-60'>
                      <div className='bg-gray-300 rounded-full p-2 text-2xl'><FiUploadCloud /></div>
                      <span className='text-xs'>click to add image</span>
                    </div>
                  }
                  <input ref={imgref} type="file" onChange={handleUpload} hidden />
                </label>
              </div>
              <button className='my-3 mx-auto w-fit h-fit py-2 px-16 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={CreateDeposit}>
                confirm deposit
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default FundModal