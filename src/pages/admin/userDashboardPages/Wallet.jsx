import React from 'react'
import { BsCurrencyDollar } from "react-icons/bs";
import { useAtom } from 'jotai';
import { INVESTMENTUNCLAIM, UPS, WALLET } from '../../../store';
import wallet3d from '../../../assets/images/wallet3d.png'
import deposit3d from '../../../assets/images/deposit3d.png'
import withdraw3d from '../../../assets/images/withdraw3d.png'
import profit3d from '../../../assets/images/profit3d.png'
import bonus3d from '../../../assets/images/bonus3d.png'
import tradingPic from '../../../assets/images/tradingpic.png'
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';


const Wallet = () => {
    const [wallet] = useAtom(WALLET)
    const [investmentsUnclaim] = useAtom(INVESTMENTUNCLAIM)
    const [ups] = useAtom(UPS)

    let profitUp = ups.new_profit / wallet.total_profit * 100
    let bonusUp = ups.new_bonus / wallet.total_bonus * 100


    return (
        <Dashboard>
            <div className='pt-10 pb-24 lg:pb-10 h-fit'>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>wallet</div>
                <div className='flex flex-wrap gap-4 mt-8 items-center justify-center'>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-xl md:text-3xl py-2 px-2 md:px-4 text-semi-white bg-[#6859bb]  overflow-hidden'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-[600] flex justify-between items-center'>
                            <span>deposits</span>
                            <span className='text-[0.7rem] md:text-xs italic lowercase'>external</span>
                        </div>
                        <div className='flex flex-col items-center font-bold gap-4 mt-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar className='-mt-0.5' />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_deposit.toLocaleString()}</div>}
                            </div>
                            <img src={deposit3d} className='md:h-16 h-12 w-auto'></img>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-xl md:text-3xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27] overflow-hidden'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-[600] flex justify-between items-center'>
                            <span>total profits</span>
                            <span className='text-[0.7rem] md:text-xs italic lowercase'>claimed</span>
                        </div>
                        <div className='flex justify-between font-bold mt-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar className='-mt-0.5' />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_profit.toLocaleString()}</div>}
                            </div>
                            <img src={profit3d} className='md:h-12 h-8 w-[auto]'></img>
                        </div>
                        <div className='flex flex-col items-center text-xs capitalize font-medium gap-1 mt-4'>
                            <div>up</div>
                            {Object.values(ups).length !== 0 ?
                                <div>
                                    {wallet.total_profit !== 0 ?
                                        <div className='text-[green]'>+{profitUp.toFixed(2)}%</div>
                                        :
                                        <div className='text-[green]'>+0.00%</div>
                                    }
                                </div>
                                :
                                <div className='text-[green]'>+0.00%</div>
                            }
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-xl md:text-3xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27] overflow-hidden'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-[600] flex justify-between items-center'>
                            <span>total bonuses</span>
                            <span className='text-[0.7rem] md:text-xs italic lowercase'>claimed</span>
                        </div>
                        <div className='flex justify-between font-bold mt-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar className='-mt-0.5' />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_bonus.toLocaleString()}</div>}
                            </div>
                            <img src={bonus3d} className='md:h-12 h-8 w-[auto]'></img>
                        </div>
                        <div className='flex flex-col items-center text-xs capitalize font-medium gap-1 mt-4'>
                            <div>up</div>
                            {Object.values(ups).length !== 0 ?
                                <div>
                                    {wallet.total_bonus !== 0 ?
                                        <div className='text-[green]'>+{bonusUp.toFixed(2)}%</div>
                                        :
                                        <div className='text-[green]'>+0.00%</div>
                                    }
                                </div>
                                :
                                <div className='text-[green]'>+0.00%</div>
                            }
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-xl md:text-3xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27] overflow-hidden' >
                        <div className='capitalize text-xs md:text-[0.9rem] font-[600]'>withdrawals</div>
                        <div className='flex flex-col items-center font-bold mt-4 gap-4'>
                            <div className='flex items-center' >
                                <BsCurrencyDollar className='-mt-0.5' />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.total_withdrawal.toLocaleString()}</div>}
                            </div>
                            <img src={withdraw3d} className='md:h-14 h-10 w-auto'></img>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-xl md:text-3xl py-2 px-2 md:px-4 text-semi-white capitalize bg-[#6859bb] overflow-hidden'>
                        <div className=' text-xs md:text-[0.9rem] font-[600]'>trading activity</div>
                        <div className='flex flex-col items-center mt-4'>
                            {investmentsUnclaim.length > 0 ?
                                <div className='md:text-lg text-sm italic text-[#eeee6c] lowercase text-center '>{investmentsUnclaim.length > 1 ? 'active investmentsUnclaim' : 'active investment'}</div>

                                :
                                <div className='md:text-lg text-sm italic text-[#eeee6c] lowercase text-center'>no active investment</div>
                            }
                            <img src={tradingPic} className='md:h-[4.5rem] h-[3.5rem] w-auto'></img>
                        </div>
                    </div>
                    <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] text-xl md:text-3xl py-2 px-2 md:px-4 text-semi-white border border-[grey] bg-[#130e27]'>
                        <div className='capitalize text-xs md:text-[0.9rem] font-[600]'>current balance</div>
                        <div className='flex flex-col items-center font-bold mt-4 gap-4'>
                            <div className='flex items-center'>
                                <BsCurrencyDollar className='-mt-0.5' />
                                {Object.values(wallet).length !== 0 && <div className='-ml-1'>{wallet.balance.toLocaleString()}</div>}
                            </div>
                            <img src={wallet3d} className='md:h-[3.3rem] h-[2.3rem] w-auto'></img>
                        </div>
                    </div>
                </div>
                <div className='mt-12 flex flex-col gap-1'>
                    <div className='text-semi-white md:text-sm text-[0.8rem] capitalize'>Try our test run package</div>
                    <div className='w-fit h-fit py-1 bg-[#130e27]'>
                        <div className='w-full h-fit flex gap-10 md:gap-20  pl-10 pr-2 py-1 text-[0.55rem] items-center text-white uppercase relative bg-[#25203d]'>
                            <div className='flex flex-col gap-1 items-center'>
                                <div>price</div>
                                <div className='flex items-center gap-1'>
                                    <div className='italic lowercase'>from</div>
                                    <div className='text-[green] text-[0.85rem] font-bold'>$20</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div>profit</div>
                                <div className='text-[green] text-[0.85rem] font-bold'>60%</div>
                            </div>
                            <Link to='/dashboard/deposit' className='flex flex-col gap-1'>
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