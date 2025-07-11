import React, { useCallback, useEffect, useState } from 'react'
import { BsCurrencyDollar } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import moment from 'moment';
import { FiX } from 'react-icons/fi';
import investbg from '../../../assets/images/investbg.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Dashboard from './Dashboard';
import { Link, useSearchParams } from 'react-router-dom';
import { Apis, UserGetApi } from '../../../services/API';
import ClaimButtons from '../../../UserComponents/ClaimButtons';
import { MoveToTop } from '../../../utils/utils';
import lines from '../../../assets/images/lines2.png'
import { LuFileStack } from 'react-icons/lu';
import { SlSocialDropbox } from 'react-icons/sl';


const Investment = () => {
    const [searchParams] = useSearchParams()
    const params = searchParams.get('screen')
    const [screen, setScreen] = useState(params ? parseInt(params) : 1)
    const [original, setOriginal] = useState([])
    const [investments, setInvestments] = useState([])
    const [investmentsUnclaim, setInvestsUnclaim] = useState([])
    const [search, setSearch] = useState('')
    const [dataLoading, setDataLoading] = useState(true)
    const [dataLoading2, setDataLoading2] = useState(true)
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 6
    const totalPages = Math.ceil(investments.length / perPage)
    const startIndex = (currentPage - 1) * perPage
    const currentInvestments = investments.slice(startIndex, startIndex + perPage)


    const FetchInvestmentUnclaim = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.investment.user_unclaim)
            if (response.status === 200) {
                setInvestsUnclaim(response.msg)
            }

        } catch (error) {
        } finally {
            setDataLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchInvestmentUnclaim()
    }, [FetchInvestmentUnclaim])

    const FetchInvestment = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.investment.user_investment)
            if (response.status === 200) {
                setInvestments(response.msg)
                setOriginal(response.msg)
            }

        } catch (error) {
        } finally {
            setDataLoading2(false)
        }
    }, [])

    useEffect(() => {
        FetchInvestment()
    }, [FetchInvestment])


    const HandleSearch = () => {
        const altinvestments = original
        if (!search) {
            setInvestments(original)
        } else {
            setCurrentPage(1)
            const showSearch = altinvestments.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search) || moment(item.createdAt).format('h:mm').includes(search) || item.amount.toString().includes(search) || item.trading_plan.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()) || item.claim.includes(search.toLowerCase()) || item.gen_id.includes(search))
            setInvestments(showSearch)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setCurrentPage(1)
        setInvestments(original)
    }

    const ChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }


    return (
        <Dashboard>
            <div>
                <div className='flex justify-between items-center gap-4'>
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white'>{screen === 1 ? 'investment' : 'investment history'}</div>
                    <div className='flex gap-1 capitalize font-bold md:text-sm text-xs text-light items-center justify-center cursor-pointer' onClick={() => setScreen(screen === 1 ? 2 : 1)}>
                        <span>{screen === 1 ? 'history' : 'investments'}</span>
                        {screen === 1 ? <RiHistoryFill /> : <LuFileStack />}
                    </div>
                </div>
                <div className='mt-10'>
                    {screen === 1 &&
                        <>
                            {dataLoading ?
                                <div className='flex flex-col gap-10'>
                                    {new Array(2).fill(0).map((ele, i) => (
                                        <div className='flex flex-col gap-4' key={i}>
                                            <div className='w-28 h-2 bg-slate-300 animate-pulse rounded-full'></div>
                                            <div className='grid md:grid-cols-4 grid-cols-2 gap-4 items-center justify-center'>
                                                {new Array(4).fill(0).map((ele, i) => (
                                                    <div className='w-full h-20 rounded-[10px] bg-slate-300 animate-pulse' key={i}>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='rounded-full w-32 h-9 bg-slate-300 animate-pulse'></div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <>
                                    {investmentsUnclaim.length > 0 ?
                                        <div className='flex flex-col gap-10'>
                                            {investmentsUnclaim.map((item, i) => (
                                                <div className='flex flex-col gap-4' key={i}>
                                                    <div className='flex gap-2 items-center'>
                                                        <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('DD-MM-yyyy')}</div>
                                                        <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('h:mma')}</div>
                                                    </div>
                                                    <div className='grid md:grid-cols-4 grid-cols-2 gap-4 items-center justify-center'>
                                                        <div className='w-full h-full overflow-hidden rounded-[10px] flex flex-col md:text-lg text-[0.9rem] py-2 px-2 text-semi-white gap-2 bg-[#6859bb]'>
                                                            <div className='capitalize md:text-sm text-xs font-[600]'>amount</div>
                                                            <div className='flex justify-between items-center gap-2 font-bold'>
                                                                <div className='flex items-center'>
                                                                    <BsCurrencyDollar />
                                                                    <div className='-ml-1'>{item.amount.toLocaleString()}</div>
                                                                </div>
                                                                <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-full overflow-hidden rounded-[10px] flex flex-col md:text-lg text-[0.9rem] py-2 px-2 text-semi-white gap-2 border border-[grey] bg-[#130e27]'>
                                                            <div className='flex justify-between'>
                                                                <div className='capitalize md:text-sm text-xs font-[600]'>profit/ROI</div>
                                                                <div className={`italic md:text-xs text-[0.65rem] ${item.status === 'running' ? 'text-[#6f6ff5]' : 'text-[#adad40]'}`}>{item.status}</div>
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2 font-bold'>
                                                                <div className='flex items-center'>
                                                                    <BsCurrencyDollar />
                                                                    <div className='-ml-1'>{item.profit.toLocaleString()}</div>
                                                                </div>
                                                                <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-full overflow-hidden rounded-[10px] flex flex-col md:text-lg text-[0.9rem] py-2 px-2 text-semi-white gap-2 border border-[grey] bg-[#130e27]'>
                                                            <div className='flex justify-between'>
                                                                <div className='capitalize md:text-sm text-xs font-[600]'>bonus</div>
                                                                <div className={`italic md:text-xs text-[0.65rem] ${item.status === 'running' ? 'text-[#6f6ff5]' : 'text-[#adad40]'}`}>{item.status}</div>
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2 font-bold'>
                                                                <div>
                                                                    <div className='flex items-center'>
                                                                        <BsCurrencyDollar />
                                                                        <div className='-ml-1'>{item.bonus.toLocaleString()}</div>
                                                                    </div>
                                                                </div>
                                                                <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-full overflow-hidden rounded-[10px] flex flex-col md:text-sm text-xs py-2 px-2 text-semi-white gap-2 bg-[#6859bb]'>
                                                            <div className='font-[600] capitalize'>trading plan</div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <div className='capitalize font-bold'>{item.trading_plan}</div>
                                                                <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ClaimButtons item={item} refetchInvestments={FetchInvestment} refetchInvestmentsUnclaim={FetchInvestmentUnclaim} />
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        <div className='w-fit h-fit rounded-xl flex flex-col items-center justify-center py-4 px-8 md:px-16 text-semi-white gap-4 border border-dashed border-[grey] bg-[#130e27] mx-auto'>
                                            <div className='md:text-xl text-base italic'>No new investment made</div>
                                            <img src={investbg} className='md:w-80 w-52 h-auto'></img>
                                            <Link to='/dashboard/deposit' onClick={() => MoveToTop()}>
                                                <button className='outline-none w-fit h-fit py-2 px-6 md:text-sm text-xs text-white font-medium bg-light rounded-full flex items-center gap-3 mt-4'>
                                                    <span>Buy New</span>
                                                    <div className='buynew'></div>
                                                </button>
                                            </Link>
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }
                    {screen === 2 &&
                        <>
                            <div className='relative w-fit mx-auto mb-6'>
                                <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                                <div className='text-[1.2rem] text-white absolute top-[-0.5rem] right-[-0.5rem] w-[2.5rem] h-10 rounded-full flex items-center justify-center bg-light shlz'>
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
                                        {investments.length > 0 ?
                                            <>
                                                <div className='flex flex-col gap-4'>
                                                    {currentInvestments.map((item, i) => (
                                                        <div key={i} className='w-full h-fit relative text-semi-white  rounded-lg shadow-log'>
                                                            <div className='p-4 bg-[#141220] text-sm rounded-t-lg font-medium flex justify-between gap-4'>
                                                                <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mma')}</div>
                                                                <div>ID: {item.gen_id}</div>
                                                            </div>
                                                            <div className='bg-[#1b1730] grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                                                                <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>amount:</span>
                                                                        <span>${item.amount.toLocaleString()}</span>
                                                                    </div>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>plan:</span>
                                                                        <span>{item.trading_plan}</span>
                                                                    </div>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>profit:</span>
                                                                        <span>${item.profit.toLocaleString()}</span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-800 overflow-hidden'>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>bonus:</span>
                                                                        <span>${item.bonus.toLocaleString()}</span>
                                                                    </div>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>status:</span>
                                                                        <span className={`${item.status === 'completed' && 'text-[#adad40]'}`}>{item.status}</span>
                                                                    </div>
                                                                    <div className='flex justify-between gap-4'>
                                                                        <span>claim:</span>
                                                                        <span className={`${item.claim === 'true' && 'text-[#adad40]'}`}>{item.claim}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='flex gap-2 items-center text-xs mt-4 justify-end text-light '>
                                                    {currentPage > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={() => ChangePage(currentPage - 1)}><FaAngleLeft /></div>}
                                                    {totalPages > 1 && <div className='font-bold text-[grey]'>{currentPage} of {totalPages}</div>}
                                                    {currentPage < totalPages && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={() => ChangePage(currentPage + 1)}><FaAngleRight /></div>}
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
            </div>
        </Dashboard>
    )
}

export default Investment