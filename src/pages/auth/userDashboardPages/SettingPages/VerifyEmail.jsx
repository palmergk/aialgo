import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md';
import { Apis, UserPostApi } from '../../../../services/API';
import { ErrorAlert, SuccessAlert } from '../../../../utils/utils';
import { PROFILE } from '../../../../store';
import { useAtom } from 'jotai';
import Loading from '../../../../GeneralComponents/Loading';
import SettingsLayout from '../../../../UserComponents/SettingsLayout';
import PinForm from '../../../../utils/PinForm';


const VerifyEmail = () => {
    const [user, setUser] = useAtom(PROFILE)
    const [screen, setScreen] = useState(1)
    const [seconds, setSeconds] = useState(0)
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState(['', '', '', '', '', '']);
    const checkPins = pins.join('')
    const [form, setForm] = useState({
        email: user?.email,
    })

    const SendOTP = async (e) => {
        e.preventDefault()

        if (user.email_verified === 'true') return ErrorAlert('Email address is verified')
        if (!form.email) return ErrorAlert('Enter your email address')

        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.send_otp, { email: form.email })
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setScreen(2)
                DelayResend()
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const DelayResend = () => {
        setSeconds(59)
        let altsec = 59
        let delay = setInterval(() => {
            if (altsec === 0) {
                clearInterval(delay)
            } else {
                altsec -= 1
                setSeconds(altsec)
            }
        }, 1000)
    }

    const VerifyEmail = async e => {
        e.preventDefault()

        if (checkPins.length < 5) return ErrorAlert('Enter verification code')
        const formbody = {
            code: checkPins,
            email: form.email
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.verify_otp, formbody)
            if (response.status === 200) {
                SuccessAlert('Email address verified')
                setUser(response.msg)
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
            <div className='mt-16'>
                {loading && <Loading className="!bg-[#0c091aa4]" />}
                <div className='flex flex-col justify-center items-center gap-12'>
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
                                        <input className='outline-none rounded-[3px] w-64 md:w-80 h-10 bg-transparent px-3 border border-light lg:text-[0.9rem] text-base text-semi-white ipt' type='email' placeholder='Enter your email address' name='email' defaultValue={form.email} readOnly></input>
                                    </div>
                                </div>
                                <button className='outline-none bg-light py-2.5 px-14 rounded-md capitalize text-xs md:text-sm text-white cursor-pointer font-semibold'>verify</button>
                            </div>
                        </form>
                    }
                    {screen === 2 &&
                        <form onSubmit={VerifyEmail}>
                            <div className='flex flex-col gap-8 items-center'>
                                <div className='flex flex-col gap-4 items-center'>
                                    <div className='text-[0.85rem]  text-semi-white text-center'> A six digits verification code was sent to <span className='text-[#7665D5]'>{form.email?.slice(0, 3)}*****{form.email?.slice(-10)}</span>, copy and enter below</div>
                                    <PinForm
                                        pins={pins}
                                        setPins={setPins}
                                    />
                                    <div className='text-[0.8rem] flex gap-2  text-gray-500 w-fit ml-auto'>
                                        {seconds > 0 && <span>00:{seconds < 10 && '0'}{seconds}</span>}
                                        {seconds > 0 ? <span>Resend code</span>
                                            :
                                            <div className='flex gap-2 items-center'>
                                                <div>didn't get code?</div>
                                                <div className='text-light cursor-pointer' onClick={SendOTP}> Resend code</div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <button className='outline-none bg-light py-2.5 px-14 h-fit w-fit rounded-md capitalize md:text-sm text-xs text-white cursor-pointer font-semibold'>verify</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </SettingsLayout>
    )
}

export default VerifyEmail