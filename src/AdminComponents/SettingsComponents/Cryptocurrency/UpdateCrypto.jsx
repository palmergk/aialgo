import React, { useRef, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { FiUploadCloud } from 'react-icons/fi'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWarningCircleBold } from 'react-icons/pi'
import { Apis, imageurl, PostApi, UserPutApi } from '../../../services/API'
import { ErrorAlert, SuccessAlert } from '../../../utils/utils'
import Loading from '../../../GeneralComponents/Loading'

const UpdateCrypto = ({ setScreen, singleCrypto, refetchCryptocurrency, refetchAdminWallets }) => {
    const [deleteState, setdeleteState] = useState(false)
    const [commit, setCommit] = useState(false)
    const [loading, setLoading] = useState(false)
    const cryptoImgref = useRef()
    const [cryptoImg, setCryptoImg] = useState({
        img: singleCrypto.id ? `${imageurl}/cryptocurrency/${singleCrypto?.crypto_img}` : null,
        image: singleCrypto.id ? singleCrypto?.crypto_img : null
    })
    const [form, setForm] = useState({
        crypto_name: singleCrypto.id ? singleCrypto?.crypto_name : '',
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleUpload = (event) => {
        const file = event.target.files[0]
        if (file.size >= 1000000) {
            cryptoImgref.current.value = null
            return ErrorAlert('File size too large')
        }

        if (!file.type.startsWith('image/')) {
            cryptoImgref.current.value = null
            return ErrorAlert('File error, invalid image format')
        }

        setCryptoImg({
            img: URL.createObjectURL(file),
            image: file
        })
        setCommit(true)
    }

    const CommitHandler = () => {
        if (form.crypto_name === singleCrypto.crypto_name && cryptoImg.image === singleCrypto.crypto_img) {
            setCommit(false)
        } else {
            setCommit(true)
        }
    }

    const CreateCryptocurrency = async () => {
        if (!form.crypto_name) return ErrorAlert('Enter a crypto name')
        if (cryptoImg.img === null) return ErrorAlert('Upload crypto image')

        const formbody = new FormData()
        formbody.append('crypto_img', cryptoImg.image)
        formbody.append('crypto_name', form.crypto_name)

        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.create_cryptocurrency, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchCryptocurrency()
                setScreen(1)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const UpdateCryptocurrency = async () => {
        if (!form.crypto_name) return ErrorAlert('Enter a crypto name')
        if (cryptoImg.img === null) return ErrorAlert('Upload crypto image')

        const formbody = new FormData()
        formbody.append('crypto_id', singleCrypto.id)
        formbody.append('crypto_img', cryptoImg.image)
        formbody.append('crypto_name', form.crypto_name)

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_cryptocurrency, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchCryptocurrency()
                refetchAdminWallets()
                setScreen(1)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)

        } finally {
            setLoading(false)
        }
    }

    const DeleteCryptocurrency = async () => {
        const formbody = {
            crypto_id: singleCrypto.id
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.delete_cryptocurrency, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                refetchCryptocurrency()
                refetchAdminWallets()
                setScreen(1)
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
        <div>
            {loading && <Loading />}
            <div className='flex flex-col gap-4 mt-4 relative'>
                <div className='cursor-pointer text-base text-[#462c7c] -ml-1' onClick={() => setScreen(1)}>
                    <FaArrowLeft />
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <div className='italic'>crypto name:</div>
                    <input className='outline-none border border-[#9f7ae7] w-48 py-1 px-2 lg:text-sm text-base' value={form.crypto_name} name='crypto_name' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <div className='italic'>crypto image:</div>
                    <label className='cursor-pointer'>
                        {cryptoImg.img ?
                            <div className='flex items-center gap-1'>
                                <img src={cryptoImg.img} className='h-10 w-auto'></img>
                                <div className='text-sm bg-white rounded-lg p-1 sha'>
                                    <MdOutlineEdit />
                                </div>
                            </div>
                            :
                            <div className='border rounded-lg flex flex-col gap-2 items-center justify-center p-2'>
                                <div className='bg-gray-300 rounded-full p-2'><FiUploadCloud /></div>
                                <span className='text-xs'>click to add image</span>
                            </div>
                        }
                        <input ref={cryptoImgref} type="file" onChange={handleUpload} hidden />
                    </label>
                </div>
            </div>
            {!singleCrypto.id ?
                <div className='flex justify-center items-center mt-8'>
                    <button className='w-fit h-fit py-2 px-8 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={CreateCryptocurrency}>create</button>
                </div>
                :
                <div className='flex gap-4 items-center mt-8 relative'>
                    {commit && <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateCryptocurrency}>update</button>}
                    <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ml-auto' onClick={() => setdeleteState(true)}>delete</button>
                    {deleteState && <div className='bg-white adsha w-fit h-fit flex flex-col gap-4 items-center justify-center absolute bottom-0 right-0 p-3 rounded-md text-xs'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='md:text-sm text-[0.8rem] text-center font-semibold flex items-center gap-1'>
                                <span> Are you sure you want to Delete Crypto?</span>
                                <PiWarningCircleBold className='text-[red]' />
                            </div>
                            <div className='text-xs text-center italic text-[#eb2e2e]'>- Deleting this crypto will also delete all wallet addresses under it -</div>
                        </div>
                        <div className='flex items-center gap-6'>
                            <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 text-white rounded-md font-medium' onClick={() => setdeleteState(false)}>cancel</button>
                            <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 text-white rounded-md font-medium' onClick={DeleteCryptocurrency}>proceed</button>
                        </div>
                    </div>}
                </div>
            }

        </div>
    )
}

export default UpdateCrypto