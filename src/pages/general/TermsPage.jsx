import React from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'
import { Link } from 'react-router-dom'
import { MoveToTop } from '../../utils/utils'

const TermsPage = () => {
    return (
        <Pagelayout>
            <div className='bg-[whitesmoke]'>
                <div className='w-[85%] mx-auto py-[5rem]'>
                    <div className='w-full h-fit bg-[white] mx-auto rounded-xl relative shb py-[2.5rem] overflow-hidden'>
                        <div className='w-[85%] mx-auto'>
                            <div className='flex flex-col gap-1 '>
                                <span className='border-b w-full text-[2.5rem] uppercase font-bold'>terms and conditions</span>
                                <span className='text-[0.9rem] text-[#757575]'>last updated: 28th of February 2024</span>
                            </div>
                            <div className='pt-[2rem]'>
                                <div>
                                    Welcome to our website. By browising and using this website, you signify your agreement to comply with and be bound with the following terms and conditions and <Link to='/privacy' onClick={MoveToTop} className='text-[#E96E28] underline'>Privacy Policy</Link> of use which governs Ai Algo Trade relationship with you as related to this website. Please do not use this website if you disagree with any part of these terms and conditions.
                                </div>
                                <div>The use of the website is subject to the following terms:</div>
                                <div className='flex flex-col gap-4 mt-[2rem]'>
                                    <div className='text-[1.5rem] uppercase font-bold'>1. definitions</div>
                                    <div className='w-[85%] mx-auto text-[#494949]'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Account” or “AI ALGO TRADE Account” means a personal secure profile created by you on our Site. It allows you to access and use our services and manage your preferences.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Content” refers to all information, data, materials, text, images, videos, audio, graphics, software, and any other digital assets or elements made available on our website or through our services. This includes, but is not limited to, any content provided by us, user-generated content, third-party content, product descriptions, reviews, and any other information presented or accessible within the scope of our platform or services. The term “Content“ encompasses all forms of media and resources that Users may encounter or interact with while using our Site.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Deposit” means a Transaction involving the transfer of Funds to the Account.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Withdrawal” means a Transaction involving a transfer of Funds from a user’s account to their wallet address.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Trading plans” means a trading service into which the User can make their deposit on.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Services” means all and any technologies, products and/or functionalities provided by AI ALGO TRADE.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Site” means the online platform or website operated by CEX.IO through which services are provided to you. It’s the place where we offer our services to you, providing a digital environment with all the features and tools you need to access and use our services. This includes Apps (e.g. mobile applications), websites, and application program interfaces.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Transaction Details” means details of the transaction, including, but not limited to recipient's wallet address, payment details, etc.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>“Test run” is a package outside the trading plan where users can make a deposit on to test the authenticy of the AI ALGO TRADE system but only once.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 mt-[2rem]'>
                                    <div className='text-[1.5rem] uppercase font-bold'>2. risk warning</div>
                                    <div className='w-[85%] mx-auto text-[#494949]'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>Digital Assets and associated activities involve a significant amount of risk. Prices can fluctuate, often significantly, on any given day. Because of such price fluctuations, you may occur a significant gain rise or significant reduce value of your profits generated. </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>Taxes may be payable on any return and/or on any increase in the value of your Digital Assets and you should seek independent advice on your tax obligations. AI ALGO TRADE is not responsible for any violation made by the User due to his/her obligation to calculate and pay taxes and duties.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>Legislative and regulatory changes or actions at the state, federal, or international level may adversely affect the use, transfer, and value of Digital Assets.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>Transactions in Digital Assets may be irreversible, and, accordingly, losses due to fraudulent or accidental transactions may not be recoverable.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 mt-[2rem]'>
                                    <div className='text-[1.5rem] uppercase font-bold'>3. services</div>
                                    <div className='w-[85%] mx-auto text-[#494949]'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>Generally, our Site allows users to deposit, trade, and withdraw Digital Assets. The range of services is dependent of the trading plan your deposit fall under. </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>Trading plans means a trading service into which the user can make their deposit on. Profits generation varies base on user trading plan.</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>Your AI ALGO TRADE Wallet allows you to deposit, withdraw select Digital Assets and also view your trading investment porfolio</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 mt-[2rem]'>
                                    <div className='text-[1.5rem] uppercase font-bold'>4. Eligibility</div>
                                    <div className='text-[#494949]'> By registering an Account, you expressly represent and warrant that you:</div>
                                    <div className='w-[85%] mx-auto text-[#494949]'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>will follow the rules and laws of your jurisdiction from where you will access the Site; </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>are not located in a Restricted Location;</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>are at least 18 years old and have the legal capacity to accept these Terms and participate in transactions involving Digital Assets;</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[3%]'>
                                                    <div className='w-[0.35rem] h-[0.35rem] rounded-[50%] bg-[#504f4f] mt-[0.42rem]'></div>
                                                </div>
                                                <div className='w-[97%]'>
                                                    <div>you have the authority and legal capacity to accept these Terms of Use and participate in transactions involving Digital Assets.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Pagelayout>
    )
}

export default TermsPage