import React, { useCallback, useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../../assets/images/nothn.png'
import { IoIosSettings } from 'react-icons/io';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDots } from 'react-icons/bs';
import { Apis, UserGetApi } from '../../../../services/API';
import QRCode from "react-qr-code";
import CreateWalletModal from '../../../../AdminComponents/SettingsComponents/AdminWalletComponents/CreateWalletModal';
import CryptocurrencyComponent from '../../../../AdminComponents/SettingsComponents/Cryptocurrency/CryptocurrencyComponent';
import UpdateWalletModal from '../../../../AdminComponents/SettingsComponents/AdminWalletComponents/UpdateWalletModal';
import SettingsLayout from '../../../../AdminComponents/SettingsComponents/SettingsLayout';


const AddWallet = () => {
  const [cryptocurrency, setCryptocurrency] = useState([])
  const [adminWallets, setAdminWallets] = useState([])
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [singleWallet, setSingleWallet] = useState({})
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)
  const [dataLoading, setDataLoading] = useState(true)


  const FetchCryptocurrency = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.get_cryptocurrency)
      if (response.status === 200) {
        setCryptocurrency(response.msg)
      }

    } catch (error) {
      //
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    FetchCryptocurrency()
  }, [FetchCryptocurrency])

  const FetchAdminWallets = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.get_admin_wallets)
      if (response.status === 200) {
        setAdminWallets(response.msg)
        setpageend(response.msg.length / 6)
        setStart(0)
        setEnd(6)
        setpagestart(1)
      }

    } catch (error) {
      //
    }
  }, [])

  useEffect(() => {
    FetchAdminWallets()
  }, [FetchAdminWallets])

  const SingleWalletFunction = (item) => {
    setSingleWallet(item)
    setModal(true)
  }

  let MovePage = () => {

    if (end < adminWallets.length) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend += 6
      setEnd(altend)
      altstart += 6
      setStart(altstart)
      altlengthstart += 1
      setpagestart(altlengthstart)
    }
  }

  let BackPage = () => {

    if (end > 6) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend -= 6
      setEnd(altend)
      altstart -= 6
      setStart(altstart)
      altlengthstart -= 1
      setpagestart(altlengthstart)
    }
  }



  return (
    <SettingsLayout>
      <div className='mt-10'>
        {modal && <UpdateWalletModal closeView={() => setModal(false)} singleWallet={singleWallet} refetchAdminWallets={FetchAdminWallets} />}
        {modal2 && <CreateWalletModal closeView={() => setModal2(false)} refetchAdminWallets={FetchAdminWallets} cryptocurrency={cryptocurrency} />}
        {modal3 && <CryptocurrencyComponent closeView={() => setModal3(false)} cryptocurrency={cryptocurrency} refetchCryptocurrency={FetchCryptocurrency} refetchAdminWallets={FetchAdminWallets} />}

        <div className='flex justify-between mb-2'>
          <button className='w-fit h-fit py-2.5 px-4 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal3(true)}>
            <span>add crypto</span>
            <IoIosAddCircleOutline className='text-base' />
          </button>
          <button className='w-fit h-fit py-2.5 px-4 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal2(true)}>
            <span>create new wallet</span>
            <IoIosAddCircleOutline className='text-base' />
          </button>
        </div>
        <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
          <table className='w-full '>
            <thead >
              <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                <td className='text-center truncate  capitalize p-2 '>crypto</td>
                <td className='text-center truncate  capitalize p-2 '>network</td>
                <td className='text-center truncate  capitalize p-2 '>address</td>
                <td className='text-center truncate  capitalize p-2 '>qr code</td>
                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
              </tr>
            </thead>
            {dataLoading ?
              <tbody>
                <tr className='bg-gray-300 animate-pulse h-10'>
                  <td colSpan="5"></td>
                </tr>
              </tbody>
              :
              <>
                {adminWallets.length > 0 ?
                  <tbody>
                    {adminWallets.slice(start, end).map((item, i) => (
                      <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                        <td className='p-4  text-center truncate capitalize'>{item.crypto_name}</td>
                        <td className='p-4  text-center truncate capitalize'>{item.network}</td>
                        <td className={`p-4  text-center truncate`}>{item.address?.slice(0, 7)}.....{item.address?.slice(-8)}</td>
                        <td className='p-4 truncate'><QRCode value={item.address} className='w-4 h-auto mx-auto' /></td>
                        <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => SingleWalletFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
                      </tr>
                    ))}
                  </tbody>
                  :
                  <tbody>
                    <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                      <td colSpan="5" className='py-2 italic text-center truncate'>
                        <div className='flex gap-1 items-center justify-center'>
                          <span>no wallets found...</span>
                          <img src={nothnyet} className='h-4 w-auto'></img>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                }
              </>
            }
          </table>
        </div>
        {adminWallets.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
          {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
          {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
          {end < adminWallets.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
        </div>}
      </div>
    </SettingsLayout>
  )
}

export default AddWallet