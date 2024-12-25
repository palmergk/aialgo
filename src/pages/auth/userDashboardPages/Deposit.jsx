import React, { useCallback, useEffect, useState } from 'react'
import { RiHistoryFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import moment from 'moment';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FiX } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { SiBitcoincash } from "react-icons/si";
import Dashboard from './Dashboard';
import { Apis, UserGetApi } from '../../../services/API';
import FundModal from '../../../UserComponents/DepositModals/FundModal';
import BuyPlanModal from '../../../UserComponents/DepositModals/BuyPlanModal';
import noplans from '../../../assets/images/noplans.png'
import { useSearchParams } from 'react-router-dom';
import { SlSocialDropbox } from 'react-icons/sl';


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
            const showSearch = altdeposits.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search) || moment(item.createdAt).format('h:mm').includes(search) || item.amount.toString().includes(search) || item.crypto.toLowerCase().includes(search.toLowerCase()) || item.network.toLowerCase().includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()) || item.gen_id.includes(search))
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
                <div className='flex justify-between items-center gap-4'>
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white'>{screen === 1 ? 'deposit' : 'deposit history'}</div>
                    <div className='flex gap-1 capitalize font-bold md:text-sm text-xs text-light items-center justify-center cursor-pointer' onClick={() => setScreen(screen === 1 ? 2 : 1)}>
                        <span>{screen === 1 ? 'history' : 'new deposit'}</span>
                        {screen === 1 ? <RiHistoryFill /> : <RiMoneyDollarCircleFill />}
                    </div>
                </div>
                <div className='mt-10'>
                    {screen === 1 &&
                        <div className='h-fit w-fit bg-semi-white rounded-xl relative mx-auto'>
                            {modal && <BuyPlanModal buybal={buybal} closeModal={() => setModal(false)} openModal={() => setModal2(true)} />}
                            {modal2 && <FundModal closeModal={() => setModal2(false)} setScreen={setScreen} refetchDeposits={FetchDeposits} />}
                            <div className='md:text-2xl text-xl text-black font-bold uppercase bg-white w-full h-fit py-1 px-4 rounded-t-xl border-b border-[#5BB4FD] mx-auto flex flex-col gap-2'>
                                <button className='w-fit h-fit md:text-sm text-xs font-medium py-2 px-6 capitalize bg-[#252525] rounded-lg text-white flex items-center gap-1.5 justify-center ml-auto' onClick={() => { setModal2(true) }}>
                                    <span>fund wallet</span>
                                    <SiBitcoincash />
                                </button>
                                <div className='border-t pt-2 text-center'>trading plans</div>
                            </div>
                            <div className='w-fit h-[26rem] py-6 md:px-4 px-3 overflow-y-auto overflow-x-hidden scrollDiv'>
                                {dataLoading ?
                                    <div className='grid grid-cols-2 md:gap-4 gap-3'>
                                        {new Array(4).fill(0).map((ele, i) => (
                                            <div className='md:w-52 w-36 h-64 rounded-lg bg-gray-400 animate-pulse' key={i}>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <>
                                        {tradingPlans.length > 0 ?
                                            <div className='grid grid-cols-2 md:gap-4 gap-3'>
                                                {tradingPlans.map((item, i) => (
                                                    <div key={i}>
                                                        <div className='md:w-52 w-36 h-fit rounded-lg flex flex-col text-white shantf bg-white'>
                                                            <div className='plan_bg w-full md:h-20 h-16 rounded-t-lg'>
                                                                <div className='uppercase font-extrabold text-center md:text-lg text-sm pt-4'>{item.title}</div>
                                                            </div>
                                                            <div className='-mt-6 flex flex-col gap-2 items-center justify-center'>
                                                                <div className='md:h-[5.3rem] md:w-[5.3rem] w-[4.7rem] h-[4.7rem] p-1.5 rounded-full bg-white flex items-center justify-center'>
                                                                    <div className='w-full h-full rounded-full bg-[#252525] flex flex-col gap-1 items-center justify-center'>
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
                                            <div className='flex flex-col -mt-4 items-center md:px-14 px-2'>
                                                <img src={noplans} className='md:h-80 h-72 w-auto'></img>
                                                <div className='text-center text-lg'>Oops! No trading plans yet...</div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    }
                    {screen === 2 &&
                        <>
                            <div className='relative w-fit mx-auto mb-6'>
                                <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                                <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                                    <IoIosSearch />
                                    {search !== '' &&
                                        <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-[#414040] rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                                            <FiX />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='md:w-[95%] mx-auto'>
                                {dataLoading2 ?
                                    <div className='w-full h-fit'>
                                        <div className='h-11 bg-gray-400 animate-pulse rounded-t-lg'></div>
                                        <div className='h-24 bg-slate-300 animate-pulse rounded-b-lg'></div>
                                    </div>
                                    :
                                    <>
                                        {deposits.length > 0 ?
                                            <>
                                                <div className='flex flex-col gap-4'>
                                                    {deposits.slice(start, end).map((item, i) => (
                                                        <div key={i} className='w-full h-fit relative text-semi-white rounded-lg shadow-log'>
                                                            <div className='p-4 bg-[#141220] text-sm font-medium rounded-t-lg flex justify-between gap-4'>
                                                                <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                                                                <div>ID: {item.gen_id}</div>
                                                            </div>
                                                            <div className='bg-[#1b1730] grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                                                                <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>amount:</span>
                                                                        <span>${item.amount.toLocaleString()}</span>
                                                                    </div>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>crypto:</span>
                                                                        <span>{item.crypto}</span>
                                                                    </div>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>network:</span>
                                                                        <span>{item.network}</span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-800 overflow-hidden'>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>address:</span>
                                                                        <span>{item.deposit_address?.slice(0, 5)}.....{item.deposit_address?.slice(-10)}</span>
                                                                    </div>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>status:</span>
                                                                        <span className={`${item.status === 'confirmed' && 'text-[#adad40]'} ${item.status === 'failed' && 'text-[#c42e2e]'}`}>{item.status}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='flex gap-2 items-center text-xs mt-4 justify-end text-light'>
                                                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                                                    {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                                                    {end < deposits.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                                                </div>
                                            </>
                                            :
                                            <div className='flex flex-col gap-2 justify-center items-center mt-16 text-semi-white'>
                                                <SlSocialDropbox className='text-4xl' />
                                                <div>no records found...</div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </>
                    }
                </div>
            </div >
        </Dashboard >
    )
}

export default Deposit