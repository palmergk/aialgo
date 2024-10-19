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
    const [investment, setInvestment] = useState([])
    const [investmentUnclaim, setInvestUnclaim] = useState([])
    const [search, setSearch] = useState('')
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)
    const [dataLoading, setDataLoading] = useState(true)
    const [dataLoading2, setDataLoading2] = useState(true)


    const FetchInvestmentUnclaim = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.investment.user_unclaim)
            if (response.status === 200) {
                setInvestUnclaim(response.msg)
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
                setInvestment(response.msg)
                setOriginal(response.msg)
                setpageend(response.msg.length / 6)
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
        const altinvestment = original
        if (!search) {
            setInvestment(original)
            setpageend(original.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)

        } else {
            const showSearch = altinvestment.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search) || moment(item.createdAt).format('h:mm').includes(search) || item.amount.toString().includes(search) || item.trading_plan.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()) || item.claim.includes(search.toLowerCase()) || item.gen_id.includes(search))
            setInvestment(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setInvestment(original)
        setpageend(original.length / 6)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < investment.length) {
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
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{screen === 1 ? 'investment' : 'investment history'}</div>
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => setScreen(screen === 1 ? 2 : 1)}>
                        <span>{screen === 1 ? 'history' : 'investments'}</span>
                        {screen === 1 ? <RiHistoryFill /> : <LuFileStack />}
                    </div>
                </div>
                {screen === 1 &&
                    <>
                        {dataLoading ?
                            <>
                                {new Array(2).fill(0).map((ele, i) => (
                                    <div className='flex flex-col gap-4 mt-10' key={i}>
                                        <div className='w-28 h-2 bg-slate-300 animate-pulse rounded-full'></div>
                                        <div className='flex flex-wrap gap-4 items-center justify-center'>
                                            {new Array(4).fill(0).map((ele, i) => (
                                                <div className='md:w-44 w-[9.5rem] h-20 rounded-[10px] bg-slate-300 animate-pulse' key={i}>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='rounded-full w-32 h-9 bg-slate-300 animate-pulse'></div>
                                    </div>
                                ))}
                            </>
                            :
                            <>
                                <div>
                                    {investmentUnclaim.length > 0 ? <div>
                                        {investmentUnclaim.map((item, i) => (
                                            <div className='flex flex-col gap-4 mt-10' key={i}>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('DD-MM-yyyy')}</div>
                                                    <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('h:mm')}</div>
                                                </div>
                                                <div className='flex flex-wrap gap-4 items-center justify-center'>
                                                    <div className='md:w-44 w-[9.5rem] overflow-hidden h-fit rounded-[10px] flex flex-col md:text-lg text-[0.9rem] py-2 px-2 text-semi-white gap-2 bg-[#6859bb]'>
                                                        <div className='capitalize md:text-[0.9rem] text-xs font-[600]'>amount</div>
                                                        <div className='flex justify-between items-center gap-2 font-bold'>
                                                            <div className='flex items-center'>
                                                                <BsCurrencyDollar />
                                                                <div className='-ml-1'>{item.amount.toLocaleString()}</div>
                                                            </div>
                                                            <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                        </div>
                                                    </div>
                                                    <div className='md:w-44 w-[9.5rem] overflow-hidden h-fit rounded-[10px] flex flex-col md:text-lg text-[0.9rem] py-2 px-2 text-semi-white gap-2 border border-[grey] bg-[#130e27]'>
                                                        <div className='flex justify-between'>
                                                            <div className='capitalize md:text-[0.9rem] text-xs font-[600]'>profit/ROI</div>
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
                                                    <div className='md:w-44 w-[9.5rem] overflow-hidden h-fit rounded-[10px] flex flex-col md:text-lg text-[0.9rem] py-2 px-2 text-semi-white gap-2 border border-[grey] bg-[#130e27]'>
                                                        <div className='flex justify-between'>
                                                            <div className='capitalize md:text-[0.9rem] text-xs font-[600]'>bonus</div>
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
                                                    <div className='md:w-44 w-[9.5rem] overflow-hidden h-fit rounded-[10px] flex flex-col md:text-[0.9rem] text-xs py-2 px-2 text-semi-white gap-2 bg-[#6859bb]'>
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
                                        <div className='mt-16'>
                                            <div className='w-fit h-fit rounded-xl flex flex-col items-center justify-center py-4 px-8 md:px-16 text-semi-white gap-4 border border-dashed border-[grey] bg-[#130e27] mx-auto'>
                                                <div className='md:text-xl text-base italic'>No new investment made</div>
                                                <img src={investbg} className='md:w-80 w-52 h-auto'></img>
                                                <Link to='/dashboard/deposit' onClick={() => MoveToTop()}>
                                                    <button className='outline-none w-fit h-fit py-2 px-6 md:text-sm text-xs text-white font-medium bg-light rounded-full flex items-center gap-3 mt-4'>
                                                        <span>Make new</span>
                                                        <div className='makenew'></div>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                        }
                    </>
                }
                {screen === 2 &&
                    <div className='mt-10'>
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
                        {dataLoading2 ?
                            <div className='w-full h-fit'>
                                <div className='h-11 bg-gray-400 animate-pulse rounded-t-lg'></div>
                                <div className='h-24 bg-slate-300 animate-pulse rounded-b-lg'></div>
                            </div>
                            :
                            <div className='md:w-[95%] mx-auto'>
                                {investment.length > 0 ?
                                    <div className='flex flex-col gap-4'>
                                        {investment.slice(start, end).map((item, i) => (
                                            <div key={i} className='w-full h-fit relative text-semi-white  rounded-lg hstsha'>
                                                <div className='p-4 bg-[#141220] text-sm rounded-t-lg font-medium flex justify-between gap-4'>
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
                                    :
                                    <div className='flex flex-col gap-2 justify-center items-center mt-16 text-semi-white'>
                                        <SlSocialDropbox className='text-4xl' />
                                        <div>no records found...</div>
                                    </div>
                                }
                            </div>
                        }
                        {investment.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-light '>
                            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                            {end < investment.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                        </div>}
                    </div>
                }
            </div>
        </Dashboard>
    )
}

export default Investment