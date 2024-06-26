import React, { useRef, useState, useMemo, useEffect } from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'
import logo from '../../assets/images/logobrand.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { SlCamera, SlUser } from 'react-icons/sl'
import { MdOutlineCancel, MdVerified } from "react-icons/md";
import Loading from '../../PageComponents/Loading'
import { Alert, CookieName, MoveToTop, UserRole } from '../../utils/utils'
import { Apis, UserPostApi } from '../../services/API'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import { countryApi } from '../../services/CountryAPI'


const SignupPage = () => {
  const navigate = useNavigate()
  const [eye, setEye] = useState(false)
  const [eye2, setEye2] = useState(false)
  const [check, setCheck] = useState(false)
  const EyeIcon = eye === true ? IoEye : IoMdEyeOff
  const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
  const [nameError, setNameError] = useState(false)
  const [userError, setUserError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [conError, setConError] = useState(false)
  const [checkError, setCheckError] = useState(false)
  const [verifyError, setVerifyError] = useState(false)
  const [imageError, setImageError] = useState('')
  const [codeMsg, setCodeMsg] = useState('')
  const [passMsg, setPassMsg] = useState('')
  const [conMsg, setConMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState(countryApi)
  const [countryshow, setCountryShow] = useState(false)
  const [usercountry, setUserCountry] = useState({
    country: 'choose country',
    flag: null
  })
  const [screen, setScreen] = useState(1)
  const imgref = useRef()

  const [profile, setProfile] = useState({
    img: null,
    image: null
  })
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    tradersCode: '',
    password: '',
    confirm_password: ''
  })
  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const [verifyform, setVerifyForm] = useState({
    code: '',
  })
  const formValidate = e => {
    setVerifyForm({
      ...verifyform,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileUpload = (event) => {
    setTimeout(() => {
      setImageError('')
    }, 2000)
    const file = event.target.files[0]
    if (file.size >= 1000000) {
      imgref.current.value = null
      return setImageError('File size too large', 'image uploads must not exceed 1MB file size', 'info')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return setImageError('File Error', 'image uploaded must be a valid image format (jpg, jpeg, png, svg)', 'info')
    }
    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }
  const CancelUpload = () => {
    imgref.current.value = null
    setProfile({
      img: null,
      image: null
    })
  }
  const submitForm = async (event) => {
    event.preventDefault()
    setTimeout(() => {
      setNameError(false)
      setUserError(false)
      setEmailError(false)
      setCountryError(false)
      setCodeError(false)
      setPassError(false)
      setConError(false)
      setCheckError(false)
      setPassMsg('')
      setConMsg('')
      setCodeMsg('')
    }, 2000)
    if (!form.full_name) return setNameError(true)
    if (!form.username) return setUserError(true)
    if (!form.email) return setEmailError(true)
    if (usercountry.country === 'choose country') return setCountryError(true)
    if (!form.tradersCode) return setCodeError(true)
    if (form.tradersCode.length < 6) {
      setCodeMsg(`trader's code is seven characters long`)
      return setCodeError(true);
    }
    if (!form.password) return setPassError(true)
    if (form.password.length < 6) {
      setPassMsg('password should be at least six characters long')
      return setPassError(true)
    }
    if (!form.confirm_password) return setConError(true)
    if (form.confirm_password !== form.password) {
      setConMsg('passwords mismatch')
      setPassError(true)
      return setConError(true)
    }
    if (!check) return setCheckError(true)
    const formbody = new FormData()
    formbody.append('image', profile.image)
    formbody.append('country_flag', usercountry.flag)
    formbody.append('full_name', form.full_name)
    formbody.append('username', form.username)
    formbody.append('email', form.email)
    formbody.append('country', usercountry.country)
    formbody.append('tradersCode', form.tradersCode)
    formbody.append('password', form.password)
    formbody.append('confirm_password', form.confirm_password)
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.signup, formbody)
      if (response.status === 201) {
        setScreen(2)
      } else {
        Alert('Request Failed', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Unsuccessful', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const ValidateEmail = async e => {
    e.preventDefault()

    setTimeout(() => {
      setVerifyError(false)
    }, 2000)

    if (!verifyform.code) return setVerifyError(true)
    const formbody = {
      code: verifyform.code,
      email: form.email
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
        return Alert('Request Failed', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Failed', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const ResendsCode = async () => {
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.resend_otp, { email: form.email })
      if (response.status === 200) return Alert('Code sent', 'Check your email for the new verification code just sent', 'success')
    } catch (error) {
      Alert('Request Failed', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const UserCountry = (item) => {
    setUserCountry(item)
  }

  const FilterCountry = (event) => {
    let search = (event.target.value)
    console.log(search)
    if (!search) {
      setCountries(countryApi)
    }
    else {
      const showSearch = countries.filter(item => item.country.toLowerCase().includes(search.toLowerCase()))
      setCountries(showSearch)
    }
  }




  return (
    <Pagelayout>
      <div className='py-[5rem] bg-[whitesmoke] '>
        <div className="w-[85%] bg-[white] mx-auto py-[1.2rem] rounded-xl relative shb">
          <div className='w-[97%] mx-auto flex'>
            <div className='w-[60%] relative'>
              <div className='bgs rounded-lg'></div>
              <div className='absolute top-[1rem] left-[1rem]'>
                <img src={logo} className='w-[auto] h-[7rem]'></img>
              </div>
            </div>
            <div className='w-[50%]'>
              <div className='w-full h-[100vh]'></div>
            </div>
          </div>
          <div className={`w-[39vw] h-fit bg-[white] absolute ${screen === 1 ? 'top-[2.85rem]' : 'top-[4rem]'}  right-[4rem] rounded-[20px] py-[2rem] sha`}>
            <div className='relative w-full h-full'>
              {loading && <Loading />}
              {screen === 1 && <div className='w-[85%] mx-auto '>
                <div className='text-center text-[1.7rem] capitalize font-[550]'>create an account</div>
                <div className='text-[0.8rem] mt-[0.1rem] text-[#6b6a6a]  text-center font-[550]'>Start your trading journey today with the first step</div>
                <form onSubmit={submitForm}>
                  <div className='flex flex-col gap-[0.7rem] mt-[1rem]'>
                    <div className='relative mx-auto'>
                      {profile.img && <div className='absolute top-6 left-[-0.5rem] cursor-pointer z-10  text-[0.8rem] text-[#E96E28]' onClick={CancelUpload}><MdOutlineCancel /></div>}
                      <label className='cursor-pointer'>
                        {profile.img ?
                          <div className='relative'>
                            <img src={profile.img} alt="" className="w-[3.9rem] object-cover h-[3.9rem] rounded-full" />
                            <SlCamera className='absolute top-6 right-[-0.4rem] text-[0.85rem] text-[#E96E28]' />
                          </div>
                          :
                          <div className="w-fit mx-auto text-3xl bg-slate-200 p-4 rounded-full relative"> <SlUser />
                            <SlCamera className='absolute top-6 right-[-0.4rem] text-[0.85rem]' />
                          </div>
                        }
                        <input ref={imgref} type="file" onChange={handleProfileUpload} hidden />
                      </label>
                    </div>
                    <div className='relative '>
                      <div className='absolute bottom-[1rem] right-[8rem] text-[0.8rem] text-[red]'>{imageError}</div>
                    </div>
                    <div className='flex flex-col gap-[0.3rem] relative'>
                      <div className='text-[0.9rem] capitalize font-[550] '>full name:</div>
                      <input className={`outline-none w-full  border-b  ${nameError === true ? 'border-[red]' : 'border-[#4d4c4c]'} text-[0.9rem] ipt`} placeholder='Enter your full name' type='text' name='full_name' value={form.full_name} onChange={inputHandler} ></input>
                      <FaCheck className='absolute top-[2.3rem] right-0 text-[0.7rem] text-[#E96E28]' />
                      <div></div>
                    </div>
                    <div className='flex w-full gap-[2rem]'>
                      <div className='flex flex-col gap-[0.3rem] relative w-[50%]'>
                        <div className='text-[0.9rem] capitalize font-[550] '>username:</div>
                        <input className={`outline-none w-full  border-b  ${userError === true ? 'border-[red]' : 'border-[#4d4c4c]'} text-[0.9rem] ipt`} placeholder='Enter a username' type='text' name='username' value={form.username} onChange={inputHandler} ></input>
                        <div></div>
                      </div>
                      <div className='flex flex-col gap-[0.3rem] relative w-[50%]'>
                        <div className='text-[0.9rem] capitalize font-[550] '>e-mail address:</div>
                        <input className={`outline-none w-full   border-b   ${emailError === true ? 'border-[red]' : 'border-[#4d4c4c]'} text-[0.9rem] ipt`} placeholder='Enter your mail' type='email' name='email' value={form.email} onChange={inputHandler}></input>
                      </div>
                    </div>
                    <div className='flex gap-[2rem] w-full'>
                      <div className='flex flex-col gap-[0.3rem] w-[50%] relative'>
                        <div className='flex flex-col gap-[0.1rem]'>
                          <div className='text-[0.9rem] capitalize font-[550]'>country:</div>
                          <div className='flex gap-1'>
                            {usercountry.flag !== null &&<img className='w-[1.5rem] h-auto' src={usercountry.flag}></img>}
                            <div className={`px-[0.5rem] py-[0.25rem] h-fit w-full bg-[#ebeaea] cursor-pointer ${countryError ? 'border border-[red]' : ''}`} onClick={() => setCountryShow(!countryshow)}>
                              <div className='flex justify-between items-center text-[0.8rem]'>
                                <span >{usercountry.country}</span>
                                {!countryshow && <FaAngleDown className='hover:bg-[white] rounded-full text-[0.7rem]' />}
                                {countryshow &&<FaAngleUp className='hover:bg-[white] rounded-full text-[0.7rem] ' />}
                              </div>
                            </div>
                          </div>
                        </div>
                        {countryshow && <div className='h-[11rem] w-full bg-[#ebeaea] absolute top-[3.4rem] left-0 z-10  py-[0.5rem] rounded-sm overflow-y-auto scroll'>
                          <div className='px-[1rem]'>
                            <input className='ipt border border-[grey] bg-transparent text-black pl-[0.5rem] w-full outline-none text-[0.85rem] h-[1.5rem] rounded-sm' type='text' placeholder='search' onKeyUp={FilterCountry}></input>
                            {countries.map((item, i) => (
                              <div className='flex flex-col mt-2' key={i}>
                                <div className='flex gap-2 items-center cursor-pointer hover:bg-[white]' onClick={() => { UserCountry(item); setCountryShow(false) }}>
                                  <img src={item.flag} className='w-[0.75rem] h-[0.75rem] object-cover'></img>
                                  <div className='text-[0.85rem] font-bold'>{item.country}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>}
                      </div>
                      <div className='flex flex-col gap-[0.3rem] w-[50%] relative'>
                        <div className='text-[0.9rem] capitalize font-[550] '>trader's code:</div>
                        <input className={`outline-none w-full   border-b   ${codeError === true ? 'border-[red]' : 'border-[#4d4c4c]'} text-[0.9rem] ipt`} placeholder='Seven characters long' type='text' name='tradersCode' value={form.tradersCode} onChange={inputHandler}></input>
                        <div className='absolute bottom-[-1rem] left-0 text-[0.75rem] text-[red]'>{codeMsg}</div>
                      </div>
                    </div>
                    <div className='flex gap-[2rem] w-full'>
                      <div className='flex flex-col gap-[0.3rem] relative w-[50%]'>
                        <div className='text-[0.9rem] capitalize font-[550]'>password:</div>
                        <input className={`outline-none w-full border-b  ${passError === true ? 'border-[red]' : 'border-[#4d4c4c]'}  text-[0.9rem] ipt`} placeholder='Create a password' type={eye === true ? 'text' : 'password'} name='password' value={form.password} onChange={inputHandler}></input>
                        <EyeIcon className='absolute top-[2.2rem] right-0 text-[0.8rem] text-[#E96E28] cursor-pointer' onClick={() => setEye(!eye)} />
                        <div className='absolute bottom-[-1rem] left-0 text-[0.75rem] text-[red]'>{passMsg}</div>
                      </div>
                      <div className='flex flex-col gap-[0.3rem] relative w-[50%]'>
                        <div className='text-[0.9rem] capitalize font-[550] '>confirm password:</div>
                        <input className={`outline-none w-full border-b  ${conError === true ? 'border-[red]' : 'border-[#4d4c4c]'} text-[0.9rem] ipt`} placeholder='Re-type password' type={eye2 === true ? 'text' : 'password'} name='confirm_password' value={form.confirm_password} onChange={inputHandler}></input>
                        <EyeIcon2 className='absolute top-[2.2rem] right-0 text-[0.8rem] text-[#E96E28] cursor-pointer' onClick={() => setEye2(!eye2)} />
                        <div className='absolute bottom-[-1rem] left-0 text-[0.75rem] text-[red]'>{conMsg}</div>
                      </div>
                    </div>
                    <div className='flex gap-1 mt-[1rem]'>
                      <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${checkError === true ? 'outline outline-1 outline-[red]' : ''}`}></input>
                      <div className='text-[0.75rem] capitalize'>by signing up, i agree with <Link to='/terms' className='text-[#E96E28] font-[550]' onClick={MoveToTop}>terms and conditions</Link></div>
                    </div>
                    <div className='flex flex-col gap-[0.5rem] items-center'>
                      <button className='outline-none bg-[#E96E28] py-[0.5rem] px-[8rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' type='submit'>create account</button>
                      <div className='text-[#6b6a6a] text-[0.8rem] font-[550]'>Already have an account?
                        <Link to='/login' onClick={MoveToTop} className='cursor-pointer text-[#E96E28] font-[550]' > Login</Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>}
              {screen === 2 &&
                <div className='w-[85%] mx-auto py-[3.5rem]'>
                  <div className='flex items-center justify-center text-[3rem] text-[#E96E28]'>
                    <MdVerified />
                  </div>
                  <div className='text-center text-[1.5rem] capitalize font-[550] mt-[1rem]'>Verify Your Email</div>
                  <div className='text-center mt-[0.5rem]'>A six digits code was sent to your email address <span className='text-[#E96E28]'>{form.email?.slice(0, 3)}*******{form.email?.slice(-10)}</span>, copy and paste code below to verify your email.</div>
                  <form onSubmit={ValidateEmail}>
                    <div className='flex flex-col gap-1 mt-[3rem]'>
                      <div className='capitalize text-[0.85rem]'>enter six digits code</div>
                      <input className={`outline-none w-full h-[2.5rem] border  ${verifyError === true ? 'border-[red]' : 'border-[grey]'} text-[0.9rem] pl-2 ipt`} placeholder='Enter code here' name='code' value={verifyform.code} onChange={formValidate}></input>
                    </div>
                    <div className='text-[0.85rem] text-right mt-[0.5rem]'>Didn't get code? <span className='text-[#E96E28] cursor-pointer' onClick={ResendsCode}>Resend code</span></div>
                    <div className='flex items-center justify-center mt-[3rem]'>
                      <button className='outline-none bg-[#E96E28] py-[0.5rem] px-[3rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]'>verify</button>
                    </div>
                  </form>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default SignupPage