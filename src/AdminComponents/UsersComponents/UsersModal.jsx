import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { FaRegRectangleXmark, FaXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { SlLockOpen } from 'react-icons/sl';
import { PiWarningCircleBold } from 'react-icons/pi';
import avatar from '../../assets/images/avatar.png'
import { ErrorAlert, SuccessAlert } from '../../utils/utils';
import Loading from '../../GeneralComponents/Loading';
import { Apis, imageurl, UserPutApi } from '../../services/API';
import ModalLayout from '../../utils/ModalLayout';
import { Image } from 'antd'
import { PiDownloadLight } from "react-icons/pi"
import StatusSelector from '../../GeneralComponents/StatusSelector';
import { LuBan } from 'react-icons/lu';
import PasswordToTextInput from '../../GeneralComponents/PasswordToTextInput';
import { useAtom } from 'jotai';
import { PROFILE } from '../../store';
import CopyButton from '../../GeneralComponents/CopyButton';


const UsersModal = ({ closeView, singleUser, userFigures, refetchAllUsers }) => {
    const [user] = useAtom(PROFILE)
    const toggler = useRef()
    const [beforeshow, setBeforeshow] = useState(true)
    const [screen, setScreen] = useState(0)
    const [fundScreen, setFundScreen] = useState(1)
    const [withdrawalScreen, setWithdrawalScreen] = useState(1)
    const [suspendScreen, setSuspendScreen] = useState(1)
    const [status, setStatus] = useState(Object.values(singleUser).length !== 0 ? singleUser.kycUser[0]?.status : Statuses[0])
    const [select, setSelect] = useState(false)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [reactivate, setReactivate] = useState(false)
    const [rvtloading, setRvtLoading] = useState(false)
    const [tag, setTag] = useState('fund')
    const [form, setForm] = useState({
        fundAmount: '',
        minimumAmount: '',
        password: '',
        message: ''
    })

    const formHandler = e => {
        const { name, value } = e.target
        if (['fundAmount', 'minimumAmount'].includes(name)) {
            const formatVal = value.replace(/\D/g, '')
            const formatted = Number(formatVal).toLocaleString()
            setForm({ ...form, [name]: formatted })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const Statuses = [
        "processing",
        "verified",
        "failed"
    ]

    const Options = [
        "fund",
        "deduct"
    ]

    const Screens = [
        "main field",
        "kyc field"
    ]

    const MoveToBottom = () => {
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if (!loading2) {
            if (suspendScreen !== 1 || fundScreen !== 1 || withdrawalScreen !== 1 || select || form.message !== '' || screen === 1 && status !== singleUser.kycUser[0]?.status) {
                MoveToBottom()
            }
        }
    }, [MoveToBottom])

    const UpdateUser = async () => {
        if (fundScreen !== 1) {
            if (!form.fundAmount || form.fundAmount < 1) return ErrorAlert('Enter an amount')
        }
        if (withdrawalScreen !== 1) {
            if (!form.minimumAmount || form.minimumAmount < 1) return ErrorAlert('Enter an amount')
        }
        if (suspendScreen !== 1) {
            if (!form.password) return ErrorAlert('Enter your password')
        }

        const famt = parseFloat(form.fundAmount.replace(/,/g, ''))
        const mamt = parseFloat(form.minimumAmount.replace(/,/g, ''))
        const formbody = {
            user_id: singleUser.id,
            password: form.password,
            fundAmount: famt,
            tag: tag,
            minimumAmount: mamt
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_users, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchAllUsers()
                closeView()
            } else {
                ErrorAlert(`${response.msg}`)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const ReactivateUsers = async () => {
        const formbody = {
            user_id: singleUser.id,
        }

        setRvtLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.reactivate_users, formbody)
            if (response.status === 200) {
                refetchAllUsers()
                setReactivate(true)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setRvtLoading(false)
        }
    }

    const UpdateHandlerForText = () => {
        if (form.message === '' && status === singleUser.kycUser[0].status) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateHandlerForStatus = (item) => {
        setStatus(item)
        if (item === singleUser.kycUser[0].status && form.message === '') {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateUserKYC = async () => {
        const formbody = {
            kyc_id: singleUser.kycUser[0].id,
            message: form.message,
            status: status,
        }

        setLoading2(true)
        try {
            const response = await UserPutApi(Apis.admin.update_kyc, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchAllUsers()
                closeView()
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading2(false)
        }
    }

    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className={`bg-white rounded-lg max-w-2xl mx-auto lg:h-[90vh] h-[75vh] overflow-x-hidden overflow-y-auto scroll ${beforeshow && 'flex items-center justify-center'} move`} ref={toggler}>
                <div className='relative'>
                    {loading2 && <Loading />}
                    {beforeshow ?
                        <div className='beforeshow'></div>
                        :
                        <>
                            <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                            <div className='w-11/12 mx-auto md:py-8 py-4 md:text-[0.9rem] text-[0.8rem]'>
                                {singleUser.role === 'user' &&
                                    <div className="bg-semi-white rounded-md p-1 gap-10 flex items-center justify-center mb-4">
                                        {Screens.map((item, index) => (
                                            <div onClick={() => setScreen(screen === 0 ? 1 : 0)} className={`cursor-pointer w-full py-2 text-xs uppercase ${screen === index ? 'bg-white text-dark rounded-md' : ''} text-center `} key={index}>{item}</div>
                                        ))}
                                    </div>
                                }
                                <div>
                                    {screen === 0 &&
                                        <div className='flex flex-col gap-8'>
                                            <div className='flex flex-col gap-4 border p-1'>
                                                <div className='uppercase font-bold border px-1'>user details:</div>
                                                <div className='md:w-24 md:h-24 w-20 h-20 rounded-full border-2 border-[#c9b8eb] mx-auto' >
                                                    {Object.values(singleUser).length !== 0 &&
                                                        <>
                                                            {singleUser.image ?
                                                                <img src={`${imageurl}/profiles/${singleUser.image}`} className='w-full h-full rounded-full object-cover'></img>
                                                                :
                                                                <img src={avatar} className='w-full h-full rounded-full object-cover'></img>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='italic'>full name:</div>
                                                        <div className='md:text-[0.95rem] text-sm'>{singleUser?.full_name}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='italic'>username:</div>
                                                        <div className='md:text-[0.95rem] text-sm'>{singleUser?.username}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='italic'>email:</div>
                                                        <div className='md:text-[0.95rem] text-sm'>{singleUser?.email}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='italic'>country:</div>
                                                        <div className='md:text-[0.95rem] text-sm'>{singleUser?.country}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='italic'>joined:</div>
                                                        <div className='md:text-[0.95rem] text-sm'>{moment(singleUser?.createdAt).format('DD-MM-yyyy')}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='italic'>role:</div>
                                                        <div className='md:text-[0.95rem] text-sm text-[#462c7c]'>{singleUser?.role}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {singleUser?.role === 'user' &&
                                                <div className='flex flex-col gap-4 border p-1'>
                                                    <div className='uppercase font-bold border px-1'>financial details:</div>
                                                    <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>total amount deposited:</div>
                                                            {Object.values(userFigures).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${userFigures.total_deposit.toLocaleString()}</div>}
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>account balance:</div>
                                                            {Object.values(userFigures).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${userFigures.wallet_balance.toLocaleString()}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {singleUser?.account_deletion === 'true' && user.role === 'super admin' &&
                                                <div className='border p-2 flex items-center gap-3'>
                                                    <span className='italic text-[red]'>this acccount was deleted</span>
                                                    <div className='w-fit relative'>
                                                        <button className='w-fit h-fit py-2 px-4 text-xs capitalize bg-[#9f7ae7] rounded-md text-white font-medium flex items-center gap-1' onClick={ReactivateUsers}>
                                                            <span>{reactivate ? 'reactived' : 'reactivate now'}</span>
                                                            {reactivate && <IoMdCheckmarkCircleOutline className='text-sm' />}
                                                        </button>
                                                        {rvtloading && <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-[#2c1e69a4] rounded-md z-20">
                                                            <div className='load'></div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            }
                                            {singleUser?.role === 'user' &&
                                                <>
                                                    <div className='mt-4'>
                                                        {fundScreen === 1 ?
                                                            <div className='flex justify-center'>
                                                                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => { setFundScreen(2); setSuspendScreen(1); setWithdrawalScreen(1) }}>fund account</button>
                                                            </div>
                                                            :
                                                            <div className='w-fit h-fit py-6 rounded-md bg-white mx-auto text-black relative overflow-hidden popsha'>
                                                                {loading && <Loading />}
                                                                <FaXmark className='absolute top-0 right-1 cursor-pointer text-lg' onClick={() => setFundScreen(1)} />
                                                                <div className='font-bold border-b text-center uppercase'>{tag === 'fund' ? 'fund' : 'deduct'} {singleUser?.username} account</div>
                                                                <div className="bg-semi-white rounded-md p-1 gap-4 flex items-center justify-center mt-2 mx-2">
                                                                    {Options.map((item, i) => (
                                                                        <div onClick={() => setTag(item)} className={`cursor-pointer w-full py-1 text-xs uppercase ${tag === item ? 'bg-white text-dark rounded-md' : ''} text-center `} key={i}>{item}</div>
                                                                    ))}
                                                                </div>
                                                                <div className='flex flex-col gap-6 items-center justify-center mt-6 md:px-8 px-6'>
                                                                    <div className='flex flex-col gap-1'>
                                                                        <div className='text-[0.8rem] capitalize'>Enter an amount ($)</div>
                                                                        <input className='outline-none lg:text-[0.85rem] text-base w-full border h-8 rounded-[3px] px-2 bg-[#ebeaea] ipt border-[#9f7ae7]' name='fundAmount' value={form.fundAmount} onChange={formHandler}></input>
                                                                    </div>
                                                                    <div className='mx-auto'>
                                                                        <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white bg-[#9f7ae7] rounded-md capitalize font-semibold' onClick={UpdateUser}>{tag === 'fund' ? 'send' : 'deduct'} funds</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div>
                                                        {withdrawalScreen === 1 ?
                                                            <div className='flex justify-center'>
                                                                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => { setWithdrawalScreen(2); setSuspendScreen(1); setFundScreen(1) }}>set withdrawal minimum</button>
                                                            </div>
                                                            :
                                                            <div className='w-fit h-fit py-6 rounded-md bg-white mx-auto text-black relative overflow-hidden popsha'>
                                                                {loading && <Loading />}
                                                                <FaXmark className='absolute top-0 right-1 cursor-pointer text-lg' onClick={() => setWithdrawalScreen(1)} />
                                                                <div className='font-bold border-b text-center uppercase'>set {singleUser?.username} withdrawal minimum</div>
                                                                <div className='flex flex-col gap-6 items-center justify-center mt-6 md:px-8 px-6'>
                                                                    <div className='flex gap-4 items-center'>
                                                                        <div className='flex flex-col gap-1'>
                                                                            <div className='text-[0.8rem] capitalize'>Enter an amount ($)</div>
                                                                            <input className='outline-none lg:text-[0.85rem] text-base w-full border h-8 rounded-[3px] px-2 bg-[#ebeaea] ipt border-[#9f7ae7]' name='minimumAmount' value={form.minimumAmount} onChange={formHandler}></input>
                                                                        </div>
                                                                        <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-semibold rounded-[3px]'>
                                                                            <div>current:</div>
                                                                            {Object.values(userFigures).length !== 0 && <div>${singleUser.withdrawal_minimum.toLocaleString()}</div>}
                                                                        </div>
                                                                    </div>
                                                                    <div className='mx-auto'>
                                                                        <button className='outline-none w-fit h-fit py-2 px-6 md:text-[0.8rem] text-xs text-white bg-[#9f7ae7] rounded-md capitalize font-semibold' onClick={UpdateUser}>update</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </>
                                            }
                                            {singleUser?.role !== 'super admin' && user.role === 'super admin' &&
                                                <div>
                                                    {suspendScreen === 1 ?
                                                        <div className='flex justify-center'>
                                                            <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => { setSuspendScreen(2); setFundScreen(1); setWithdrawalScreen(1) }}>{singleUser.suspend === 'true' ? 'unsuspend' : 'suspend'} account</button>
                                                        </div>
                                                        :
                                                        <div className='w-fit h-fit md:p-8 p-4 rounded-md bg-white mx-auto text-black relative overflow-hidden popsha'>
                                                            {loading && <Loading />}
                                                            {suspendScreen === 2 &&
                                                                <div className='flex flex-col gap-8 items-center justify-center'>
                                                                    <div className='flex flex-col gap-2'>
                                                                        <div className='text-center md:text-[1.1rem] text-sm text-black font-medium'>{singleUser?.suspend === 'true' ? 'Are you sure you want to unsuspend this user?' : 'Are you sure you want to suspend this user?'}</div>
                                                                        <div className='flex justify-center items-center gap-0.5 md:text-[0.8rem] text-xs font-medium'>
                                                                            <span className='text-center'>{singleUser?.suspend === 'true' ? 'User will regain access to account' : 'User will be unable to access account'}</span>
                                                                            <PiWarningCircleBold className='text-[red]' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex md:gap-16 gap-4 items-center'>
                                                                        <button className='outline-none w-fit h-fit py-2 md:px-4 px-3 md:text-xs text-[0.7rem] text-white bg-[#5e5d5d] rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setSuspendScreen(1)}>
                                                                            <span>cancel action</span>
                                                                            <FaRegRectangleXmark />
                                                                        </button>
                                                                        <button className={`outline-none w-fit h-fit py-2 md:px-4 px-3 md:text-xs text-[0.7rem] text-white ${singleUser.suspend === 'true' ? 'bg-[#584383]' : 'bg-[#7e3232] '} rounded-md capitalize flex items-center gap-1 font-bold`} onClick={() => setSuspendScreen(3)}>
                                                                            <span>proceed action</span>
                                                                            <LuBan />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {suspendScreen === 3 &&
                                                                <div className='flex flex-col gap-2 items-center justify-center'>
                                                                    <div className='md:text-[1.1rem] text-sm font-medium text-center'>{singleUser?.suspend === 'true' ? `Last step to unsuspend ${singleUser?.username}'s account!` : `Last step to suspend ${singleUser?.username}'s account!`}</div>
                                                                    <div className='flex gap-1 items-center justify-center md:text-[0.8rem] text-xs text-[red]'>
                                                                        <span className='text-black font-medium text-center'>Admin, enter your password to finalize action</span>
                                                                        <SlLockOpen />
                                                                    </div>
                                                                    <div className='flex flex-col gap-8 items-center justify-center mt-4'>
                                                                        <PasswordToTextInput name='password' value={form.password} onChange={formHandler} placeholder='Enter your password' className={{ main: '!border-[#9f7ae7] rounded-[4px]', icon: '!text-[#9f7ae7]' }} />
                                                                        <div className='flex md:gap-16 gap-4 items-center'>
                                                                            <button className='outline-none w-fit h-fit py-2 md:px-4 px-3 md:text-xs text-[0.7rem] text-white  bg-[#5e5d5d] rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setSuspendScreen(1)}>
                                                                                <span>cancel action</span>
                                                                                <FaRegRectangleXmark />
                                                                            </button>
                                                                            <button className={`outline-none w-fit h-fit py-2 md:px-4 px-3 md:text-xs text-[0.7rem] text-white ${singleUser.suspend === 'true' ? 'bg-[#584383]' : 'bg-[#7e3232] '}  rounded-md capitalize flex items-center gap-1 font-bold`} onClick={UpdateUser}>
                                                                                <span>{singleUser.suspend === 'true' ? 'unsuspend' : 'suspend'} account</span>
                                                                                <LuBan />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                    {screen === 1 &&
                                        <div className='flex flex-col gap-8'>
                                            <div className='flex flex-col gap-4 border p-1'>
                                                <div className='uppercase font-bold border px-1'>user kyc details:</div>
                                                {Object.values(singleUser).length !== 0 && singleUser.kycUser.length !== 0 ?
                                                    <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>first name:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.first_name}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>last name:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.last_name}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>gender:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.gender}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>marital status:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.marital_status}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>country:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.country}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>date of birth:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{moment(singleUser.kycUser[0]?.date_of_birth).format('DD-MM-yyyy')}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>address:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.address}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>state:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.state}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>postal / zipcode:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.postal}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>phone number:</div>
                                                            <div className='flex gap-1.5 items-center'>
                                                                <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.phone_code + singleUser.kycUser[0]?.phone_number}</div>
                                                                <CopyButton content={singleUser.kycUser[0]?.phone_code + singleUser.kycUser[0]?.phone_number} className='!bg-[#c9b8eb] !text-black' />
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>ID type:</div>
                                                            <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.id_type}</div>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4'>
                                                            <div className='italic'>ID number:</div>
                                                            <div className='flex gap-1.5 items-center'>
                                                                <div className='md:text-[0.95rem] text-sm'>{singleUser.kycUser[0]?.id_number}</div>
                                                                <CopyButton content={singleUser.kycUser[0]?.id_number} className='!bg-[#c9b8eb] !text-black' />
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex justify-between items-center gap-4 mt-3'>
                                                                <div className='italic'>front ID image:</div>
                                                                <Image src={`${imageurl}/identity/${singleUser.kycUser[0]?.gen_id}/${singleUser.kycUser[0]?.front_id}`} width={200} />
                                                            </div>
                                                            <a href={`${imageurl}/identity/${singleUser.kycUser[0]?.gen_id}/${singleUser.kycUser[0]?.front_id}`} download="user valid ID">
                                                                <button className='bg-[#c9b8eb] py-1.5 px-4 text-black w-fit ml-auto rounded-full font-semibold text-xs flex items-center gap-0.5'>
                                                                    <span>Download</span>
                                                                    <PiDownloadLight />
                                                                </button>
                                                            </a>
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex justify-between items-center gap-4 mt-3'>
                                                                <div className='italic'>back ID image:</div>
                                                                <Image src={`${imageurl}/identity/${singleUser.kycUser[0]?.gen_id}/${singleUser.kycUser[0]?.back_id}`} width={200} />
                                                            </div>
                                                            <a href={`${imageurl}/identity/${singleUser.kycUser[0]?.gen_id}/${singleUser.kycUser[0]?.back_id}`} download="user valid ID">
                                                                <button className='bg-[#c9b8eb] py-1.5 px-4 text-black w-fit ml-auto rounded-full font-semibold text-xs flex items-center gap-0.5'>
                                                                    <span>Download</span>
                                                                    <PiDownloadLight />
                                                                </button>
                                                            </a>
                                                        </div>
                                                        <div className='flex justify-between items-center gap-4 my-6'>
                                                            <div className='italic'>status:</div>
                                                            {singleUser.kycUser[0]?.status === 'processing' ?
                                                                <StatusSelector Statuses={Statuses} status={status} HandleFunction={UpdateHandlerForStatus} select={select} toggle={() => setSelect(!select)} />
                                                                :
                                                                <div className={`md:text-base text-sm capitalize ${singleUser.kycUser[0].status === 'failed' ? 'text-[red]' : 'text-[green]'}`}>{singleUser.kycUser[0]?.status}</div>
                                                            }
                                                        </div>
                                                        {status === 'failed' && <div className='flex justify-between items-center gap-4 mb-6'>
                                                            <div className='italic'>message:</div>
                                                            <textarea placeholder='Provide a reason for failed verification...' className='p-2 md:w-52 w-44 h-32 text-black lg:text-[0.85rem] text-base outline-none bg-transparent border border-[#c9b8eb] rounded-md resize-none ipt scroll' name='message' value={form.message} onChange={formHandler} onKeyUp={UpdateHandlerForText}></textarea>
                                                        </div>}
                                                    </div>
                                                    :
                                                    <div className='text-base text-center'>No KYC details submitted yet...</div>
                                                }
                                            </div>
                                            {update && <div className='flex items-center justify-center'>
                                                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ' onClick={UpdateUserKYC}>update details</button>
                                            </div>}
                                        </div>
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default UsersModal