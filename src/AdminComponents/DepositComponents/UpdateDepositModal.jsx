import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../../services/API'
import moment from 'moment';
import { FaXmark } from 'react-icons/fa6';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import Loading from '../../GeneralComponents/Loading';
import { ErrorAlert, MoveToTopDiv, SuccessAlert } from '../../utils/utils';
import avatar from '../../assets/images/avatar.png'
import ModalLayout from '../../utils/ModalLayout';

const UpdateDepositModal = ({ closeView, refetchAllDeposits, singleDeposit }) => {
  const toggler = useRef()
  const [status, setStatus] = useState(singleDeposit?.status)
  const [statusShow, setStatusShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [beforeshow, setBeforeshow] = useState(true)

  setTimeout(() => {
    setBeforeshow(false)
  }, 1500)

  const Statuses = [
    "pending",
    "confirmed",
    "failed"
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
      if (statusShow || status !== singleDeposit.status) {
        MoveToBottom()
      }
    }
  }, [MoveToBottom]
  )

  const UpdateHandlerForStatus = (item) => {
    setStatus(item)
    setStatusShow(false)
    if (item === singleDeposit.status) {
      setUpdate(false)
    } else {
      setUpdate(true)
    }
  }

  const AdminUpdateDeposit = async () => {

    const formbody = {
      deposit_id: singleDeposit.id,
      status: status,
    }

    if (update) {
      setLoading(true)
      MoveToTopDiv()

      try {
        const response = await UserPutApi(Apis.admin.update_deposits, formbody)
        if (response.status === 200) {
          SuccessAlert(response.msg)
          refetchAllDeposits()
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
  }

  return (
    <ModalLayout closeView={closeView} toggler={toggler}>
      <div className={`bg-white rounded-lg lg:w-1/2 md:w-4/6 w-11/12 lg:h-[90vh] md:h-[80vh] h-[70vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
        <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
          {loading && <Loading />}
          <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
          {beforeshow && <div className='beforeshow'></div>}
          {!beforeshow &&
            <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
              <div className='flex flex-col gap-4 border p-1'>
                <div className=' uppercase font-bold border px-1 '>user details:</div>
                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto'>
                  {Object.values(singleDeposit).length !== 0 &&
                    <>
                      {singleDeposit.depositUser.image ? <img src={`${imageurl}/profiles/${singleDeposit.depositUser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                        :
                        <img src={avatar} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                      }
                    </>
                  }
                </div>
                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>username:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.depositUser.username}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>email:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.depositUser.email}</div>}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 border p-1'>
                <div className=' uppercase font-bold border px-1 '>deposit details:</div>
                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>amount:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${singleDeposit.amount.toLocaleString()}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>crypto:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.crypto}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>network:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.network}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>deposit address:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.deposit_address?.slice(0, 5)}.....{singleDeposit.deposit_address?.slice(-8)}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>date / time:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleDeposit.createdAt).format('DD-MM-yyyy')} / {moment(singleDeposit.createdAt).format('h:mm')}</div>}
                  </div>
                  <div className='flex flex-col gap-6 my-6'>
                    <div className='flex justify-between items-center'>
                      <div className='italic'>status:</div>
                      {singleDeposit?.status === 'pending' ? <div className='relative'>
                        <div className='px-2 py-1 h-fit md:w-44 w-36 bg-white rounded-[3px] sha cursor-pointer' onClick={() => { setStatusShow(!statusShow); MoveToBottom() }} >
                          <div className='flex justify-between items-center text-[0.8rem]'>
                            <span >{status}</span>
                            <div className='text-sm'>
                              {!statusShow ? <TiArrowSortedDown />
                                :
                                <TiArrowSortedUp />
                              }
                            </div>
                          </div>
                        </div>
                        {statusShow && <div className='h-fit w-full absolute top-[1.8rem] left-0 bg-white border border-[lightgrey] rounded-md z-10 text-[0.85rem] font-bold'>
                          {Statuses.map((item, i) => (
                            <div key={i} className={`flex flex-col px-2 py-0.5 cursor-pointer hover:bg-[#ececec] ${i !== Statuses.length - 1 && 'border-b border-[#ebeaea]'}`} onClick={() => UpdateHandlerForStatus(item)}>
                              <div className='flex items-center'>
                                <div className={`${item === 'confirmed' && 'text-[green]'} ${item === 'failed' && 'text-[red]'}`}>{item}</div>
                              </div>
                            </div>
                          ))}
                        </div>}
                      </div>
                        :
                        <>
                          {Object.values(singleDeposit).length !== 0 && <div className={`md:text-base text-sm capitalize ${singleDeposit.status === 'confirmed' && 'text-[green]'} ${singleDeposit.status === 'failed' && 'text-[red]'}`}>{singleDeposit.status}</div>}
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
              {update && <div className='flex items-center justify-center -mt-4'>
                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ' onClick={AdminUpdateDeposit}>update details</button>
              </div>}
            </div>}
        </div>
      </div>
    </ModalLayout>
  )
}

export default UpdateDepositModal