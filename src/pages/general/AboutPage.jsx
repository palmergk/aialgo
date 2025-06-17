import React from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import tradingImg from '../../assets/images/trading.webp'
import thumbsupimg from '../../assets/images/pr.jpg'
import { MdJoinRight } from "react-icons/md";
import efficient from '../../assets/images/efficient.png'
import settings from '../../assets/images/setting.png'
import tplan from '../../assets/images/trading3d.png'
import bulb from '../../assets/images/bulb.png'
import assist from '../../assets/images/assist.png'
import { MoveToTop } from '../../utils/utils'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const AboutPage = () => {

  return (
    <Pagelayout>
      <div className="bg-[#1E2833] py-16">
        <div className='w-11/12 mx-auto'>
          <div className='grid gap-8 grid-cols-1 lg:grid-cols-2 relative' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
            <div className='col-span-1'>
              <div className='text-[0.8rem] text-orange '>Who doesn't like easy?</div>
              <div className='text-3xl lg:text-[2.5rem] capitalize lg:w-[75%] lg:leading-[3.3rem] font-extrabold text-white'>advanced crypto trading set-up</div>
              <div className='lg:w-11/12 pt-6 text-ground'>Built with advanced artificial intelligence algorithm to aid cryptocurrency trading for every level trader, experienced or not. With only a few years in the market, we've quickly become the top favorite in the trading community with an average trading efficiency of 95% weekly.</div>
              <div className='flex gap-4 mt-6'>
                <Link to='/signup' onClick={MoveToTop}>
                  <button className={`outline-0 w-fit h-fit py-2 px-4 text-sm text-white rounded-md bg-orange border-2 border-orange capitalize  flex gap-1 items-center font-medium hover:translate-y-[-1px] transition-all`}>
                    <span>sign up for free</span>
                  </button>
                </Link>
                <Link to='/trading' onClick={MoveToTop}>
                  <button className={`outline-0 w-fit h-fit py-2 px-5 text-sm text-white rounded-md border-2 border-orange capitalize flex gap-1 items-center font-medium hover:translate-y-[-1px] transition-all`}>
                    <span>test run</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className='relative col-span-1 order-first lg:order-last'>
              <img src={tradingImg} className='h-auto w-full object-cover object-center'></img>
            </div>
          </div>
          <div className='lg:w-4/5 mx-auto md:mt-48 mt-32' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-16 gap-20'>
              <div className='lg:col-span-1 relative'>
                <img src={thumbsupimg} className='rounded-[15px] h-[20rem] w-full object-cover object-center'></img>
                <div className='w-fit h-fit bg-[#192633] rounded-[15px] absolute top-[-4.5rem] left-0 flex justify-center flex-col items-center py-2 px-4 shd lg:-ml-16 -ml-2' >
                  <Gauge
                    width={120} height={120} value={90}
                    sx={() => ({
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 22,
                        fontWeight: 500,
                      },
                      [`& .${gaugeClasses.valueText} text`]: {
                        fill: "white"
                      },
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: 'white',
                      },
                    })}
                    text={({ value }) => `${value}%`}
                  />
                  <div className='text-orange text-[0.8rem] capitalize'>overall experience</div>
                </div>
              </div>
              <div className='lg:col-span-2'>
                <div className='text-[0.95rem] text-orange -mt-8'>About the System</div>
                <div className='text-white font-semibold capitalize text-[1.4rem] lg:text-[1.8rem] mt-4'>transparent, full-control & consistent market advantage</div>
                <div className='text-ground text-sm pt-4'>With our advanced trading mechanism, you consistently get good market advantages with the best returns, 100% transparency and full control of your trading account and assets. </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
                  <div className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                      <div className='flex items-center justify-center w-10 h-10 rounded-full  bg-[#192633] shd'>
                        <img src={settings} className='h-6 w-auto'></img>
                      </div>
                      <div className='text-white capitalize font-semibold text-sm'>Strong Security.</div>
                    </div>
                    <div className='text-[0.8rem] text-ground pl-14'>Our platform prioritises the security of users trading accounts, data and assets.</div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                      <div className='flex items-center justify-center w-10 h-10 rounded-full  bg-[#192633] shd'>
                        <img src={bulb} className='h-6 w-auto'></img>
                      </div>
                      <div className='text-white capitalize font-semibold text-sm'>Transparency.</div>
                    </div>
                    <div className='text-[0.8rem] text-ground pl-14'>With us, what you see is what you get.</div>
                  </div>
                </div>
                <div className='flex gap-2 mt-6 items-center'>
                  <div className='text-white text-sm'>Want to trade and earn like a pro?</div>
                  <Link to='/signup' onClick={MoveToTop}>
                    <button className='outline-0 w-fit h-fit py-1 px-4 text-[0.8rem] text-white rounded-full bg-orange capitalize  flex gap-1 items-center font-medium hover:bg-brown truncate'>
                      <MdJoinRight /><span>join us</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='w-11/12 lg:w-4/5 xl:w-[70%] mx-auto md:mt-28 mt-20'>
            <div className='relative w-fit mx-auto text-semi-white'>
              <div className='text-[2rem] md:text-[3rem] text-white font-semibold capitalize'>our services</div>
              <div className='border-t-4 md:w-48 w-32 absolute top-0 left-0'></div>
              <div className='border-b-4 md:w-48 w-32 absolute bottom-0 right-0'></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-20 mt-10' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
              <Link to='/signup' onClick={MoveToTop}>
                <div className='w-full h-fit  bg-[#192633] hover:bg-[#1f2f3f] hover:scale-90 transition-all rounded-md p-4 flex flex-col gap-4 items-center mx-auto shd'>
                  <div className='border-2 border-[#525151] rounded-full w-16 h-16 flex text-[2.2rem] pt-2 justify-center items-center'>
                    <img src={efficient} className='h-auto w-8'></img>
                  </div>
                  <div className='text-white capitalize font-bold text-center'>artificial intelligence</div>
                  <div className=' text-ground text-[0.8rem] text-center'>Integrated artificial intelligence for trading advantage.</div>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                    <div>try now</div>
                    <FaLongArrowAltRight />
                  </div>
                </div>
              </Link>
              <Link to='/trading' onClick={MoveToTop}>
                <div className='w-full h-fit bg-[#192633] hover:bg-[#1f2f3f] hover:scale-90 transition-all rounded-md p-4 flex flex-col gap-4 items-center mx-auto shd md:-mt-10'>
                  <div className='border-2 border-[#525151] rounded-full w-16 h-16 flex text-[2.1rem] pt-4 justify-center '>
                    <img src={tplan} className='h-[1.8rem] w-auto'></img>
                  </div>
                  <div className='text-white capitalize font-bold text-center'>affordable trading plans</div>
                  <div className=' text-ground text-[0.8rem] text-center'>The best trading plans for every level trader.</div>
                  <Link to='/trading' onClick={MoveToTop}>
                    <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                      <div>see plans</div>
                      <FaLongArrowAltRight />
                    </div>
                  </Link>
                </div>
              </Link>
              <Link to='/signup' onClick={MoveToTop}>
                <div className='w-full h-fit bg-[#192633] hover:bg-[#1f2f3f] hover:scale-90 transition-all rounded-md p-4 flex flex-col gap-4 items-center mx-auto shd'>
                  <div className='border-2 border-[#525151] rounded-full w-16 h-16 flex text-[2.2rem] pt-2 justify-center items-center'>
                    <img src={assist} className='h-8 w-auto'></img>
                  </div>
                  <div className='text-white capitalize font-bold text-center'>trade assistance</div>
                  <div className=' text-ground text-[0.8rem] text-center'>Tailored help and guidance you need for every step.</div>
                  <Link to='/signup' onClick={MoveToTop}>
                    <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                      <div>try now</div>
                      <FaLongArrowAltRight />
                    </div>
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default AboutPage