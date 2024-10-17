import React, { useRef, useState } from 'react'
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { Apis, UserPostApi } from '../services/API';
import Loading from './Loading';
import ModalLayout from '../utils/ModalLayout';
import { ErrorAlert, SuccessAlert } from '../utils/utils';

const ForgottenPassword = ({ closeView }) => {
    const toggler = useRef()
    const [screen, setScreen] = useState(1)
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        code: '',
        new_password: '',
        confirm_password: ''
    })

    const formHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const FindEmail = async (e) => {
        e.preventDefault()

        if (!form.email) return ErrorAlert('Enter your email address')
        const formbody = {
            email: form.email
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.find_email, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setScreen(2)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const VerifyOTP = async (e) => {
        e.preventDefault()

        if (!form.code) return ErrorAlert('Enter verification code')
        const formbody = {
            email: form.email,
            code: form.code
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.verify_otp, formbody)
            if (response.status === 200) {
                setScreen(3)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const ChangePassword = async (e) => {
        e.preventDefault()

        if (!form.new_password) return ErrorAlert('Create a new password')
        if (!form.confirm_password) return ErrorAlert('Confirm password')
        if (form.confirm_password !== form.new_password) return ErrorAlert('Passwords mismatch')
        const formbody = {
            email: form.email,
            password: form.new_password,
            confirm_password: form.confirm_password
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.change_password, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setScreen(4)
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
        <ModalLayout toggler={toggler} closeView={closeView}>
            <div className='px-4'>
                <div className='bg-white py-4 w-fit h-fit rounded-xl shld overflow-auto relative' ref={toggler}>
                    {loading && <Loading />}
                    {screen === 1 &&
                        <div className='md:w-[85%] w-11/12 mx-auto'>
                            <form onSubmit={FindEmail}>
                                <div className='flex justify-center flex-col gap-2 items-center'>
                                    <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                                        <IoLockClosedOutline className='text-2xl' />
                                    </div>
                                    <div className='text-[0.9rem] font-extrabold'>Trouble logging in?</div>
                                    <div className='text-center text-[0.8rem] font-[600]'>Enter your email address to find your account and reset password</div>
                                </div>
                                <div className='flex flex-col gap-5 mt-8'>
                                    <div className='flex flex-col gap-2 relative'>
                                        <div className='text-xs capitalize font-[600]'>enter email address</div>
                                        <input className='outline-none w-full border-b border-black lg:text-[0.9rem] text-base ipt input-off' type='email' placeholder='E.g: john14@gmail.com' name='email' value={form.email} onChange={formHandler}></input>
                                    </div>
                                    <div className='flex items-center justify-center mt-2'>
                                        <button className='outline-none bg-orange py-2 md:px-24 h-fit md:w-fit w-full rounded-md capitalize text-[0.9rem] text-white cursor-pointer font-[550]' >find account</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                    {screen === 2 &&
                        <div className='md:w-[85%] w-11/12 mx-auto'>
                            <form onSubmit={VerifyOTP}>
                                <div className='flex justify-center flex-col gap-2 items-center'>
                                    <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                                        <MdVerified className='text-[1.7rem]' />
                                    </div>
                                    <div className='text-[0.9rem] font-extrabold'>Verify your email address</div>
                                    <div className='text-center text-[0.8rem] font-[600]'>A verification code was sent to your email address, copy and paste the code below</div>
                                </div>
                                <div className='flex flex-col gap-5 mt-8'>
                                    <div className='flex flex-col gap-2 relative'>
                                        <div className='text-xs capitalize font-[600]'>enter verification code:</div>
                                        <input className='outline-none w-full  border-b border-black lg:text-[0.9rem] text-base input-off ipt' type='text' placeholder='Six digits code' name='code' value={form.code} onChange={formHandler}></input>
                                    </div>
                                    <div className='flex items-center justify-center mt-2'>
                                        <button className='outline-none bg-orange py-2 md:px-[7.5rem] h-fit md:w-fit w-full rounded-md capitalize text-[0.9rem] text-white cursor-pointer font-[550]' >verify email</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                    {screen === 3 &&
                        <div className='md:w-[85%] w-11/12 mx-auto'>
                            <form onSubmit={ChangePassword}>
                                <div className='flex justify-center flex-col gap-2 items-center'>
                                    <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                                        <IoLockOpenOutline className='text-2xl' />
                                    </div>
                                    <div className='text-[0.9rem] font-extrabold capitalize'>password re-set</div>
                                    <div className='text-center text-[0.8rem] font-[600]'>Set a new password for your account by filling the password fields below</div>
                                </div>
                                <div className='flex flex-col gap-5 mt-8'>
                                    <div className='flex flex-col gap-2 relative'>
                                        <div className='text-xs capitalize font-[600]'>create new password</div>
                                        <input className='outline-none w-full  border-b border-black lg:text-[0.9rem] text-base input-off  ipt' type={eye === true ? 'text' : 'password'} placeholder='Six or more characters' name='new_password' value={form.new_password} onChange={formHandler}></input>
                                        <EyeIcon className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye(!eye)} />
                                    </div>
                                    <div className='flex flex-col gap-2 relative'>
                                        <div className='text-xs capitalize font-[600]'>confirm password</div>
                                        <input className='outline-none w-full  border-b border-black lg:text-[0.9rem] text-base input-off ipt' type={eye2 === true ? 'text' : 'password'} placeholder='Re-type password' name='confirm_password' value={form.confirm_password} onChange={formHandler}></input>
                                        <EyeIcon2 className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye2(!eye2)} />
                                    </div>
                                    <div className='flex items-center justify-center mt-2'>
                                        <button className='outline-none bg-orange py-2 md:px-24 h-fit ,md:w-fit w-full rounded-md capitalize text-[0.8rem] text-white cursor-pointer font-[550]'>change password</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                    {screen === 4 &&
                        <div className='md:w-[85%] w-11/12 mx-auto'>
                            <div className='flex flex-col gap-2 justify-center items-center'>
                                <div className='w-12 h-12 border-2 border-[green] rounded-full flex items-center justify-center'>
                                    <RiVerifiedBadgeLine className='text-2xl text-[green]' />
                                </div>
                                <div className='text-[0.9rem] font-extrabold uppercase text-center'>password Reset</div>
                                <div className='text-center text-[0.8rem] font-[600]'>Password change successful, you can now login with new password created</div>
                                <div className='flex gap-1 cursor-pointer mt-4 items-center text-sm text-[green] hover:text-orange' onClick={closeView}>
                                    <div className='font-[600]'>Back to login</div>
                                    <FaArrowRight />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default ForgottenPassword