import React, { useRef, useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import logo from '../../assets/images/logobrand.png'
import { Link, useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { SlCamera, SlUser } from 'react-icons/sl'
import { MdVerified } from "react-icons/md";
import Loading from '../../GeneralComponents/Loading'
import { CookieName, ErrorAlert, MoveToTop, SuccessAlert, UserRole } from '../../utils/utils'
import { Apis, UserPostApi } from '../../services/API'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import CountrySelector from '../../GeneralComponents/CountrySelector';


const SignupPage = () => {
  const navigate = useNavigate()
  const [screen, setScreen] = useState(1)
  const [eye, setEye] = useState(false)
  const [eye2, setEye2] = useState(false)
  const [check, setCheck] = useState(false)
  const EyeIcon = eye === true ? IoEye : IoMdEyeOff
  const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
  const [loading, setLoading] = useState(false)
  const [usercountry, setUserCountry] = useState({
    name: 'select',
    flag: null
  })
  const imgref = useRef()

  const [profile, setProfile] = useState({
    img: null,
    image: null
  })

  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    referral_code: '',
    password: '',
    confirm_password: '',
    verifycode: ''
  })

  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleProfileUpload = (event) => {
    const file = event.target.files[0]
    if (file.size >= 1000000) {
      imgref.current.value = null
      return ErrorAlert('File size too large')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return ErrorAlert('File error, invalid image format')
    }

    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }

  const submitForm = async (event) => {
    event.preventDefault()

    if (!form.full_name) return ErrorAlert('Enter your full name')
    if (!form.username) return ErrorAlert('Enter a username')
    if (!form.email) return ErrorAlert('Enter an email address')
    if (usercountry.name === 'select') return ErrorAlert('Select country')
    if (!form.password) return ErrorAlert('Create a password')
    if (form.password.length < 6) return ErrorAlert('Password length too short')
    if (!form.confirm_password) return ErrorAlert('Confirm password')
    if (form.confirm_password !== form.password) return ErrorAlert('Passwords mismatch')
    if (!check) return ErrorAlert('Must agree with terms and conditions')

    const formbody = new FormData()
    formbody.append('image', profile.image)
    formbody.append('country_flag', usercountry.flag)
    formbody.append('full_name', form.full_name)
    formbody.append('username', form.username)
    formbody.append('email', form.email)
    formbody.append('country', usercountry.name)
    formbody.append('referral_code', form.referral_code)
    formbody.append('password', form.password)
    formbody.append('confirm_password', form.confirm_password)
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.signup, formbody)
      if (response.status === 200) {
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

  const ValidateEmail = async e => {
    e.preventDefault()

    if (!form.verifycode) return ErrorAlert('Enter verification code')

    const formbody = {
      email: form.email,
      code: form.verifycode
    }

    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.validate_email, formbody)
      if (response.status === 200) {
        Cookies.set(CookieName, response.token)
        const decoded = decodeToken(response.token)
        const findRole = UserRole.find(item => item.role === decoded.role)
        if (findRole) return navigate(`${findRole.url}`)
      } else {
        return ErrorAlert(response.msg)
      }
    } catch (error) {
      ErrorAlert(`${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const ResendsCode = async () => {
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.resend_otp, { email: form.email })
      if (response.status === 200) return SuccessAlert('Verification code resent')
    } catch (error) {
      ErrorAlert(`${error.message}`)
    } finally {
      setLoading(false)
    }
  }


  return (
    <Pagelayout>
      <div className='py-16 bg-[whitesmoke] '>
        <div className="md:w-[85%] bg-white mx-auto py-4 rounded-xl relative shb">
          <div className='absolute top-4 left-4'>
            <img src={logo} className='w-auto h-20'></img>
          </div>
          <div className='w-[95%] lg:w-[97%] mx-auto grid grid-cols-1 lg:grid-cols-2'>
            <div className='col-span-1'>
              <div className='bgs rounded-xl flex items-center lg:h-[100vh] h-fit py-16'>
                <div className='w-11/12 mx-auto'>
                  <div className={`bg-white h-fit rounded-[20px] py-8 w-full lg:w-[39vw] lg:absolute ${screen === 1 ? 'lg:top-[2.8rem]' : 'lg:top-[3.7rem]'}  lg:right-16 lg:shadow-sign-sha`}>
                    <div className='relative w-full h-full'>
                      {loading && <Loading />}
                      {screen === 1 && <div className='w-11/12 md:w-[85%] mx-auto '>
                        <div className='text-center text-[1.7rem] capitalize font-[550]'>create an account</div>
                        <div className='text-sm mt-0.5 text-[#6b6a6a]  text-center font-[550]'>Start your trading journey today with the first step</div>
                        <form onSubmit={submitForm}>
                          <div className='flex flex-col gap-4 mt-4'>
                            <div className='relative mx-auto'>
                              <label className='cursor-pointer'>
                                {profile.img ?
                                  <div className='relative'>
                                    <img src={profile.img} alt="" className="w-[3.8rem] object-cover h-[3.8rem] rounded-full" />
                                    <SlCamera className='absolute top-6 -right-1.5 text-base text-orange' />
                                  </div>
                                  :
                                  <div className="w-fit mx-auto text-3xl bg-slate-200 p-4 rounded-full relative"> <SlUser />
                                    <SlCamera className='absolute top-6 -right-1.5 text-base' />
                                  </div>
                                }
                                <input ref={imgref} type="file" onChange={handleProfileUpload} hidden />
                              </label>
                            </div>
                            <div className='flex flex-col gap-[0.3rem]'>
                              <div className='text-sm capitalize font-[550]'>full name:</div>
                              <input className='outline-none w-full  border-b border-[#4d4c4c] lg:text-sm text-base  ipt input-off' placeholder='Enter your full name' type='text' name='full_name' value={form.full_name} onChange={inputHandler} ></input>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 w-full md:gap-8 gap-4'>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550]'>username:</div>
                                <input className='outline-none w-full border-b border-[#4d4c4c] lg:text-sm text-base ipt input-off' placeholder='Enter a username' type='text' name='username' value={form.username} onChange={inputHandler} ></input>
                              </div>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550]'>email address:</div>
                                <input className='outline-none w-full border-b border-[#4d4c4c] lg:text-sm text-base ipt input-off' placeholder='Enter your email' type='email' name='email' value={form.email} onChange={inputHandler}></input>
                              </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 w-full'>
                                <div className='flex flex-col gap-[0.3rem]'>
                                  <div className='text-sm capitalize font-[550]'>country:</div>
                                  <CountrySelector usercountry={usercountry} setUserCountry={setUserCountry} />
                                </div>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550]'>referral code:</div>
                                <input className='outline-none w-full   border-b border-[#4d4c4c] lg:text-sm text-base  ipt input-off' placeholder='Optional' code type='text' name='referral_code' value={form.referral_code} onChange={inputHandler}></input>
                              </div>
                            </div>
                            <div className='grid grid-cols-2 gap-8 w-full'>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550]'>password:</div>
                                <input className='outline-none w-full border-b border-[#4d4c4c]  lg:text-sm text-base pr-6 ipt input-off' placeholder='Create a password' type={eye === true ? 'text' : 'password'} name='password' value={form.password} onChange={inputHandler}></input>
                                <EyeIcon className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye(!eye)} />
                              </div>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550]'>confirm password:</div>
                                <input className='outline-none w-full border-b border-[#4d4c4c] lg:text-sm text-base pr-6 ipt input-off' placeholder='Re-type password' type={eye2 === true ? 'text' : 'password'} name='confirm_password' value={form.confirm_password} onChange={inputHandler}></input>
                                <EyeIcon2 className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye2(!eye2)} />
                              </div>
                            </div>
                            <div className='flex gap-1 mt-4'>
                              <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }}></input>
                              <div className='text-xs capitalize'>by signing up, i agree with <Link to='/terms' className='text-orange font-[550]' onClick={MoveToTop}>terms and conditions</Link></div>
                            </div>
                            <div className='flex flex-col gap-2 items-center'>
                              <button className='outline-none bg-orange py-2 w-full md:px-32 h-fit md:w-fit rounded-md capitalize text-sm text-white cursor-pointer font-[550]' type='submit'>create account</button>
                              <div className='text-[#6b6a6a] text-sm font-[550]'>Already have an account?
                                <Link to='/login' onClick={MoveToTop} className='cursor-pointer text-orange font-[550]' > Login</Link>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>}
                      {screen === 2 &&
                        <div className='w-11/12 md:w-[85%] mx-auto py-14'>
                          <div className='flex items-center justify-center text-[3rem] text-orange'>
                            <MdVerified />
                          </div>
                          <div className='text-center text-2xl capitalize font-[550] mt-4'>Verify Your Email</div>
                          <div className='text-center mt-[0.5rem]'>A six digits code was sent to your email address <span className='text-orange'>{form.email?.slice(0, 3)}*******{form.email?.slice(-10)}</span>, copy and paste code below to verify your email.</div>
                          <form onSubmit={ValidateEmail}>
                            <div className='flex flex-col gap-1 mt-12 relative'>
                              <div className='capitalize text-[0.85rem]'>enter six digits code</div>
                              <input className='outline-none w-full h-10 border border-[grey] text-sm px-2 ipt' placeholder='Enter code here' name='verifycode' value={form.verifycode} onChange={inputHandler}></input>
                            </div>
                            <div className='text-[0.85rem] text-right mt-2'>Didn't get code? <span className='text-orange cursor-pointer' onClick={ResendsCode}>Resend code</span></div>
                            <div className='flex items-center justify-center mt-12'>
                              <button className='outline-none bg-orange py-2 md:px-12 h-fit w-full md:w-fit rounded-md capitalize text-sm text-white cursor-pointer font-[550]'>verify</button>
                            </div>
                          </form>
                        </div>
                      }
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

export default SignupPage