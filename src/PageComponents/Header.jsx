import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logobrand.png'
import { TfiAngleDown } from "react-icons/tfi";
import { PiWindowsLogoThin } from "react-icons/pi";
import { LuBoxes } from "react-icons/lu";
import { GiBookPile } from "react-icons/gi";
import { MdMapsHomeWork, MdConnectWithoutContact, MdOutlineSecurity } from "react-icons/md";
import { HiBars4 } from "react-icons/hi2";
import { LuFileSearch } from "react-icons/lu";
import { LuX } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { MoveToTop } from '../utils/utils';


const Header = () => {
    const [toggleDrop, setToggleDrop] = useState(false)
    const [toggleDroptwo, setToggleDroptwo] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [overview, setOverview] = useState(false)
    const [company, setCompany] = useState(false)

    const styleDrop = {
        display: toggleDrop === true ? "flex" : "none"
    }
    const reverseDrop = {
        display: toggleDrop === true ? "none" : "flex"
    }
    const styleDroptwo = {
        display: toggleDroptwo === true ? 'flex' : "none"
    }
    const reverseDroptwo = {
        display: toggleDroptwo === true ? "none" : "flex"
    }

    const closer = useRef()
    const closertwo = useRef()

    useEffect(
        () => {
            if (closer) {
                window.addEventListener('click', (event) => {
                    if (closer.current !== null) {
                        if (!closer.current.contains(event.target)) {
                            setToggleDrop(false)
                        }
                    }
                }, true)
            }
        }, []
    )


    useEffect(
        () => {
            if (closertwo) {
                window.addEventListener('click', (event) => {
                    if (closertwo.current !== null) {
                        if (!closertwo.current.contains(event.target)) {
                            setToggleDroptwo(false)
                        }
                    }
                }, true)
            }
        }, []
    )

    return (
        <>
            <div className={`fixed top-0 left-0 w-full bg-[#1E2833] z-30 h-fit border-b border-[grey]`}>
                <div className={`flex items-center justify-between ${dropDown && 'border-b border-[grey]'} px-6 lg:px-8 py-2`}>
                    <div className='flex gap-20'>
                        <div>
                            <Link to='/' className='flex items-center'>
                                <img src={logo} className=' w-[4rem] h-[auto]'></img>
                                <div className='capitalize text-[white] font-bold'>the force</div>
                            </Link>
                        </div>
                        <div className='lg:flex gap-5 items-center hidden'>
                            <div className='relative '>
                                <div className=' w-fit h-fit py-[0.5rem] px-4 bg-[white] rounded-[6px]' >
                                    <div className='flex gap-1'
                                    >
                                        <PiWindowsLogoThin className='text-[1.1rem] mt-[0.1rem] text-[#1E2833]' />
                                        <div className=' text-[0.9rem] font-medium text-[#1E2833] capitalize cursor-pointer' style={reverseDrop} onClick={() => setToggleDrop(true)}>overview</div>
                                        <div className=' text-[0.9rem] font-medium text-[#1E2833] capitalize cursor-pointer' style={styleDrop}>overview</div>
                                        <TfiAngleDown className={`mt-[0.55rem] text-[0.5rem] text-[#1E2833] ${toggleDrop ? ' rotate-180' : 'rotate-0'} trans`} />
                                    </div>
                                </div>
                                <div className=' bg-white p-8 w-[40rem] h-fit absolute top-[4.2rem] left-[-10rem] shd' style={styleDrop} ref={closer}>
                                    <div className='grid grid-cols-2 gap-5 w-full'>
                                        <Link to='/trading' className='flex flex-col gap-1 hover:bg-[#929da0] rounded-lg p-2 text-[grey] lnk' onClick={MoveToTop}>
                                            <div className=' flex flex-col gap-2'>
                                                <div className='flex gap-2 items-center text-[#1E2833]'>
                                                    <LuBoxes className='mt-[0.1rem]' />
                                                    <div className='text-[0.95rem] font-medium capitalize'>trading plans</div>
                                                </div>
                                                <div className='text-[0.8rem] ml-[1.7rem]'>
                                                    View the different trading plans you can invest and trade cryptocurrency with on the AI algorithm trading system.
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to='/performances' className='flex flex-col gap-1 hover:bg-[#929da0] rounded-lg p-2 text-[grey] lnk' onClick={MoveToTop}>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex gap-2 items-center text-[#1E2833]'>
                                                    <GiBookPile className='mt-[0.2rem]' />
                                                    <div className='text-[0.95rem] font-medium capitalize'>past performances</div>
                                                </div>
                                                <div className='text-[0.8rem]  ml-[1.7rem]'>
                                                    View records of recent performances on the AI algorithm trading system and be sure of how efficient we've been.
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className=' border-r-[0.1rem] h-6'></div>
                            <div className='relative'>
                                <div className='flex gap-1  hover:text-blue-500'>
                                    <div className=' text-[0.9rem] font-medium text-white capitalize cursor-pointer' style={reverseDroptwo} onClick={() => setToggleDroptwo(true)}>company</div>
                                    <div className=' text-[0.9rem] font-medium text-white capitalize cursor-pointer' style={styleDroptwo}>company</div>
                                    <TfiAngleDown className={`mt-[0.55rem] text-[0.5rem] text-[white]  ${toggleDroptwo ? ' rotate-180' : 'rotate-0'} trans`} />
                                </div>
                                <div className='flex flex-col gap-5 bg-white py-[2rem] pl-[2.5rem] pr-3 w-[14rem] h-fit absolute top-[3.7rem] left-[-2rem] shd' ref={closertwo} style={styleDroptwo}>
                                    <Link to='/' onClick={MoveToTop} className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all'>
                                        <MdMapsHomeWork className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                        <div className='text-[#1E2833] text-[0.95rem] font-medium'>Home</div>
                                    </Link>
                                    <Link to='/contact' onClick={MoveToTop} className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all'>
                                        <MdConnectWithoutContact className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                        <div className='text-[#1E2833] text-[0.95rem] font-medium'>Contact</div>
                                    </Link>
                                    <Link to='/about' className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all' onClick={MoveToTop}>
                                        <LuFileSearch className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                        <div className='text-[#1E2833] text-[0.95rem] font-medium'>About</div>
                                    </Link>
                                    <Link to='/legal' onClick={MoveToTop} className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all'>
                                        <MdOutlineSecurity className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                        <div className='text-[#1E2833] text-[0.95rem] font-medium'>Legal & Security</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:flex gap-4 hidden'>
                        <Link to='/login' onClick={MoveToTop}>
                            <button className=' outline-0 w-fit h-fit py-1 px-6 border-2 text-[0.9rem] text-[white] font-medium rounded-lg border-orange hover:bg-orange hover:text-[white] flex items-center justify-center'>Sign In</button>
                        </Link>
                        <Link to='/signup' onClick={MoveToTop}>
                            <button className=' outline-0 w-fit h-fit py-1 px-6 text-[0.9rem] text-[white] rounded-lg bg-orange hover:bg-[#1E2833] border-2 border-orange hover:border-orange font-medium flex items-center justify-center' >Sign Up</button>
                        </Link>
                    </div>
                    <div className='relative lg:hidden'>
                        <div className='text-white text-3xl cursor-pointer' onClick={() => setDropDown(!dropDown)}>
                            {!dropDown ? <HiBars4 />
                                :
                                <LuX />}
                        </div>
                    </div>
                </div>
                {dropDown && <div className='flex flex-col'>
                    <div className='flex flex-col '>
                        <div className={`${overview && 'bg-[#25303d]'}`}>
                            <div className='flex justify-between items-center text-white border-b border-[grey] px-6 py-5 cursor-pointer' onClick={() => { setOverview(!overview); setCompany(false) }}>
                                <div className='flex items-center gap-2 '>
                                    <PiWindowsLogoThin className='text-lg' />
                                    <span className='text-[0.9rem] font-medium capitalize'>overview</span>
                                </div>
                                <TfiAngleDown className={`text-sm ${overview ? ' rotate-180' : 'rotate-0'} trans`} />
                            </div>
                            {overview && <div className='flex flex-col gap-3 border-b border-[grey] px-6 py-5'>
                                <Link to='/trading' className='flex flex-col gap-1 hover:bg-[#303e4d] p-2 ' onClick={MoveToTop}>
                                    <div className=' flex flex-col gap-2 text-white'>
                                        <div className='flex gap-2 items-center'>
                                            <LuBoxes className='mt-[0.1rem] text-[#4b6f96]' />
                                            <div className='text-[0.95rem] font-medium capitalize'>trading plans</div>
                                        </div>
                                        <div className='text-[0.8rem] text-[#c2c1c1] ml-[1.7rem]'>
                                            View the different trading plans you can invest and trade cryptocurrency with on the AI algorithm trading system.
                                        </div>
                                    </div>
                                </Link>
                                <Link to='/performances' className='flex flex-col gap-2 hover:bg-[#303e4d] p-2' onClick={MoveToTop}>
                                    <div className='flex flex-col gap-2 text-white'>
                                        <div className='flex gap-2 items-center'>
                                            <GiBookPile className=' mt-[0.2rem] text-[#4b6f96]' />
                                            <div className='text-[0.95rem] font-medium capitalize'>past performances</div>
                                        </div>
                                        <div className='text-[0.8rem] text-[#c2c1c1] ml-[1.7rem]'>
                                            View records of recent performances on the AI algorithm trading system and be sure of how efficient we've been.
                                        </div>
                                    </div>
                                </Link>
                            </div>}
                        </div>
                        <div className={`${company && 'bg-[#25303d]'}`}>
                            <div className='flex justify-between items-center text-white border-b border-[grey] px-6 py-5 cursor-pointer' onClick={() => { setCompany(!company); setOverview(false) }}>
                                <span className='text-[0.9rem] font-medium capitalize'>company</span>
                                <TfiAngleDown className={`text-sm ${company ? ' rotate-180' : 'rotate-0'} trans`} />
                            </div>
                            {company && <div className='flex flex-col gap-8 px-6 py-5'>
                                <Link to='/' onClick={MoveToTop} className='flex gap-2 items-center text-white w-fit'>
                                    <MdMapsHomeWork className='text-[1.2rem] text-[#4b6f96] mt-[0.1rem]' />
                                    <div className='text-[0.9rem] font-medium hover:text-[#4b6f96]'>Home</div>
                                </Link>
                                <Link to='/contact' onClick={MoveToTop} className='flex gap-2 items-center text-white w-fit'>
                                    <MdConnectWithoutContact className='text-[1.2rem] text-[#4b6f96] mt-[0.1rem]' />
                                    <div className='text-[0.9rem] font-medium hover:text-[#4b6f96]'>Contact</div>
                                </Link>
                                <Link to='/about' className='flex gap-2 items-center text-white w-fit' onClick={MoveToTop}>
                                    <LuFileSearch className='text-[1.2rem] text-[#4b6f96] mt-[0.1rem]' />
                                    <div className='text-[0.9rem] font-medium hover:text-[#4b6f96]'>About</div>
                                </Link>
                                <Link to='/legal' onClick={MoveToTop} className='flex gap-2 items-center text-white w-fit'>
                                    <MdOutlineSecurity className='text-[1.2rem] text-[#4b6f96] mt-[0.1rem]' />
                                    <div className='text-[0.9rem] font-medium hover:text-[#4b6f96]'>Legal & Security</div>
                                </Link>
                            </div>}
                        </div>
                    </div>
                    <div className='flex gap-8 justify-center py-8'>
                        <Link to='/login' onClick={MoveToTop}>
                            <button className=' outline-0 w-fit h-fit py-1 px-6 border-2 text-[0.9rem] text-[white] font-medium rounded-lg border-orange hover:bg-orange hover:text-[white] flex items-center justify-center'>Sign In</button>
                        </Link>
                        <Link to='/signup' onClick={MoveToTop}>
                            <button className=' outline-0 w-fit h-fit py-1 px-6 text-[0.9rem] text-[white] rounded-lg bg-orange hover:bg-[#1E2833] border-2 border-orange hover:border-orange font-medium flex items-center justify-center' >Sign Up</button>
                        </Link>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Header