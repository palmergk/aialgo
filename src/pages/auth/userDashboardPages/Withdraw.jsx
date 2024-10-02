import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { IoIosSearch } from 'react-icons/io'
import { RiHistoryFill } from 'react-icons/ri'
import { ADMINCRYPTOWALLETS, NOTIFICATIONS, PROFILE, UNREADNOTIS, WALLET } from '../../../store'
import moment from 'moment'
import LoadingAdmin from '../../../GeneralComponents/LoadingAdmin'
import { ErrorAlert, MoveToTop, SuccessAlert } from '../../../utils/utils'
import { Apis, imageurl, PostApi, UserGetApi } from '../../../services/API'
import { FiX } from 'react-icons/fi'
import wthwallet from '../../../assets/images/wthwallet.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { SiBitcoincash } from "react-icons/si";
import { GiTwoCoins } from "react-icons/gi";
import nothnyet from '../../../assets/images/nothn.png'
import Dashboard from './Dashboard'
import { Link, useSearchParams } from 'react-router-dom'



const Withdraw = () => {
    const [user] = useAtom(PROFILE)
    const [userwallet, setUserWallet] = useAtom(WALLET)
    const [adminCryptoWallets] = useAtom(ADMINCRYPTOWALLETS)
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [searchParams] = useSearchParams()
    const params = searchParams.get('screen')
    const [screen, setScreen] = useState(params ? parseInt(params) : 1)
    const [original, setOriginal] = useState([])
    const [withdrawals, setWithdrawals] = useState([])
    const [select, setSelect] = useState(false)
    const [mode, setMode] = useState(1)
    const [firstValues, setFirstValues] = useState({})
    const [secondValues, setSecondValues] = useState({})
    const [check, setCheck] = useState('')
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)
    const [loading, setLoading] = useState(false)
    const [dataLoading, setDataLoading] = useState(true)

    const [form, setForm] = useState({
        amount: '',
        withdrawal_address: ''
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const FetchWithdrawals = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.withdraw.user_withdrawals)
            if (response.status === 200) {
                setWithdrawals(response.msg)
                setOriginal(response.msg)
                setpageend(response.msg.length / 6)
                setpagestart(1)
                setStart(0)
                setEnd(6)
            }

        } catch (error) {
            //
        } finally {
            setDataLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchWithdrawals()
    }, [FetchWithdrawals])

    const makeWithdrawal = async () => {
        setTimeout(() => {
            setError('')
        }, 1000)

        if (!form.amount) return setError('amount')
        if (isNaN(form.amount)) return setError('amount')
        if (form.amount < user.withdrawal_minimum) return setError('minimum')
        if (Object.values(userwallet).length === 0) return setError('balance')
        if (form.amount > userwallet.balance) return setError('balance')
        if (Object.values(secondValues).length === 0) return setError('select')
        if (!form.withdrawal_address) return setError('wallet')
        if (!check) return setError('check')
        if (user.email_verified === 'false') return ErrorAlert('Complete account verification to continue')
        if (user.kyc_verified === 'false') return ErrorAlert('Complete account verification to continue')

        const formbody = {
            amount: parseFloat(form.amount),
            withdrawal_address: form.withdrawal_address,
            crypto: secondValues.crypto_name,
            network: secondValues.network,
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.withdraw.make_withdrawal, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                FetchWithdrawals()
                setUserWallet(response.wallet)
                setNotifications(response.notis)
                setUnreadNotis(response.unread)
                setForm({
                    amount: '',
                    withdrawal_address: ''
                })
                setCheck(!check)
                setSecondValues({})
                setScreen(2)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const HandleSearch = () => {
        const altwithdrawals = original
        if (!search) {
            setWithdrawals(original)
            setpageend(original.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            const showSearch = altwithdrawals.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search) || moment(item.createdAt).format('h:mm').includes(search) || item.amount.toString().includes(search) || item.crypto.toLowerCase().includes(search.toLowerCase()) || item.network.toLowerCase().includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
            setWithdrawals(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setWithdrawals(original)
        setpageend(original.length / 6)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < withdrawals.length) {
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
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{screen === 1 ? 'withdraw' : 'withdrawal history'}</div>
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => setScreen(screen === 1 ? 2 : 1)}>
                        <span>{screen === 1 ? 'history' : 'withdraw'}</span>
                        {screen === 1 ? <RiHistoryFill /> : <BiMoneyWithdraw />}
                    </div>
                </div>
                {screen === 1 &&
                    <div className='flex justify-center'>
                        <div className='mt-10 text-black font-medium h-fit w-fit bg-semi-white shlz rounded-xl overflow-hidden relative'>
                            {loading && <LoadingAdmin />}
                            <div className='md:text-2xl text-xl text-black font-bold uppercase bg-white w-full h-fit py-1 px-4 rounded-b-sm rounded-t-xl border-b border-light mx-auto flex flex-col gap-2'>
                                <Link to='/dashboard/tax-payment' onClick={MoveToTop} className='w-fit ml-auto'>
                                    <button className='w-fit h-fit md:text-sm text-xs font-medium py-2 px-6 capitalize bg-[#252525] rounded-lg text-white flex items-center gap-1.5 justify-center'>
                                        <span>taxes</span>
                                        <GiTwoCoins />
                                    </button>
                                </Link>
                                <div className='border-t pt-2 text-center'>Withdraw funds</div>
                            </div>
                            <div className='flex flex-col items-center py-6 md:px-14 px-4'>
                                <div className='flex gap-3 items-center'>
                                    <div className='flex flex-col gap-1'>
                                        <div className='capitalize text-[0.8rem] font-medium'>withdawal amount ($)</div>
                                        <div className='relative'>
                                            <input className={`outline-none border lg:text-[0.85rem] md:w-48 w-40 h-8 rounded-[4px] pl-2 pr-16 bg-white ${error === 'amount' ? 'border-[red]' : 'border-light'}`} name='amount' value={form.amount} onChange={inputHandler} ></input>
                                            <div className={`text-xs absolute top-2 right-2 ${error === 'minimum' ? 'text-[red]' : 'text-black'}`}>min: {user?.withdrawal_minimum}</div>
                                        </div>
                                    </div>
                                    <div className={`w-fit h-fit rounded-md flex flex-col py-2 justify-center items-center md:px-4 px-3 text-semi-white gap-1 bg-light ${error === 'balance' ? 'border border-[red]' : ''}`}>
                                        <div className='flex  justify-center items-center gap-1'>
                                            <div className='md:text-[0.85rem] text-xs font-[600]'>withdrawable</div>
                                            <img src={wthwallet} className='md:h-6 h-4 w-auto'></img>
                                        </div>
                                        <div className='flex items-center justify-center md:text-base text-sm'>
                                            {Object.values(userwallet).length !== 0 && <div>${userwallet.balance.toLocaleString()}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className='h-fit w-fit rounded-[0.2rem] bg-white p-1 relative mt-6'>
                                    <div className={`w-52 py-1 bg-white flex gap-1.5 justify-center items-center capitalize text-sm font-semibold rounded-[0.2rem] text-black cursor-pointer  ${error === 'select' && 'border border-[red]'} shantf`} onClick={() => setSelect(!select)}>
                                        <div className='text-[0.8rem]'>choose cryptocurrency</div>
                                        <SiBitcoincash className='text-light' />
                                    </div>
                                    {select &&
                                        <div className={`absolute top-9 left-0 ${adminCryptoWallets.length > 4 ? 'h-24 overflow-y-auto scroll ' : 'h-fit'} w-full bg-white border border-[#a3a3a3] rounded-md z-10 text-[0.85rem] font-bold capitalize`}>
                                            {adminCryptoWallets.length > 1 ?
                                                <>
                                                    {mode === 1 ?
                                                        <>
                                                            {adminCryptoWallets.length > 0 &&
                                                                <>
                                                                    {adminCryptoWallets.map((item, i) => (
                                                                        <div className='flex flex-col px-2 py-0.5 hover:bg-[#f8f8f8] border-b border-[#ebeaea] cursor-pointer' key={i} onClick={() => { setFirstValues(item); setMode(2) }}>
                                                                            <div className='flex gap-2 items-center'>
                                                                                <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                                                                <div>{item.crypto_name}</div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            }
                                                        </>
                                                        :
                                                        <div className='relative'>
                                                            <div className='cursor-pointer absolute top-2 left-0 text-light' onClick={() => setMode(1)}><FaAngleLeft /></div>
                                                            <div className='py-1 border-b flex justify-center'>
                                                                <div className='font-medium italic text-xs capitalize text-light border border-[lightgrey] border-dashed py-0.5 px-1'>choose network</div>
                                                            </div>
                                                            {firstValues.cryptoWallet.length > 0 &&
                                                                <>
                                                                    {firstValues.cryptoWallet.map((item, i) => (
                                                                        <div className='flex flex-col px-2 py-0.5 hover:bg-[#f8f8f8] border-b border-[#ebeaea] cursor-pointer' key={i} onClick={() => { setSelect(false); setSecondValues(item); setMode(1) }}>
                                                                            <div>{item.network}</div>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            }
                                                        </div>
                                                    }
                                                </>
                                                :
                                                <div className='px-2 py-1 flex items-center justify-center lowercase'>
                                                    <div>no crypto yet...</div>
                                                    <img src={nothnyet} className='h-3 w-auto'></img>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                {Object.values(secondValues).length !== 0 && <div className='flex flex-col gap-2 items-center mt-8'>
                                    <div className='text-[0.85rem] text-center'>Enter your <span className=' capitalize'>{secondValues.crypto_name}</span> wallet address for <span className=' capitalize'> {secondValues.network}</span> Network</div>
                                    <input className={`outline-none border bg-white lg:text-[0.85rem] w-full h-8 rounded-[4px] px-2  ${error === 'wallet' ? 'border-[red]' : 'border-light'}`} name='withdrawal_address' value={form.withdrawal_address} onChange={inputHandler} type='text'></input>
                                </div>}
                                <div className='flex flex-col gap-1 items-center relative md:mt-10 mt-8'>
                                    <div className='flex gap-1.5 items-center'>
                                        <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${error === 'check' && 'outline outline-1 outline-[red]'}`}></input>
                                        <div className='text-[#252525] text-[0.8rem]'>I provided my correct wallet address</div>
                                    </div>
                                    <button className='outline-none w-fit h-fit py-2 px-14 md:text-sm text-sm text-semi-white bg-[#252525] rounded-md capitalize font-semibold' onClick={makeWithdrawal}>make withdrawal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {screen === 2 &&
                    <div className='mt-10'>
                        <div className='relative w-fit mx-auto'>
                            <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
                            <div className='text-[1.2rem] text-white absolute top-[-0.5rem] right-[-0.5rem] w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                                <IoIosSearch />
                                {search !== '' &&
                                    <div className='absolute top-[1.2rem] md:right-12 right-11  text-xs cursor-pointer bg-[#414040] rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                                        <FiX />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='relative overflow-x-auto shadow-md rounded-lg mt-4 scrollsdown'>
                            <table className='w-full'>
                                <thead>
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
                                {dataLoading ?
                                    <tbody>
                                        <tr className='bg-gray-400 animate-pulse h-10'>
                                            <td colSpan="7"></td>
                                        </tr>
                                    </tbody>
                                    :
                                    <>
                                        {withdrawals.length > 0 ?
                                            <tbody>
                                                {withdrawals.slice(start, end).map((item, i) => (
                                                    <tr className='text-[0.8rem]  text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                                        <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                                                        <td className='p-4  text-center truncate'>{item.crypto}</td>
                                                        <td className='p-4  text-center truncate'>{item.network}</td>
                                                        <td className='p-4  text-center truncate'>{item.withdrawal_address?.slice(0, 5)}.....{item.withdrawal_address?.slice(-10)} </td>
                                                        <td className={`p-4  text-center truncate italic ${item.status === 'confirmed' && 'text-[#adad40]'}  ${item.status === 'processing' && 'text-[#6f6ff5]'}  ${item.status === 'failed' && 'text-[#eb4242] '}`}>{item.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className='text-semi-white text-[0.8rem] bg-[#272727] '>
                                                    <td colSpan="7" className='py-2 italic text-center truncate'>
                                                        <div className='flex gap-1 items-center justify-center'>
                                                            <span>no withdrawals found...</span>
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
                        {withdrawals.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-light '>
                            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                            {end < withdrawals.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                        </div>}
                    </div>
                }
            </div>
        </Dashboard>
    )
}

export default Withdraw