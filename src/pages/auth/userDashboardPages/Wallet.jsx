import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar } from "react-icons/bs";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useAtom } from 'jotai';
import { WALLET } from '../../../store';
import wallet3d from '../../../assets/images/wallet3d.png'
import deposit3d from '../../../assets/images/deposit3d.png'
import withdraw3d from '../../../assets/images/withdraw3d.png'
import profit3d from '../../../assets/images/profit3d.png'
import bonus3d from '../../../assets/images/bonus3d.png'
import referral from '../../../assets/images/referral.png'
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';
import { MoveToTop } from '../../../utils/utils';
import { FaArrowTrendUp } from "react-icons/fa6";
import { Apis, UserGetApi } from '../../../services/API';


const Wallet = () => {
    const [wallet] = useAtom(WALLET)
    const [ups, setUps] = useState({})
    const [testRun, setTestRun] = useState({})

    useEffect(() => {
        const FetchTestRun = async () => {
            try {
                const response = await UserGetApi(Apis.user.get_test_run_plan)
                if (response.status === 200) {
                    setTestRun(response.msg)
                }

            } catch (error) {
                //
            }
        }
        FetchTestRun()
    }, [])

    useEffect(() => {
        const FetchUps = async () => {
            try {
                const response = await UserGetApi(Apis.user.ups)
                if (response.status === 200) {
                    setUps(response.msg)
                }
    
            } catch (error) {
                //
            }
        }
        FetchUps()
    }, [])

    let profitUp = 0
    let bonusUp = 0
    if (Object.keys(ups).length !== 0) {
        if (wallet?.total_profit > 0) {
            profitUp = ups.new_profit / wallet.total_profit * 100
            bonusUp = ups.new_bonus / wallet.total_bonus * 100
        }
    }


    return (
        <Dashboard>
            <div>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>wallet</div>
                <div className='flex flex-wrap gap-4 mt-8 items-center justify-center'>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-lg md:text-2xl py-2 px-2 md:px-4 text-semi-white bg-[#6859bb]  overflow-hidden'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-semibold flex justify-between items-center'>
                            <span>deposits</span>
                            <span className='text-[0.65rem] md:text-xs italic lowercase'>confirmed</span>
                        </div>
                        <div className='flex flex-col items-center font-bold gap-4 mt-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_deposit.toLocaleString()}</div>}
                            </div>
                            <img src={deposit3d} className='md:h-16 h-12 w-auto'></img>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-lg md:text-2xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27] overflow-hidden'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-semibold flex justify-between items-center'>
                            <span>profits</span>
                            <span className='text-[0.65rem] md:text-xs italic lowercase'>claimed</span>
                        </div>
                        <div className='flex justify-between gap-2 font-bold mt-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_profit.toLocaleString()}</div>}
                            </div>
                            <img src={profit3d} className='md:h-12 h-8 w-[auto]'></img>
                        </div>
                        <div className='flex items-center text-xs capitalize font-medium gap-2 mt-6 w-fit h-fit mx-auto py-1 px-2 rounded-full border border-[green] text-white'>
                            <FaArrowTrendUp />
                            <div>+{profitUp.toFixed(2)}%</div>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-lg md:text-2xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27] overflow-hidden'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-semibold flex justify-between items-center'>
                            <span>bonuses</span>
                            <span className='text-[0.65rem] md:text-xs italic lowercase'>claimed</span>
                        </div>
                        <div className='flex justify-between gap-2 font-bold mt-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_bonus.toLocaleString()}</div>}
                            </div>
                            <img src={bonus3d} className='md:h-12 h-8 w-[auto]'></img>
                        </div>
                        <div className='flex items-center text-xs capitalize font-medium gap-2 mt-6 w-fit h-fit mx-auto py-1 px-2 rounded-full border border-[green] text-white'>
                            <FaArrowTrendUp />
                            <div>+{bonusUp.toFixed(2)}%</div>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-lg md:text-2xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27] overflow-hidden' >
                        <div className='capitalize text-xs md:text-[0.9rem] font-semibold'>withdrawals</div>
                        <div className='flex flex-col items-center font-bold mt-4 gap-4'>
                            <div className='flex items-center' >
                                <BsCurrencyDollar />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_withdrawal.toLocaleString()}</div>}
                            </div>
                            <img src={withdraw3d} className='md:h-14 h-10 w-auto'></img>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-lg md:text-2xl py-2 px-2 md:px-4 text-semi-white capitalize bg-[#6859bb] overflow-hidden'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-semibold'>referrals</div>
                        <div className='flex flex-col items-center font-bold mt-4 gap-4'>
                            <div className='flex items-center' >
                                <BsCurrencyDollar />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.referral.toLocaleString()}</div>}
                            </div>
                            <img src={referral} className='md:h-14 h-10 w-auto'></img>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-lg md:text-2xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27]'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-semibold'>current balance</div>
                        <div className='flex flex-col items-center font-bold mt-4 gap-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.balance.toLocaleString()}</div>}
                            </div>
                            <img src={wallet3d} className='md:h-[3.3rem] h-[2.3rem] w-auto'></img>
                        </div>
                    </div>
                </div>
                <div className='mt-12 flex flex-col gap-1'>
                    <div className='text-semi-white md:text-sm text-[0.8rem] capitalize'>Try our test run package</div>
                    <div className='w-fit h-fit py-1 bg-[#130e27]'>
                        <div className='w-full h-fit flex gap-10 md:gap-20 pl-10 pr-2 py-1 text-[0.55rem] items-center text-white uppercase relative bg-[#25203d]'>
                            <div className='flex flex-col gap-1 items-center'>
                                <div>price</div>
                                <div className='flex items-center gap-1'>
                                    <div className='italic lowercase'>from</div>
                                    <div className='text-[green] text-[0.85rem] font-bold'>{Object.values(testRun).length !== 0 ? <span>${testRun.price_start.toLocaleString()}</span> : <span>N/A</span>}</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div>profit</div>
                                <div className='text-[green] text-[0.85rem] font-bold'>{Object.values(testRun).length !== 0 ? <span>{testRun.profit_return}%</span> : <span>N/A</span>}</div>
                            </div>
                            <Link to='/dashboard/deposit' className='flex flex-col gap-1' onClick={() => MoveToTop()}>
                                <button className='outline-none flex items-center justify-center md:py-1 py-1.5 bg-[#130e27] w-20 h-fit rounded-[3px]  text-[0.7rem] text-[#c5c4c4] hover:bg-[#1a162b]'>purchase</button>
                                <button className='outline-none flex items-center justify-center md:py-1 py-1.5 bg-[#130e27] w-20 h-fit rounded-[3px]  text-[0.7rem] text-[#c5c4c4] hover:bg-[#1a162b]'>upgrade</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    )
}

export default Wallet