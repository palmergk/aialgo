import React, { useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { MdOutlineDiversity2 } from "react-icons/md";
import { Link } from 'react-router-dom';
import rocket from '../../assets/images/rocket.png'
import light from '../../assets/images/light.png'
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdJoinRight } from "react-icons/md";
import CountComponent from '../../GeneralComponents/CountComponent';
import { FAQS } from '../../utils/utils';
import TestimonialComponent from '../../GeneralComponents/TestimonialComponent';


const HomePage = () => {
  const [faq, setFaq] = useState('')

  const handleQuestions = i => {
    if (i !== faq) {
      setFaq(i)
    } else {
      setFaq('')
    }
  }

  return (
    <Pagelayout>
      <div className='bg-[#1E2833] pb-16 text-white'>
        <div className='homeBg'>
          <div className='w-11/12 mx-auto pt-20 grid grid-cols-3 lg:grid-cols-4'>
            <div className='col-span-1'>
              <div className='relative w-fit'>
                <div className='capitalize text-orange text-[0.7rem] font-medium tracking-widest'> tech & crypto</div>
                <MdOutlineDiversity2 className='absolute top-0 -right-8 text-lg' />
              </div>
              <div className='capitalize  font-bold text-[2rem] md:text-[3rem] leading-[4rem] md:leading-[5rem] '>artificial intelligence algorithm  crypto trade</div>
              <Link to='/signup'>
                <button className='outline-0 w-fit h-fit py-1 px-6 text-[0.9rem]  rounded-full bg-orange capitalize mt-5 flex gap-1 items-center font-medium hover:bg-[#642626]'>
                  <MdJoinRight /><span>join</span>
                </button>
              </Link>
            </div>
            <div className='lg:col-span-3 col-span-2 '>
              <div className='w-fit h-fit border rotate-90 uppercase text-[0.85rem]  py-1 px-2 font-medium tracking-[0.5rem] relative text-ellipsis text-nowrap mt-40'>
                <div> crypto trade made easy</div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-7 -left-[0.2rem]'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute -top-1 -left-1'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-7 -right-1'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute -top-1 -right-1'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-[95%] w-11/12 mx-auto'>
          <div className='w-full h-fit py-8 px-4 bg-[#1B2530] z-10 -mt-8 border rounded-xl border-dashed overflow-hidden relative'>
            <div className='bda flex items-center justify-center rotate-90 w-40 h-40 border-2 bottom-4 rounded-full -left-20 absolute'>
              <div className='bdb w-28 h-28 border-2 rounded-full'></div>
            </div>
            <div className='bda flex items-center justify-center rotate-90 w-20 h-20 border-2  rounded-full absolute -top-12 -right-4' >
              <div className='bdb w-12 h-12 border-2 rounded-full'></div>
            </div>
            <div className='flex items-center gap-4 flex-col'>
              <div className=' md:text-[2rem] text-2xl capitalize text-center font-bold'>what is the AI algo trade?</div>
              <div className='text-semi-white text-[0.95rem] text-center lg:w-[60%] tracking-[0.05rem]'>The AI Algo Trade is a system design and integrated with advanced artificial intelligence to aid cryptocurrency trading for every level trader and generate consistent good market returns. With our user friendly interface and affordable trading plans, anyone can trade with us and earn like a pro.</div>
            </div>
            <div className='lg:w-3/5 w-11/12 mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-16 '>
                <div className='flex gap-4'>
                  <img src={rocket} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-semibold text-lg '> Massive returns</div>
                    <div className='text-xs  tracking-[0.05rem]'>Our system generates over 60% return on investments weekly.</div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <img src={light} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-semibold text-lg'>Easy Use</div>
                    <div className=' text-xs tracking-[0.05rem]'>User interface design for every level trader.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-5/6 w-11/12 mx-auto'>
          <div className='mt-20'>
            <CountComponent />
          </div>
          <div className='mt-20'>
            <div className='flex flex-col gap-10'>
              <div className='relative w-fit mx-auto text-semi-white'>
                <div className='text-[2rem] md:text-[3rem]  font-semibold capitalize'>faq questions</div>
                <div className='border-t-4 md:w-48 w-32 absolute top-0 right-0'></div>
                <div className='border-b-4 md:w-48 w-32 absolute bottom-0 left-0'></div>
              </div>
              <div className='h-fit w-full md:px-20 xl:px-28 px-6 pt-10 pb-16 bg-gradient-to-br from-[#182531] from-55% to-[#273f5e]' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
                <div className='text-center md:text-4xl text-2xl font-bold  capitalize'>Trade and earn like a pro</div>
                <div className='text-center text-semi-white md:text-base text-sm font-semibold md:w-3/4 mx-auto mt-4'>Below are some of the frequently asked questions on our platform, if you have any more questions, kindly contact us via support.</div>
                <div className='flex flex-col md:gap-10 gap-7 mt-10'>
                  {FAQS.map((item, i) => (
                    <div className={`w-full h-fit flex flex-col gap-4 `} key={i}>
                      <div onClick={() => handleQuestions(i)} className='flex justify-between gap-4 items-center w-full h-fit cursor-pointer md:text-2xl text-lg font-bold'>
                        <span>{item.title}</span>
                        <div className='md:text-2xl text-lg'>{faq !== i ? <FiPlus /> : <FiMinus />}</div>
                      </div>
                      <div className={`md:text-base text-sm text-semi-white pb-2 border-b ${faq === i ? 'block' : 'hidden'} `}>{item.content}</div>
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='mt-20 overflow-x-hidden'>
            <TestimonialComponent />
          </div>
          <div className='mt-16'>
            <coingecko-coin-heatmap-widget height="400" locale="en" top="20"></coingecko-coin-heatmap-widget>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default HomePage