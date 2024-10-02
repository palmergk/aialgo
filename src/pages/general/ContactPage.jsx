import React, { useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import contactimg from '../../assets/images/contactimg.webp'
import { PiTelegramLogoLight } from "react-icons/pi";
import { TfiInstagram } from "react-icons/tfi";
import { GrFacebookOption } from "react-icons/gr";
import { MdOutlineHearing } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { ErrorAlert, SuccessAlert } from '../../utils/utils';
import { Apis, UserPostApi } from '../../services/API';
import Loading from '../../GeneralComponents/Loading'
import { ADMINSTORE } from '../../store';
import { useAtom } from 'jotai';



const ContactPage = () => {
  const [adminstore] = useAtom(ADMINSTORE)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
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
    if (!form.message) return ErrorAlert('Write a message')

    const formbody = {
      email: form.email,
      title: form.title,
      message: form.message
    }

    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.contact, formbody)
      if (response.status === 200) {
        SuccessAlert(response.msg)
        setForm({
          name: '',
          email: '',
          title: '',
          message: ''
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
    <Pagelayout>
      <div className="bg-[#1E2833] py-16">
        <div className='w-11/12 mx-auto'>
          <div className='flex flex-col shlct'>
            <div className='w-full h-fit grid grid-cols-1 lg:grid-cols-2'>
              <div className='col-span-1'>
                <img src={contactimg} className='lg:h-[80vh] md:h-[50vh] h-[30vh] w-full object-cover'></img>
              </div>
              <div className='col-span-1 lg:h-[80vh] h-fit bg-zinc-200 py-6 overflow-hidden relative'>
                {loading && <Loading />}
                <div className='lg:w-10/12 w-11/12 mx-auto'>
                  <div className='text-[2rem] capitalize text-center font-bold '>get in touch</div>
                  <div className='text-[0.85rem] capitalize font-bold flex items-center justify-center gap-1'>
                    <span>-</span>
                    <div>
                      send us a message; we are listening
                    </div>
                    <MdOutlineHearing className='text-orange' />
                    <span>-</span>
                  </div>
                  <form onSubmit={submitForm}>
                    <div className='flex flex-col lg:gap-4 gap-6 mt-8'>
                      <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6'>
                        <div className='flex flex-col gap-2'>
                          <div className='text-xs uppercase font-bold'>full name</div>
                          <input type='text' placeholder='Full name' className='outline-none focus:border focus:border-orange lg:text-sm text-base px-2 lg:py-2 py-1.5 ipt rounded-sm' name='name' value={form.name} onChange={inputHandler}></input>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <div className='text-xs uppercase font-bold'>email address*</div>
                          <input type='email' placeholder='Email address' className='outline-none focus:border focus:border-orange lg:text-sm text-base  px-2 lg:py-2 py-1.5 ipt rounded-sm' name='email' value={form.email} onChange={inputHandler}></input>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2 w-full'>
                        <div className='text-xs uppercase font-bold'>title</div>
                        <input placeholder='Message title' className='outline-none focus:border focus:border-orange lg:text-sm text-base px-2 lg:py-2 py-1.5 ipt rounded-sm' name='title' value={form.title} onChange={inputHandler}></input>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='text-xs uppercase font-bold'>message*</div>
                        <textarea placeholder='Write A Message' className='p-2 h-32 lg:text-[0.9rem] text-base resize-none outline-none focus:border focus:border-orange ipt rounded-sm' name='message' value={form.message} onChange={inputHandler}></textarea>
                      </div>
                      <div className='flex justify-center mt-2'>
                        <button className='outline-none bg-orange text-[0.9rem] text-white flex gap-1 items-center justify-center w-fit h-fit px-8 py-1 rounded-[3px] capitalize font-bold'>
                          <div>send</div>
                          <BiMailSend />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='w-full h-fit py-4 bg-[#9e5c36] overflow-hidden trans relative'>
              <div className='w-11/12 mx-auto '>
                <div className='grid grid-cols-1 gap-2 items-center lg:flex lg:justify-between h-full' >
                  <div className='text-white text-[0.9rem] capitalize font-[550] text-center'>reach us via:</div>
                  <div className='flex gap-4 justify-center'>
                    <a href={adminstore.telegram}>
                      <div className='h-8 w-8 border-2 bg-white rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer  transition-all text-orange text-lg hover:text-black'>
                        <PiTelegramLogoLight />
                      </div>
                    </a>
                    <a href={adminstore.instagram}>
                      <div className='h-8 w-8 border-2 bg-white  rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-orange text-lg hover:text-black'>
                        <TfiInstagram />
                      </div>
                    </a>
                    <a href={adminstore.facebook}>
                      <div className='h-8 w-8 border-2 bg-white  rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-orange text-[1.rem] hover:text-black'>
                        <GrFacebookOption />
                      </div>
                    </a>
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

export default ContactPage