import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md';
import { Apis, UserPostApi } from '../../../../services/API';
import { ErrorAlert, SuccessAlert } from '../../../../utils/utils';
import { PROFILE } from '../../../../store';
import { useAtom } from 'jotai';
import Loading from '../../../../GeneralComponents/Loading';
import SettingsLayout from '../../../../UserComponents/SettingsLayout';

const VerifyEmail = () => {
    const [user, setUser] = useAtom(PROFILE)
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: user?.email,
        code: ''
    })

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const SendOTP = async (e) => {
        e.preventDefault()

        if (user.email_verified === 'true') return ErrorAlert('Email address is verified')
        if (!form.email) return ErrorAlert('Enter your email address')
        const formbody = {
            email: form.email
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.send_otp, formbody)
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

    const VerifyEmail = async e => {
        e.preventDefault()

        if (!form.code) return ErrorAlert('Enter verification code')
        const formbody = {
            code: form.code,
            email: form.email
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.verify_otp, formbody)
            if (response.status === 200) {
                SuccessAlert('Email address verified')
                setUser(response.msg)
                setForm({
                    ...form,
                    code: ''
                })
                setScreen(1)
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
        <SettingsLayout>
            <div>
                {loading && <Loading className="!bg-[#0c091aa4]" />}
                <div className='flex flex-col justify-center items-center gap-14 pt-16'>
                    <div className='flex flex-col gap-2 items-center text-semi-white'>
                        <div className='flex gap-2 items-center md:text-4xl text-2xl capitalize font-bold'>
                            <span>verify your email</span>
                            <MdVerified className='text-light' />
                        </div>
                        <div className='italic text-sm flex items-center gap-2'><span>Status:</span> <span className={`${user.email_verified === 'true' ? 'text-light' : 'text-[#c42e2e]'}`}>{user.email_verified === 'true' ? 'verified' : 'unverified'}</span></div>
                    </div>
                    {screen === 1 &&
                        <form onSubmit={SendOTP}>
                            <div className='flex flex-col gap-10 items-center'>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-[0.85rem] capitalize text-semi-white'> email address</div>
                                    <div className='relative'>
                                        <input className='outline-none rounded-[3px] w-64 md:w-80 h-10 bg-transparent px-3 border border-light lg:text-[0.9rem] text-base text-semi-white ipt' type='email' placeholder='Enter your email address' name='email' value={form.email} onChange={formHandler}></input>
                                    </div>
                                </div>
                                <button className='outline-none bg-light py-2 px-8 rounded-md capitalize text-xs md:text-sm text-white cursor-pointer font-semibold'>verify</button>
                            </div>
                        </form>
                    }
                    {screen === 2 &&
                        <form onSubmit={VerifyEmail}>
                            <div className='flex flex-col gap-10 items-center'>
                                <div className='flex flex-col gap-4 items-center'>
                                    <div className='text-[0.85rem]  text-semi-white text-center'> A six digits verification code was sent to <span className='text-[#7665D5]'>{form.email?.slice(0, 3)}*****{form.email?.slice(-10)}</span>, copy and enter below</div>
                                    <div className='relative'>
                                        <input className='outline-none rounded-[3px] w-64 md:w-80 h-10 bg-transparent px-3 border border-light lg:text-[0.9rem] text-base text-semi-white ipt' type='text' placeholder='Enter verification code' name='code' value={form.code} onChange={formHandler}></input>
                                    </div>
                                </div>
                                <button className='outline-none bg-light py-2 px-8 h-fit w-fit rounded-md capitalize md:text-sm text-xs text-white cursor-pointer font-semibold'>verify</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </SettingsLayout>
    )
}

export default VerifyEmail