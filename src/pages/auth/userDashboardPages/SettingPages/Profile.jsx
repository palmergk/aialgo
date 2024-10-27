import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../../../../services/API'
import { ADMINSTORE, PROFILE } from '../../../../store'
import { useAtom } from 'jotai'
import { IoEye } from 'react-icons/io5';
import { MdVerified, MdOutlineDateRange, MdOutlineCancel, MdSentimentVeryDissatisfied, MdOutlineEdit, MdContentCopy, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import moment from 'moment';
import { LuUserCircle } from "react-icons/lu";
import { SlLockOpen } from "react-icons/sl";
import { FaCheck, FaRegRectangleXmark } from "react-icons/fa6";
import { IoCheckbox } from "react-icons/io5";
import { PiWarningCircleBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { CookieName, ErrorAlert, SuccessAlert } from '../../../../utils/utils';
import { IoMdEyeOff } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import membership from '../../../../assets/images/membership.png'
import avatar from '../../../../assets/images/avatar.png'
import Loading from '../../../../GeneralComponents/Loading';
import { RiDeleteBin2Line } from 'react-icons/ri';
import SettingsLayout from '../../../../UserComponents/SettingsLayout';


const Profile = () => {
    const [user, setUser] = useAtom(PROFILE)
    const [adminStore] = useAtom(ADMINSTORE)

    const [nameEdit, setNameEdit] = useState(false)
    const [userEdit, setUserEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [passEdit, setPassEdit] = useState(false)
    const [commit, setCommit] = useState(false)
    const [screen, setScreen] = useState(1)
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const [eye3, setEye3] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
    const EyeIcon3 = eye3 === true ? IoEye : IoMdEyeOff
    const [copy, setCopy] = useState(false)
    const [select, setSelect] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const imgref = useRef()
    const navigate = useNavigate()

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
        dl_password: ''
    })

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const MoveToBottom = () => {
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }
    useEffect(() => {
        if (screen !== 1) {
            MoveToBottom()
        }
    }, [MoveToBottom])

    const CommitHandler = () => {
        if (form.full_name === user.full_name && form.username === user.username && form.email === user.email && form.old_password === '' && form.new_password === '' && profile.image === user.image) {
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
        setEmailEdit(false)
        setNameEdit(false)
        setPassEdit(false)
        setUserEdit(false)
        setSelect(false)
        setCommit(false)
        setForm({
            full_name: user?.full_name,
            email: user?.email,
            username: user?.username,
            old_password: '',
            new_password: '',
        })
        imgref.current.value = null
        setProfile({
            img: user.image ? `${imageurl}/profiles/${user?.image}` : avatar,
            image: user.image ? user.image : null
        })
    }

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(user?.referral_id)
        setCopy(true)
    }

    const submitForm = async (event) => {
        event.preventDefault()

        const formbody = new FormData()
        formbody.append('image', profile.image)
        formbody.append('full_name', form.full_name)
        formbody.append('username', form.username)
        formbody.append('email', form.email)
        formbody.append('old_password', form.old_password)
        formbody.append('new_password', form.new_password)

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.user.update, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setUser(response.user)
                setEmailEdit(false)
                setNameEdit(false)
                setPassEdit(false)
                setUserEdit(false)
                setCommit(false)
                setSelect(false)
                setForm({
                    full_name: response.user.full_name,
                    email: response.user.email,
                    username: response.user.username,
                    old_password: '',
                    new_password: '',
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

    const DeletePhoto = async () => {
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
        }
    }

    const DeleteAccount = async () => {
        if (!form.dl_password) return ErrorAlert(`Enter your password`)

        const formbody = {
            password: form.dl_password
        }
        setLoading2(true)
        try {
            const response = await UserPutApi(Apis.user.delete_account, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                Cookies.remove(CookieName)
                navigate('/')
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading2(false)
        }
    }

    return (
        <SettingsLayout>
            <div>
                {loading && <Loading className="!bg-[#0c091aa4]" />}
                <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                    <div className='md:w-48 md:h-48 h-32 w-32 p-1 rounded-full bg-[#afa7df] flex items-center justify-center relative'>
                        <img className='w-full h-full rounded-full object-cover' src={profile.img}></img>
                        <div className='absolute bottom-5 right-1 bg-white md:w-8 md:h-8 w-6 h-6 md:text-xl text-base flex items-center justify-center rounded-full cursor-pointer shlz' onClick={() => setSelect(!select)}><MdOutlineEdit /></div>
                        {select &&
                            <div className='h-fit w-36 absolute md:-bottom-11 -bottom-9 right-0 bg-white border border-[lightgrey] rounded-md z-10 md:text-sm text-xs font-bold overflow-hidden capitalize'>
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
                        <div className='text-semi-white flex gap-2 items-center'>
                            <div className='capitalize font-bold md:text-2xl text-lg text-center'>{user?.full_name}</div>
                            <img className='md:h-4 h-2 w-auto' src={user?.country_flag}></img>
                        </div>
                        <div className='text-light md:text-[0.8rem] text-xs capitalize font-bold text-center'>account trader</div>
                    </div>
                </div>
                <div className='flex gap-8 items-center w-fit overflow-hidden h-fit bg-semi-white rounded-xl capitalize md:px-8 px-4 py-4 mx-auto mt-8'>
                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='md:text-[1.4rem] text-lg text-black'>Status</div>
                            {user.email_verified === 'true' || user.kyc_verified === 'true' ?
                                <div className='flex gap-1 items-center md:text-[0.8rem] text-xs text-zinc-700'>
                                    <span>verified</span>
                                    <MdVerified className={`${user.email_verified === 'true' && user.kyc_verified === 'true' ? 'text-light' : 'text-zinc-400'}`} />
                                    {user.email_verified !== 'true' || user.kyc_verified !== 'true' ? <span>1/2</span> : <span></span>}
                                </div>
                                :
                                <div className='flex gap-1 items-center md:text-[0.8rem] text-xs text-[red]'>
                                    <span>unverified</span>
                                    <MdSentimentVeryDissatisfied />
                                </div>
                            }
                        </div>
                        <div className='border-r-2 h-12 border-[#bebebe]'></div>
                        <div className='flex flex-col gap-2'>
                            <div className='md:text-[1.4rem] text-lg text-black '>joined</div>
                            <div className='flex gap-1 items-center md:text-[0.8rem] text-xs'>
                                <span className='text-zinc-700'>{moment(user?.createdAt).format('DD-MM-yyyy')}</span>
                                <MdOutlineDateRange className='text-light' />
                            </div>
                        </div>
                    </div>
                    <img src={membership} className='h-auto md:w-14 w-10'></img>
                </div>
                <form onSubmit={submitForm} className='flex flex-col gap-8 mt-12'>
                    <div className='md:text-xl text-base text-semi-white capitalize flex items-center gap-1'>
                        <div>acount details</div>
                        <LuUserCircle className='text-light' />
                    </div>
                    <div className='md:w-[80%] w-11/12 mx-auto md:text-[0.85rem] text-xs text-semi-white flex flex-col gap-6'>
                        <div className='flex items-center justify-between'>
                            <div className='capitalize'>referral id:</div>
                            <div className='flex gap-4 items-center'>
                                <span>{user?.referral_id}</span>
                                <button className='outline-none w-fit h-fit py-1.5 px-2 text-[0.8rem] text-semi-white bg-[#594ca1] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()} type='button'>
                                    {!copy && <MdContentCopy />}
                                    {copy && <FaCheck />}
                                </button>
                            </div>
                        </div>
                        <div className='italic md:text-[0.75rem] text-[0.65rem] text-center ml-auto -mt-4 text-[#2fbe2f] py-0.5 px-1 bg-[#130e27]'>refer and earn {adminStore?.referral_bonus_percentage}% commission on your referral first deposit</div>
                        <div className='flex justify-between items-center  capitalize'>
                            <div>full name:</div>
                            {!nameEdit && <div className='flex gap-4'>
                                <span>{user?.full_name}</span>
                                <div className='text-lg text-light cursor-pointer' onClick={() => { setNameEdit(!nameEdit) }}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {nameEdit && <div className='flex md:gap-4 gap-2 items-center'>
                                <input className='outline-none border border-light bg-transparent lg:text-[0.8rem] text-base md:w-60 w-48 h-fit rounded-[3px] px-2 py-1' name='full_name' value={form.full_name} onChange={formHandler} onKeyUp={CommitHandler} type='text'></input>
                                <div className='text-xl text-light cursor-pointer' onClick={() => setNameEdit(!nameEdit)}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className=' capitalize'>username:</div>
                            {!userEdit && <div className='flex gap-4'>
                                <span>{user?.username}</span>
                                <div className='text-lg text-light cursor-pointer' onClick={() => setUserEdit(!userEdit)}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {userEdit && <div className='flex md:gap-4 gap-2 items-center'>
                                <input className='outline-none border border-light bg-transparent lg:text-[0.8rem] text-base md:w-60 w-48 h-fit rounded-[3px] px-2 py-1' name='username' value={form.username} onChange={formHandler} onKeyUp={CommitHandler} type='text'></input>
                                <div className='text-xl text-light cursor-pointer' onClick={() => { setUserEdit(!userEdit) }}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className=' capitalize'>email:</div>
                            {!emailEdit && <div className='flex gap-4 lowercase'>
                                <span>{user?.email}</span>
                                <div className='text-lg text-light cursor-pointer' onClick={() => setEmailEdit(!emailEdit)}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {emailEdit && <div className='flex md:gap-4 gap-2 items-center'>
                                <input className='outline-none border border-light bg-transparent lg:text-[0.8rem] text-base md:w-60 w-48 h-fit rounded-[3px] px-2 py-1' name='email' value={form.email} onChange={formHandler} onKeyUp={CommitHandler} type='email'></input>
                                <div className='text-xl text-light cursor-pointer' onClick={() => setEmailEdit(!emailEdit)}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='capitalize'>password:</div>
                            {!passEdit && <div className='flex gap-4 items-center'>
                                <span>*********</span>
                                <div className='text-lg text-light cursor-pointer' onClick={() => setPassEdit(!passEdit)}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {passEdit && <div className='flex md:gap-4 gap-2 items-center'>
                                <div className='flex flex-col gap-6'>
                                    <div className='relative'>
                                        <input className='outline-none border border-light bg-transparent lg:text-[0.8rem] text-base md:w-60 w-48 h-fit rounded-[3px] pl-2 pr-8 py-1 ipt' placeholder='Enter old password' name='old_password' value={form.old_password} onChange={formHandler} onKeyUp={CommitHandler} type={`${eye ? 'text' : 'password'}`}></input>
                                        <EyeIcon className='absolute top-2 right-2 text-light cursor-pointer text-lg' onClick={() => setEye(!eye)} />
                                    </div>
                                    <div className='relative'>
                                        <input className='outline-none border border-light bg-transparent lg:text-[0.8rem] text-base md:w-60 w-48 h-fit rounded-[3px] pl-2 pr-8 py-1 ipt' placeholder='Create new password' name='new_password' value={form.new_password} onChange={formHandler} onKeyUp={CommitHandler} type={`${eye2 ? 'text' : 'password'}`}></input>
                                        <EyeIcon2 className='absolute top-2 right-2 text-light cursor-pointer text-lg' onClick={() => setEye2(!eye2)} />
                                    </div>
                                </div>
                                <div className='text-xl text-light cursor-pointer' onClick={() => setPassEdit(!passEdit)}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        {commit &&
                            <div className='flex md:gap-8 gap-4 items-center justify-center md:mt-8 mt-4'>
                                <button className='outline-none w-fit h-fit py-2 px-6 text-xs text-semi-white  bg-[#594ca1] rounded-md capitalize flex items-center gap-1 font-[550]' type='button' onClick={cancelChanges}>
                                    <span>cancel</span>
                                    <FaRegRectangleXmark />
                                </button>
                                <button className='outline-none w-fit h-fit py-2 px-6 text-xs text-semi-white  bg-[#594ca1] rounded-md capitalize flex items-center gap-1 font-[550]'>
                                    <span>save</span>
                                    <IoCheckbox />
                                </button>
                            </div>
                        }

                    </div>
                </form>
                <div className='relative mx-auto mt-20'>
                    {screen === 1 && <div className='justify-center md:text-[0.85rem] text-xs text-light cursor-pointer flex items-center gap-1' onClick={() => { setScreen(2); MoveToBottom() }}>
                        <span>Delete my account</span>
                        <RiDeleteBin2Line />
                    </div>}
                    {screen !== 1 && <div className='w-fit h-fit bg-semi-white rounded-xl md:p-8 p-4 mx-auto relative overflow-hidden'>
                        {loading2 && <Loading className="!bg-[#97979767]" />}
                        {screen === 2 && <div>
                            <div className='text-center md:text-lg text-sm text-black font-medium'>Are you sure you want to delete your account?</div>
                            <div className='flex justify-center items-center gap-0.5 mt-2 md:text-[0.8rem] text-xs text-admin-btn'>
                                <span className='text-center'>This action may result in the loss of assests</span>
                                <PiWarningCircleBold className='text-[red]' />
                            </div>
                            <div className='flex md:gap-16 gap-6 items-center justify-center mt-8'>
                                <button className='outline-none w-fit h-fit py-2 px-4 text-xs text-semi-white  bg-admin-btn rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setScreen(1)}>
                                    <span>cancel action</span>
                                    <FaRegRectangleXmark />
                                </button>
                                <button className='outline-none w-fit h-fit py-2 px-4 text-xs text-semi-white  bg-[#642424] rounded-md capitalize flex items-center gap-1 font-bold' onClick={() => setScreen(3)}>
                                    <span>proceed action</span>
                                    <IoCheckbox />
                                </button>
                            </div>
                        </div>}
                        {screen === 3 && <div>
                            <div className='text-center md:text-lg text-sm text-black font-medium'>Last step to permanently delete your account!</div>
                            <div className='flex gap-1 items-center justify-center mt-2 md:text-[0.8rem] text-xs text-[red]'>
                                <span className='text-admin-btn'>Enter your password below to finalize action</span>
                                <SlLockOpen />
                            </div>
                            <div className='flex flex-col gap-8 items-center justify-center mt-6'>
                                <div className='relative'>
                                    <input className='outline-none border border-light bg-white lg:text-[0.85rem] text-base w-48 h-8 rounded-[4px] pl-2 pr-8 py-1 text-black ipt' placeholder='Enter your password' name='dl_password' value={form.dl_password} onChange={formHandler} type={`${eye3 === true ? 'text' : 'password'}`}></input>
                                    <EyeIcon3 className='absolute top-2 right-2 cursor-pointer text-light text-lg' onClick={() => setEye3(!eye3)} />
                                </div>
                                <div className='flex md:gap-16 gap-6 items-center'>
                                    <button className='outline-none w-fit h-fit py-2 px-4 text-xs text-semi-white  bg-admin-btn  rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => { setScreen(1); setForm({ ...form, dl_password: '' }) }}>
                                        <span>cancel deletion</span>
                                        <FaRegRectangleXmark />
                                    </button>
                                    <button className='outline-none w-fit h-fit py-2 px-4 text-xs text-semi-white  bg-[#642424] rounded-md capitalize flex items-center gap-1 font-bold' onClick={DeleteAccount}>
                                        <span>delete account</span>
                                        <RiDeleteBin2Line />
                                    </button>
                                </div>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </SettingsLayout>
    )
}

export default Profile