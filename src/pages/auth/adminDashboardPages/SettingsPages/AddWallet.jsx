import React, { useCallback, useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../../assets/images/nothn.png'
import moment from 'moment';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
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

        <div className='flex justify-between items-center gap-4 mb-2'>
          <button className='w-fit h-fit py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal3(true)}>
            <span>add crypto</span>
            <IoIosAddCircleOutline className='text-base' />
          </button>
          <button className='w-fit h-fit py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal2(true)}>
            <span>create new wallet</span>
            <IoIosAddCircleOutline className='text-base' />
          </button>
        </div>
        {dataLoading ?
          <div className='w-full h-fit'>
            <div className='h-11 bg-gray-200 animate-pulse rounded-t-lg'></div>
            <div className='h-24 bg-gray-100 animate-pulse rounded-b-lg'></div>
          </div>
          :
          <div>
            {adminWallets.length > 0 ?
              <div className='flex flex-col gap-4'>
                {adminWallets.slice(start, end).map((item, i) => (
                  <div key={i} className='w-full h-fit relative sha rounded-lg text-black font-medium'>
                    <div className='p-4 bg-semi-white text-sm rounded-t-lg flex justify-between gap-4'>
                      <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                      <div>
                        <div className='hover:text-[#9f7ae7] cursor-pointer ' onClick={() => SingleWalletFunction(item)}><BsThreeDotsVertical /></div>
                      </div>
                    </div>
                    <div className='bg-white grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                      <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                        <div className='flex justify-between gap-4'>
                          <span>crypto:</span>
                          <span>{item.crypto_name}</span>
                        </div>
                        <div className='flex justify-between gap-4'>
                          <span>network:</span>
                          <span>{item.network}</span>
                        </div>
                        <div className='flex justify-between gap-4'>
                          <span>address:</span>
                          <span>{item.address?.slice(0, 7)}.....{item.address?.slice(-8)}</span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-100 overflow-hidden'>
                        <div className='flex justify-between gap-4'>
                          <span>qr code:</span>
                          <QRCode value={item.address} className='w-4 h-auto' />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              :
              <div className='p-3 bg-white sha rounded-lg flex justify-center gap-1 items-center text-sm text-black italic'>
                <div>no wallets found...</div>
                <img src={nothnyet} className='h-4 w-auto'></img>
              </div>
            }
          </div>
        }
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