import React, { useEffect, useState } from 'react'
import { ADMINSTORE, PROFILE } from '../../../store'
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { CookieName, MoveToTop } from '../../../utils/utils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/logobrand.png'
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbBuildingBank } from "react-icons/tb";
import { TiCancel } from 'react-icons/ti'
import { IoMdLogOut } from 'react-icons/io'
import { HiOutlineCreditCard } from "react-icons/hi2";
import { HiOutlineCollection } from "react-icons/hi";
import { TbUsers } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import AdminNotis from './AdminNotis'
import { Apis, imageurl, UserGetApi } from '../../../services/API'
import { FaAngleRight } from 'react-icons/fa6'
import { LuX } from 'react-icons/lu'
import { TbReceiptTax } from "react-icons/tb";
import { LiaBarsSolid } from 'react-icons/lia'
import avatar from '../../../assets/images/avatar.png'

const MainLinks = [
  { path: 'deposits', url: '/admin-controls', icon: HiOutlineCreditCard },
  { path: 'investments', url: '/admin-controls/investments', icon: HiOutlineCollection },
  { path: 'users', url: '/admin-controls/users', icon: TbUsers },
  { path: 'withdrawals', url: '/admin-controls/withdrawals', icon: TbBuildingBank },
]

const OtherLinks = [
  { path: 'taxes', url: '/admin-controls/taxes', icon: TbReceiptTax },
  { path: 'settings', url: '/admin-controls/settings/wallets', icon: IoSettingsOutline },
]

const toggleArray = [
  "/admin-controls",
  "/admin-controls/investments",
  "/admin-controls/withdrawals",
  "/admin-controls/users",
]


const AdminDashboard = ({ children }) => {
  const [user] = useAtom(PROFILE)
  const [, setAdminStore] = useAtom(ADMINSTORE)

  const [logout, setLogOut] = useState(false)
  const [slideShow, setSlideShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const logoutAccount = () => {
    Cookies.remove(CookieName)
    navigate('/')
  }

  useEffect(() => {
    const FetchAdminStore = async () => {
      try {
        const response = await UserGetApi(Apis.admin.get_admin_store)
        if (response.status === 200) {
          setAdminStore(response.msg)
        }

      } catch (error) {
        //
      }
    }
    FetchAdminStore()
  }, [])


  return (
    <div className='w-full flex relative overflow-hidden'>
      <div className={`h-screen w-full xl:w-[20%] lg:w-[25%] lg:bg-admin-auth bg-[#27137eee] backdrop-blur-sm lg:backdrop-blur-none lg:relative lg:block overflow-x-hidden overflow-y-auto scrollDiv z-50 ${slideShow ? 'block fixed top-0 left-0' : 'hidden'}`}>
        <div className='text-white text-3xl cursor-pointer lg:hidden absolute top-4 right-4' onClick={() => setSlideShow(!slideShow)}>
          <LuX />
        </div>
        <div className='py-12 flex flex-col lg:gap-10 gap-8'>
          <div className='flex justify-center items-center'>
            <img src={logo} className='w-10 h-auto'></img>
            <div className='capitalize font-bold text-lg lg:text-[#bbb9b9] text-semi-white'>AialgoControls</div>
          </div>
          <div className='flex flex-col gap-8 pl-12 lg:text-[#bbb9b9] text-semi-white '>
            <div className='flex gap-4 flex-col'>
              <div className=' text-[0.65rem] uppercase'>main</div>
              <div className='flex flex-col gap-8'>
                {MainLinks.map((item, i) => (
                  <Link key={i} onClick={() => { MoveToTop(); setSlideShow(false) }} to={item.url} className={`flex gap-3 lg:text-[#bbb9b9] text-semi-white  lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${location.pathname === item.url && 'lg:border-r-[3px] lg:rounded-sm lg:border-white'}`}>
                    <item.icon className='text-[1.3rem] ' />
                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div className='flex gap-4 flex-col'>
              <div className='text-[0.65rem] uppercase'>others</div>
              <div className='flex flex-col gap-8'>
                {OtherLinks.map((item, i) => (
                  <Link key={i} onClick={() => { MoveToTop(); setSlideShow(false) }} to={item.url} className={`flex gap-3 lg:text-[#bbb9b9] text-semi-white  lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${item.path === 'settings' ? location.pathname.includes('/admin-controls/settings') && 'lg:border-r-[3px] lg:rounded-sm lg:border-white' : location.pathname === item.url && 'lg:border-r-[3px] lg:rounded-sm lg:border-white'}`}>
                    <item.icon className='text-[1.3rem] ' />
                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                  </Link>
                ))}
                <div className='relative'>
                  <div className='flex gap-3 lg:text-[#bbb9b9] text-semi-white lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full' onClick={() => setLogOut(!logout)}>
                    <RiLogoutCircleLine className='text-[1.3rem] ' />
                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>logout</div>
                  </div>
                  {logout &&
                    <div className='absolute lg:-top-5 -top-16 -left-6 lg:bg-admin-auth bg-[#27137e] w-fit  h-fit z-10 rounded-[10px] text-white p-4 lg:shadow-log3 shadow-log2'>
                      <div className=' text-[0.8rem] mb-4 text-center'>Logout of your account?</div>
                      <div className='flex gap-[1rem] items-center'>
                        <button className='outline-none py-1 px-4 w-fit h-fit border border-white rounded-lg capitalize text-xs flex items-center gap-1 hover:bg-white lg:hover:text-admin-auth hover:text-[#27137e] lg:bg-admin-auth bg-[#27137e] ' onClick={() => setLogOut(!logout)}>
                          <span>cancel</span>
                          <TiCancel className='text-[0.8rem]' />
                        </button>
                        <button className='outline-none py-1 px-4 w-fit h-fit border border-white  rounded-lg capitalize text-xs flex items-center gap-1 hover:bg-white lg:hover:text-admin-auth hover:text-[#27137e] lg:bg-admin-auth bg-[#27137e]' onClick={logoutAccount}>
                          <span>logout</span>
                          <IoMdLogOut className='text-[0.7rem]' />
                        </button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='xl:w-[80%] lg:w-[75%] w-full bg-white h-[100dvh] overflow-x-hidden overflow-y-auto'>
        <div className='relative'>
          <div className='md:w-[94%] w-11/12 mx-auto'>
            <div className='flex flex-col gap-4'>
              <div className='w-full h-fit rounded-md bg-admin-auth mt-4 px-4 py-2 text-white text-[0.85rem] flex items-center justify-between relative'>
                <div className='flex gap-2 items-center'>
                  <Link className='lg:hidden cursor-pointer' to='/admin-controls/settings/personalize'>
                    <img src={user.image ? `${imageurl}/profiles/${user.image}` : avatar} className='w-10 h-10 object-cover rounded-full border border-white'></img>
                  </Link>
                  <div className='capitalize font-medium'>hi, {user?.username}</div>
                </div>
                <div>
                  <AdminNotis />
                </div>
              </div>
              <div className='flex gap-1.5 capitalize items-center text-[#292929] font-bold md:text-[0.85rem] text-xs '>
                <div>dashboard</div>
                <FaAngleRight className='text-[0.6rem]' />
                {location.pathname === '/admin-controls' && <span>deposits</span>}
                {location.pathname.includes('/admin-controls/settings') ?
                  <div className='flex gap-1.5 items-center'>
                    <span>{location.pathname.slice(16, 24)}</span>
                    <FaAngleRight className='text-[0.6rem]' />
                    <span>{location.pathname.slice(25)}</span>
                  </div>
                  :
                  <span>{location.pathname.slice(16)}</span>
                }
              </div>
            </div>
            <div className='pt-10 pb-24 lg:pb-10'>
              {children}
            </div>
          </div>
        </div>
        <div className='bg-admin-auth w-full md:h-14 h-12 fixed bottom-0 left-0 z-30 lg:hidden px-2'>
          <div className='grid grid-cols-5 items-center h-full w-full'>
            {MainLinks.map((item, i) => (
              <Link key={i} onClick={MoveToTop} to={item.url} className={`flex flex-col gap-1 items-center cursor-pointe ${location.pathname === item.url ? 'text-[green]' : ' text-semi-white'}`}>
                <item.icon className='md:text-lg text-base' />
                <div className='capitalize md:text-[0.6rem] text-[0.55rem] font-medium'>{item.path}</div>
              </Link>
            ))}
            <div className={`flex flex-col gap-1 items-center justify-center rounded-full cursor-pointer  ${!toggleArray.includes(location.pathname) ? 'text-[green]' : 'text-semi-white'} `} onClick={() => setSlideShow(!slideShow)}>
              <LiaBarsSolid className='md:text-lg text-base' />
              <div className='capitalize md:text-[0.6rem] text-[0.55rem] font-medium'>a-z menu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard