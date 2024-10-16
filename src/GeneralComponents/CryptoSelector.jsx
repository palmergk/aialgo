import React, { useState } from 'react'
import { SiBitcoincash } from 'react-icons/si'
import nothnyet from '../assets/images/nothn.png'
import { imageurl } from '../services/API'
import { FaAngleLeft } from 'react-icons/fa6'
import { useAtom } from 'jotai'
import { ADMINCRYPTOWALLETS } from '../store'

const CryptoSelector = ({ setCryptoWallets, error, className }) => {
    const [adminCryptoWallets] = useAtom(ADMINCRYPTOWALLETS)
    const [objArray, setObjArray] = useState({})
    const [select, setSelect] = useState(false)
    const [mode, setMode] = useState(1)


    return (
        <div className={`h-fit w-fit rounded-[0.2rem] bg-semi-white p-1 relative ${className?.bg}`}>
            <div className={`w-52 py-1 bg-white flex gap-1.5 justify-center items-center capitalize text-sm font-semibold rounded-[0.2rem] text-black cursor-pointer  ${error === 'select' && 'outline outline-1 outline-[red]'} shadow-shanft`} onClick={() => setSelect(!select)}>
                <div className='text-[0.8rem]'>choose cryptocurrency</div>
                <SiBitcoincash className={`text-[#5BB4FD] ${className?.text}`} />
            </div>
            {select &&
                <div className={`absolute top-9 left-0 overflow-x-hidden ${adminCryptoWallets.length > 3 ? 'h-[5.6rem] overflow-y-auto scroll' : 'h-fit'} w-full bg-white border border-[#a3a3a3] rounded-md z-10 text-[0.85rem] font-bold capitalize`}>
                    {adminCryptoWallets.length > 1 ?
                        <>
                            {mode === 1 ?
                                <>
                                    {adminCryptoWallets.length > 0 &&
                                        <>
                                            {adminCryptoWallets.map((item, i) => (
                                                <div className='flex gap-2 items-center px-2 py-0.5 hover:bg-[#ececec] border-b border-[#ebeaea] cursor-pointer' key={i} onClick={() => { setObjArray(item); setMode(2) }}>
                                                    <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                                    <div>{item.crypto_name}</div>
                                                </div>
                                            ))}
                                        </>
                                    }
                                </>
                                :
                                <div className='relative'>
                                    <div className={`cursor-pointer absolute top-2 left-0 text-[#5BB4FD] ${className?.text}`} onClick={() => setMode(1)}><FaAngleLeft /></div>
                                    <div className='py-1 border-b flex justify-center'>
                                        <div className={`font-medium italic text-xs capitalize text-[#5BB4FD] border border-[lightgrey] border-dashed py-0.5 px-1 ${className?.text}`}>choose network</div>
                                    </div>
                                    {objArray.cryptoWallet.length > 0 &&
                                        <>
                                            {objArray.cryptoWallet.map((item, i) => (
                                                <div className='px-2 py-0.5 hover:bg-[#ececec] border-b border-[#ebeaea] cursor-pointer' key={i} onClick={() => { setSelect(false); setCryptoWallets(item); setMode(1) }}>
                                                    <div>{item.network}</div>
                                                </div>
                                            ))}
                                        </>
                                    }
                                </div>
                            }
                        </>
                        :
                        <div className='px-2 py-1 flex items-center justify-center lowercase'>
                            <div>no crypto yet...</div>
                            <img src={nothnyet} className='h-3 w-auto'></img>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default CryptoSelector