import React from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { Link } from 'react-router-dom'
import { MoveToTop } from '../../utils/utils'

const PrivacyPage = () => {
    return (
        <Pagelayout>
            <div className='bg-[whitesmoke] py-16'>
                <div className='lg:w-5/6 mx-auto'>
                    <div className='w-full h-fit bg-white mx-auto rounded-xl relative shb py-12 overflow-hidden'>
                        <div className='w-[90%] mx-auto'>
                            <div className='flex flex-col gap-1 '>
                                <span className='border-b w-full text-[1.8rem] lg:text-[2.5rem] uppercase font-bold'>privacy policy</span>
                                <span className='text-[0.9rem] text-[#757575]'>last updated: 22nd of November 2024</span>
                            </div>
                            <div className='flex flex-col gap-2 pt-8'>
                                <div className='text-[1.5rem] lg:text-[1.7rem] capitalize font-bold'>general</div>
                                <div>
                                    The privacy policy applies to all users of the AI ALGO TRADE Site. By agreeing to this Privacy Policy and the <Link to='/terms' onClick={MoveToTop} className='text-orange underline'>Terms of Use</Link> you are entering into an electronic agreement between you and a specific AI ALGO TRADE entity. This Privacy Policy (together with our Terms of Use) describes our policies and procedures on the collection, use, and disclosure of personal information we collect when you use our website, any and all services, products, and content, and tells you about your privacy rights and how the law protects you.

                                </div>
                                <div>We adhere to the standards outlined in this Privacy Policy, ensuring we collect and process personal information lawfully, fairly, transparently, and with legitimate, legal reasons for doing so.</div>
                                <div className='flex flex-col gap-2 pt-4 text-[#494949]'>
                                    <div className='font-bold'>The purpose of this Privacy Policy is to inform you of:</div>
                                    <div className='flex flex-col gap-2'>
                                        <div>1. Interpretation and Definitions</div>
                                        <div>2. Who we are</div>
                                        <div>3. Collecting and Using Your Personal Information</div>
                                        <div>4. Your rights in relation to your Personal Data</div>
                                        <div>5. Exercising of your Data Protection Rights</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-8'>
                                <div className='text-[1.3rem] lg:text-2xl uppercase font-bold'>1. Definitions</div>
                                <div className='text-[#494949]'> <span className='font-bold capitalize'>definitions</span> for the purposes of this Privacy Policy:</div>
                                <div className='w-[85%] mx-auto text-[#494949]'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>account:</span> means an account registered by the User on the Platform. </div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>personal information (personal data):</span> any information which identifies you personally or which may help us to identify you (e.g. your name, e-mail address, residence, trades etc.).</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>Data Subject:</span>  an identified or identifiable person (User/you/customer).</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>data controller:</span> for the purposes of applicable laws, controller means the natural or legal person, public authority, agency, or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data.</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>data processor:</span> a company which processes personal data on behalf and upon instructions of the Data Controller.</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>our site:</span> website with the following domains such as AI ALGO TRADE - our Platform used for providing our services to you.</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>personal data processing:</span> any operation or set of operations performed on personal data (e.g., collection, storage, use, disclosure erasure).</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 w-full'>
                                            <div className='w-[2%]'>
                                                <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                            </div>
                                            <div className='w-[98%]'>
                                                <div><span className='font-bold capitalize'>devices</span> means any device that can access the AI ALGO TRADE Site such as a computer, a mobile phone or tablet.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-[2rem]'>
                                <div className='text-[1.3rem] lg:text-[1.5rem] uppercase font-bold'>2. who we are</div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <span>
                                        AI ALGO TRADE is a leading trading system ecosystem comprised of entities defined in Terms of Use.
                                    </span>
                                    <span>
                                        Established in 2019, AI ALGO TRADE has become one of the most powerful trading system, trusted by over 85 thousand users.
                                    </span>
                                    <span>
                                        The system has developed a multi-level account system with an individual approach to each customer, from crypto beginners to expert traders. Worldwide coverage in permissible jurisdictions, multiple payment options, and 24/7 support are accompanied by time-proven platform stability that focuses on the safety of assets and data.
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-[2rem]'>
                                <div className='text-[1.3rem] lg:text-[1.5rem] uppercase font-bold'>3. Collecting and Using Your Personal Information</div>
                                <div className='text-[#494949] flex flex-col gap-4'>
                                    <div>
                                        <span className='text-black font-bold'>3.1.</span> We may collect your Personal Information if you open an account or perform any transactions. This is defined as collection for the purpose of provision of service(s) to you in accordance with our Terms of Use. Please note, if you refuse to share your Personal Information for this purpose, we will not be able to provide our services to you.
                                    </div>
                                    <div className='flex gap-2 flex-col'>
                                        <span className='text-black font-bold'>3.2. The types of Personal Information which we collect may include:
                                        </span>
                                        <span>
                                            1. your name
                                        </span>
                                        <span>
                                            2. your photographic identification
                                        </span>
                                        <span>
                                            3. your country 
                                        </span>
                                        <span>
                                            4. email
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-black font-bold'>3.3. Use of your Personal Data</span>
                                        <span>
                                            We will process your Personal Information only for the purpose(s) of providing the service(s) to you, to satisfy the legal and regulatory obligations that arise from providing you the service(s) and our legitimate interest.
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <span className='text-black font-bold'>3.4 We may use your Personal Information for the following purposes:</span>
                                        <div className='w-[85%] mx-auto flex flex-col gap-4'>
                                            <div className='flex gap-2 w-full'>
                                                <div className='w-[2%]'>
                                                    <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                                </div>
                                                <div className='w-[98%]'>
                                                    <div><span className='font-bold capitalize'>To provide and maintain our services,</span> including to allow you to open and operate an Account and monitor the usage of services. </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 w-full'>
                                                <div className='w-[2%]'>
                                                    <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                                </div>
                                                <div className='w-[98%]'>
                                                    <div><span className='font-bold capitalize'>To manage your Account: </span> to manage your registration as a user of the service(s). The Personal Data you provide can give you access to different functionalities of the Service that are available to you as a registered user, i.e., to enable you to complete transactions on the Platform. </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 w-full'>
                                                <div className='w-[2%]'>
                                                    <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                                </div>
                                                <div className='w-[98%]'>
                                                    <div><span className='font-bold capitalize'>For the performance of a contract:  </span> the development, compliance and undertaking of the purchase contract for the products, items, or services you have purchased or of any other contract with us. </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 w-full'>
                                                <div className='w-[2%]'>
                                                    <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                                </div>
                                                <div className='w-[98%]'>
                                                    <div><span className='font-bold capitalize'>To contact you:  </span> we may contact you by email, telephone, SMS, or other equivalent forms of electronic communication. We may use these methods to provide you with updates, informative communications, including security updates when necessary or reasonable for their implementation, and to reply to your queries. </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 w-full'>
                                                <div className='w-[2%]'>
                                                    <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                                </div>
                                                <div className='w-[98%]'>
                                                    <div><span className='font-bold capitalize'>To manage your requests:  </span> to attend and manage your requests to us. </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 w-full'>
                                                <div className='w-[2%]'>
                                                    <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                                </div>
                                                <div className='w-[98%]'>
                                                    <div><span className='font-bold capitalize'>To ensure security of your Account  </span> (for instance, if you make a request on forgotten password). </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 w-full'>
                                                <div className='w-[2%]'>
                                                    <div className='w-1.5 h-1.5 rounded-full bg-[#504f4f] mt-2'></div>
                                                </div>
                                                <div className='w-[98%]'>
                                                    <div><span className='font-bold capitalize'>For market research  </span>e.g., surveying Users' needs and opinions on issues, such as performance. Unless consented, your data for this purpose would be anonymised.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div><span className='font-bold capitalize text-black'>3.5. Children's personal data  </span>Minors are not permitted to use AI ALGO TRADE. If you are a parent or guardian and believe that AI ALGO TRADE has information of a child under the age of 18 please contact us immediately from our contact with this complains so we remove any such information from our database.</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-[2rem]'>
                                <div className='text-[1.3rem] lg:text-[1.5rem] uppercase font-bold'>4. Your rights in relation to your personal data</div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>4.1. Right to be informed:</span>  you have the right to be informed about the collection and use of your personal data. This Privacy Policy is intended to provide you with clear and concise information about how we process your personal data. </div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>4.2. Right to access:</span>  you have the right to access your Personal Information and request details about processing activities that we undertake with your data, you can do these actions in your account profile page. </div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>4.3. Right to Rectification:</span>  you may request us to rectify or update any of your personal information held by AI ALGO TRADE, you can do these it in your account profile page. </div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>4.4. Right to Erasure: </span>  you have the right to request the erasure of both the Account and Personal Information held by AI ALGO TRADE on your account profile page. </div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>4.5. Right to object or to restrict processing  </span>  - you have the right to restrict and object to the processing of your personal data in certain circumstances, such as where the processing is carried out for direct marketing purposes.</div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>4.6 Right to data portability  </span>  - you may also ask us to transfer your Personal Information to another controller of your choice.
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-[2rem]'>
                                <div className='text-[1.3rem] lg:text-[1.5rem] uppercase font-bold'>5. Exercising of your Data Protection Rights</div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>5.1. </span>  You may exercise your rights of access, rectification, cancellation, and opposition directly from your account. </div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>5.2. </span>  You have the right to complain to a data protection authority about our collection and use of your Personal Data. You have the right to discuss any instance where you feel we may not be adhering to the terms within this Privacy Policy or raise a complaint about our practices with the supervisory authority of your country or state.</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-[2rem]'>
                                <div className='text-[1.3rem] lg:text-[1.5rem] uppercase font-bold'>6. Retention of Personal Information</div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>6.1. </span>Your information is held within our website secured servers. </div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>6.2. </span>We will hold your Personal Information only for as long as it is necessary for the purposes described in this Privacy Policy and our legal and regulatory requirements.</div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>6.3. </span>To comply with relevant regulatory bodies and laws requirements, we must adhere to different retention periods for Personal Information. In accordance with AI ALGO TRADE's legal obligations, we will retain Personal Information for a period of two to four years in which the User conducts their last transaction in a case of inactivity.</div>
                                </div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div><span className='font-bold capitalize'>6.4. </span>Data stored for regulatory purposes will be protected from unnecessary processing and will be held only for the purpose of being able to provide information or access to relevant authorities.</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 mt-[2rem]'>
                                <div className='text-[1.3rem] lg:text-[1.5rem] uppercase font-bold'>7. Disposal of Personal Information</div>
                                <div className='flex flex-col gap-2 text-[#494949]'>
                                    <div>Once we do not have any obligation to provide you with a service you requested, nor an obligation to hold Personal Information for regulatory or legal purpose, we will anonymise or dispose of your Personal Information in line with acceptable industry and security standards so that this cannot be subsequently retrieved and associated with you.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Pagelayout>
    )
}

export default PrivacyPage