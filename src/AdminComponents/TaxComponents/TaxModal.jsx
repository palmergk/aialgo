import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../../services/API'
import moment from 'moment';
import { FaXmark } from 'react-icons/fa6';
import avatar from '../../assets/images/avatar.png'
import Loading from '../../GeneralComponents/Loading';
import { ErrorAlert, MoveToTopDiv, SuccessAlert } from '../../utils/utils';
import ModalLayout from '../../utils/ModalLayout';
import StatusSelector from '../../GeneralComponents/StatusSelector';

const TaxModal = ({ closeView, refetchAllTaxes, singleTax }) => {
    const [message, setMessage] = useState('')
    const toggler = useRef()
    const [status, setStatus] = useState(singleTax?.status)
    const [select, setSelect] = useState(false)
    const [update, setUpdate] = useState(false)
    const [beforeshow, setBeforeshow] = useState(true)
    const [loading, setLoading] = useState(false)

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const Statuses = [
        "processing",
        "received",
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
            if (select || status !== singleTax.status || message !== '') {
                MoveToBottom()
            }
        }
    }, [MoveToBottom]
    )

    const UpdateHandlerForText = () => {
        if (message === '' && status === singleTax.status) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateHandlerForStatus = (item) => {
        setStatus(item)
        if (item === singleTax.status && message === '') {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateTaxPayment = async () => {

        const formbody = {
            tax_id: singleTax.id,
            message: message,
            status: status,
        }

        if (update) {
            setLoading(true)
            MoveToTopDiv()

            try {
                const response = await UserPutApi(Apis.admin.update_taxes, formbody)
                if (response.status === 200) {
                    SuccessAlert(response.msg)
                    refetchAllTaxes()
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
            <div className={`bg-white rounded-lg lg:w-1/2 md:w-4/6 w-11/12 lg:h-[90vh] md:h-[80vh] h-[70vh] overflow-x-hidden ${loading ? 'overflow-y-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    {loading && <Loading />}
                    <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow &&
                        <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className='uppercase font-bold border px-1'>user details:</div>
                                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto'>
                                    {Object.values(singleTax).length !== 0 &&
                                        <>
                                            {singleTax.taxPayer.image ? <img src={`${imageurl}/profiles/${singleTax.taxPayer.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                                :
                                                <img src={avatar} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                            }
                                        </>
                                    }
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>username:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.taxPayer.username}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>email:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.taxPayer.email}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className='uppercase font-bold border px-1'>tax payment details:</div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>amount:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${singleTax.amount.toLocaleString()}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>crypto:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.crypto}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>network:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.network}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>deposit address:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.deposit_address?.slice(0, 5)}.....{singleTax.deposit_address?.slice(-8)}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>date / time:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleTax.createdAt).format('DD-MM-yyyy')} / {moment(singleTax.createdAt).format('h:mm')}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>message:</div>
                                        <textarea placeholder='Write A Message' className='p-2 md:w-52 w-44 h-32 text-black lg:text-[0.85rem] text-base outline-none bg-transparent border border-[#c9b8eb] rounded-md resize-none ipt scroll' value={message} onChange={e => setMessage(e.target.value)} onKeyUp={UpdateHandlerForText}></textarea>
                                    </div>
                                    <div className='flex flex-col gap-6 my-6'>
                                        <div className='flex justify-between items-center'>
                                            <div className='italic'>status:</div>
                                            {singleTax?.status === 'processing' ?
                                                <StatusSelector Statuses={Statuses} status={status} HandleFunction={UpdateHandlerForStatus} select={select} toggle={() => setSelect(!select)}/>
                                                :
                                                <>
                                                    {Object.values(singleTax).length !== 0 && <div className={`md:text-base text-sm capitalize ${singleTax.status === 'received' && 'text-[green]'} ${singleTax.status === 'failed' && 'text-[red]'}`}>{singleTax.status}</div>}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {update && <div className='flex items-center justify-center -mt-4'>
                                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ' onClick={UpdateTaxPayment}>update details</button>
                            </div>}
                        </div>}
                </div>
            </div>
        </ModalLayout>
    )
}

export default TaxModal