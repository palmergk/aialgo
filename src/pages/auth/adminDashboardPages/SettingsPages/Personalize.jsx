import React, { useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { ADMINSTORE, PROFILE } from '../../../../store'
import Loading from '../../../../GeneralComponents/Loading'
import { Apis, imageurl, UserPutApi } from '../../../../services/API'
import { MdOutlineEdit } from 'react-icons/md'
import { FaRegRectangleXmark } from 'react-icons/fa6'
import { IoCheckbox, IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'
import { PiTelegramLogoLight } from "react-icons/pi";
import { TfiInstagram } from "react-icons/tfi";
import { GrFacebookOption } from 'react-icons/gr';
import avatar from '../../../../assets/images/avatar.png'
import { ErrorAlert, SuccessAlert } from '../../../../utils/utils'
import SettingsLayout from '../../../../AdminComponents/SettingsComponents/SettingsLayout'

const Personalize = () => {
  const [user, setUser] = useAtom(PROFILE)
  const [adminStore, setAdminStore] = useAtom(ADMINSTORE)

  const [commit, setCommit] = useState(false)
  const [eye, setEye] = useState(false)
  const [eye2, setEye2] = useState(false)
  const EyeIcon = eye === true ? IoEye : IoMdEyeOff
  const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
  const imgref = useRef()
  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState({
    img: user.image ? `${imageurl}/profiles/${user.image}` : avatar,
    image: user.image ? user.image : null
  })

  const [form, setForm] = useState({
    full_name: user?.full_name,
    email: user?.email,
    username: user?.username,
    old_password: '',
    new_password: '',
    facebook: adminStore?.facebook,
    instagram: adminStore?.instagram,
    telegram: adminStore?.telegram
  })

  const formHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const CommitHandler = () => {
    if (form.full_name === user.full_name && form.username === user.username && form.email === user.email && form.old_password === '' && form.new_password === '' && form.facebook === adminStore.facebook && form.instagram === adminStore.instagram && form.telegram === adminStore.telegram && profile.image === user.image) {
      setCommit(false)
    } else {
      setCommit(true)
    }
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

    setCommit(true)
    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }

  const cancelChanges = () => {
    setCommit(false)
    imgref.current.value = null

    setProfile({
      img: user.image ? `${imageurl}/profiles/${user.image}` : avatar,
      image: user.image ? user.image : null
    })

    setForm({
      full_name: user?.full_name,
      email: user?.email,
      username: user?.username,
      old_password: '',
      new_password: '',
      facebook: adminStore?.facebook,
      instagram: adminStore?.instagram,
      telegram: adminStore?.telegram
    })
  }

  const SubmitForm = async (event) => {
    event.preventDefault()

    const formbody = new FormData()
    formbody.append('image', profile.image)
    formbody.append('full_name', form.full_name)
    formbody.append('username', form.username)
    formbody.append('email', form.email)
    formbody.append('old_password', form.old_password)
    formbody.append('new_password', form.new_password)
    formbody.append('facebook', form.facebook)
    formbody.append('instagram', form.instagram)
    formbody.append('telegram', form.telegram)

    setLoading(true)
    try {
      const response = await UserPutApi(Apis.user.update, formbody)
      if (response.status === 200) {
        SuccessAlert(response.msg)
        setUser(response.user)
        setAdminStore(response.store)
        setCommit(false)
        setForm({
          full_name: response.user.full_name,
          email: response.user.email,
          username: response.user.username,
          old_password: '',
          new_password: '',
          facebook: response.store.facebook,
          instagram: response.store.instagram,
          telegram: response.store.telegram
        })

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
        {loading && <Loading />}
        <div className='md:w-3/4 w-11/12 mx-auto py-10'>
          <div className='flex items-center justify-center gap-4 flex-col'>
            <div className='md:w-48 md:h-48 h-32 w-32 p-1 rounded-full bg-[#c9b8eb] flex items-center justify-center relative'>
              <img className='w-full h-full rounded-full object-cover' src={profile.img}></img>
              <label>
                <div className='absolute bottom-5 right-1 bg-white md:w-8 md:h-8 w-6 h-6 md:text-xl text-base flex items-center justify-center rounded-full cursor-pointer shantf'>
                  <MdOutlineEdit />
                </div>
                <input ref={imgref} type="file" onChange={handleProfileUpload} hidden></input>
              </label>
            </div>
            <div>
              <div className='capitalize font-bold md:text-2xl text-lg text-center'>{user?.full_name}</div>
              <div className='capitalize font-bold text-[#9f7ae7] text-center text-sm'>admin</div>
            </div>
          </div>
          <form className='flex flex-col gap-6 mt-10' onSubmit={SubmitForm}>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
              <div className='flex flex-col gap-1.5'>
                <div className='md:text-sm text-xs capitalize font-[550] '>full name:</div>
                <input className='outline-none border border-[#c9b8eb] w-full  px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.full_name} name='full_name' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex flex-col gap-1.5'>
                <div className='md:text-sm text-xs capitalize font-[550] '>username:</div>
                <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.username} name='username' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
              <div className='flex flex-col gap-1.5'>
                <div className='md:text-sm text-xs capitalize font-[550] '>email:</div>
                <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.email} name='email' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
            </div>
            <div className='flex flex-col gap-1.5'>
              <div className='md:text-sm text-xs capitalize font-[550] '>change password:</div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
                <div className='relative'>
                  <input className='outline-none border border-[#c9b8eb] w-full pl-2 pr-7 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type={`${eye ? 'text' : 'password'}`} value={form.old_password} name='old_password' placeholder='Enter old password' onChange={formHandler} onKeyUp={CommitHandler}></input>
                  <EyeIcon className='absolute top-3 right-2 text-lg text-[#9f7ae7] cursor-pointer' onClick={() => setEye(!eye)} />
                </div>
                <div className='relative'>
                  <input className='outline-none border border-[#c9b8eb] w-full pl-2 pr-7 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type={`${eye2 ? 'text' : 'password'}`} value={form.new_password} name='new_password' placeholder='Create new password' onChange={formHandler} onKeyUp={CommitHandler}></input>
                  <EyeIcon2 className='absolute top-3 right-2 text-lg text-[#9f7ae7] cursor-pointer' onClick={() => setEye2(!eye2)} />
                </div>
              </div>
            </div>
            {user.id === 1 &&
              <div className='flex flex-col gap-1.5'>
                <div className='md:text-sm text-xs capitalize font-[550] '>company medias:</div>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-4 items-center'>
                  <div className='flex gap-1.5 items-center'>
                    <div className='text-black text-lg'>
                      <GrFacebookOption />
                    </div>
                    <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type='text' value={form.facebook} name='facebook' placeholder='Enter fb link' onChange={formHandler} onKeyUp={CommitHandler}></input>
                  </div>
                  <div className='flex gap-1.5 items-center'>
                    <div className='text-black text-lg'>
                      <TfiInstagram />
                    </div>
                    <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type='text' value={form.instagram} name='instagram' placeholder='Enter IG link' onChange={formHandler} onKeyUp={CommitHandler}></input>
                  </div>
                  <div className='flex gap-1.5 items-center'>
                    <div className='text-black text-lg'>
                      <PiTelegramLogoLight />
                    </div>
                    <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type='text' value={form.telegram} name='telegram' placeholder='Enter Tg link' onChange={formHandler} onKeyUp={CommitHandler}></input>
                  </div>
                </div>
              </div>
            }
            {commit &&
              <div className='flex md:gap-8 gap-4 items-center justify-center mt-4'>
                <button className='outline-none w-fit h-fit py-2 px-6 text-xs text-semi-white  bg-[#462c7c] rounded-md capitalize flex items-center gap-1 font-[550]' type='button' onClick={cancelChanges}>
                  <span>cancel</span>
                  <FaRegRectangleXmark />
                </button>
                <button className='outline-none w-fit h-fit py-2 px-6 text-xs text-semi-white  bg-[#462c7c] rounded-md capitalize flex items-center gap-1 font-[550]'>
                  <span>save</span>
                  <IoCheckbox />
                </button>
              </div>
            }
          </form>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default Personalize