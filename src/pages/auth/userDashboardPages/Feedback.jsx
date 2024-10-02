import React, { useState } from 'react'
import LoadingAdmin from '../../../GeneralComponents/LoadingAdmin';
import { useAtom } from 'jotai'
import { PROFILE } from '../../../store'
import { MdOutlineHearing } from 'react-icons/md'
import { BiMailSend } from 'react-icons/bi'
import { Apis, UserPostApi } from '../../../services/API'
import { ErrorAlert, SuccessAlert } from '../../../utils/utils'
import contact from '../../../assets/images/contactus.png'
import Dashboard from './Dashboard'

const Feedback = () => {
    const [user] = useAtom(PROFILE)

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        message: '',
    })

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = async event => {
        event.preventDefault()

        if (!form.message) return ErrorAlert('Enter a message')

        const formbody = {
            email: user.email,
            title: form.title,
            message: form.message
        }

        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.contact, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setForm({
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
        <Dashboard>
            <div className='relative'>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>send feedback</div>
                {loading && <LoadingAdmin />}
                <div className='md:w-3/4 w-11/12 mx-auto flex flex-col gap-12 mt-16'>
                    <div>
                        <div className='flex items-center justify-center'>
                            <div className='md:text-[2rem] text-2xl capitalize font-bold text-[#a09f9f] '>get in touch</div>
                            <img src={contact} className='md:h-16 h-10 w-auto'></img>
                        </div>
                        <div className='md:text-[0.85rem] text-xs capitalize font-bold text-[#a09f9f] flex items-center justify-center gap-1 pt-2'>
                            <span>-</span>
                            <div>
                                send us a message; we are listening
                            </div>
                            <MdOutlineHearing className='text-light' />
                            <span>-</span>
                        </div>
                    </div>
                    <form onSubmit={submitForm}>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <div className='text-xs uppercase font-bold text-[#a09f9f]'>title</div>
                                <input placeholder='Enter Message Title' className={`p-3 text-semi-white lg:text-[0.9rem]  outline-none bg-transparent rounded-md border border-light ipt`} name='title' value={form.title} onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-2 mt-2'>
                                <div className='text-xs uppercase font-bold text-[#a09f9f]'>message*</div>
                                <textarea placeholder='Write A Message' className='p-3 h-36 text-semi-white lg:text-[0.9rem] outline-none bg-transparent rounded-md resize-none border border-light ipt' name='message' value={form.message} onChange={formHandler}></textarea>
                            </div>
                            <div className='flex justify-end'>
                                <button className='outline-none bg-light text-xs md:text-sm text-white flex gap-1 items-center justify-center w-fit h-fit md:px-8 px-6 py-2 md:py-1.5 rounded-[3px] capitalize font-[600]'>
                                    <div>send</div>
                                    <BiMailSend />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Dashboard>
    )
}

export default Feedback