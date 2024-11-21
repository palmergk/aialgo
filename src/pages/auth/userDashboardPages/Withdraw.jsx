import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { IoIosSearch } from 'react-icons/io'
import { RiHistoryFill } from 'react-icons/ri'
import { NOTIFICATIONS, PROFILE, UNREADNOTIS, WALLET } from '../../../store'
import moment from 'moment'
import { ErrorAlert, MoveToTop, SuccessAlert } from '../../../utils/utils'
import { Apis, PostApi, UserGetApi } from '../../../services/API'
import { FiX } from 'react-icons/fi'
import wthwallet from '../../../assets/images/wthwallet.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { GiTwoCoins } from "react-icons/gi";
import Dashboard from './Dashboard'
import { Link, useSearchParams } from 'react-router-dom'
import Loading from '../../../GeneralComponents/Loading'
import CryptoSelector from '../../../GeneralComponents/CryptoSelector'
import { SlSocialDropbox } from 'react-icons/sl'


const Withdraw = () => {
    const [user] = useAtom(PROFILE)
    const [userwallet, setUserWallet] = useAtom(WALLET)
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [searchParams] = useSearchParams()
    const params = searchParams.get('screen')
    const [screen, setScreen] = useState(params ? parseInt(params) : 1)
    const [original, setOriginal] = useState([])
    const [withdrawals, setWithdrawals] = useState([])
    const [cryptoWallets, setCryptoWallets] = useState({})
    const [check, setCheck] = useState('')
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
        if (!form.amount) return ErrorAlert('Enter an amount')
        if (isNaN(form.amount)) return ErrorAlert('Amount must be a number')
        if (form.amount < user.withdrawal_minimum) return ErrorAlert(`Minimum withdrawal amount is $${user.withdrawal_minimum.toLocaleString()} `)
        if (Object.values(userwallet).length === 0 || form.amount > userwallet.balance) return ErrorAlert('Insufficient wallet balance')
        if (Object.values(cryptoWallets).length === 0) return ErrorAlert('Choose cryptocurrency')
        if (!form.withdrawal_address) return ErrorAlert('Enter your wallet address')
        if (!check) return ErrorAlert('Confirm you provided your correct wallet address')

        const formbody = {
            amount: parseFloat(form.amount),
            withdrawal_address: form.withdrawal_address,
            crypto: cryptoWallets.crypto_name,
            network: cryptoWallets.network,
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
                setCryptoWallets({})
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
            const showSearch = altwithdrawals.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search) || moment(item.createdAt).format('h:mm').includes(search) || item.amount.toString().includes(search) || item.crypto.toLowerCase().includes(search.toLowerCase()) || item.network.toLowerCase().includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()) || item.gen_id.includes(search))
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
                <div className='flex justify-between items-center gap-4'>
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white'>{screen === 1 ? 'withdraw' : 'withdrawal history'}</div>
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => setScreen(screen === 1 ? 2 : 1)}>
                        <span>{screen === 1 ? 'history' : 'withdraw'}</span>
                        {screen === 1 ? <RiHistoryFill /> : <BiMoneyWithdraw />}
                    </div>
                </div>
                {screen === 1 &&
                    <div className='mt-10 text-black font-medium h-fit w-fit bg-semi-white rounded-xl relative mx-auto'>
                        {loading && <Loading className="!bg-[#97979767]" />}
                        <div className='md:text-2xl text-xl text-black font-bold uppercase bg-white w-full h-fit py-1 px-4 rounded-t-xl border-b border-light mx-auto flex flex-col gap-2'>
                            <Link to='/dashboard/tax-payment' onClick={MoveToTop} className='w-fit ml-auto'>
                                <button className='w-fit h-fit md:text-sm text-xs font-medium py-2 px-6 capitalize bg-[#252525] rounded-lg text-white flex items-center gap-1.5 justify-center'>
                                    <span>taxes</span>
                                    <GiTwoCoins />
                                </button>
                            </Link>
                            <div className='border-t pt-2 text-center'>Withdraw funds</div>
                        </div>
                        <div className='grid grid-cols-1 gap-8 py-6 md:px-14 px-5 overflow-hidden'>
                            <div className='flex gap-3 items-center'>
                                <div className='flex flex-col gap-1'>
                                    <div className='capitalize text-[0.8rem] font-medium'>withdawal amount ($)</div>
                                    <div className='relative'>
                                        <input className='outline-none border lg:text-sm text-base md:w-48 w-40 h-8 rounded-[4px] pl-2 pr-16 bg-white border-light' name='amount' value={form.amount} onChange={inputHandler} ></input>
                                        <div className='text-xs absolute top-2 right-2'>min: {user?.withdrawal_minimum}</div>
                                    </div>
                                </div>
                                <div className='w-fit h-fit rounded-md flex flex-col py-2 justify-center items-center md:px-4 px-3 text-semi-white gap-1 bg-light'>
                                    <div className='flex  justify-center items-center gap-1'>
                                        <div className='md:text-[0.85rem] text-xs font-semibold'>Withdrawable</div>
                                        <img src={wthwallet} className='md:h-6 h-4 w-auto'></img>
                                    </div>
                                    <div className='flex items-center justify-center md:text-base text-sm'>
                                        {Object.values(userwallet).length !== 0 && <div>${userwallet.balance.toLocaleString()}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='mx-auto'>
                                <CryptoSelector setCryptoWallets={setCryptoWallets} className={{ bg: "!bg-white", text: "!text-light" }} />
                            </div>
                            {Object.values(cryptoWallets).length !== 0 && <div className='flex flex-col gap-2 items-center'>
                                <div className='text-[0.85rem] text-center'>Enter your <span className=' capitalize'>{cryptoWallets.crypto_name}</span> wallet address for <span className=' capitalize'> {cryptoWallets.network}</span> Network:</div>
                                <input className='outline-none border bg-white lg:text-[0.85rem] w-full h-8 rounded-[4px] px-2 border-light' name='withdrawal_address' value={form.withdrawal_address} onChange={inputHandler} type='text'></input>
                            </div>}
                            <div className='flex flex-col gap-1 items-center relative'>
                                <div className='flex gap-1.5 items-center'>
                                    <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }}></input>
                                    <div className='text-[#252525] text-[0.8rem]'>I provided my correct wallet address</div>
                                </div>
                                <button className='outline-none w-fit h-fit py-2 px-12 md:text-sm text-xs text-semi-white bg-[#252525] rounded-md capitalize font-semibold' onClick={makeWithdrawal}>confirm withdrawal</button>
                            </div>
                        </div>
                    </div>
                }
                {screen === 2 &&
                    <div className='mt-10'>
                        <div className='relative w-fit mx-auto mb-6'>
                            <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
                            <div className='text-[1.2rem] text-white absolute top-[-0.5rem] right-[-0.5rem] w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                                <IoIosSearch />
                                {search !== '' &&
                                    <div className='absolute top-[1.2rem] md:right-12 right-11  text-xs cursor-pointer bg-[#414040] rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                                        <FiX />
                                    </div>
                                }
                            </div>
                        </div>
                        {dataLoading ?
                            <div className='w-full h-fit'>
                                <div className='h-11 bg-gray-400 animate-pulse rounded-t-lg'></div>
                                <div className='h-24 bg-slate-300 animate-pulse rounded-b-lg'></div>
                            </div>
                            :
                            <div className='md:w-[95%] mx-auto'>
                                {withdrawals.length > 0 ?
                                    <div className='flex flex-col gap-4'>
                                        {withdrawals.slice(start, end).map((item, i) => (
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
                                                            <span>{item.withdrawal_address?.slice(0, 5)}.....{item.withdrawal_address?.slice(-10)}</span>
                                                        </div>
                                                        <div className='flex justify-between gap-4'>
                                                            <span>status:</span>
                                                            <span className={`${item.status === 'confirmed' && 'text-[#adad40]'}`}>{item.status}</span>
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
                        {withdrawals.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-light '>
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