import React, { useCallback, useEffect, useRef, useState } from 'react'
import VerifyLayout from '../../../../UserComponents/VerifyLayout'
import { NOTIFICATIONS, PROFILE, UNREADNOTIS } from '../../../../store'
import { MdVerified } from 'react-icons/md'
import { useAtom } from 'jotai'
import { FiUploadCloud } from 'react-icons/fi'
import { Apis, PostApi, UserGetApi } from '../../../../services/API'
import { ErrorAlert, SuccessAlert } from '../../../../utils/utils'
import CountrySelector from '../../../../GeneralComponents/CountrySelector'
import PhoneSelector from '../../../../GeneralComponents/PhoneSelector'
import StatusSelector from '../../../../GeneralComponents/StatusSelector'
import Loading from '../../../../GeneralComponents/Loading'

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
    "seperated"
]

const VerifyKYC = () => {
    const [, setUser] = useAtom(PROFILE)
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [kyc, setKyc] = useState({})
    const [gender, setGender] = useState('select')
    const [select, setSelect] = useState(false)
    const [marital, setMarital] = useState('select')
    const [select2, setSelect2] = useState(false)
    const [usercountry, setUserCountry] = useState({
        name: 'select',
        flag: null
    })
    const [phoneCode, setPhoneCode] = useState('+44')
    const idref = useRef()
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        state: '',
        postal: '',
        address: '',
        id_number: '',
        phone_number: '',
    })

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const FetchKyc = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.kyc.user_kyc)
            if (response.status === 200) {
                setKyc(response.msg)
                setForm({
                    first_name: response.msg.first_name,
                    last_name: response.msg.last_name,
                    date_of_birth: response.msg.date_of_birth,
                    state: response.msg.state,
                    postal: response.msg.postal,
                    address: response.msg.address,
                    id_number: response.msg.id_number,
                    phone_number: response.msg.phone_number,
                })
                setGender(response.msg.gender)
                setMarital(response.msg.marital_status)
                setUserCountry({
                    name: response.msg.country,
                    flag: response.msg.country_flag
                })
                setPhoneCode(response.msg.phone_code)
                setId({
                    name: response.msg.valid_id
                })
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchKyc()
    }, [FetchKyc])

    const handleUpload = (event) => {
        const file = event.target.files[0]

        if (!file.type.startsWith('image/')) {
            idref.current.value = null
            return ErrorAlert('File error, invalid image format.')
        }
        setId(file)
    }

    const Create_Update_KYC = async () => {

        if (!form.first_name) return ErrorAlert('Enter your first name')
        if (!form.last_name) return ErrorAlert('Enter your last name')
        if (gender === 'select') return ErrorAlert('Select a gender')
        if (marital === 'select') return ErrorAlert('Select marital status')
        if (!form.date_of_birth) return ErrorAlert('Enter date of birth')
        if (usercountry.name === 'select') return ErrorAlert('Select country')
        if (!form.address) return ErrorAlert('Enter your address and city')
        if (!form.state) return ErrorAlert('Enter your state of residence')
        if (!form.postal) return ErrorAlert('Enter postal / zipcode')
        if (!form.phone_number) return ErrorAlert('Enter your mobile number')
        if (!form.id_number) return ErrorAlert('Enter an identification number')
        if (id === null) return ErrorAlert('Provide a valid ID')

        if (kyc.status === 'verified') return ErrorAlert('KYC is verified')

        if (form.first_name === kyc.first_name && form.last_name === kyc.last_name && form.address === kyc.address && form.state === kyc.state && form.postal === kyc.postal && form.date_of_birth === kyc.date_of_birth && form.phone_number === kyc.phone_number && form.id_number === kyc.id_number && phoneCode === kyc.phone_code && gender === kyc.gender && marital === kyc.marital_status && usercountry.name === kyc.country && id.name === kyc.valid_id) return ErrorAlert('No changes made')

        const formbody = new FormData()
        formbody.append('valid_id', id)
        formbody.append('first_name', form.first_name)
        formbody.append('last_name', form.last_name)
        formbody.append('date_of_birth', form.date_of_birth)
        formbody.append('state', form.state)
        formbody.append('postal', form.postal)
        formbody.append('address', form.address)
        formbody.append('id_number', form.id_number)
        formbody.append('phone_code', phoneCode)
        formbody.append('phone_number', form.phone_number)
        formbody.append('gender', gender)
        formbody.append('marital_status', marital)
        formbody.append('country', usercountry.name)
        formbody.append('country_flag', usercountry.flag)

        setLoading(true)
        try {
            const response = await PostApi(Apis.kyc.create_update_kyc, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                FetchKyc()
                setUser(response.profile)
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
        <VerifyLayout>
            <div className='relative'>
                {loading && <Loading className="!bg-[#0c091aa4]" />}
                <div className='flex flex-col gap-14 pt-16'>
                    <div className='flex flex-col gap-2 items-center text-semi-white'>
                        <div className='flex gap-2 items-center md:text-4xl text-2xl capitalize font-bold'>
                            <span>verify kyc</span>
                            <MdVerified className='text-[#b19e34]' />
                        </div>
                        <div className='italic text-sm flex items-center gap-2'>
                            <span>Status:</span>
                            {Object.values(kyc).length !== 0 ?
                                <span className={`${kyc.status === 'failed' ? 'text-[#c42e2e]' : 'text-light'}`}>{kyc?.status}</span>
                                :
                                <span className='text-[#c42e2e]'>unverified</span>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 text-black md:w-3/4 w-[95%] mx-auto bg-semi-white py-6 md:px-8 px-5 rounded-md relative'>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>first name:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.first_name} name='first_name' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>last name:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.last_name} name='last_name' onChange={formHandler}></input>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>gender:</div>
                                <StatusSelector Statuses={Genders} status={gender} HandleFunction={(item) => setGender(item)} select={select} toggle={() => setSelect(!select)} className="!shadow-shanft !w-full" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>marital status:</div>
                                <StatusSelector Statuses={MaritalStatus} status={marital} HandleFunction={(item) => setMarital(item)} select={select2} toggle={() => setSelect2(!select2)} className="!shadow-shanft !w-full" />
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>date of birth:</div>
                                <input type='date' value={form.date_of_birth} name='date_of_birth' className='w-full h-fit text-black py-1 px-2 rounded-[3px] shantf outline-none text-[0.8rem] font-semibold bg-white text-left' placeholder={`${!form.date_of_birth ? 'select' : ''}`} onChange={formHandler} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='text-sm capitalize font-semibold'>country:</div>
                                <CountrySelector usercountry={usercountry} setUserCountry={setUserCountry} className='!shadow-shanft' />
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>address & city:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.address} name='address' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>state / province:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.state} name='state' onChange={formHandler}></input>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>postal / zipcode:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.postal} name='postal' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>phone number:</div>
                                <div className='flex gap-2 items-center'>
                                    <div>
                                        <PhoneSelector phoneCode={phoneCode} setPhoneCode={setPhoneCode} className='!shadow-shanft' />
                                    </div>
                                    <div>
                                        <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.phone_number} name='phone_number' onChange={formHandler}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>identification number:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.id_number} name='id_number' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>valid identity document:</div>
                                <div className='w-full rounded-sm h-fit flex items-center gap-4 relative p-1 border border-light'>
                                    <label className='cursor-pointer'>
                                        <div className='bg-white h-fit w-fit px-2 py-1 text-sm rounded-sm font-medium shantf'>
                                            <div className='bg-semi-white rounded-full p-2'><FiUploadCloud /></div>
                                        </div>
                                        <input ref={idref} type="file" onChange={handleUpload} hidden />
                                    </label>
                                    <div className='text-sm text-center'>{id === null ? 'No file choosen' : id.name}</div>
                                </div>
                            </div>
                        </div>
                        <button className='outline-none bg-[#252525] py-2 px-8 h-fit w-fit rounded-md capitalize md:text-sm text-xs text-white cursor-pointer font-[600] mt-6 mx-auto' onClick={Create_Update_KYC}>upload details</button>
                    </div>
                </div>
            </div>
        </VerifyLayout>
    )
}

export default VerifyKYC