import React, { useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import contactimg from '../../assets/images/contactimg.webp'
import { ErrorAlert, SuccessAlert } from '../../utils/utils';
import { Apis, UserPostApi } from '../../services/API';
import Loading from '../../GeneralComponents/Loading'
import { FaStarOfLife } from 'react-icons/fa6';

const ContactPage = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  })

  const formHandler = event => {
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
      <div className='bg-[#1E2833] py-16 text-semi-white'>
        <div className='w-11/12 mx-auto'>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-8'>
                <div className='text-4xl font-bold'>Get in touch</div>
                <div className='font-medium'>We're here for you every step of the way. Whether you have questions, need help, or want to share feedback, our friendly customer support team is ready to assist. Reach out to us below.</div>
              </div>
              <img src={contactimg} alt='contact image' className='w-auto h-auto'></img>
            </div>
            <div className='w-full h-fit rounded-xl b text-white py-8 md:px-8 px-5 relative bg-gradient-to-bl from-orange to-[#1B2530]'>
              {loading && <Loading />}
              <div className='md:text-4xl text-3xl font-bold text-center mt-4'>Send us a message</div>
              <div className='md:w-3/5 text-center mx-auto mt-2'>Your email address will not be published. Required fields are marked.</div>
              <form className='flex flex-col gap-6 mt-8' onSubmit={submitForm}>
                <div className='flex flex-col gap-2'>
                  <div className='capitalize'>full name</div>
                  <input className='outline-none bg-white w-full h-fit p-4 text-base rounded-lg text-black' name='full_name' value={form.full_name} placeholder='full name' onChange={formHandler} ></input>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <div className='capitalize'>email address</div>
                    <FaStarOfLife />
                  </div>
                  <input className='outline-none bg-white w-full h-fit p-4 text-base rounded-lg text-black' name='email' value={form.email} placeholder='email address' onChange={formHandler} type='email' ></input>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <div className='capitalize'>message</div>
                    <FaStarOfLife />
                  </div>
                  <textarea className='outline-none bg-white w-full h-40 p-4 text-base rounded-lg text-black resize-none' name='message' value={form.message} placeholder='message' onChange={formHandler}></textarea>
                </div>
                <button className='bg-white text-black w-full h-fit py-3 text-lg rounded-lg font-semibold'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default ContactPage