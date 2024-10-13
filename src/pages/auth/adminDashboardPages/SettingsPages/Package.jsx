import React, { useCallback, useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../../assets/images/nothn.png'
import moment from 'moment';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Apis, UserGetApi } from '../../../../services/API';
import UpdatePackageModal from '../../../../AdminComponents/SettingsComponents/PackagesComponents/UpdatePackageModal';
import CreatePackageModal from '../../../../AdminComponents/SettingsComponents/PackagesComponents/CreatePackageModal';
import SettingsLayout from '../../../../AdminComponents/SettingsComponents/SettingsLayout';


const Package = () => {
  const [tradingPlans, setTradingPlans] = useState([])
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [singlePlan, setSinglePlan] = useState({})
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)
  const [dataLoading, setDataLoading] = useState(true)

  const FetchTradingPlans = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.get_trading_plans)
      if (response.status === 200) {
        setTradingPlans(response.msg)
        setpageend(response.msg.length / 6)
        setStart(0)
        setEnd(6)
        setpagestart(1)
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

  const SinglePlanFunction = (item) => {
    setSinglePlan(item)
    setModal(true)
  }

  let MovePage = () => {

    if (end < tradingPlans.length) {
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
        {modal && <UpdatePackageModal closeView={() => setModal(false)} singlePlan={singlePlan} refetchTradingPlans={FetchTradingPlans} />}
        {modal2 && <CreatePackageModal closeView={() => setModal2(false)} refetchTradingPlans={FetchTradingPlans} />}

        <button className='w-fit h-fit py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center ml-auto mb-2' onClick={() => setModal2(true)}>
          <span>create new plan</span>
          <IoIosAddCircleOutline className='text-base' />
        </button>
        {/* <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
          <table className='w-full'>
            <thead >
              <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                <td className='text-center truncate  capitalize p-2 '>title</td>
                <td className='text-center truncate  capitalize p-2 '>price start</td>
                <td className='text-center truncate  capitalize p-2 '>price limit</td>
                <td className='text-center truncate  capitalize p-2 '>profit return</td>
                <td className='text-center truncate  capitalize p-2 '>plan bonus</td>
                <td className='text-center truncate  capitalize p-2 '>duration</td>
                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
              </tr>
            </thead>
            {dataLoading ?
              <tbody>
                <tr className='bg-gray-300 animate-pulse h-10'>
                  <td colSpan="7"></td>
                </tr>
              </tbody>
              :
              <>
                {tradingPlans.length > 0 ?
                  <tbody>
                    {tradingPlans.slice(start, end).map((item, i) => (
                      <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                        <td className='p-4  text-center truncate capitalize'>{item.title}</td>
                        <td className={`p-4  text-center truncate`}>${item.price_start.toLocaleString()}</td>
                        <td className='p-4  text-center truncate capitalize'>${item.price_limit.toLocaleString()}</td>
                        <td className='p-4  text-center truncate capitalize'>{item.profit_return}%</td>
                        <td className='p-4  text-center truncate capitalize'>${item.plan_bonus.toLocaleString()}</td>
                        <td className='p-4  text-center truncate capitalize'>{item.duration + item.duration_type}</td>
                        <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => SinglePlanFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
                      </tr>
                    ))}
                  </tbody>
                  :
                  <tbody>
                    <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                      <td colSpan="7" className='py-2 italic text-center truncate'>
                        <div className='flex gap-1 items-center justify-center'>
                          <span>no trading plans found...</span>
                          <img src={nothnyet} className='h-4 w-auto'></img>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                }
              </>
            }
          </table>
        </div> */}
        {dataLoading ?
          <div className='w-full h-fit'>
            <div className='h-11 bg-gray-300 animate-pulse rounded-t-lg'></div>
            <div className='h-24 bg-gray-200 animate-pulse rounded-b-lg'></div>
          </div>
          :
          <div>
            {tradingPlans.length > 0 ?
              <div className='flex flex-col gap-4'>
                {tradingPlans.slice(start, end).map((item, i) => (
                  <div key={i} className='w-full h-fit relative sha rounded-lg text-black font-medium'>
                    <div className='p-4 bg-zinc-500 text-sm rounded-t-lg text-white flex justify-between gap-4'>
                      <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                      <div>
                        <div className='hover:text-black cursor-pointer ' onClick={() => SinglePlanFunction(item)}><BsThreeDotsVertical /></div>
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
                      <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-200 overflow-hidden'>
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
              :
              <div className='p-3 bg-white sha rounded-lg flex justify-center gap-1 items-center text-sm text-black italic'>
                <div>no trading plans found...</div>
                <img src={nothnyet} className='h-4 w-auto'></img>
              </div>
            }
          </div>
        }
        {tradingPlans.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
          {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
          {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
          {end < tradingPlans.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
        </div>}
      </div>
    </SettingsLayout>
  )
}

export default Package