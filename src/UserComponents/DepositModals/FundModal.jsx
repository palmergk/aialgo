import React, { useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { FaAngleLeft, FaCheck, FaXmark } from 'react-icons/fa6'
import { MdContentCopy } from 'react-icons/md'
import { useAtom } from 'jotai'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'
import { Apis, imageurl, PostApi } from '../../services/API'
import { ADMINCRYPTOWALLETS, ADMINSTORE, NOTIFICATIONS, UNREADNOTIS } from '../../store'
import { SiBitcoincash } from 'react-icons/si'
import nothnyet from '../../assets/images/nothn.png'
import QRCode from "react-qr-code";


const FundModal = ({ closeModal, setScreen, refetchDeposits }) => {
  const [adminCryptoWallets] = useAtom(ADMINCRYPTOWALLETS)
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)
  const [adminStore] = useAtom(ADMINSTORE)

  const [amount, setAmount] = useState('')
  const [select, setSelect] = useState(false)
  const [mode, setMode] = useState(1)
  const [firstValues, setFirstValues] = useState({})
  const [secondValues, setSecondValues] = useState({})
  const [copy, setCopy] = useState(false)
  const [check, setCheck] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const copyFunction = () => {
    setTimeout(() => {
      setCopy(false)
    }, 2000)

    navigator.clipboard.writeText(secondValues.address)
    setCopy(true)
  }

  const CreateDeposit = async () => {
    setTimeout(() => {
      setError('')
    }, 1000)

    if (!amount) return setError('amount')
    if (isNaN(amount)) return setError('amount')
    if (amount < adminStore.deposit_minimum) return setError('minimum')
    if (Object.values(secondValues).length === 0) return setError('select')
    if (!check) return setError('check')

    const formbody = {
      amount: parseFloat(amount),
      wallet_id: secondValues.id
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
        <div className='flex flex-col gap-5 items-center px-4 mt-5'>
          <div className='flex flex-col gap-1'>
            <div className='capitalize text-[0.8rem] font-medium'>deposit amount ($)</div>
            <div className='relative'>
              <input className={`outline-none border lg:text-[0.85rem] w-52 h-8 rounded-[4px] pl-2 pr-16 bg-semi-white ${error === 'amount' ? 'border-[red]' : 'border-[#5BB4FD]'}`} value={amount} onChange={e => setAmount(e.target.value)} ></input>
              <div className={`text-xs absolute top-2 right-2 ${error === 'minimum' ? 'text-[red]' : 'text-black'}`}>min: {Object.values(adminStore).length !== 0 && <span>{adminStore.deposit_minimum}</span>}</div>
            </div>
          </div>
          <div className='h-fit w-fit rounded-[0.2rem] bg-semi-white p-1 relative'>
            <div className={`w-52 py-1 bg-white flex gap-1.5 justify-center items-center capitalize text-sm font-semibold rounded-[0.2rem] text-black cursor-pointer  ${error === 'select' && 'border border-[red]'} shantf`} onClick={() => setSelect(!select)}>
              <div className='text-[0.8rem]'>choose cryptocurrency</div>
              <SiBitcoincash className='text-[#5BB4FD] z-50' />
            </div>
            {select &&
              <div className={`absolute top-9 left-0 ${adminCryptoWallets.length > 4 ? 'h-24 overflow-y-auto scroll ' : 'h-fit'} w-full bg-white border border-[#a3a3a3] rounded-md z-10 text-[0.85rem] font-bold capitalize`}>
                {adminCryptoWallets.length > 1 ?
                  <>
                    {mode === 1 ?
                      <>
                        {adminCryptoWallets.length > 0 &&
                          <>
                            {adminCryptoWallets.map((item, i) => (
                              <div className='flex flex-col px-2 py-0.5 hover:bg-[#ececec] border-b border-[#ebeaea] cursor-pointer' key={i} onClick={() => { setFirstValues(item); setMode(2) }}>
                                <div className='flex gap-2 items-center'>
                                  <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                  <div>{item.crypto_name}</div>
                                </div>
                              </div>
                            ))}
                          </>
                        }
                      </>
                      :
                      <div className='relative'>
                        <div className='cursor-pointer absolute top-2 left-0 text-[#5BB4FD]' onClick={() => setMode(1)}><FaAngleLeft /></div>
                        <div className='py-1 border-b flex justify-center'>
                          <div className='font-medium italic text-xs capitalize text-[#5BB4FD] border border-[lightgrey] border-dashed py-0.5 px-1'>choose network</div>
                        </div>
                        {firstValues.cryptoWallet.length > 0 &&
                          <>
                            {firstValues.cryptoWallet.map((item, i) => (
                              <div className='flex flex-col px-2 py-0.5 hover:bg-[#ececec] border-b border-[#ebeaea] cursor-pointer' key={i} onClick={() => { setSelect(false); setSecondValues(item); setMode(1) }}>
                                <div>{item.network}</div>
                              </div>
                            ))}
                          </>
                        }
                      </div>
                    }
                  </>
                  :
                  <div className='px-2 py-1 flex items-center justify-center lowercase'>
                    <div>no crypto yet...</div>
                    <img src={nothnyet} className='h-3 w-auto'></img>
                  </div>
                }
              </div>
            }
          </div>
          {Object.values(secondValues).length !== 0 &&
            <div className='flex flex-col gap-2 items-center'>
              <div className='text-[0.85rem] text-center'><span className='capitalize'>{secondValues.crypto_name}</span> deposit address for <span className='capitalize'>{secondValues.network} network:</span></div>
              <div className='flex gap-2 items-center'>
                <div className='text-xs text-[#5BB4FD] w-11/12 overflow-x-auto'>{secondValues.address?.slice(0, 35)}{secondValues.address.length > 35 && '....'}</div>
                <button className='outline-none w-fit h-fit py-2 px-2.5 text-[0.8rem] text-semi-white bg-[#252525] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                  {!copy && <MdContentCopy />}
                  {copy && <FaCheck />}
                </button>
              </div>
            </div>
          }
          {Object.values(secondValues).length !== 0 &&
            <div>
              <div className='text-[0.85rem] text-center italic mb-0.5'>or scan qr code:</div>
              <div className='flex items-center justify-center'>
                <QRCode value={secondValues.address} className='h-32 w-auto' />
              </div>
            </div>
          }
          <div className='flex flex-col gap-1 items-center mt-2'>
            <div className='flex gap-1.5 items-center'>
              <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${error === 'check' && 'outline outline-1 outline-[red]'}`}></input>
              <div className='text-[#252525] text-[0.8rem]'>Confirm you've made this deposit</div>
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