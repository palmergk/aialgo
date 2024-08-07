import React from 'react'
import logo from '../assets/images/logobrand.png'
import { Link } from 'react-router-dom';
import { LuCopyright } from "react-icons/lu";
import { PiTelegramLogoLight } from "react-icons/pi";
import { TfiInstagram } from "react-icons/tfi";
import { MoveToTop } from '../utils/utils';
import { GrFacebookOption } from 'react-icons/gr';

const Footer = () => {
  return (
    <div className='bg-[#1E2833] pb-4 z-10 border-t border-[#171a1d] pt-10'>
      <div className='lg:w-4/5 w-11/12 mx-auto '>
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-5'>
          <div className='flex flex-col gap-2 lg:col-span-3'>
            <Link to='/' onClick={MoveToTop} className='flex items-center'>
              <img src={logo} className='w-20 h-auto -ml-4'></img>
              <div className='capitalize text-white font-bold text-2xl'>the force</div>
            </Link>
            <div className='text-ground md:w-[80%] lg:w-[60%]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet quod omnis voluptate similique facere! Neque, cupiditate minus ea nulla fugit.</div>
            <div className='flex gap-4 items-center mt-4'>
              <Link to='/contact' onClick={MoveToTop}>
                <div className='h-8 w-8 bg-white rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer  transition-all text-[#1E2833] text-lg hover:text-[rgb(233,110,40)]'>
                  <PiTelegramLogoLight />
                </div>
              </Link>
              <Link to='/contact' onClick={MoveToTop}>
                <div className='h-8 w-8 bg-white  rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-[#1E2833] text-lg hover:text-orange'>
                  <TfiInstagram />
                </div>
              </Link>
              <Link to='/contact' onClick={MoveToTop}>
                <div className='h-8 w-8 bg-white  rounded-full flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-[#1E2833] text-lg hover:text-orange'>
                  <GrFacebookOption />
                </div>
              </Link>
            </div>
          </div>
          <div className='text-ground capitalize lg:col-span-2 mt-4'>
            <div className='font-medium text-2xl '>quick links</div>
            <div className="border-b border-[#29415c] pt-2 w-[60%]"></div>
            <div className='flex flex-col gap-4 mt-4'>
              <Link to='/' onClick={MoveToTop} className='hover:text-orange w-fit'>home</Link>
              <Link to='/about' onClick={MoveToTop} className='hover:text-orange w-fit'>about us</Link>
              <Link to='/contact' onClick={MoveToTop} className='hover:text-orange w-fit'>contact us</Link>
              <Link to='/trading' onClick={MoveToTop} className='hover:text-orange w-fit'>trading plans</Link>
              <Link to='/terms' onClick={MoveToTop} className='hover:text-orange w-fit'>terms and conditions</Link>
              <Link to='/privacy' onClick={MoveToTop} className='hover:text-orange w-fit'>privacy</Link>
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