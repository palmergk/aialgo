import React, { useRef, useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import logo from '../../assets/images/logobrand.png'
import { Link, useNavigate } from 'react-router-dom';
import { SlCamera, SlUser } from 'react-icons/sl'
import { MdVerified } from "react-icons/md";
import Loading from '../../GeneralComponents/Loading'
import { CookieName, ErrorAlert, MoveToTop, SuccessAlert, UserRole } from '../../utils/utils'
import { Apis, UserPostApi } from '../../services/API'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import CountrySelector from '../../GeneralComponents/CountrySelector';
import PasswordToTextInput from '../../GeneralComponents/PasswordToTextInput';
import PinForm from '../../utils/PinForm';


const SignupPage = () => {
  const navigate = useNavigate()
  const [screen, setScreen] = useState(2)
  const [check, setCheck] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [pins, setPins] = useState(['', '', '', '', '', '']);
  const checkPins = pins.join('')
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
    email: 'giddysbabey@gmail.com',
    referral_code: '',
    password: '',
    confirm_password: '',
  })

  const formHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleProfileUpload = (event) => {
    const file = event.target.files[0]
    if (file.size >= 1000000) {
      imgref.current.value = null
      return ErrorAlert('Image size too large, file must not exceed 1mb')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
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

  const VerifyEmail = async e => {
    e.preventDefault()

    if (checkPins.length < 5) return ErrorAlert('Enter verification code')
    const formbody = {
      email: form.email,
      code: checkPins
    }

    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.verify_email, formbody)
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

  const SendOTP = async () => {
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.send_otp, { email: form.email })
      if (response.status === 200) {
        SuccessAlert(response.msg)
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


  return (
    <Pagelayout>
      <div className='py-16 bg-[whitesmoke] '>
        <div className="md:w-[85%] bg-white mx-auto py-4 rounded-xl relative shb">
          <div className='absolute top-4 left-4'>
            <img src={logo} className='w-auto h-20'></img>
          </div>
          <div className='w-[95%] lg:w-[97%] mx-auto grid grid-cols-1 lg:grid-cols-2'>
            <div className='col-span-1'>
              <div className='signupBg rounded-xl flex items-center lg:h-[40rem] h-fit py-16'>
                <div className='w-11/12 mx-auto'>
                  <div className={`bg-white h-fit rounded-[20px] py-8 w-full lg:w-[39vw] lg:absolute ${screen === 1 ? 'lg:top-10' : 'lg:top-[3.8rem]'}  lg:right-16 lg:shadow-sign overflow-hidden`}>
                    <div className='relative'>
                      {loading && <Loading />}
                      <div>
                        {screen === 1 &&
                          <div className='w-11/12 md:w-[85%] mx-auto '>
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
                                <div className='flex flex-col gap-1.5'>
                                  <div className='text-sm capitalize font-[550]'>full name:</div>
                                  <input className='outline-none w-full  border-b border-[#4d4c4c] lg:text-sm text-base ipt input-off' placeholder='Enter your full name' type='text' name='full_name' value={form.full_name} onChange={formHandler} ></input>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 w-full md:gap-8 gap-4'>
                                  <div className='flex flex-col gap-1.5 relative'>
                                    <div className='text-sm capitalize font-[550]'>username:</div>
                                    <input className='outline-none w-full border-b border-[#4d4c4c] lg:text-sm text-base ipt input-off' placeholder='Enter a username' type='text' name='username' value={form.username} onChange={formHandler} ></input>
                                  </div>
                                  <div className='flex flex-col gap-1.5 relative'>
                                    <div className='text-sm capitalize font-[550]'>email address:</div>
                                    <input className='outline-none w-full border-b border-[#4d4c4c] lg:text-sm text-base ipt input-off' placeholder='Enter your email' type='email' name='email' value={form.email} onChange={formHandler}></input>
                                  </div>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 w-full'>
                                  <div className='flex flex-col gap-1.5'>
                                    <div className='text-sm capitalize font-[550]'>country:</div>
                                    <CountrySelector usercountry={usercountry} setUserCountry={setUserCountry} />
                                  </div>
                                  <div className='flex flex-col gap-1.5 relative'>
                                    <div className='text-sm capitalize font-[550]'>referral code:</div>
                                    <input className='outline-none w-full   border-b border-[#4d4c4c] lg:text-sm text-base  ipt input-off' placeholder='Optional' code type='text' name='referral_code' value={form.referral_code} onChange={formHandler}></input>
                                  </div>
                                </div>
                                <div className='grid grid-cols-2 gap-8 w-full'>
                                  <div className='flex flex-col gap-1.5'>
                                    <div className='text-sm capitalize font-[550]'>password:</div>
                                    <PasswordToTextInput name='password' value={form.password} onChange={formHandler} placeholder='Create a password' className={{ main: 'w-full !pl-0 !py-0 border-t-0 border-r-0 border-l-0 rounded-none !border-black lg:text-sm', icon: 'text-orange top-auto !bottom-0 !right-0' }} />
                                  </div>
                                  <div className='flex flex-col gap-1.5'>
                                    <div className='text-sm capitalize font-[550]'>confirm password:</div>
                                    <PasswordToTextInput name='confirm_password' value={form.confirm_password} onChange={formHandler} placeholder='Re-type password' className={{ main: 'w-full !pl-0 !py-0 border-t-0 border-r-0 border-l-0 rounded-none !border-black lg:text-sm', icon: 'text-orange top-auto !bottom-0 !right-0' }} />
                                  </div>
                                </div>
                                <div className='flex gap-1 mt-4'>
                                  <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }}></input>
                                  <div className='text-xs capitalize'>by signing up, i agree with <Link to='/terms' className='text-orange font-[550]' onClick={MoveToTop}>terms and conditions</Link></div>
                                </div>
                                <div className='flex flex-col gap-2 items-center w-'>
                                  <button className='outline-none bg-orange py-2 w-full md:px-32 h-fit md:w-fit rounded-md capitalize text-sm text-white cursor-pointer font-[550]' type='submit'>create account</button>
                                  <div className='text-[#6b6a6a] text-sm font-[550]'>Already have an account?
                                    <Link to='/login' onClick={MoveToTop} className='cursor-pointer text-orange font-[550]' > Login</Link>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        }
                        {screen === 2 &&
                          <div className='w-11/12 md:w-[85%] mx-auto py-14'>
                            <div className='flex items-center justify-center text-[3rem] text-orange'>
                              <MdVerified />
                            </div>
                            <div className='text-center text-2xl capitalize font-[550] mt-4'>Verify Your Email</div>
                            <div className='text-center mt-[0.5rem]'>A six digits code was sent to your email address <span className='text-orange'>{form.email?.slice(0, 3)}*******{form.email?.slice(-10)}</span>, copy and paste code below to verify your email.</div>
                            <form onSubmit={VerifyEmail}>
                              <div className='flex flex-col gap-1 items-start mt-12 relative'>
                                <div className='capitalize text-[0.85rem]'>enter six digits code</div>
                                <PinForm
                                  pins={pins}
                                  setPins={setPins}
                                />
                              </div>
                              <div className='text-[0.85rem] flex justify-end gap-2 mt-2 text-gray-600'>
                                {seconds > 0 && <span>00:{seconds < 10 && '0'}{seconds}</span>}
                                {seconds > 0 ? <span>Resend code</span>
                                  :
                                  <div className='flex gap-2 items-center'>
                                    <div>didn't get code?</div>
                                    <div className='text-orange cursor-pointer' onClick={SendOTP}> Resend code</div>
                                  </div>
                                }
                              </div>
                              <div className='flex items-center justify-center mt-10'>
                                <button className='outline-none bg-orange py-2 md:px-24 h-fit w-full md:w-fit rounded-md capitalize text-sm text-white cursor-pointer font-[550]'>verify</button>
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
      </div>
    </Pagelayout>
  )
}

export default SignupPage