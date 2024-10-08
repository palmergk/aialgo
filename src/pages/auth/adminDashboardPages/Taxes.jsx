import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../assets/images/nothn.png'
import AdminDashboard from './AdminDashboard';
import { Apis, UserGetApi } from '../../../services/API';
import SetTaxPercentage from '../../../AdminComponents/TaxComponents/SetTaxPercentage';
import TaxModal from '../../../AdminComponents/TaxComponents/TaxModal';


const Taxes = () => {
  const [original, setOriginal] = useState([])
  const [allTaxes, setAllTaxes] = useState([])
  const [singleTax, setSingleTax] = useState({})
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)
  const [dataLoading, setDataLoading] = useState(true)


  const FetchAllTaxes = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_taxes)
      if (response.status === 200) {
        setAllTaxes(response.msg)
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
    FetchAllTaxes()
  }, [FetchAllTaxes])

  const singleTaxFunction = (item) => {
    setSingleTax(item)
    setModal(true)
  }

  const HandleSearch = () => {
    const altTaxes = original
    if (!search) {
      setAllTaxes(original)
      setpageend(original.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
    else {
      const showSearch = altTaxes.filter(item => item.taxPayer.username.includes(search.toLowerCase()) || item.taxPayer.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search) || item.amount.toString().includes(search) || item.crypto.toLowerCase().includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
      setAllTaxes(showSearch)
      setpageend(showSearch.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllTaxes(original)
    setpageend(original.length / 6)
    setpagestart(1)
    setStart(0)
    setEnd(6)
  }

  let MovePage = () => {

    if (end < allTaxes.length) {
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
        {modal && <TaxModal closeView={() => setModal(false)} singleTax={singleTax} refetchAllTaxes={FetchAllTaxes} />}
        {modal2 && <SetTaxPercentage closeView={() => setModal2(false)} />}

        <div className='uppercase font-bold md:text-2xl text-lg text-black'>taxes</div>
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
          <button className='w-fit h-fit mt-4 mb-2 py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal2(true)}>
            <span>set tax percentage</span>
            <IoIosSettings className='text-base' />
          </button>
          <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
            <table className='w-full '>
              <thead >
                <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                  <td className='text-center truncate  capitalize p-2 '>date</td>
                  <td className='text-center truncate  capitalize p-2 '>username</td>
                  <td className='text-center truncate  capitalize p-2 '>email</td>
                  <td className='text-center truncate  capitalize p-2 '>amount</td>
                  <td className='text-center truncate  capitalize p-2 '>crypto</td>
                  <td className='text-center truncate  capitalize p-2 '>status </td>
                  <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
                </tr>
              </thead>
              {dataLoading ?
                <tbody>
                  <tr className='bg-gray-300 animate-pulse h-10'>
                    <td colSpan="6"></td>
                  </tr>
                </tbody>
                :
                <>
                  {allTaxes.length > 0 ?
                    <tbody>
                      {allTaxes.slice(start, end).map((item, i) => (
                        <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                          <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                          <td className='p-4  text-center truncate'>{item.taxPayer.username}</td>
                          <td className='p-4  text-center truncate'>{item.taxPayer.email}</td>
                          <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                          <td className='p-4  text-center truncate'>{item.crypto}</td>
                          <td className={`p-4  text-center truncate ${item.status === 'received' && 'text-[#459e45]'} ${item.status === 'failed' && 'text-[red]'}`}>{item.status}</td>
                          <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => singleTaxFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
                        </tr>
                      ))}
                    </tbody>
                    :
                    <tbody>
                      <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                        <td colSpan="6" className='py-2 italic text-center truncate'>
                          <div className='flex gap-1 items-center justify-center'>
                            <span>no taxes found...</span>
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
          {allTaxes.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
            {end < allTaxes.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
          </div>}
        </div>

      </div>
    </AdminDashboard>
  )
}

export default Taxes