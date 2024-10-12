import React, { useRef, useState } from 'react'
import { PiWarningCircleBold } from "react-icons/pi";
import ModalLayout from '../../../utils/ModalLayout';
import Loading from '../../../GeneralComponents/Loading';
import { Apis, PostApi, UserPutApi } from '../../../services/API';
import { ErrorAlert, SuccessAlert } from '../../../utils/utils';
import { FaXmark } from 'react-icons/fa6';

const UpdateWalletModal = ({ closeView, singleWallet, refetchAdminWallets }) => {
  const [deleteState, setdeleteState] = useState(false)
  const [commit, setCommit] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggler = useRef()

  const [form, setForm] = useState({
    address: singleWallet?.address,
    network: singleWallet?.network,
  })

  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const CommitHandler = () => {
    if (form.network === singleWallet.network && form.address === singleWallet.address) {
      setCommit(false)
    } else {
      setCommit(true)
    }
  }


  const UpdateWallet = async () => {
    if (!form.network) return ErrorAlert('Enter a network')
    if (!form.address) return ErrorAlert('Enter an address')

    const formbody = new FormData()
    formbody.append('wallet_id', singleWallet.id)
    formbody.append('network', form.network)
    formbody.append('address', form.address)

    setLoading(true)
    try {
      const response = await UserPutApi(Apis.admin.update_admin_wallet, formbody)
      if (response.status === 200) {
        SuccessAlert(response.msg)
        refetchAdminWallets()
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


  const DeleteWallet = async () => {
    const formbody = {
      wallet_id: singleWallet.id
    }

    setLoading(true)
    try {
      const response = await PostApi(Apis.admin.delete_admin_wallet, formbody)
      if (response.status === 200) {
        SuccessAlert(response.msg)
        refetchAdminWallets()
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
      <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden relative' ref={toggler}>
        <div className='relative'>
          {loading && <Loading />}
          <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
          <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
            <div className='text-xl uppercase text-center font-bold border-b'>update wallet</div>
            <div className='flex flex-col gap-4 mt-4 relative'>
              <div className='flex justify-between items-center gap-4'>
                <div className='italic'>crypto:</div>
                <div className='capitalize'>{singleWallet?.crypto_name}</div>
              </div>
              <div className='flex justify-between items-center gap-4'>
                <div className='italic'>network:</div>
                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.network} name='network' onChange={inputHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex justify-between items-center gap-4'>
                <div className='italic'>address:</div>
                <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.address} name='address' onChange={inputHandler} onKeyUp={CommitHandler}></input>
              </div>
            </div>
            <div className='flex gap-4 items-center mt-8 relative'>
              {commit && <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateWallet}>update</button>}
              <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ml-auto' onClick={() => setdeleteState(true)}>delete</button>
              {deleteState && <div className='bg-white adsha w-fit h-fit flex flex-col gap-4 items-center justify-center absolute bottom-0 right-0 p-3 rounded-md text-xs'>
                <div className='md:text-sm text-[0.8rem] flex items-center gap-1 justify-center text-center font-semibold'>
                  <span> Are you sure you want to Delete Wallet?</span>
                  <PiWarningCircleBold className='text-[red]' />
                </div>
                <div className='flex items-center gap-6'>
                  <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 text-white rounded-md font-medium' onClick={() => setdeleteState(false)}>cancel</button>
                  <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 text-white rounded-md font-medium' onClick={DeleteWallet}>proceed</button>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}

export default UpdateWalletModal