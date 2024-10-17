import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../assets/images/nothn.png'
import AdminDashboard from './AdminDashboard';
import { Apis, UserGetApi } from '../../../services/API';
import UpdateDepositModal from '../../../AdminComponents/DepositComponents/UpdateDepositModal';
import SetDepositMinimum from '../../../AdminComponents/DepositComponents/SetDepositMinimumModal';


const UpdateDeposits = () => {
  const [original, setOriginal] = useState([])
  const [allDeposits, setAllDeposits] = useState([])
  const [singleDeposit, setSingleDeposit] = useState({})
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)
  const [dataLoading, setDataLoading] = useState(true)


  const FetchAllDeposits = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_deposits)
      if (response.status === 200) {
        setAllDeposits(response.msg)
        setOriginal(response.msg)
        setpageend(response.msg.length / 6)
        setStart(0)
        setEnd(6)
        setpagestart(1)
        setSearch('')
      }

    } catch (error) {
      //
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    FetchAllDeposits()
  }, [FetchAllDeposits])

  const SingleDepositFunction = (item) => {
    setSingleDeposit(item)
    setModal(true)
  }

  const HandleSearch = () => {
    const altDeposits = original
    if (!search) {
      setAllDeposits(original)
      setpageend(original.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
    else {
      const showSearch = altDeposits.filter(item => item.depositUser.username.includes(search.toLowerCase()) || item.depositUser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search) || item.amount.toString().includes(search) || item.crypto.toLowerCase().includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
      setAllDeposits(showSearch)
      setpageend(showSearch.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllDeposits(original)
    setpageend(original.length / 6)
    setpagestart(1)
    setStart(0)
    setEnd(6)
  }

  let MovePage = () => {

    if (end < allDeposits.length) {
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
    <AdminDashboard>
      <div>
        {modal && <UpdateDepositModal closeView={() => setModal(false)} singleDeposit={singleDeposit} refetchAllDeposits={FetchAllDeposits} />}
        {modal2 && <SetDepositMinimum closeView={() => setModal2(false)} />}

        <div className='uppercase font-bold md:text-2xl text-lg text-black'>all deposits</div>
        <div className='mt-10'>
          <div className='relative w-fit mx-auto'>
            <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black ipa' value={search} type='text' onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
            <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-admin-page shantf2'>
              <IoIosSearch />
              {search !== '' &&
                <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-zinc-400 rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                  <FiX />
                </div>
              }
            </div>
          </div>
          <button className='w-fit h-fit mt-6 mb-2 py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center ml-auto' onClick={() => setModal2(true)}>
            <span>set deposit minimum</span>
            <IoIosSettings className='text-base' />
          </button>
          {dataLoading ?
            <div className='w-full h-fit'>
              <div className='h-11 bg-gray-200 animate-pulse rounded-t-lg'></div>
              <div className='h-24 bg-gray-100 animate-pulse rounded-b-lg'></div>
            </div>
            :
            <div>
              {allDeposits.length > 0 ?
                <div className='flex flex-col gap-4'>
                  {allDeposits.slice(start, end).map((item, i) => (
                    <div key={i} className='w-full h-fit relative sha rounded-lg text-black font-medium'>
                      <div className='p-4 bg-semi-white text-sm rounded-t-lg flex justify-between gap-4'>
                        <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                        <div>
                          <div className='hover:text-[#9f7ae7] cursor-pointer ' onClick={() => SingleDepositFunction(item)}><BsThreeDotsVertical /></div>
                        </div>
                      </div>
                      <div className='bg-white grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                        <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                          <div className='flex justify-between gap-4'>
                            <span>username:</span>
                            <span>{item.depositUser.username}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>email:</span>
                            <span className='lowercase'>{item.depositUser.email}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>amount:</span>
                            <span>${item.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-100 overflow-hidden'>
                          <div className='flex justify-between gap-4'>
                            <span>crypto:</span>
                            <span>{item.crypto}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>network:</span>
                            <span>{item.network}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>status:</span>
                            <span className={`${item.status === 'confirmed' && 'text-[green]'} ${item.status === 'failed' && 'text-[red]'}`}>{item.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <div className='px-2 py-1 bg-white sha rounded-lg'>
                  <div className='flex justify-center gap-1 items-center text-sm text-black italic bg-semi-white py-1'>
                    <div>no records found...</div>
                    <img src={nothnyet} className='h-4 w-auto'></img>
                  </div>
                </div>
              }
            </div>
          }
          {allDeposits.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-admin-page '>
            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
            {end < allDeposits.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
          </div>}
        </div>

      </div>
    </AdminDashboard>
  )
}

export default UpdateDeposits