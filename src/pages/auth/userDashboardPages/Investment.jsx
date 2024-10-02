import React, { useCallback, useEffect, useState } from 'react'
import { BsCurrencyDollar } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { IoListOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import moment from 'moment';
import { FiX } from 'react-icons/fi';
import investbg from '../../../assets/images/investbg.png'
import nothnyet from '../../../assets/images/nothn.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Dashboard from './Dashboard';
import { Link, useSearchParams } from 'react-router-dom';
import { Apis, UserGetApi } from '../../../services/API';
import ClaimButtons from '../../../UserComponents/ClaimButtons';
import { MoveToTop } from '../../../utils/utils';
import lines from '../../../assets/images/lines2.png'


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
            const showSearch = altinvestment.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search) || moment(item.createdAt).format('h:mm').includes(search) || item.amount.toString().includes(search) || item.trading_plan.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()) || item.claim.includes(search.toLowerCase()))
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
                <div className='flex justify-between items-center'>
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{screen === 1 ? 'investment' : 'investment history'}</div>
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => setScreen(screen === 1 ? 2 : 1)}>
                        <span>{screen === 1 ? 'history' : 'my investments'}</span>
                        {screen === 1 ? <RiHistoryFill /> : <IoListOutline />}
                    </div>
                </div>
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
                        {screen === 1 &&
                            <div>
                                {investmentUnclaim.length > 0 ? <div>
                                    {investmentUnclaim.map((item, i) => (
                                        <div className='flex flex-col gap-4 mt-10' key={i}>
                                            <div className='flex gap-2 items-center'>
                                                <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('DD-MM-yyyy')}</div>
                                                <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('h:mm')}</div>
                                            </div>
                                            <div className='flex flex-wrap gap-4 items-center justify-center'>
                                                <div className='md:w-44 w-[9.5rem] h-fit rounded-[10px] flex flex-col md:text-[1.2rem] py-2 px-2 text-semi-white gap-2 bg-[#6859bb]'>
                                                    <div className='capitalize md:text-[0.9rem] text-sm font-[600]'>amount</div>
                                                    <div className='flex justify-between items-center font-bold'>
                                                        <div className='flex items-center'>
                                                            <BsCurrencyDollar className="-mt-0.5" />
                                                            <div className='-ml-1'>{item.amount.toLocaleString()}</div>
                                                        </div>
                                                        <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                    </div>
                                                </div>
                                                <div className='md:w-44 w-[9.5rem] h-fit rounded-[10px] flex flex-col md:text-[1.2rem] py-2  px-2 text-semi-white gap-2 border border-[grey] bg-[#130e27]'>
                                                    <div className='flex justify-between'>
                                                        <div className='capitalize md:text-[0.9rem] text-sm font-[600]'>profit/ROI</div>
                                                        <div className={`italic md:text-[0.8rem] text-xs ${item.status === 'running' ? 'text-[#6f6ff5]' : 'text-[#adad40]'}`}>{item.status}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center font-bold'>
                                                        <div className='flex items-center'>
                                                            <BsCurrencyDollar className="-mt-0.5" />
                                                            <div className='-ml-1'>{item.profit.toLocaleString()}</div>
                                                        </div>
                                                        <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                    </div>
                                                </div>
                                                <div className='md:w-44 w-[9.5rem] h-fit rounded-[10px] flex flex-col md:text-[1.2rem] py-2  px-2 text-semi-white gap-2 border border-[grey] bg-[#130e27]'>
                                                    <div className='flex justify-between'>
                                                        <div className='capitalize md:text-[0.9rem] text-sm font-[600]'>bonus</div>
                                                        <div className={`italic md:text-[0.8rem] text-xs ${item.status === 'running' ? 'text-[#6f6ff5]' : 'text-[#adad40]'}`}>{item.status}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center font-bold'>
                                                        <div>
                                                            <div className='flex items-center'>
                                                                <BsCurrencyDollar className="-mt-0.5" />
                                                                <div className='-ml-1'>{item.bonus.toLocaleString()}</div>
                                                            </div>
                                                        </div>
                                                        <img src={lines} className='md:w-16 w-12 h-auto'></img>
                                                    </div>
                                                </div>
                                                <div className='md:w-44 w-[9.5rem] h-fit rounded-[10px] flex flex-col md:text-[0.9rem] text-sm py-2  px-2 text-semi-white gap-2 font-bold bg-[#6859bb]'>
                                                    <div className='font-[600] capitalize'>investment plan</div>
                                                    <div className='flex justify-between items-center'>
                                                        <div>
                                                            <div className='flex gap-1 items-center'>
                                                                <div className='capitalize'>{item.trading_plan}</div>
                                                            </div>
                                                        </div>
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
                                        <div className='w-fit h-fit rounded-xl flex flex-col items-center justify-center py-4 px-8 md:px-16  text-semi-white gap-4 border border-dashed border-[grey] bg-[#130e27] mx-auto'>
                                            <div className='md:text-[1.2rem] text-base italic'>No new investment made</div>
                                            <img src={investbg} className='md:w-80 w-52 h-auto'></img>
                                            <Link to='/dashboard/deposit' onClick={() => MoveToTop()}>
                                                <button className='outline-none w-fit h-fit py-2 px-6 md:text-[0.85rem] text-xs text-white font-medium bg-light rounded-full flex items-center gap-3 mt-4'>
                                                    <span>Make new</span>
                                                    <div className='makenew'></div>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </>
                }
                {screen === 2 &&
                    <div className='mt-10'>
                        <div className='relative w-fit mx-auto'>
                            <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                            <div className='text-[1.2rem] text-white absolute top-[-0.5rem] right-[-0.5rem] w-[2.5rem] h-10 rounded-full flex items-center justify-center bg-light shlz'>
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
                                        <td className='text-center  capitalize p-2 truncate'>date</td>
                                        <td className='text-center  capitalize p-2 truncate'>time</td>
                                        <td className='text-center  capitalize p-2 truncate'>amount</td>
                                        <td className='text-center  capitalize p-2 truncate'>plan</td>
                                        <td className='text-center  capitalize p-2 truncate'>profit</td>
                                        <td className='text-center  capitalize p-2 truncate'>bonus</td>
                                        <td className='text-center  capitalize p-2 truncate'>status</td>
                                        <td className='text-center  capitalize p-2 truncate'>claim</td>
                                    </tr>
                                </thead>
                                {dataLoading2 ?
                                    <tbody>
                                        <tr className='bg-gray-400 animate-pulse h-10'>
                                            <td colSpan="8"></td>
                                        </tr>
                                    </tbody>
                                    :
                                    <>
                                        {investment.length > 0 ?
                                            <tbody>
                                                {investment.slice(start, end).map((item, i) => (
                                                    <tr className='text-[0.8rem] text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                                        <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                                                        <td className='p-4  text-center truncate'>{item.trading_plan}</td>
                                                        <td className='p-4  text-center truncate'>${item.profit.toLocaleString()}</td>
                                                        <td className='p-4  text-center truncate'>${item.bonus.toLocaleString()}</td>
                                                        <td className={`p-4  text-center truncate italic ${item.status === 'completed' ? 'text-[#adad40]' : 'text-[#6f6ff5]'}`}>{item.status}</td>
                                                        <td className={`p-4  text-center truncate italic ${item.claim === 'true' ? 'text-[#adad40]' : 'text-[#6f6ff5]'}`}>{item.claim} </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className='text-semi-white text-[0.8rem] bg-[#272727] '>
                                                    <td colSpan="8" className='py-2 italic text-center truncate'>
                                                        <div className='flex gap-1 items-center justify-center'>
                                                            <span>no investments found...</span>
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
                        {investment.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-light '>
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