import React, { useCallback, useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import moment from 'moment';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Apis, UserGetApi } from '../../../../services/API';
import UpdatePackageModal from '../../../../AdminComponents/SettingsComponents/PackagesComponents/UpdatePackageModal';
import CreatePackageModal from '../../../../AdminComponents/SettingsComponents/PackagesComponents/CreatePackageModal';
import SettingsLayout from '../../../../AdminComponents/SettingsComponents/SettingsLayout';
import { SlSocialDropbox } from 'react-icons/sl';
import { IoAddCircleSharp } from 'react-icons/io5';


const Package = () => {
  const [tradingPlans, setTradingPlans] = useState([])
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [singlePlan, setSinglePlan] = useState({})
  const [dataLoading, setDataLoading] = useState(true)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6
  const totalPages = Math.ceil(tradingPlans.length / perPage)
  const startIndex = (currentPage - 1) * perPage
  const currentTradingPlans = tradingPlans.slice(startIndex, startIndex + perPage)

  const FetchTradingPlans = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.get_trading_plans)
      if (response.status === 200) {
        setTradingPlans(response.msg)
      }

    } catch (error) {
      //
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    FetchTradingPlans()
  }, [FetchTradingPlans])

  const ChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }


  return (
    <SettingsLayout>
      <div className='mt-10'>
        {modal && <UpdatePackageModal closeView={() => setModal(false)} singlePlan={singlePlan} refetchTradingPlans={FetchTradingPlans} />}
        {modal2 && <CreatePackageModal closeView={() => setModal2(false)} refetchTradingPlans={FetchTradingPlans} />}

        <button className='w-fit h-fit py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center ml-auto mb-4' onClick={() => setModal2(true)}>
          <span>create new plan</span>
          <IoAddCircleSharp />
        </button>
        {dataLoading ?
          <div className='w-full h-fit'>
            <div className='h-11 bg-gray-200 animate-pulse rounded-t-lg'></div>
            <div className='h-24 bg-gray-100 animate-pulse rounded-b-lg'></div>
          </div>
          :
          <div>
            {tradingPlans.length > 0 ?
              <>
                <div className='flex flex-col gap-4'>
                  {currentTradingPlans.map((item, i) => (
                    <div key={i} className='w-full h-fit relative sha rounded-lg text-black font-medium'>
                      <div className='p-4 bg-semi-white text-sm rounded-t-lg flex justify-between gap-4'>
                        <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                        <div>
                          <div className='hover:text-[#9f7ae7] cursor-pointer bg-white py-0.5 rounded-[3px]' onClick={() => { setSinglePlan(item); setModal(true) }}><BsThreeDotsVertical /></div>
                        </div>
                      </div>
                      <div className='bg-white grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                        <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                          <div className='flex justify-between gap-4'>
                            <span>title:</span>
                            <span>{item.title}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>price start:</span>
                            <span>${item.price_start.toLocaleString()}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>price limit:</span>
                            <span>${item.price_limit.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-100 overflow-hidden'>
                          <div className='flex justify-between gap-4'>
                            <span>profit return:</span>
                            <span>{item.profit_return}%</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>plan bonus:</span>
                            <span>${item.plan_bonus.toLocaleString()}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>duration:</span>
                            <span>{item.duration + item.duration_type}</span>
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
              <div className='flex flex-col gap-2 justify-center items-center mt-8'>
                <SlSocialDropbox className='text-4xl' />
                <div>no records found...</div>
              </div>
            }
          </div>
        }
      </div>
    </SettingsLayout>
  )
}

export default Package