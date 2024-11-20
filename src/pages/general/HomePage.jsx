import React, { useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { MdOutlineDiversity2 } from "react-icons/md";
import { Link } from 'react-router-dom';
import rocket from '../../assets/images/rocket.png'
import light from '../../assets/images/light.png'
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdJoinRight, MdExpandLess, MdExpandMore } from "react-icons/md";
import { BsFillChatQuoteFill } from "react-icons/bs";
import CountComponent from '../../GeneralComponents/CountComponent';
import us from '../../assets/images/us.jfif'
import australia from '../../assets/images/austrialia.jpg'
import spanish from '../../assets/images/spanish.jfif'
import uk from '../../assets/images/uk.webp'
import blackUs from '../../assets/images/us-black.webp'
import india from '../../assets/images/india.jfif'
import { questions } from '../../utils/utils';


const HomePage = () => {
  const [faq, setFaq] = useState('')
  const [view, setView] = useState(false)

  const handleQuestions = i => {
    if (i !== faq) {
      setFaq(i)
    } else {
      setFaq('')
    }
  }

  return (
    <Pagelayout>
      <div className='bg-[#1E2833] pb-16'>
        <div className='homeBg'>
          <div className='w-11/12 mx-auto pt-20 grid grid-cols-3 lg:grid-cols-4'>
            <div className='col-span-1'>
              <div className='relative w-fit'>
                <div className='capitalize text-orange text-[0.7rem] font-medium tracking-widest '> tech & crypto</div>
                <MdOutlineDiversity2 className='text-white absolute top-0 -right-8 text-lg' />
              </div>
              <div className='capitalize text-white font-bold text-[2rem] md:text-[3rem] leading-[4rem] md:leading-[5rem] '>artificial intelligence algorithm  crypto trade</div>
              <Link to='/signup'>
                <button className='outline-0 w-fit h-fit py-1 px-6 text-[0.9rem] text-white rounded-full bg-orange capitalize mt-5 flex gap-1 items-center font-medium hover:bg-[#642626]'>
                  <MdJoinRight /><span>join</span>
                </button>
              </Link>
            </div>
            <div className='lg:col-span-3 col-span-2 '>
              <div className='w-fit h-fit border rotate-90 uppercase text-[0.85rem]  py-1 px-2 text-white font-medium tracking-[0.5rem] relative text-ellipsis text-nowrap mt-40'>
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
              <div className='text-white md:text-[2rem] text-2xl capitalize text-center font-bold'>what is the al algo trade?</div>
              <div className='text-semi-white text-[0.95rem] text-center lg:w-[60%] tracking-[0.05rem]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt ut voluptatum! Qui quae inventore non totam laudantium, error provident aliquid, repudiandae, reiciendis praesentium excepturi libero nobis nostrum a eligendi.</div>
            </div>
            <div className='lg:w-3/5 w-11/12 mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-16 '>
                <div className='flex gap-4'>
                  <img src={rocket} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-medium text-lg text-white'> Lorem, ipsum.</div>
                    <div className='text-xs text-white  tracking-[0.05rem]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, harum?</div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <img src={light} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-medium text-lg text-white'>Lorem, ipsum.</div>
                    <div className='text-white text-xs tracking-[0.05rem]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, harum?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-20 md:w-11/12 mx-auto'>
            <CountComponent />
          </div>
          <div className='mt-20 md:w-11/12 mx-auto'>
            <div className='flex flex-col gap-10'>
              <div className='relative w-fit mx-auto text-semi-white'>
                <div className='text-[2rem] md:text-[3rem] text-white font-semibold capitalize'>faq questions</div>
                <div className='border-t-4 md:w-48 w-32 absolute top-0 right-0'></div>
                <div className='border-b-4 md:w-48 w-32 absolute bottom-0 left-0'></div>
              </div>
              <div className='h-fit w-full md:px-20 xl:px-28 px-6 pt-10 pb-16 bg-gradient-to-br from-[#182531] from-55% to-[#273f5e]'>
                <div className='text-center md:text-4xl text-2xl font-bold text-white capitalize'>Trade and earn like a pro</div>
                <div className='text-center text-semi-white text-sm font-semibold md:w-3/4 mx-auto mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio illo distinctio natus minus ab quis assumenda tenetur saepe magni provident error enim alias dolorem fugit qui, neque ipsam porro repellat juvenille proceile mandete.</div>
                <div className='flex flex-col md:gap-10 gap-7 mt-10'>
                  {questions.map((item, i) => (
                    <div className={`w-full h-fit flex flex-col gap-4 text-white`} key={i}>
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
          <div className='w-11/12 lg:w-[70%] mx-auto mt-20 overflow-hidden h-fit'>
            <div className='relative w-fit mx-auto text-semi-white'>
              <div className='text-[2rem] md:text-[3rem] text-white font-semibold capitalize'>Testimonials</div>
              <div className='border-t-4 md:w-40 w-28 absolute top-0 right-0'></div>
              <div className='border-b-4 md:w-40 w-28 absolute bottom-0 left-0'></div>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-wrap items-center justify-center gap-6 mt-10'>
                <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shd'>
                  <div className='flex items-center relative'>
                    <img src={us} className='w-16 h-16 rounded-full object-cover'></img>
                    <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                  </div>
                  <div className=' text-ground text-xs text-center mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                  <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-white capitalize'>henry calvin</div>
                    <div className='text-[#c0bebe] text-[0.65rem] text-center uppercase'>nyc, us</div>
                  </div>
                </div>
                <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center  shd'>
                  <div className='flex items-center relative'>
                    <img src={australia} className='w-16 h-16 rounded-full object-cover'></img>
                    <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                  </div>
                  <div className=' text-ground text-xs text-center mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                  <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-white capitalize'>charlie brown</div>
                    <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>sydney, austrialia</div>
                  </div>
                </div>
                <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shd'>
                  <div className='flex items-center relative'>
                    <img src={spanish} className='w-16 h-16 rounded-full object-cover'></img>
                    <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                  </div>
                  <div className=' text-ground text-xs text-center mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                  <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                  <div className='flex flex-col gap-1'>
                    <div className='text-white capitalize'>carlos rivera</div>
                    <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>seville, spain</div>
                  </div>
                </div>
                {view &&
                  <>
                    <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shd'>
                      <div className='flex items-center relative'>
                        <img src={uk} className='w-16 h-16 rounded-full object-cover'></img>
                        <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                      </div>
                      <div className=' text-ground text-xs text-center mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                      <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                      <div className='flex flex-col gap-1'>
                        <div className='text-white capitalize'>arthur allen</div>
                        <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>manchester, UK</div>
                      </div>
                    </div>
                    <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shd'>
                      <div className='flex items-center relative'>
                        <img src={blackUs} className='w-16 h-16 rounded-full object-cover'></img>
                        <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                      </div>
                      <div className=' text-ground text-xs text-center mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                      <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                      <div className='flex flex-col gap-1'>
                        <div className='text-white capitalize'>jeremy davis</div>
                        <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>atlanta, us</div>
                      </div>
                    </div>
                    <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shd'>
                      <div className='flex items-center relative'>
                        <img src={india} className='w-16 h-16 rounded-full object-cover'></img>
                        <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                      </div>
                      <div className=' text-ground text-xs text-center mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                      <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                      <div className='flex flex-col gap-1'>
                        <div className='text-white capitalize'>kabir kumar</div>
                        <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>surat, india</div>
                      </div>
                    </div>
                  </>
                }
              </div>
              <div className='mx-auto'>
                <button className='w-fit h-fit px-6 py-1 bg-orange outline-none rounded-[3px] text-[0.85rem] capitalize text-white flex items-center justify-center  hover:bg-[#642626]' onClick={() => setView(!view)}>
                  <span>{!view ? 'more' : 'less'}</span>
                  {!view ? <MdExpandMore /> : <MdExpandLess />}
                </button>
              </div>
            </div>
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