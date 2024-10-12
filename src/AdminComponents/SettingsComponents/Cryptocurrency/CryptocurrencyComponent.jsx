import React, { useRef, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import nothnyet from '../../../assets/images/nothn.png'
import UpdateCrypto from './UpdateCrypto'
import ModalLayout from '../../../utils/ModalLayout'
import { imageurl } from '../../../services/API'

const CryptocurrencyComponent = ({ closeView, cryptocurrency, refetchCryptocurrency, refetchAdminWallets }) => {
    const [singleCrypto, setSingleCrypto] = useState({})
    const [screen, setScreen] = useState(1)
    const toggler = useRef()
    

    return (
        <ModalLayout toggler={toggler} closeView={closeView}>
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-[50vh] bg-white rounded-lg overflow-x-hidden relative overflow-y-auto scroll' ref={toggler}>
                <div className='relative'>
                    <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                    <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
                        <div className='text-xl uppercase text-center font-bold border-b'>add crypto</div>
                        {screen === 1 && <>
                            <div className='flex justify-center items-center mt-4 mb-2 ml-auto'>
                                <button className='w-fit h-fit py-2 px-5 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => {setScreen(2); setSingleCrypto({})}}>add new</button>
                            </div>
                            <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
                                <table className='w-full '>
                                    <thead >
                                        <tr className='bg-black text-[0.8rem] font-bold text-white'>
                                            <td className='text-center truncate  capitalize p-2 '>image</td>
                                            <td className='text-center truncate  capitalize p-2 '>crypto</td>
                                            <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
                                        </tr>
                                    </thead>
                                    {cryptocurrency.length > 0 &&
                                        <tbody>
                                            {cryptocurrency.map((item, i) => (
                                                <tr className='text-[0.8rem]  text-black font-[550] bg-white' key={i}>
                                                    <td className='p-4  text-center truncate'><img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='w-4 h-auto mx-auto'></img></td>
                                                    <td className='p-4  text-center truncate capitalize'>{item.crypto_name}</td>
                                                    <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => {setSingleCrypto(item); setScreen(2)}}> <button className='w-fit h-fit py-1 px-1.5 text-xs capitalize border border-[#462c7c] rounded-md text-black font-medium'>edit</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    }
                                    {cryptocurrency.length < 1 &&
                                        <tbody>
                                            <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                                                <td colSpan="3" className='py-2 italic text-center truncate'>
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <span>no cryptocurrency found...</span>
                                                        <img src={nothnyet} className='h-4 w-auto'></img>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </>}
                        {screen === 2 &&
                           <UpdateCrypto setScreen={setScreen} refetchCryptocurrency={refetchCryptocurrency} singleCrypto={singleCrypto} refetchAdminWallets={refetchAdminWallets}/>
                        }
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default CryptocurrencyComponent