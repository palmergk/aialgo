import React from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import tradingImg from '../../assets/images/trading.webp'
import thumbsupimg from '../../assets/images/pr.jpg'
import { MdJoinRight } from "react-icons/md";
import efficient from '../../assets/images/efficient.png'
import crown from '../../assets/images/crown.png'
import settings from '../../assets/images/setting.png'
import tplan from '../../assets/images/trading3d.png'
import bulb from '../../assets/images/bulb.png'
import assist from '../../assets/images/assist.png'
import { MoveToTop } from '../../utils/utils'

const AboutPage = () => {

  return (
    <Pagelayout>
      <div className="bg-[#1E2833] py-16">
        <div className='w-11/12 mx-auto'>
          <div className='grid gap-8 grid-cols-1 lg:grid-cols-2 relative'>
            <div className='col-span-1'>
              <div className='text-[0.8rem] text-orange '>Who doesn't like easy?</div>
              <div className='text-3xl lg:text-[2.5rem] capitalize lg:w-[75%] lg:leading-[3.3rem] font-extrabold text-white'>privately own crypto trading set-up</div>
              <div className='lg:w-11/12 pt-6 text-ground'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit accusamus, tenetur magni minus earum nihil neque, repellendus ullam aliquam alias pariatur aspernatur quam reiciendis debitis quibusdam similique molestias.</div>
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
          <div className='lg:w-4/5 mx-auto md:mt-48 mt-32'>
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-16 gap-20'>
              <div className='lg:col-span-1 relative'>
                <img src={thumbsupimg} className='rounded-[15px] h-[20rem] w-full object-cover object-center'></img>
                <div className='w-[9rem] h-[9.5rem] bg-[#192633] rounded-[15px] absolute top-[-4.5rem] left-0 flex justify-center flex-col items-center gap-3 pt-2 shd lg:-ml-16 -ml-2'>
                  <div className='rounded-full w-24 h-24 flex flex-col gap-1 items-center justify-center ovexp'>
                    <img src={crown} className='h-4 w-auto'></img>
                    <div className='font-extrabold text-[1.3rem] text-white'>75<span className='text-[0.6rem]'>%</span></div>
                  </div>
                  <div className='text-orange text-[0.8rem] capitalize'>overall experiences</div>
                </div>
              </div>
              <div className='lg:col-span-2'>
                <div className='text-[0.95rem] text-orange -mt-10'>About the System</div>
                <div className='text-white font-semibold capitalize text-[1.4rem] lg:text-[1.8rem] mt-4'>transparent, full-control & consistent market advantage</div>
                <div className='text-ground text-sm pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores necessitatibus voluptas qui alias quo eligendi reiciendis numquam, harum distinctio culpa illo praesentium similique veritatis dolorum pariatur dolor dignissimos molestias.</div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
                  <div className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                      <div className='flex items-center justify-center w-10 h-10 rounded-full  bg-[#192633] shd'>
                        <img src={settings} className='h-6 w-auto'></img>
                      </div>
                      <div className='text-white capitalize font-semibold text-sm'>Lorem, ipsum dolor.</div>
                    </div>
                    <div className='text-[0.8rem] text-ground pl-14'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                      <div className='flex items-center justify-center w-10 h-10 rounded-full  bg-[#192633] shd'>
                        <img src={bulb} className='h-6 w-auto'></img>
                      </div>
                      <div className='text-white capitalize font-semibold text-sm'>Lorem, ipsum dolor.</div>
                    </div>
                    <div className='text-[0.8rem] text-ground pl-14'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                </div>
                <div className='flex gap-2 mt-6 items-center'>
                  <div className='text-white text-sm'>Would love to own your set-up?</div>
                  <Link to='/signup' onClick={MoveToTop}>
                    <button className='outline-0 w-fit h-fit py-1 px-4 text-[0.8rem] text-white rounded-full bg-orange capitalize  flex gap-1 items-center font-medium hover:bg-[#642626] truncate'>
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
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-20 mt-10'>
              <Link to='/signup' onClick={MoveToTop}>
                <div className='md:w-full w-fit h-fit  bg-[#192633] hover:bg-[#1f2f3f] hover:scale-90 transition-all rounded-md p-4 flex flex-col gap-4 items-center mx-auto shd'>
                  <div className='border-2 border-[#525151] rounded-full w-16 h-16 flex text-[2.2rem] pt-2 justify-center items-center'>
                    <img src={efficient} className='h-auto w-8'></img>
                  </div>
                  <div className='text-white capitalize font-bold text-center'>artificial intelligence</div>
                  <div className=' text-ground text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                    <div>try now</div>
                    <FaLongArrowAltRight />
                  </div>
                </div>
              </Link>
              <Link to='/trading' onClick={MoveToTop}>
                <div className='md:w-full w-fit h-fit bg-[#192633] hover:bg-[#1f2f3f] hover:scale-90 transition-all rounded-md p-4 flex flex-col gap-4 items-center mx-auto shd md:-mt-10'>
                  <div className='border-2 border-[#525151] rounded-full w-16 h-16 flex text-[2.1rem] pt-4 justify-center '>
                    <img src={tplan} className='h-[1.8rem] w-auto'></img>
                  </div>
                  <div className='text-white capitalize font-bold text-center'>affordable trading plans</div>
                  <div className=' text-ground text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                  <Link to='/trading' onClick={MoveToTop}>
                    <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                      <div>see plans</div>
                      <FaLongArrowAltRight />
                    </div>
                  </Link>
                </div>
              </Link>
              <Link to='/signup' onClick={MoveToTop}>
                <div className='md:w-full w-fit h-fit bg-[#192633] hover:bg-[#1f2f3f] hover:scale-90 transition-all rounded-md p-4 flex flex-col gap-4 items-center mx-auto shd'>
                  <div className='border-2 border-[#525151] rounded-full w-16 h-16 flex text-[2.2rem] pt-2 justify-center items-center'>
                    <img src={assist} className='h-8 w-auto'></img>
                  </div>
                  <div className='text-white capitalize font-bold text-center'>trade assistance</div>
                  <div className=' text-ground text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
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