import React, { useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { ADMINSTORE, PROFILE } from '../../../../store'
import Loading from '../../../../GeneralComponents/Loading'
import { Apis, imageurl, UserPutApi } from '../../../../services/API'
import { MdOutlineEdit, MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { FaRegRectangleXmark } from 'react-icons/fa6'
import { IoCheckbox } from 'react-icons/io5'
import { PiTelegramLogoLight } from "react-icons/pi";
import { TfiInstagram } from "react-icons/tfi";
import { GrFacebookOption } from 'react-icons/gr';
import avatar from '../../../../assets/images/avatar.png'
import { ErrorAlert, SuccessAlert } from '../../../../utils/utils'
import SettingsLayout from '../../../../AdminComponents/SettingsComponents/SettingsLayout'
import { RiDeleteBin2Line } from 'react-icons/ri';
import PasswordToTextInput from '../../../../GeneralComponents/PasswordToTextInput'


const Personalize = () => {
  const [user, setUser] = useAtom(PROFILE)
  const [adminStore, setAdminStore] = useAtom(ADMINSTORE)

  const [commit, setCommit] = useState(false)
  const [select, setSelect] = useState(false)
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
    facebook: '',
    instagram: '',
    telegram: ''
  })

  const formHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    setForm({
      ...form,
      facebook: adminStore?.facebook || '',
      instagram: adminStore?.instagram || '',
      telegram: adminStore?.telegram || ''
    })
  }, [adminStore])

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
      return ErrorAlert('Image size too large, file must not exceed 1mb')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
    }
    setCommit(true)
    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }

  const cancelChanges = () => {
    setCommit(false)
    setSelect(false)
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
    setProfile({
      img: user.image ? `${imageurl}/profiles/${user.image}` : avatar,
      image: user.image ? user.image : null
    })
  }

  const DeletePhoto = async () => {
    setLoading(true)
    try {
      const response = await UserPutApi(Apis.user.delete_photo)
      if (response.status === 200) {
        SuccessAlert(response.msg)
        setUser(response.user)
        setProfile({
          img: avatar,
          image: null
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
        setSelect(false)
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
          <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='relative'>
              <img className='md:w-48 md:h-48 h-40 w-40 border-4 border-[#c9b8eb] rounded-full object-cover' src={profile.img}></img>
              <div className='absolute bottom-5 right-1 bg-white md:w-8 md:h-8 w-7 h-7 md:text-xl text-base flex items-center justify-center rounded-full cursor-pointer shantf' onClick={() => setSelect(!select)}><MdOutlineEdit /></div>
              {select &&
                <div className='h-fit w-36 absolute -bottom-11 right-0 bg-white border border-[lightgrey] rounded-md z-10 text-sm font-bold overflow-hidden capitalize'>
                  <label>
                    <div className='px-2 py-1 cursor-pointer hover:bg-[#ececec] border-b border-[#ebeaea] flex justify-between items-center'>
                      <span>choose photo</span>
                      <MdOutlinePhotoSizeSelectActual />
                    </div>
                    <input ref={imgref} type="file" onChange={handleProfileUpload} hidden></input>
                  </label>
                  <div className='px-2 py-1 cursor-pointer hover:bg-[#ececec] border-b border-[#ebeaea] text-[red] flex justify-between items-center' onClick={DeletePhoto}>
                    <div>delete photo</div>
                    <RiDeleteBin2Line />
                  </div>
                </div>
              }
            </div>
            <div className='flex flex-col gap-1'>
              <div className='capitalize font-bold md:text-2xl text-lg text-center'>{user?.full_name}</div>
              <div className='capitalize font-bold text-[#9f7ae7] text-center text-sm'>{user?.role}</div>
            </div>
          </div>
          <form className='flex flex-col gap-6 mt-10' onSubmit={SubmitForm}>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
              <div className='flex flex-col gap-1.5'>
                <div className='text-sm capitalize font-medium'>full name:</div>
                <input className='outline-none border border-[#c9b8eb] w-full  px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.full_name} name='full_name' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex flex-col gap-1.5'>
                <div className='text-sm capitalize font-medium'>username:</div>
                <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.username} name='username' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
              <div className='flex flex-col gap-1.5'>
                <div className='text-sm capitalize font-medium'>email:</div>
                <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.email} name='email' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
            </div>
            <div className='flex flex-col gap-1.5'>
              <div className='text-sm capitalize font-medium'>change password:</div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
                <PasswordToTextInput name='old_password' value={form.old_password} onChange={formHandler} onKeyUp={CommitHandler} placeholder='Enter old password' className={{ main: '!w-full !md:py-2 !py-1.5 !rounded-sm !border-[#c9b8eb]', icon: "!text-[#9f7ae7] !top-2.5" }} />
                <PasswordToTextInput name='new_password' value={form.new_password} onChange={formHandler} onKeyUp={CommitHandler} placeholder='Enter new password' className={{ main: '!w-full !md:py-2 !py-1.5 !rounded-sm !border-[#c9b8eb]', icon: "!text-[#9f7ae7] !top-2.5" }} />
              </div>
            </div>
            {user.role === 'super admin' &&
              <div className='flex flex-col gap-1.5'>
                <div className='text-sm capitalize font-medium'>company medias:</div>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-4 items-center'>
                  {Object.values(adminStore).length === 0 ?
                    <>
                      {new Array(3).fill(0).map((ele, i) => (
                        <div className='flex gap-1.5 items-center' key={i}>
                          <div className='w-5 h-5 rounded-md bg-gray-200 animate-pulse'></div>
                          <div className='w-full h-10 rounded-sm bg-gray-200 animate-pulse'></div>
                        </div>
                      ))}
                    </>
                    :
                    <>
                      <div className='flex gap-1.5 items-center text-lg'>
                        <GrFacebookOption />
                        <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type='text' value={form.facebook} name='facebook' placeholder='Enter fb link' onChange={formHandler} onKeyUp={CommitHandler}></input>
                      </div>
                      <div className='flex gap-1.5 items-center text-lg'>
                        <TfiInstagram />
                        <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type='text' value={form.instagram} name='instagram' placeholder='Enter IG link' onChange={formHandler} onKeyUp={CommitHandler}></input>
                      </div>
                      <div className='flex gap-1.5 items-center text-lg'>
                        <PiTelegramLogoLight />
                        <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type='text' value={form.telegram} name='telegram' placeholder='Enter Tg link' onChange={formHandler} onKeyUp={CommitHandler}></input>
                      </div>
                    </>
                  }
                </div>
              </div>
            }
            {commit &&
              <div className='flex md:gap-8 gap-4 items-center justify-center mt-4'>
                <button className='outline-none w-fit h-fit py-2 px-8 text-sm text-semi-white  bg-[#462c7c] rounded-md capitalize flex items-center gap-1 font-medium' type='button' onClick={cancelChanges}>
                  <span>cancel</span>
                  <FaRegRectangleXmark />
                </button>
                <button className='outline-none w-fit h-fit py-2 px-8 text-sm text-semi-white  bg-[#462c7c] rounded-md capitalize flex items-center gap-1 font-medium'>
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