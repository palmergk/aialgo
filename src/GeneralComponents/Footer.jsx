import React, { useEffect } from 'react'
import logo from '../assets/images/logobrand.png'
import { Link } from 'react-router-dom';
import { LuCopyright } from "react-icons/lu";
import { PiTelegramLogoLight } from "react-icons/pi";
import { TfiInstagram } from "react-icons/tfi";
import { MoveToTop } from '../utils/utils';
import { GrFacebookOption } from 'react-icons/gr';
import { AiOutlineMail } from "react-icons/ai";
import { PiHeadsetLight } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { useAtom } from 'jotai';
import { ADMINSTORE } from '../store';
import { Apis, UserGetApi } from '../services/API';

const CompanyLinks = [
  { path: 'home', url: '/' },
  { path: 'about us', url: '/about' },
  { path: 'contact us', url: '/contact' },
  { path: 'trading plans', url: '/trading' },
  { path: 'terms and conditions', url: '/terms' },
  { path: 'privacy policy', url: '/privacy' },
]

const Footer = () => {
  const [adminstore, setAdminStore] = useAtom(ADMINSTORE)

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
    <div className='bg-[#1E2833] pb-4 z-10 border-t border-[#171a1d] pt-10'>
      <div className='lg:w-4/5 w-11/12 mx-auto '>
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-5'>
          <div className='flex flex-col gap-2 lg:col-span-3 text-ground'>
            <Link to='/' onClick={MoveToTop} className='flex items-center w-fit'>
              <img src={logo} className='w-20 h-auto -ml-4'></img>
              <div className='capitalize text-white font-bold text-3xl'>AI Algo Trade</div>
            </Link>
            <div className='md:w-[80%] lg:w-[60%]'>Advanced trading mechanism, security, transparency and consitent market advantage for every level trader.</div>
            <div className='flex flex-col gap-2 mt-4'>
              <div className='flex items-center gap-2'>
                <IoTimeOutline className='text-lg' />
                <span>Working hours: 24/7</span>
              </div>
              <div className='flex items-center gap-2'>
                <AiOutlineMail className='text-lg' />
                <span>support@aialgorithm.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <PiHeadsetLight className='text-lg' />
                <span>+ Coming soon</span>
              </div>
            </div>
            <div className='flex gap-4 items-center mt-4'>
              <a href={adminstore?.telegram} target="_blank" rel="noopener noreferrer">
                <div className='h-8 w-8 bg-white rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer  transition-all text-[#1E2833] text-lg hover:text-orange'>
                  <PiTelegramLogoLight />
                </div>
              </a>
              <a href={adminstore?.instagram} target="_blank" rel="noopener noreferrer">
                <div className='h-8 w-8 bg-white  rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-[#1E2833] text-lg hover:text-orange'>
                  <TfiInstagram />
                </div>
              </a>
              <a href={adminstore?.facebook} target="_blank" rel="noopener noreferrer">
                <div className='h-8 w-8 bg-white  rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-[#1E2833] text-lg hover:text-orange'>
                  <GrFacebookOption />
                </div>
              </a>
            </div>
          </div>
          <div className='text-ground capitalize lg:col-span-2 mt-4'>
            <div className='font-medium text-2xl '>quick links</div>
            <div className="border-b border-[#29415c] pt-2 w-[60%]"></div>
            <div className='flex flex-col gap-4 mt-4'>
              {CompanyLinks.map((item, i) => (
                <Link key={i} to={item.url} onClick={MoveToTop} className='hover:text-orange w-fit'>{item.path}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className='flex gap-1 w-full h-14 bg-[#172029] items-center text-ground mt-12 px-4 text-[0.85rem]'>
          <LuCopyright />
          <div>2024, Al Algo, All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}

export default Footer