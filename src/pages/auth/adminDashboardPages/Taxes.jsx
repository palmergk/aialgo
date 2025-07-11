import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSearch } from 'react-icons/io';
import { FiX } from 'react-icons/fi'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import AdminDashboard from './AdminDashboard';
import { Apis, UserGetApi } from '../../../services/API';
import SetTaxPercentage from '../../../AdminComponents/TaxComponents/SetTaxPercentage';
import TaxModal from '../../../AdminComponents/TaxComponents/TaxModal';
import { SlSocialDropbox } from 'react-icons/sl';
import { RiSettings5Fill } from 'react-icons/ri';


const Taxes = () => {
  const [original, setOriginal] = useState([])
  const [allTaxes, setAllTaxes] = useState([])
  const [singleTax, setSingleTax] = useState({})
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [search, setSearch] = useState('')
  const [dataLoading, setDataLoading] = useState(true)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6
  const totalPages = Math.ceil(allTaxes.length / perPage)
  const startIndex = (currentPage - 1) * perPage
  const currentAllTaxes = allTaxes.slice(startIndex, startIndex + perPage)


  const FetchAllTaxes = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_taxes)
      if (response.status === 200) {
        setAllTaxes(response.msg)
        setOriginal(response.msg)
      }

    } catch (error) {
      //
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    FetchAllTaxes()
  }, [FetchAllTaxes])

  const HandleSearch = () => {
    const altTaxes = original
    if (!search) {
      setAllTaxes(original)
    }
    else {
      setCurrentPage(1)
      const showSearch = altTaxes.filter(item => item.taxPayer.username.includes(search.toLowerCase()) || item.taxPayer.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search) || item.amount.toString().includes(search) || item.crypto.toLowerCase().includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()) || item.gen_id.includes(search))
      setAllTaxes(showSearch)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setCurrentPage(1)
    setAllTaxes(original)
  }

  const ChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }


  return (
    <AdminDashboard>
      <div>
        {modal && <TaxModal closeView={() => setModal(false)} singleTax={singleTax} refetchAllTaxes={FetchAllTaxes} />}
        {modal2 && <SetTaxPercentage closeView={() => setModal2(false)} />}

        <div className='uppercase font-bold md:text-2xl text-lg'>taxes</div>
        <div className='mt-10'>
          <div className='relative w-fit mx-auto'>
            <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black' value={search} type='text' onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
            <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-admin-page shantf2'>
              <IoIosSearch />
              {search !== '' &&
                <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-zinc-400 rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                  <FiX />
                </div>
              }
            </div>
          </div>
          <button className='w-fit h-fit mt-6 mb-4 py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center ml-auto' onClick={() => setModal2(true)}>
            <span>set tax percentage</span>
            <RiSettings5Fill />
          </button>
          {dataLoading ?
            <div className='w-full h-fit'>
              <div className='h-11 bg-gray-200 animate-pulse rounded-t-lg'></div>
              <div className='h-24 bg-gray-100 animate-pulse rounded-b-lg'></div>
            </div>
            :
            <>
              {allTaxes.length > 0 ?
                <>
                  <div className='flex flex-col gap-4'>
                    {currentAllTaxes.map((item, i) => (
                      <div key={i} className='w-full h-fit relative sha rounded-lg text-black font-medium'>
                        <div className='p-4 bg-semi-white text-sm rounded-t-lg flex justify-between gap-4'>
                          <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mma')}</div>
                          <div className='flex gap-4 items-center'>
                            <div>ID: {item.gen_id}</div>
                            <div className='hover:text-[#9f7ae7] cursor-pointer bg-white py-0.5 rounded-[3px]' onClick={() => { setSingleTax(item); setModal(true) }}><BsThreeDotsVertical /></div>
                          </div>
                        </div>
                        <div className='bg-white grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                          <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                            <div className='flex justify-between gap-4'>
                              <span>username:</span>
                              <span>{item.taxPayer.username}</span>
                            </div>
                            <div className='flex justify-between gap-4'>
                              <span>email:</span>
                              <span className='lowercase'>{item.taxPayer.email}</span>
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
                  <div className='flex gap-2 items-center text-xs mt-4 justify-end text-admin-page '>
                    {currentPage > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={() => ChangePage(currentPage - 1)}><FaAngleLeft /></div>}
                    {totalPages > 1 && <div className='font-bold text-[grey]'>{currentPage} of {totalPages}</div>}
                    {currentPage < totalPages && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={() => ChangePage(currentPage + 1)}><FaAngleRight /></div>}
                  </div>
                </>
                :
                <div className='flex flex-col gap-2 justify-center items-center mt-12'>
                  <SlSocialDropbox className='text-4xl' />
                  <div>no records found...</div>
                </div>
              }
            </>
          }
        </div>

      </div>
    </AdminDashboard>
  )
}

export default Taxes