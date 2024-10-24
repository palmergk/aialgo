import React, { useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { FaHandsClapping } from "react-icons/fa6";
import { MdMarkEmailUnread, MdLock } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logobrand.png'
import Loading from '../../GeneralComponents/Loading'
import { CookieName, ErrorAlert, MoveToTop, UserRole } from '../../utils/utils'
import { Apis, UserPostApi } from '../../services/API'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import ForgotPassword from '../../GeneralComponents/ForgotPassword';


const LoginPage = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [eye, setEye] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = async event => {
        event.preventDefault()

        if (!form.email) return ErrorAlert('Enter your email address')
        if (!form.password) return ErrorAlert('Enter your password')

        const formbody = {
            email: form.email,
            password: form.password
        }

        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.login, formbody)
            if (response.status === 200) {
                Cookies.set(CookieName, response.token)
                const decoded = decodeToken(response.token)
                const findRole = UserRole.find(item => item.role === decoded.role)
                if (findRole) return navigate(`${findRole.url}`)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }
    document.documentElement.style.overflow = modal === true ? 'hidden' : 'auto'

    return (
        <Pagelayout>
            <div className='py-16 bg-[whitesmoke]'>
                {modal && <ForgotPassword closeView={() => setModal(false)} />}
                <div className="md:w-[85%] bg-white mx-auto py-4 rounded-xl relative shb">
                    <div className='absolute top-4 left-4 lg:block'>
                        <img src={logo} className='w-auto h-20'></img>
                    </div>
                    <div className='w-[95%] lg:w-[97%] mx-auto grid grid-cols-1 lg:grid-cols-2'>
                        <div className='col-span-1'>
                            <div className='loginBg rounded-xl flex items-center lg:h-[40rem] h-fit py-16'>
                                <div className='w-11/12 mx-auto'>
                                    <div className='bg-white h-fit rounded-[20px] w-full lg:w-[39vw] lg:absolute lg:top-[3.1rem] lg:right-16 lg:shadow-sign py-16 lg:pt-16 lg:pb-24 overflow-hidden'>
                                        <div className='relative w-full h-full'>
                                            {loading && <Loading />}
                                            <div className='w-11/12 md:w-[70%] mx-auto'>
                                                <div className='flex gap-2 items-center justify-center'>
                                                    <FaHandsClapping className='text-[1.2rem] text-orange' />
                                                    <div className='text-[1.7rem] capitalize font-[550]'>welcome back!</div>
                                                </div>
                                                <div className='text-[0.9rem] mt-0.5 text-[#6b6a6a] capitalize text-center font-[550]'>continue to log in</div>
                                                <form onSubmit={submitForm}>
                                                    <div className='flex gap-4 mt-[2rem] flex-col'>
                                                        <div className='flex gap-2 flex-col relative'>
                                                            <div className='flex gap-1 items-center'>
                                                                <MdMarkEmailUnread className='text-[0.9rem]' />
                                                                <div className='text-sm capitalize font-[550]'>email address</div>
                                                            </div>
                                                            <input placeholder='Email address' className=' outline-none rounded-[3px] w-full h-fit py-2 bg-[#e9e9e9] px-4 justify-center lg:text-[0.9rem] text-base ipt' type='email' value={form.email} name='email' onChange={inputHandler}></input>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-4 mt-10 flex-col'>
                                                        <div className='flex gap-2 flex-col relative'>
                                                            <div className='flex gap-1 items-center'>
                                                                <MdLock className='text-[0.9rem]' />
                                                                <div className='text-sm capitalize font-[550]'>password</div>
                                                            </div>
                                                            <input placeholder='Password' className=' outline-none rounded-[3px] w-full h-fit py-2  bg-[#e9e9e9] pl-4 pr-8 justify-center lg:text-[0.9rem] text-base ipt ' type={eye === true ? 'text' : 'password'} value={form.password} name='password' onChange={inputHandler}></input>
                                                            <EyeIcon className='absolute top-10 right-2 cursor-pointer text-lg' onClick={() => setEye(!eye)} />
                                                        </div>
                                                    </div>
                                                    <div className='w-fit flex ml-auto'>
                                                        <div className='text-sm font-[550] text-orange pt-2 cursor-pointer capitalize' onClick={() => setModal(!modal)}>forgot password</div>
                                                    </div>
                                                    <div className='flex flex-col gap-2 items-center mt-12'>
                                                        <button className='outline-none bg-orange py-2 w-full md:px-32 h-fit md:w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' type='submit' >login</button>
                                                        <div className='text-[#6b6a6a] text-sm font-[550]'>Don't have an account?
                                                            <Link to='/signup' onClick={MoveToTop} className='cursor-pointer text-orange font-[550]' > Sign Up</Link>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Pagelayout>
    )
}

export default LoginPage