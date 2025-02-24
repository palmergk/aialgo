import React, { useEffect, useState } from 'react'
import { SiBitcoincash } from 'react-icons/si'
import { Apis, imageurl, UserGetApi } from '../services/API'
import { FaAngleLeft } from 'react-icons/fa6'
import { SlSocialDropbox } from 'react-icons/sl'

const CryptoSelector = ({ setCryptoWallets, className }) => {
    const [adminCryptoWallets, setAdminCryptoWallets] = useState([])
    const [objArray, setObjArray] = useState({})
    const [select, setSelect] = useState(false)
    const [mode, setMode] = useState(1)
    const [dataLoading, setDataloading] = useState(true)

    useEffect(() => {
        const FetchAdminCrypto_Wallets = async () => {
            try {
                const response = await UserGetApi(Apis.user.get_crypto_and_their_wallets)
                if (response.status === 200) {
                    setAdminCryptoWallets(response.msg)
                }

            } catch (error) {
                //
            } finally {
                setDataloading(false)
            }
        }
        FetchAdminCrypto_Wallets()
    }, [])


    return (
        <div className={`h-fit w-fit rounded-[0.2rem] bg-semi-white p-1 relative ${className?.bg}`}>
            <div className='w-48 py-1 bg-white flex gap-1.5 justify-center items-center capitalize text-sm font-semibold rounded-[0.2rem] text-black cursor-pointer shantf' onClick={() => setSelect(!select)}>
                <div className='text-[0.8rem]'>choose cryptocurrency</div>
                <SiBitcoincash className={`text-[#5BB4FD] ${className?.text}`} />
            </div>
            {select &&
                <div className={`absolute top-9 left-0 overflow-x-hidden ${adminCryptoWallets.length > 3 ? 'h-[5.6rem] overflow-y-auto scroll' : 'h-fit'} w-full bg-white border border-[#a3a3a3] rounded-md z-10 text-[0.85rem] font-bold capitalize`}>
                    {dataLoading ?
                        <>
                            {new Array(3).fill(0).map((ele, i) => (
                                <div key={i} className='flex gap-2 items-center px-2 py-1 border-b border-[#ebeaea]'>
                                    <div className='bg-gray-300 animate-pulse w-4 h-4 rounded-full'></div>
                                    <div className='bg-gray-300 animate-pulse w-24 h-2 rounded-full'></div>
                                </div>
                            ))}
                        </>
                        :
                        <>
                            {adminCryptoWallets.length > 0 ?
                                <>
                                    {mode === 1 ?
                                        <>
                                            {adminCryptoWallets.map((item, i) => (
                                                <div className='flex gap-2 items-center px-2 py-0.5 hover:bg-[#ececec] border-b border-[#ebeaea] cursor-pointer' key={i} onClick={() => { setObjArray(item); setMode(2) }}>
                                                    <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                                    <div>{item.crypto_name}</div>
                                                </div>
                                            ))}
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
                                <div className='px-2 py-1 flex items-center justify-center gap-0.5 lowercase'>
                                    <div>no crypto found...</div>
                                    <SlSocialDropbox />
                                </div>
                            }
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default CryptoSelector