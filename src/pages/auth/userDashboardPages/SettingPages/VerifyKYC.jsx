import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../../store'
import { MdOutlineEdit, MdVerified } from 'react-icons/md'
import { useAtom } from 'jotai'
import { FiUploadCloud } from 'react-icons/fi'
import { Apis, PostApi, UserGetApi, imageurl } from '../../../../services/API'
import { ErrorAlert, SuccessAlert } from '../../../../utils/utils'
import CountrySelector from '../../../../GeneralComponents/CountrySelector'
import PhoneSelector from '../../../../GeneralComponents/PhoneSelector'
import StatusSelector from '../../../../GeneralComponents/StatusSelector'
import Loading from '../../../../GeneralComponents/Loading'
import SettingsLayout from '../../../../UserComponents/SettingsLayout'
import IDSelector from '../../../../GeneralComponents/IDSelector'

const Genders = [
    "male",
    "female",
    "non binary",
    "rather not say",
]

const MaritalStatus = [
    "single",
    "married",
    "divorced",
    "seperated",
    "widowed"
]


const VerifyKYC = () => {
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [kyc, setKyc] = useState({})
    const [select, setSelect] = useState({
        gdr: false,
        mtl: false,
        idt: false
    })
    const [usercountry, setUserCountry] = useState({
        name: 'select',
        flag: null
    })
    const [frontID, setFrontID] = useState({
        img: null,
        image: null
    })
    const [backID, setBackID] = useState({
        img: null,
        image: null
    })
    const frontIdref = useRef()
    const backIdref = useRef()
    const [loading, setLoading] = useState(false)
    const [dataloading, setDataLoading] = useState(true)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        gender: 'select',
        marital_status: 'select',
        date_of_birth: '',
        address: '',
        state: '',
        postal: '',
        phone_code: '+44',
        phone_number: '',
        id_type: 'select',
        id_number: '',
    })

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (!form.date_of_birth) {
            const today = new Date().toISOString().split("T")[0]
            setForm({
                ...form,
                date_of_birth: today
            })
        }
    }, [])

    const FetchKyc = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.kyc.user_kyc)
            if (response.status === 200) {
                const data = response.msg
                setKyc(data)
                setForm({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    gender: data.gender,
                    marital_status: data.marital_status,
                    date_of_birth: data.date_of_birth,
                    address: data.address,
                    state: data.state,
                    postal: data.postal,
                    phone_code: data.phone_code,
                    phone_number: data.phone_number,
                    id_type: data.id_type,
                    id_number: data.id_number,
                })
                setUserCountry({
                    name: data.country,
                    flag: data.country_flag
                })
                setFrontID({
                    img: `${imageurl}/identity/${data.gen_id}/${data.front_id}`,
                    image: data.front_id
                })
                setBackID({
                    img: `${imageurl}/identity/${data.gen_id}/${data.back_id}`,
                    image: data.back_id
                })
            }

        } catch (error) {
            //
        } finally {
            setDataLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchKyc()
    }, [FetchKyc])

    const handleUpload = (e, tag) => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) {
            tag === 'front' ? frontIdref.current.value : backIdref.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        tag === 'front' ? setFrontID({ img: URL.createObjectURL(file), image: file }) : setBackID({ img: URL.createObjectURL(file), image: file })
    }

    const Create_Update_KYC = async () => {

        if (!form.first_name) return ErrorAlert('Enter your first name')
        if (!form.last_name) return ErrorAlert('Enter your last name')
        if (form.gender === 'select') return ErrorAlert('Select a gender')
        if (form.marital_status === 'select') return ErrorAlert('Select marital status')
        if (!form.date_of_birth) return ErrorAlert('Enter date of birth')
        if (usercountry.name === 'select') return ErrorAlert('Select country')
        if (!form.address) return ErrorAlert('Enter your address and city')
        if (!form.state) return ErrorAlert('Enter your state of residence')
        if (!form.postal) return ErrorAlert('Enter postal / zipcode')
        if (!form.phone_number) return ErrorAlert('Enter your mobile number')
        if (!form.id_type) return ErrorAlert('Select or Enter an ID type')
        if (!form.id_number) return ErrorAlert('Enter identification number')
        if (!frontID.image) return ErrorAlert('Provide a valid front ID image')
        if (!backID.image) return ErrorAlert('Provide a valid back ID image')
        if (kyc.status === 'processing') return ErrorAlert(`You can't re-upload while KYC details is processing`)
        if (kyc.status === 'verified') return ErrorAlert('KYC is verified')

        if (form.first_name === kyc.first_name && form.last_name === kyc.last_name && form.address === kyc.address && form.state === kyc.state && form.postal === kyc.postal && form.date_of_birth === kyc.date_of_birth && form.phone_number === kyc.phone_number && form.id_number === kyc.id_number && form.phone_code === kyc.phone_code && form.gender === kyc.gender && form.marital_status === kyc.marital_status && usercountry.name === kyc.country && frontID.image === kyc.front_id && backID.image === kyc.back_id) return ErrorAlert('No changes made')

        const formbody = new FormData()
        formbody.append('front_id', frontID.image)
        formbody.append('back_id', backID.image)
        formbody.append('first_name', form.first_name)
        formbody.append('last_name', form.last_name)
        formbody.append('gender', form.gender)
        formbody.append('marital_status', form.marital_status)
        formbody.append('date_of_birth', form.date_of_birth)
        formbody.append('country', usercountry.name)
        formbody.append('country_flag', usercountry.flag)
        formbody.append('address', form.address)
        formbody.append('state', form.state)
        formbody.append('postal', form.postal)
        formbody.append('phone_code', form.phone_code)
        formbody.append('phone_number', form.phone_number)
        formbody.append('id_type', form.id_type)
        formbody.append('id_number', form.id_number)

        setLoading(true)
        try {
            const response = await PostApi(Apis.kyc.create_update_kyc, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                FetchKyc()
                setNotifications(response.notis)
                setUnreadNotis(response.unread)
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
            <div className='mt-16'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-2 items-center text-semi-white'>
                        <div className='flex gap-2 items-center md:text-4xl text-2xl capitalize font-bold'>
                            <span>verify kyc</span>
                            <MdVerified className='text-light' />
                        </div>
                        <div className='italic text-sm flex items-center gap-2'>
                            <span>Status:</span>
                            {dataloading ?
                                <div className='w-20 h-2 bg-slate-300 animate-pulse rounded-full'></div>
                                :
                                <>
                                    {Object.values(kyc).length !== 0 ?
                                        <span className={`${kyc.status === 'failed' ? 'text-[#c42e2e]' : kyc.status === 'verified' ? 'text-[green]' : 'text-light'}`}>{kyc?.status}</span>
                                        :
                                        <span className='text-[#c42e2e]'>unverified</span>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 text-black md:w-3/4 w-[95%] mx-auto bg-semi-white py-6 md:px-8 px-5 rounded-md relative overflow-hidden'>
                        {loading && <Loading />}
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>first name:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.first_name} name='first_name' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>last name:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.last_name} name='last_name' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>gender:</div>
                                <StatusSelector Statuses={Genders} status={form.gender} HandleFunction={(item) => setForm({ ...form, gender: item })} select={select.gdr} toggle={() => setSelect({ ...select, gdr: !select.gdr })} className="shantf !w-full" />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>marital status:</div>
                                <StatusSelector Statuses={MaritalStatus} status={form.marital_status} HandleFunction={(item) => setForm({ ...form, marital_status: item })} select={select.mtl} toggle={() => setSelect({ ...select, mtl: !select.mtl })} className="shantf !w-full" />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>date of birth:</div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input name='date_of_birth' value={form.date_of_birth} onChange={formHandler} datepicker="true" datepicker-buttons="true" datepicker-autoselect-today="true" type="date" className="bg-white border border-gray-300 text-black dark:text-black text-sm rounded-[3px] outline-none w-full ps-10 px-2 py-1 dark:focus:ring-blue-500 shantf" placeholder="Select date"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='text-sm capitalize font-semibold'>country:</div>
                                <CountrySelector usercountry={usercountry} setUserCountry={setUserCountry} className='shantf' />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>address & city:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.address} name='address' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>state / province:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.state} name='state' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>postal / zipcode:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.postal} name='postal' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>phone number:</div>
                                <div className='flex gap-2 items-center'>
                                    <PhoneSelector phoneCode={form.phone_code} HandleFunction={(item) => setForm({ ...form, phone_code: item })} className='shantf !w-16' />
                                        <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.phone_number} name='phone_number' onChange={formHandler}></input>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>government issued ID:</div>
                                <IDSelector type={form.id_type} HandleFunction={(item) => setForm({ ...form, id_type: item })} className='shantf' />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>identification number:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.id_number} name='id_number' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>front ID image:</div>
                                <label className='cursor-pointer h-40 w-full'>
                                    {frontID.img ?
                                        <div className='relative w-full h-full'>
                                            <img src={frontID.img} className='h-full w-full border border-light rounded-md'></img>
                                            <div className='absolute top-1 right-1 text-base bg-white border rounded-md p-1'>
                                                <MdOutlineEdit />
                                            </div>
                                        </div>
                                        :
                                        <div className='border border-dashed border-light rounded-lg flex flex-col gap-2 items-center justify-center h-full w-full'>
                                            <div className='bg-gray-300 rounded-full p-2 text-2xl'><FiUploadCloud /></div>
                                            <span className='text-xs'>click to add image</span>
                                        </div>
                                    }
                                    <input ref={frontIdref} type="file" onChange={(e) => handleUpload(e, 'front')} hidden />
                                </label>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>back ID image:</div>
                                <label className='cursor-pointer w-full h-40'>
                                    {backID.img ?
                                        <div className='relative w-full h-full'>
                                            <img src={backID.img} className='h-full w-full border border-light rounded-md'></img>
                                            <div className='absolute top-1 right-1 text-base bg-white border rounded-md p-1'>
                                                <MdOutlineEdit />
                                            </div>
                                        </div>
                                        :
                                        <div className='border border-dashed border-light rounded-lg flex flex-col gap-2 items-center justify-center h-full w-full'>
                                            <div className='bg-gray-300 rounded-full p-2 text-2xl'><FiUploadCloud /></div>
                                            <span className='text-xs'>click to add image</span>
                                        </div>
                                    }
                                    <input ref={backIdref} type="file" onChange={(e) => handleUpload(e, 'back')} hidden />
                                </label>
                            </div>
                        </div>
                        <button className='outline-none bg-[#252525] py-2.5 px-10 h-fit w-fit rounded-md capitalize text-sm text-white cursor-pointer font-[600] mt-4 mx-auto' onClick={Create_Update_KYC}>upload details</button>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    )
}

export default VerifyKYC