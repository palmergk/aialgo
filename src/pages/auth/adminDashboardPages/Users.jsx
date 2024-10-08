import React, { useCallback, useEffect, useState } from 'react'
import { IoIosAddCircleOutline, IoIosSearch, IoIosSettings } from 'react-icons/io'
import { FiX } from 'react-icons/fi'
import moment from 'moment';
import { Apis, UserGetApi } from '../../../services/API'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { TbUsers } from "react-icons/tb";
import nothnyet from '../../../assets/images/nothn.png'
import AdminDashboard from './AdminDashboard'
import UsersModal from '../../../AdminComponents/UsersComponents/UsersModal';
import CreateUsersModal from '../../../AdminComponents/UsersComponents/CreateUsersModal';
import SetReferralModal from '../../../AdminComponents/UsersComponents/SetReferralModal';
import UserTableBody from '../../../AdminComponents/UsersComponents/UserTableBody';




const Users = () => {
  const [orignal, setOriginal] = useState([])
  const [allusers, setAllUsers] = useState([])
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [singleUser, setSingleUser] = useState({})
  const [search, setSearch] = useState('')
  const [userFigures, setUserFigures] = useState({})
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)
  const [dataLoading, setDataLoading] = useState(true)
  

  const FetchAllUsers = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_users)
      if (response.status === 200) {
        setAllUsers(response.msg)
        setOriginal(response.msg)
        setpageend(response.msg.length / 6)
        setStart(0)
        setEnd(6)
        setpagestart(1)
        setSearch('')
      }

    } catch (error) {
      //
    }finally{
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    FetchAllUsers()
  }, [FetchAllUsers])

  const HandleSearch = () => {
    const altusers = orignal
    if (!search) {
      setAllUsers(orignal)
      setpageend(orignal.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
    else {
      const showSearch = altusers.filter(item => item.full_name.includes(search.toLowerCase()) || item.username.includes(search.toLowerCase()) || item.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search))
      setAllUsers(showSearch)
      setpageend(showSearch.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllUsers(orignal)
    setpageend(orignal.length / 6)
    setpagestart(1)
    setStart(0)
    setEnd(6)
  }

  let MovePage = () => {

    if (end < allusers.length) {
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
        {modal && <UsersModal closeView={() => setModal(false)} singleUser={singleUser} userFigures={userFigures} refetchAllUsers={FetchAllUsers} />}
        {modal2 && <CreateUsersModal closeView={() => setModal2(false)} refetchAllUsers={FetchAllUsers} />}
        {modal3 && <SetReferralModal closeView={() => setModal3(false)} />}
        <div className='flex justify-between items-center'>
          <div className='uppercase font-bold md:text-2xl text-lg text-black'>all users</div>
          <div className='h-fit py-2.5 px-4 w-36 text-xs capitalize bg-[#c9b8eb] rounded-full text-black font-bold flex justify-between items-center cursor-default'>
            <div className='flex items-center gap-1'>
              <TbUsers className='text-base' />
              <span>total users:</span>
            </div>
            <div className='text-[0.85rem]'>{allusers.length}</div>
          </div>
        </div>
        <div className='mt-10'>
          <div className='relative w-fit mx-auto'>
            <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
            <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10  rounded-full flex items-center justify-center bg-admin-page shantf2' >
              <IoIosSearch />
              {search !== '' &&
                <div className='absolute top-[1.2rem] right-12 text-xs cursor-pointer bg-zinc-400 rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                  <FiX />
                </div>
              }
            </div>
          </div>
          <div className='flex justify-between items-center gap-4 mt-4 mb-2'>
            <button className='w-fit h-fit py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal3(true)}>
              <span>set referral bonus</span>
              <IoIosSettings className='text-base' />
            </button>
            <button className='w-fit h-fit py-2.5 px-3 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal2(true)}>
              <span>create new user</span>
              <IoIosAddCircleOutline className='text-base' />
            </button>
          </div>

          <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
            <table className='w-full'>
              <thead >
                <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                  <td className='text-center truncate  capitalize p-2'>joined</td>
                  <td className='text-center truncate  capitalize p-2'>full name</td>
                  <td className='text-center truncate  capitalize p-2'>username</td>
                  <td className='text-center truncate  capitalize p-2'>email</td>
                  <td className='text-center truncate  capitalize p-2'>country</td>
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
                  {allusers.length > 0 ?
                    <tbody>
                      {allusers.slice(start, end).map((item, i) => (
                        <UserTableBody key={i} item={item} setModal={setModal} setSingleUser={setSingleUser} setUserFigures={setUserFigures} />
                      ))}
                    </tbody>
                    :
                    <tbody>
                      <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                        <td colSpan="6" className='py-2 italic text-center truncate'>
                          <div className='flex gap-1 items-center justify-center'>
                            <span>no users found...</span>
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
          {allusers.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
            {end < allusers.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
          </div>}
        </div>
      </div>
    </AdminDashboard>
  )
}

export default Users