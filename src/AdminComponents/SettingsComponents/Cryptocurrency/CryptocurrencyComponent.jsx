import React, { useRef, useState } from 'react'
import { FaAngleLeft, FaXmark } from 'react-icons/fa6'
import UpdateCrypto from './UpdateCrypto'
import ModalLayout from '../../../utils/ModalLayout'
import { imageurl } from '../../../services/API'
import { SlSocialDropbox } from 'react-icons/sl'
import { RiSettings5Fill } from 'react-icons/ri'

const CryptocurrencyComponent = ({ closeView, cryptocurrency, dataLoading, refetchCryptocurrency, refetchAdminWallets }) => {
    const [singleCrypto, setSingleCrypto] = useState({})
    const [screen, setScreen] = useState(1)
    const toggler = useRef()


    return (
        <ModalLayout toggler={toggler} closeView={closeView}>
            <div className='max-w-md mx-auto h-[55vh] bg-white rounded-lg overflow-x-hidden relative py-5 overflow-y-auto scroll' ref={toggler}>
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                {screen === 2 && <div className='cursor-pointer absolute top-6 left-2 text-lg' onClick={() => setScreen(1)}><FaAngleLeft /></div>}
                <div className='text-xl uppercase text-center font-bold border-b'>add crypto</div>
                <div className='flex flex-col md:w-[90%] w-11/12 mx-auto mt-5 md:text-[0.9rem] text-[0.8rem]'>
                    {screen === 1 &&
                        <>
                            <div className='flex justify-center items-center mb-2 ml-auto'>
                                <button className='w-fit h-fit py-2 px-5 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => { setScreen(2); setSingleCrypto({}) }}>add new</button>
                            </div>
                            <div className='relative overflow-x-auto shadow-lg rounded-lg scrollsdown'>
                                <table className='w-full '>
                                    <thead>
                                        <tr className='bg-black text-[0.8rem] font-bold text-white'>
                                            <td className='text-center truncate  capitalize p-2 '>image</td>
                                            <td className='text-center truncate  capitalize p-2 '>crypto</td>
                                            <td className='text-center truncate  capitalize p-2'> <RiSettings5Fill className='mx-auto' /></td>
                                        </tr>
                                    </thead>
                                    {dataLoading ?
                                        <tbody>
                                            <tr>
                                                <td className='p-4 truncate'>
                                                    <div className='w-5 h-5 rounded-full bg-slate-300 animate-pulse mx-auto'></div>
                                                </td>
                                                <td className='p-4 truncate'>
                                                    <div className='w-24 h-2 rounded-full bg-slate-300 animate-pulse mx-auto'></div>
                                                </td>
                                                <td className='p-2 truncate'>
                                                    <div className='w-10 h-7 rounded-md bg-slate-300 animate-pulse mx-auto'></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        :
                                        <>
                                            {cryptocurrency.length > 0 ?
                                                <tbody>
                                                    {cryptocurrency.map((item, i) => (
                                                        <tr className='text-[0.8rem]  text-black font-[550] bg-white border-b border-dashed' key={i}>
                                                            <td className='p-4 truncate'><img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='w-5 h-auto mx-auto'></img></td>
                                                            <td className='p-4 text-center truncate capitalize'>{item.crypto_name}</td>
                                                            <td className='p-2 text-center truncate capitalize cursor-pointer text-black hover:text-[#895ee0]' onClick={() => { setSingleCrypto(item); setScreen(2) }}><button className='w-fit h-fit py-1 px-1.5 text-xs capitalize border border-[#462c7c] hover:bg-[#462c7c] hover:text-white rounded-md text-black font-medium'>edit</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                :
                                                <tbody>
                                                    <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                                                        <td colSpan="3" className='py-2 italic text-center truncate'>
                                                            <div className='flex gap-1 items-center justify-center'>
                                                                <span>no crypto found...</span>
                                                                <SlSocialDropbox />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            }</>
                                    }
                                </table>
                            </div>
                        </>
                    }
                    {screen === 2 &&
                        <UpdateCrypto setScreen={setScreen} refetchCryptocurrency={refetchCryptocurrency} singleCrypto={singleCrypto} refetchAdminWallets={refetchAdminWallets} />
                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default CryptocurrencyComponent