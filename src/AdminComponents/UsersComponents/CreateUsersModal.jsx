import React, { useRef, useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { Apis, PostApi } from '../../services/API'
import { FaXmark } from 'react-icons/fa6'
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { countryApi } from '../../services/CountryAPI'
import ModalLayout from '../../utils/ModalLayout'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'
import { useAtom } from 'jotai'
import { NOTIFICATIONS, UNREADNOTIS } from '../../store'

const CreateUsersModal = ({ closeView, refetchAllUsers }) => {
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)

  const toggler = useRef()
  const [countries, setCountries] = useState(countryApi)
  const [countryshow, setCountryShow] = useState(false)
  const [usercountry, setUserCountry] = useState({
    name: 'select',
    flag: null
  })
  const [searchCountry, setSearchCountry] = useState('')
  const [role, setRole] = useState('select')
  const [roleShow, setRoleShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const Roles = [
    "user",
    "admin",
  ]

  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    password: ''
  })

  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const FilterCountry = () => {
    const altCountries = countryApi
    if (!searchCountry) {
      setCountries(countryApi)
    }
    else {
      let searchResult = altCountries.filter(item => item.name.toLowerCase().includes(searchCountry.toLowerCase()))
      setCountries(searchResult)
    }
  }

  const CreateUser = async (event) => {
    event.preventDefault()

    if (!form.full_name || !form.username || !form.email || !form.password) return ErrorAlert('Enter all fields')
    if (form.password.length < 6) return ErrorAlert('Password length too short')
    if (usercountry.name === 'select') return ErrorAlert('Choose user country')
    if (role === 'select') return ErrorAlert('Assign a role')

    const formbody = {
      full_name: form.full_name,
      username: form.username,
      email: form.email,
      password: form.password,
      role: role,
      country: usercountry.name,
      country_flag: usercountry.flag
    }

    setLoading(true)
    try {
      const response = await PostApi(Apis.admin.admin_create_account, formbody)
      if (response.status === 200) {
        SuccessAlert(response.msg)
        refetchAllUsers()
        setNotifications(response.notis)
        setUnreadNotis(response.unread)
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
        {loading && <Loading />}
        <form className='flex flex-col gap-4 py-6 md:px-6 px-4 relative' onSubmit={CreateUser}>
          <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
          <div className='text-xl uppercase text-center font-bold border-b w-full mb-2'>create new user</div>
          <div className='grid grid-cols-2 md:gap-6 gap-3 items-center'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550] '>full name:</div>
              <input className='outline-none border border-[#c9b8eb] w-full h-8 px-2 lg:text-sm text-base rounded-sm' value={form.full_name} name='full_name' onChange={inputHandler}></input>
              <div></div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550] '>username:</div>
              <input className='outline-none border border-[#c9b8eb] w-full h-8 px-2 lg:text-sm text-base rounded-sm' value={form.username} name='username' onChange={inputHandler}></input>
              <div></div>
            </div>
          </div>
          <div className='grid grid-cols-2 md:gap-6 gap-3 items-center'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550] '>email:</div>
              <input className='outline-none border border-[#c9b8eb] w-full h-8 px-2 lg:text-sm text-base rounded-sm' type='email' value={form.email} name='email' onChange={inputHandler}></input>
              <div></div>
            </div>
            <div className='relative'>
              <div className='flex flex-col gap-1'>
                <div className='text-sm capitalize font-[550]'>country:</div>
                <div className='flex gap-1 items-center'>
                  {usercountry.flag !== null && <img className='h-5 w-auto' src={usercountry.flag}></img>}
                  <div className='px-2 py-1 h-fit w-full bg-white sha cursor-pointer rounded-sm' onClick={() => { setCountryShow(!countryshow); setSearchCountry(''); setCountries(countryApi) }}>
                    <div className='flex justify-between items-center text-[0.8rem]'>
                      <span >{usercountry.name}</span>
                      <div className='text-sm'>
                        {!countryshow ? <TiArrowSortedDown />
                          :
                          <TiArrowSortedUp />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {countryshow && <div className='h-fit w-full bg-white sha absolute top-[3.4rem] left-0 z-10 py-2 rounded-sm '>
                <div className='px-4'>
                  <input className='ipt border border-semi-white bg-transparent text-black px-2 py-1 w-full outline-none md:text-[0.85rem] text-base md:h-6 h-7 rounded-sm mb-1' type='text' placeholder='search' value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} onKeyUp={FilterCountry}></input>
                </div>
                <div className='overflow-y-auto scroll h-28 px-4'>
                  {countries.map((item, i) => (
                    <div className='flex flex-col mt-2' key={i}>
                      <div className='flex gap-2 items-center cursor-pointer hover:bg-semi-white' onClick={() => { setUserCountry(item); setCountryShow(false) }}>
                        <img src={item.flag} className='w-4 h-auto object-cover'></img>
                        <div className='text-[0.85rem] font-bold'>{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>}
            </div>
          </div>
          <div className='grid grid-cols-2 md:gap-6 gap-3 items-center'>
            <div className='relative'>
              <div className='flex flex-col gap-1'>
                <div className='text-sm capitalize font-[550]'>role:</div>
                <div className='px-2 py-1 h-fit w-full bg-white sha cursor-pointer rounded-[3px]' onClick={() => setRoleShow(!roleShow)} >
                  <div className='flex justify-between items-center text-[0.8rem]'>
                    <span >{role}</span>
                    <div className='text-sm'>
                      {!roleShow ? <TiArrowSortedDown />
                        :
                        <TiArrowSortedUp />
                      }
                    </div>
                  </div>
                </div>
              </div>
              {roleShow && <div className='h-fit w-full absolute top-[3.3rem] left-0 bg-white border border-[lightgrey] rounded-md z-10 text-[0.85rem] font-bold'>
                {Roles.map((item, i) => (
                  <div key={i} className={`flex flex-col px-2 py-0.5 hover:bg-[#ececec] cursor-pointer ${i !== Roles.length - 1 && 'border-b border-[#ebeaea]'}`} onClick={() => { setRole(item); setRoleShow(false) }}>
                    <div>{item}</div>
                  </div>
                ))}
              </div>}
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550] '>password:</div>
              <input className='outline-none border border-[#c9b8eb] w-full h-8 px-2 lg:text-sm text-base rounded-sm' value={form.password} name='password' onChange={inputHandler}></input>
              <div></div>
            </div>
          </div>
          <div className='mx-auto mt-6'>
            <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium'>create user</button>
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}

export default CreateUsersModal