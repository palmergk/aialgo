import React, { useRef, useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { Apis, PostApi } from '../../services/API'
import { FaXmark } from 'react-icons/fa6'
import ModalLayout from '../../utils/ModalLayout'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'
import { useAtom } from 'jotai'
import { NOTIFICATIONS, UNREADNOTIS } from '../../store'
import CountrySelector from '../../GeneralComponents/CountrySelector';
import StatusSelector from '../../GeneralComponents/StatusSelector'
import PasswordToTextInput from '../../GeneralComponents/PasswordToTextInput'


const CreateUsersModal = ({ closeView, refetchAllUsers }) => {
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)

  const [usercountry, setUserCountry] = useState({
    name: 'select',
    flag: null
  })
  const [role, setRole] = useState('select')
  const [select, setSelect] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggler = useRef()

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

  const CreateUser = async (event) => {
    event.preventDefault()

    if (!form.full_name || !form.username || !form.email || !form.password) return ErrorAlert('Enter all fields')
    if (form.password.length < 6) return ErrorAlert('Password length too short')
    if (usercountry.name === 'select') return ErrorAlert('Select user country')
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
      <div className='max-w-md h-fit mx-auto bg-white rounded-lg overflow-hidden relative py-5' ref={toggler}>
        {loading && <Loading />}
        <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
        <div className='text-xl uppercase text-center font-bold border-b w-full'>create new user</div>
        <form className='flex flex-col gap-4 w-11/12 mx-auto relative mt-5' onSubmit={CreateUser}>
          <div className='grid grid-cols-2 md:gap-6 gap-3 items-center'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550]'>full name:</div>
              <input className='outline-none border border-[#c9b8eb] w-full h-8 px-2 lg:text-sm text-base rounded-sm' value={form.full_name} name='full_name' onChange={inputHandler}></input>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550]'>username:</div>
              <input className='outline-none border border-[#c9b8eb] w-full h-8 px-2 lg:text-sm text-base rounded-sm' value={form.username} name='username' onChange={inputHandler}></input>
            </div>
          </div>
          <div className='grid grid-cols-2 md:gap-6 gap-3 items-center'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550]'>email:</div>
              <input className='outline-none border border-[#c9b8eb] w-full h-8 px-2 lg:text-sm text-base rounded-sm' type='email' value={form.email} name='email' onChange={inputHandler}></input>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550]'>country:</div>
              <CountrySelector usercountry={usercountry} setUserCountry={setUserCountry} />
            </div>
          </div>
          <div className='grid grid-cols-2 md:gap-6 gap-3 items-center'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550]'>password:</div>
              <PasswordToTextInput name='password' value={form.password} onChange={inputHandler} className={{ main: '!border-[#c9b8eb] rounded-sm !w-full', icon: '!text-[#9f7ae7]' }} />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-sm capitalize font-[550]'>role:</div>
              <StatusSelector Statuses={Roles} status={role} HandleFunction={(item) => setRole(item)} select={select} toggle={() => setSelect(!select)} className="!w-full" />
            </div>
          </div>
          <div className='mx-auto mt-4'>
            <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium'>create user</button>
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}

export default CreateUsersModal