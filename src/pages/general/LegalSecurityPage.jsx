import React from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { PiCertificate, PiTrademarkRegisteredBold } from 'react-icons/pi';
import { RiTrademarkLine } from "react-icons/ri"
import { GrNotes } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { MoveToTop } from '../../utils/utils';


const LegalSecurityPage = () => {
  return (
    <Pagelayout>
      <div className='bg-[whitesmoke] py-16'>
        <div className='lg:w-5/6 mx-auto'>
          <div className='w-full h-fit bg-white mx-auto rounded-xl relative shb py-[2.5rem] overflow-hidden'>
            <div className='w-11/12 lg:w-3/4 mx-auto'>
              <div className='text-[1.8rem] lg:text-[2.5rem] font-bold uppercase border-b w-full'>legal & security</div>
              <div className='flex flex-col gap-3 mt-16'>
                <div className='text-xl font-bold capitalize text-[#504f4f]'>licenses and registration</div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='w-full h-fit bg-white rounded-lg border hover:shadow-lg p-5'>
                    <div className='flex flex-col gap-2'>
                      <PiCertificate className='text-7xl text-[#1E2833]' />
                      <div className=' font-bold flex flex-col gap-1'>
                        <span>US licenses and registrations</span>
                        <span>AL ALGO TRADE Corp</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-fit bg-white rounded-lg border hover:shadow-lg p-5'>
                    <div className='flex flex-col gap-2'>
                      <PiCertificate className='text-7xl text-[#1E2833]' />
                      <div className=' font-bold flex flex-col gap-1'>
                        <span>US licenses and registrations</span>
                        <span>AL ALGO TRADE Corp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3 mt-16'>
                <div className='text-[1.2rem] font-bold capitalize text-[#504f4f]'>certification</div>
                <div className='w-full md:w-1/2 h-fit bg-white rounded-lg border hover:shadow-lg p-5'>
                  <div className='flex flex-col gap-8'>
                    <PiTrademarkRegisteredBold className='text-7xl text-[#1E2833]' />
                    <div className='flex'>
                      <div className='font-bold capitalize'>trademark</div>
                      <RiTrademarkLine className='text-[0.8rem]' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3 mt-16'>
                <div className='text-[1.2rem] font-bold capitalize text-[#504f4f]'>disclosures</div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                  <Link to='/terms' onClick={MoveToTop}>
                    <div className='w-full h-fit bg-white rounded-lg border hover:shadow-lg p-5 text-black hover:text-orange cursor-pointer'>
                      <div className='flex flex-col gap-8'>
                        <GrNotes className='text-7xl text-[#1E2833]' />
                        <div className='font-bold capitalize'>terms of use</div>
                      </div>
                    </div>
                  </Link>
                  <Link to='/privacy' onClick={MoveToTop}>
                    <div className='w-full h-fit bg-white rounded-lg border hover:shadow-xl p-5 text-black hover:text-orange cursor-pointer'>
                      <div className='flex flex-col gap-8'>
                        <GrNotes className='text-7xl text-[#1E2833]' />
                        <div className='font-bold capitalize'>privay policy</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default LegalSecurityPage