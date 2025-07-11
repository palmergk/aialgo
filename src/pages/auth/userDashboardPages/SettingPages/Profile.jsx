import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../../../../services/API'
import { ADMINSTORE, PROFILE } from '../../../../store'
import { useAtom } from 'jotai'
import { MdVerified, MdOutlineDateRange, MdOutlineCancel, MdSentimentVeryDissatisfied, MdOutlineEdit, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import moment from 'moment';
import { LuUserCircle } from "react-icons/lu";
import { SlLockOpen } from "react-icons/sl";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { IoCheckbox } from "react-icons/io5";
import { PiWarningCircleBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { CookieName, ErrorAlert, SuccessAlert } from '../../../../utils/utils';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import membership from '../../../../assets/images/membership.png'
import avatar from '../../../../assets/images/avatar.png'
import Loading from '../../../../GeneralComponents/Loading';
import { RiDeleteBin2Line } from 'react-icons/ri';
import SettingsLayout from '../../../../UserComponents/SettingsLayout';
import CopyButton from '../../../../GeneralComponents/CopyButton';
import PasswordToTextInput from '../../../../GeneralComponents/PasswordToTextInput';


const Profile = () => {
    const [user, setUser] = useAtom(PROFILE)
    const [adminStore] = useAtom(ADMINSTORE)

    const [edit, setEdit] = useState([])
    const [commit, setCommit] = useState(false)
    const [screen, setScreen] = useState(1)
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

    const AddRemoveEdit = (ele) => {
        const findEle = edit.find(item => item === ele)
        if (!findEle) {
            setEdit([...edit, ele])
        } else {
            const filterout = edit.filter(item => item !== ele)
            setEdit(filterout)
        }
    }

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
        setEdit([])
        setSelect(false)
        setCommit(false)
        setForm({
            full_name: user?.full_name,
            email: user?.email,
            username: user?.username,
            old_password: '',
            new_password: '',
        })
        setProfile({
            img: user.image ? `${imageurl}/profiles/${user?.image}` : avatar,
            image: user.image ? user.image : null
        })
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
                setEdit([])
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
                setSelect(false)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const DeleteAccount = async () => {
        if (!form.dl_password) return ErrorAlert(`Enter your password`)
        setLoading2(true)
        try {
            const response = await UserPutApi(Apis.user.delete_account, { password: form.dl_password })
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
            <div className='mt-10'>
                {loading && <Loading className="!bg-[#0c091aa4]" />}
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <div className='relative'>
                        <img className='md:w-48 md:h-48 h-40 w-40 border-4 border-light rounded-full object-cover' src={profile.img}></img>
                        <div className='absolute bottom-5 right-1 bg-white md:w-8 md:h-8 w-7 h-7 md:text-xl text-base flex items-center justify-center rounded-full cursor-pointer shlz' onClick={() => setSelect(!select)}><MdOutlineEdit /></div>
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
                    <div className='md:w-5/6 w-[95%] mx-auto text-sm text-semi-white flex flex-col gap-6'>
                        <div className='flex items-center justify-between'>
                            <div className='capitalize'>referral ID:</div>
                            <div className='flex gap-4 items-center'>
                                <span>{user?.referral_id}</span>
                                <CopyButton content={user.referral_id} className='!bg-light !text-white' />
                            </div>
                        </div>
                        <div className='bg-semi-white ml-auto -mt-4 p-1 text-xs rounded-md flex gap-2 items-center justify-center'>
                            <div className='bg-white text-center text-black py-1 px-2 rounded-md font-medium'>Refer and earn {adminStore?.referral_bonus_percentage}% commission on your referrals first deposit</div>
                            <div className='bg-white text-center text-black py-1 px-2 rounded-md font-medium'>Your referrals: <span className='font-bold'>{user?.referrals}</span></div>
                        </div>
                        <div className='flex justify-between items-center capitalize'>
                            <div>full name:</div>
                            {edit.includes('name') ?
                                <div className='flex md:gap-4 gap-2 items-center'>
                                    <input className='outline-none border border-light bg-transparent lg:text-[0.85rem] text-base md:w-64 w-48 h-fit rounded-[3px] px-2 py-1' name='full_name' value={form.full_name} onChange={formHandler} onKeyUp={CommitHandler} type='text'></input>
                                    <div className='text-xl text-light cursor-pointer' onClick={() => AddRemoveEdit('name')}>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                                :
                                <div className='flex gap-4'>
                                    <span>{user?.full_name}</span>
                                    <div className='text-lg text-light cursor-pointer' onClick={() => AddRemoveEdit('name')}>
                                        <FaRegEdit />
                                    </div>
                                </div>

                            }
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='capitalize'>username:</div>
                            {edit.includes('user') ?
                                <div className='flex md:gap-4 gap-2 items-center'>
                                    <input className='outline-none border border-light bg-transparent lg:text-[0.85rem] text-base md:w-64 w-48 h-fit rounded-[3px] px-2 py-1' name='username' value={form.username} onChange={formHandler} onKeyUp={CommitHandler} type='text'></input>
                                    <div className='text-xl text-light cursor-pointer' onClick={() => AddRemoveEdit('user')}>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                                :
                                <div className='flex gap-4'>
                                    <span>{user?.username}</span>
                                    <div className='text-lg text-light cursor-pointer' onClick={() => AddRemoveEdit('user')}>
                                        <FaRegEdit />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='capitalize'>email:</div>
                            {edit.includes('email') ?
                                <div className='flex md:gap-4 gap-2 items-center'>
                                    <input className='outline-none border border-light bg-transparent lg:text-[0.85rem] text-base md:w-64 w-48 h-fit rounded-[3px] px-2 py-1' name='email' value={form.email} onChange={formHandler} onKeyUp={CommitHandler} type='email'></input>
                                    <div className='text-xl text-light cursor-pointer' onClick={() => AddRemoveEdit('email')}>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                                :
                                <div className='flex gap-4'>
                                    <span>{user?.email}</span>
                                    <div className='text-lg text-light cursor-pointer' onClick={() => AddRemoveEdit('email')}>
                                        <FaRegEdit />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='capitalize'>password:</div>
                            {edit.includes('pass') ?
                                <div className='flex md:gap-4 gap-2 items-center'>
                                    <div className='flex flex-col gap-6'>
                                        <PasswordToTextInput name='old_password' value={form.old_password} onChange={formHandler} onKeyUp={CommitHandler} placeholder='Enter old password' className={{ main: 'md:w-64 w-48 text-white' }} />
                                        <PasswordToTextInput name='new_password' value={form.new_password} onChange={formHandler} onKeyUp={CommitHandler} placeholder='Create new password' className={{ main: 'md:w-64 w-48 text-white' }} />
                                    </div>
                                    <div className='text-xl text-light cursor-pointer' onClick={() => AddRemoveEdit('pass')}>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                                :
                                <div className='flex gap-4 items-center'>
                                    <span>*********</span>
                                    <div className='text-lg text-light cursor-pointer' onClick={() => AddRemoveEdit('pass')}>
                                        <FaRegEdit />
                                    </div>
                                </div>
                            }
                        </div>
                        {commit &&
                            <div className='flex md:gap-8 gap-4 items-center justify-center md:mt-8 mt-4'>
                                <button className='outline-none w-fit h-fit py-2 px-8 text-sm text-semi-white  bg-light rounded-md capitalize flex items-center gap-1 font-medium' type='button' onClick={cancelChanges}>
                                    <span>cancel</span>
                                    <FaRegRectangleXmark />
                                </button>
                                <button className='outline-none w-fit h-fit py-2 px-8 text-sm text-semi-white  bg-light rounded-md capitalize flex items-center gap-1 font-medium'>
                                    <span>save</span>
                                    <IoCheckbox />
                                </button>
                            </div>
                        }

                    </div>
                </form>
                <div className='relative mx-auto mt-20'>
                    {screen === 1 ?
                        <div className='justify-center text-sm text-light cursor-pointer flex items-center gap-1' onClick={() => { setScreen(2); MoveToBottom() }}>
                            <span>Delete my account</span>
                            <RiDeleteBin2Line />
                        </div>
                        :
                        <div className='w-fit h-fit bg-semi-white rounded-xl md:p-8 p-4 mx-auto relative overflow-hidden'>
                            {loading2 && <Loading />}
                            {screen === 2 &&
                                <div>
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
                                </div>
                            }
                            {screen === 3 &&
                                <div>
                                    <div className='text-center md:text-lg text-sm text-black font-medium'>Last step to permanently delete your account!</div>
                                    <div className='flex gap-1 items-center justify-center mt-2 md:text-[0.8rem] text-xs text-[red]'>
                                        <span className='text-admin-btn'>Enter your password below to finalize action</span>
                                        <SlLockOpen />
                                    </div>
                                    <div className='flex flex-col gap-8 items-center justify-center mt-6'>
                                        <PasswordToTextInput name='dl_password' value={form.dl_password} onChange={formHandler} placeholder='Enter your password' className={{ main: 'bg-white rounded-[4px]' }} />
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
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </SettingsLayout>
    )
}

export default Profile