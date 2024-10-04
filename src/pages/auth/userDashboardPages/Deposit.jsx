import React, { useCallback, useEffect, useState } from 'react'
import { RiHistoryFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import moment from 'moment';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FiX } from "react-icons/fi";
import nothnyet from '../../../assets/images/nothn.png'
import { BsCurrencyDollar } from "react-icons/bs";
import { SiBitcoincash } from "react-icons/si";
import Dashboard from './Dashboard';
import { Apis, UserGetApi } from '../../../services/API';
import FundModal from '../../../UserComponents/DepositModals/FundModal';
import BuyPlanModal from '../../../UserComponents/DepositModals/BuyPlanModal';
import noplans from '../../../assets/images/noplans.png'
import { useSearchParams } from 'react-router-dom';


const Deposit = () => {
    const [searchParams] = useSearchParams()
    const params = searchParams.get('screen')
    const [screen, setScreen] = useState(params ? parseInt(params) : 1)
    const [tradingPlans, setTradingPlans] = useState([])
    const [original, setOriginal] = useState([])
    const [deposits, setDeposits] = useState([])
    const [search, setSearch] = useState('')
    const [buybal, setBuyBal] = useState({})
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)
    const [dataLoading, setDataLoading] = useState(true)
    const [dataLoading2, setDataLoading2] = useState(true)

    useEffect(() => {
        const FetchTradingPlans = async () => {
            try {
                const response = await UserGetApi(Apis.admin.get_trading_plans)
                if (response.status === 200) {
                    setTradingPlans(response.msg)
                }

            } catch (error) {
                //
            } finally {
                setDataLoading(false)
            }
        }
        FetchTradingPlans()
    }, [])


    const FetchDeposits = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.deposit.user_deposits)
            if (response.status === 200) {
                setDeposits(response.msg)
                setOriginal(response.msg)
                setpageend(response.msg.length / 6)
                setpagestart(1)
                setStart(0)
                setEnd(6)
            }

        } catch (error) {
            //
        } finally {
            setDataLoading2(false)
        }
    }, [])

    useEffect(() => {
        FetchDeposits()
    }, [FetchDeposits])

    const HandleSearch = () => {
        const altdeposits = original
        if (!search) {
            setDeposits(original)
            setpageend(original.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            const showSearch = altdeposits.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search) || moment(item.createdAt).format('h:mm').includes(search) || item.amount.toString().includes(search) || item.crypto.toLowerCase().includes(search.toLowerCase()) || item.network.toLowerCase().includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
            setDeposits(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setDeposits(original)
        setpageend(original.length / 6)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < deposits.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend += 6
            setEnd(altend)
            altstart += 6
            setStart(altstart)
            altlengthstart += 1
            setpagestart(altlengthstart)
        }
    }

    let BackPage = () => {

        if (end > 6) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend -= 6
            setEnd(altend)
            altstart -= 6
            setStart(altstart)
            altlengthstart -= 1
            setpagestart(altlengthstart)
        }
    }


    return (
        <Dashboard>
            <div>
                <div className='flex justify-between items-center'>
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{screen === 1 ? 'deposit' : 'deposit history'}</div>
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => setScreen(screen === 1 ? 2 : 1)}>
                        <span>{screen === 1 ? 'history' : 'new deposit'}</span>
                        {screen === 1 ? <RiHistoryFill /> : <RiMoneyDollarCircleFill />}
                    </div>
                </div>
                {screen === 1 &&
                    <div className='flex justify-center'>
                        <div className='mt-10 h-fit w-fit bg-semi-white rounded-xl relative shlz'>
                            {modal && <BuyPlanModal buybal={buybal} closeModal={() => setModal(false)} openModal={() => setModal2(true)} />}
                            {modal2 && <FundModal closeModal={() => setModal2(false)} setScreen={setScreen} refetchDeposits={FetchDeposits} />}
                            <div className='md:text-2xl text-xl text-black font-bold uppercase bg-white w-full h-fit py-1 px-4 rounded-b-sm rounded-t-xl border-b border-[#5BB4FD] mx-auto flex flex-col gap-2'>
                                <button className='w-fit h-fit md:text-sm text-xs font-medium py-2 px-6 capitalize bg-[#252525] rounded-lg text-white flex items-center gap-1.5 justify-center ml-auto' onClick={() => { setModal2(true) }}>
                                    <span>fund wallet</span>
                                    <SiBitcoincash />
                                </button>
                                <div className='border-t pt-2 text-center'>trading plans</div>
                            </div>
                            <div className={`w-fit h-[26rem] py-6 md:px-4 px-3 overflow-x-hidden ${modal || modal2 ? 'overflow-y-hidden' : 'overflow-y-auto'} scrollDiv`}>
                                {dataLoading ?
                                    <div className='grid grid-cols-2 md:gap-4 gap-2 justify-center'>
                                        {new Array(4).fill(0).map((ele, i) => (
                                            <div className='md:w-52 w-36 h-64 rounded-lg bg-gray-400 animate-pulse' key={i}>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <>
                                        {tradingPlans.length > 0 ?
                                            <div className='grid grid-cols-2 md:gap-4 gap-2 justify-center items-center'>
                                                {tradingPlans.map((item, i) => (
                                                    <div key={i}>
                                                        <div className='md:w-52 w-36 h-fit rounded-lg flex flex-col text-white shantf bg-white'>
                                                            <div className='plan_bg w-full md:h-20 h-16 rounded-t-lg'>
                                                                <div className='uppercase font-[800]  text-center md:text-[1.1rem] text-sm pt-4'>{item.title}</div>
                                                            </div>
                                                            <div className='-mt-6 flex flex-col gap-2 items-center justify-center'>
                                                                <div className='md:h-[5.3rem] md:w-[5.3rem] w-[4.7rem] h-[4.7rem] rounded-full bg-white flex items-center justify-center'>
                                                                    <div className='md:h-[4.5rem] md:w-[4.5rem] w-[3.9rem] h-[3.9rem] rounded-full bg-[#252525] flex flex-col gap-1 items-center justify-center'>
                                                                        <div className='italic md:text-[0.65rem] text-[0.6rem]'>from</div>
                                                                        <div className='flex items-center font-bold gap-[0.1rem] text-[#5BB4FD] md:text-base text-sm'>
                                                                            <BsCurrencyDollar className='-mt-0.5' />
                                                                            <div className='md:text-base text-sm -ml-1'>{item.price_start.toLocaleString()}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='text-xs text-[#252525] font-semibold text-center w-11/12 border border-dashed border-[#c0c0c0] py-1 rounded-md'>
                                                                    {item.profit_return}% profit return on investment plus bonus up to ${item.plan_bonus.toLocaleString()}
                                                                </div>
                                                                <div className='text-[0.7rem] text-[#252525] font-semibold w-11/12 flex gap-2 items-center justify-center italic'>
                                                                    <span>Duration:</span>
                                                                    <span className='text-[#5BB4FD]'>{item.duration + item.duration_type}</span>
                                                                </div>
                                                                <div className='mb-4 mt-2'>
                                                                    <button className='w-fit h-fit py-1.5 md:px-6 px-4 rounded-full bg-[#5BB4FD] text-white uppercase font-bold md:text-[0.65rem] text-[0.6rem]' onClick={() => { setBuyBal(item); setModal(true) }}>
                                                                        buy now
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            :
                                            <div className='flex flex-col -mt-4 items-center md:px-14 px-1'>
                                                <img src={noplans} className='md:h-80 h-72 w-auto'></img>
                                                <div className='text-center text-lg'>Oops! No trading plans yet...</div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                }
                {screen === 2 &&
                    <div className='mt-10'>
                        <div className='relative w-fit mx-auto'>
                            <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                            <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                                <IoIosSearch />
                                {search !== '' &&
                                    <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-[#414040] rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                                        <FiX />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='relative overflow-x-auto shadow-md rounded-lg mt-4 scrollsdown'>
                            <table className='w-full'>
                                <thead >
                                    <tr className='bg-light text-[0.8rem] font-bold text-white'>
                                        <td className='text-center truncate  capitalize p-2'>date</td>
                                        <td className='text-center truncate  capitalize p-2'>time</td>
                                        <td className='text-center truncate  capitalize p-2'>amount</td>
                                        <td className='text-center truncate  capitalize p-2'>crypto</td>
                                        <td className='text-center truncate  capitalize p-2'>network</td>
                                        <td className='text-center truncate  capitalize p-2'>address</td>
                                        <td className='text-center truncate  capitalize p-2'>status </td>
                                    </tr>
                                </thead>
                                {dataLoading2 ?
                                    <tbody>
                                        <tr className='bg-gray-400 animate-pulse h-10'>
                                            <td colSpan="7"></td>
                                        </tr>
                                    </tbody>
                                    :
                                    <>
                                        {deposits.length > 0 ?
                                            <tbody>
                                                {deposits.slice(start, end).map((item, i) => (
                                                    <tr className='text-[0.8rem] text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                                        <td className='p-4 text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                                        <td className='p-4 text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                                        <td className='p-4 text-center truncate'>${item.amount.toLocaleString()}</td>
                                                        <td className='p-4 text-center truncate'> {item.crypto}</td>
                                                        <td className='p-4 text-center truncate'> {item.network}</td>
                                                        <td className='p-4  text-center truncate'>{item.deposit_address?.slice(0, 5)}.....{item.deposit_address?.slice(-10)} </td>
                                                        <td className={`p-4  text-center truncate italic ${item.status === 'confirmed' && 'text-[#adad40]'}  ${item.status === 'pending' && 'text-[#6f6ff5]'}  ${item.status === 'failed' && 'text-[#eb4242] '} `}>{item.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className='text-semi-white text-[0.8rem] bg-[#272727] '>
                                                    <td colSpan="7" className='py-2 italic text-center truncate'>
                                                        <div className='flex gap-1 items-center justify-center'>
                                                            <span>no deposits found...</span>
                                                            <img src={nothnyet} className='h-4 w-auto'></img>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                    </>
                                }
                            </table>
                        </div>
                        {deposits.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-light '>
                            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                            {end < deposits.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                        </div>}
                    </div>
                }
            </div >
        </Dashboard >
    )
}

export default Deposit