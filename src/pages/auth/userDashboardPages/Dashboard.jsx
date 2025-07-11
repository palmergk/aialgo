import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logobrand.png'
import { HiOutlineCollection } from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { TbBuildingBank } from "react-icons/tb";
import { LuSend, LuArrowDownUp } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { LuX } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'
import avatar from '../../../assets/images/avatar.png'
import { ADMINSTORE, PROFILE, WALLET } from '../../../store';
import { Apis, UserGetApi, imageurl } from '../../../services/API';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { CookieName, MoveToTop} from '../../../utils/utils';
import { TiCancel } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { TbReceiptTax } from "react-icons/tb";
import Notifications from './Notifications';
import { LiaBarsSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux'
import { updateWallet } from '../../../redux/reducer';

const MainLinks = [
    { path: 'wallet', url: '/dashboard', icon: IoWalletOutline },
    { path: 'investment', url: '/dashboard/investment', icon: HiOutlineCollection },
    { path: 'deposit', url: '/dashboard/deposit', icon: HiOutlineCreditCard },
    { path: 'withdraw', url: '/dashboard/withdraw', icon: TbBuildingBank },
]

const OtherLinks = [
    { path: 'taxes', url: '/dashboard/tax-payment', icon: TbReceiptTax },
    { path: 'settings', url: '/dashboard/settings/personalize', icon: IoSettingsOutline },
    { path: 'feedback', url: '/dashboard/feedback', icon: LuSend },
]

const toggleArray = [
    '/dashboard',
    '/dashboard/investment',
    '/dashboard/deposit',
    '/dashboard/withdraw'
]


const Dashboard = ({ children }) => {
    const [user] = useAtom(PROFILE)
    // const [wallet, setWallet] = useAtom(WALLET)
    const dispatch = useDispatch()
    const wallet = useSelector(state => state.data.wallet)
    const [, setAdminStore] = useAtom(ADMINSTORE)

    const [logout, setLogOut] = useState(false)
    const [slideShow, setSlideShow] = useState(false)
    const [visible, setVisible] = useState(slideShow);
    const navigate = useNavigate()
    const location = useLocation()

    const logoutAccount = () => {
        Cookies.remove(CookieName)
        navigate('/login')
    }

    useEffect(() => {
        const FetchWallet = async () => {
            try {
                const response = await UserGetApi(Apis.user.wallet)
                if (response.status === 200) {
                    // setWallet(response.msg)
                    dispatch(updateWallet(response.msg))
                }

            } catch (error) {
                //
            }
        }
        FetchWallet()
    }, [])

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

    useEffect(() => {
        if (slideShow) {
            setVisible(true)
        } else {
            const timeout = setTimeout(() => setVisible(false), 500)
            return () => clearTimeout(timeout)
        }
    }, [slideShow])

    useEffect(() => {
        if (user.email_verified === 'false') {
            navigate(`/signup?screen=2&email=${user.email}`)
        }
    }, [user.email_verified])

    return (
        <div className='bg-[#0c091a] w-full flex relative overflow-hidden'>
            <div className={`fixed top-0 left-0 h-screen w-full lg:bg-admin bg-[#27137eee] lg:relative lg:w-[25%] xl:w-[20%] lg:backdrop-blur-none backdrop-blur-sm overflow-x-hidden overflow-y-auto z-50 transition-transform duration-500 ease-in-out transform ${slideShow ? 'translate-x-0' : '-translate-x-full'} ${visible ? 'opacity-100' : 'opacity-0'} lg:translate-x-0 lg:opacity-100 lg:transition-none lg:duration-0 lg:ease-none`}>
                <div className='text-white text-3xl cursor-pointer lg:hidden absolute top-4 right-4' onClick={() => setSlideShow(!slideShow)}>
                    <LuX />
                </div>
                <div className='py-12 flex flex-col lg:gap-10 gap-8'>
                    <div className='flex justify-center items-center'>
                        <img src={logo} className='w-10 h-auto'></img>
                        <div className='capitalize font-bold text-lg lg:text-[grey] text-semi-white'>AialgoVault</div>
                    </div>
                    <div className='flex flex-col gap-10 pl-12 lg:text-[grey] text-semi-white'>
                        <div className='flex gap-4 flex-col'>
                            <div className=' text-[0.65rem] uppercase lg:text-[#797878] text-[#c5c4c4]'>main</div>
                            <div className='flex flex-col gap-8'>
                                {MainLinks.map((item, i) => (
                                    <Link key={i} onClick={() => { MoveToTop(); setSlideShow(false) }} to={item.url} className={`flex gap-3 lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${location.pathname === item.url && 'lg:border-r-[3px] lg:rounded-sm lg:border-light'}`}>
                                        <item.icon className='text-[1.3rem] ' />
                                        <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col'>
                            <div className=' text-[0.65rem] uppercase lg:text-[#797878] text-[#c5c4c4]'>others</div>
                            <div className='flex flex-col gap-8'>
                                {OtherLinks.map((item, i) => (
                                    <Link key={i} onClick={() => { MoveToTop(); setSlideShow(false) }} to={item.url} className={`flex gap-3 lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${item.path === 'settings' ? location.pathname.includes('/dashboard/settings') && 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : location.pathname === item.url && 'lg:border-r-[3px] lg:rounded-sm lg:border-light'}`}>
                                        <item.icon className='text-[1.3rem] ' />
                                        <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                                    </Link>
                                ))}
                                <div className='relative'>
                                    <div className='flex gap-3 lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full' onClick={() => setLogOut(!logout)}>
                                        <RiLogoutCircleLine className='text-[1.3rem] ' />
                                        <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>logout</div>
                                    </div>
                                    {logout &&
                                        <div className='absolute -top-16 -left-6  lg:bg-admin bg-[#27137e] w-fit h-fit z-50 rounded-[10px] text-semi-white font-medium p-4 lg:shadow-log shadow-log2'>
                                            <div className=' text-[0.8rem] mb-4 text-center'>Logout of your account?</div>
                                            <div className='flex gap-4 items-center'>
                                                <button className='outline-none py-1 px-4 w-fit h-fit border lg:border-[#1c1733] border-white rounded-lg capitalize text-xs flex items-center gap-1 lg:hover:bg-[#1c1733] hover:bg-white lg:text-light text-white hover:text-[#27137e] lg:hover:text-white' onClick={() => setLogOut(!logout)}>
                                                    <span>cancel</span>
                                                    <TiCancel className='text-[0.8rem] ' />
                                                </button>
                                                <button className='outline-none py-1 px-4 w-fit h-fit border lg:border-[#1c1733] border-white  rounded-lg capitalize text-xs flex items-center gap-1 lg:hover:bg-[#1c1733] hover:bg-white lg:text-light text-white hover:text-[#27137e] lg:hover:text-white' onClick={logoutAccount}>
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
            <div className='xl:w-[62%] lg:w-[75%] w-full h-[100dvh] overflow-x-hidden overflow-y-auto scrollDiv move'>
                <div className='relative'>
                    <div className='md:w-[94%] w-11/12 mx-auto'>
                        <div className='flex flex-col gap-4'>
                            <div className='w-full h-fit rounded-md bg-[#130e27] py-2 px-4 text-light text-[0.85rem] flex items-center justify-between mt-4 relative'>
                                <div className='flex gap-2 items-center'>
                                    <Link className='xl:hidden cursor-pointer' to='/dashboard/settings/personalize'>
                                        <img src={user.image ? `${imageurl}/profiles/${user.image}` : avatar} className='w-10 h-10 object-cover rounded-full border border-light'></img>
                                    </Link>
                                    <div className='capitalize font-medium'>hi, {user?.username}</div>
                                </div>
                                <div>
                                    <Notifications />
                                </div>
                            </div>
                            <div className='flex gap-1.5 capitalize items-center text-[grey] md:text-[0.85rem] text-xs font-bold'>
                                <span>dashboard</span>
                                <FaAngleRight className='text-[0.6rem]' />
                                {location.pathname === '/dashboard' && <span>wallet</span>}
                                {location.pathname.includes('/dashboard/settings') ?
                                    <div className='flex gap-1.5 items-center'>
                                        <span>{location.pathname.slice(11, 19)}</span>
                                        <FaAngleRight className='text-[0.6rem]' />
                                        <span>{location.pathname.slice(20)}</span>
                                    </div>
                                    :
                                    <span>{location.pathname.slice(11)}</span>
                                }
                            </div>
                        </div>
                        <div className='pt-10 pb-24 lg:pb-10'>
                            {children}
                        </div>
                    </div>
                </div>
                <div className='bg-[#131024] w-full md:h-14 h-12 fixed bottom-0 left-0 z-30 lg:hidden px-2'>
                    <div className='grid grid-cols-5 items-center h-full w-full'>
                        {MainLinks.map((item, i) => (
                            <Link key={i} onClick={MoveToTop} to={item.url} className={`flex flex-col gap-1 items-center cursor-pointer  ${location.pathname === item.url ? 'text-light' : ' text-semi-white'}`}>
                                <item.icon className='md:text-lg text-base' />
                                <div className='capitalize md:text-[0.6rem] text-[0.55rem] font-medium'>{item.path}</div>
                            </Link>
                        ))}
                        <div className={`flex flex-col gap-1 items-center justify-center rounded-full cursor-pointer  ${!toggleArray.includes(location.pathname) ? 'text-light' : 'text-white'} `} onClick={() => { setSlideShow(!slideShow) }}>
                            <LiaBarsSolid className='md:text-lg text-base' />
                            <div className='capitalize md:text-[0.6rem] text-[0.55rem] font-medium'>a-z menu</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[18%] h-screen overflow-hidden bg-admin hidden xl:block'>
                <div className='w-[80%] mx-auto flex flex-col gap-12 justify-center mt-20'>
                    <div className=' text-semi-white text-[1.1rem] text-center font-bold capitalize'>trader profile</div>
                    <div className='flex gap-4 flex-col items-center font-bold capitalize'>
                        <img src={user.image ? `${imageurl}/profiles/${user.image}` : avatar} className='w-16 h-16 object-cover rounded-full border-2 border-light'></img>
                        <div className='flex gap-1'>
                            <div className='text-semi-white '>{user?.username}</div>
                            {user.email_verified === 'true' && user.kyc_verified === 'true' && <MdVerified className='text-light text-xs' />}
                        </div>
                        <div className='text-[grey] text-[0.8rem] font-medium lowercase -mt-2 '>{user?.email}</div>
                        <Link to='/dashboard/settings/personalize' onClick={MoveToTop}>
                            <div className=' cursor-pointer text-[0.85rem] text-light border-light mt-2'>edit profile</div>
                        </Link>
                    </div>
                    <div className='flex flex-col text-xs gap-4 capitalize font-bold text-[grey]'>
                        <div className='text-semi-white text-[0.85rem]'>account</div>
                        <div className='flex justify-between'>
                            <div>joined</div>
                            <div>{moment(user?.createdAt).format('DD/MM/yyyy')}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>assets value</div>
                            <div>{Object.values(wallet).length !== 0 && <span>${wallet.balance.toLocaleString()}</span>}</div>
                        </div>
                    </div>
                    <Link to='/dashboard/investment' onClick={MoveToTop}>
                        <div className='w-full h-14 rounded-[3px] bg-semi-white mt-8 capitalize font-bold flex items-center justify-center gap-2 cursor-pointer'>
                            <LuArrowDownUp />
                            <div>trade now</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard