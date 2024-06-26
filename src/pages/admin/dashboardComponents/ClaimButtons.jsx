import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdError } from 'react-icons/md'
import { RxTokens } from 'react-icons/rx'
import { Apis, PostApi } from '../../../services/API'

const ClaimButtons = ({ item, refetchWallet, refetchNotifications, refetchInvestments, refetchUps, refetchUnreadNotis, refetchInvestmentsUnclaim, setInvestment }) => {
    const [claim, setClaim] = useState(false)
    const [claimError, setClaimError] = useState('')
    const [singleInvest, setSingleInvest] = useState({})
    const [loading, setLoading] = useState(false)

    const ClaimingInvestment = async () => {
        
        setTimeout(() => {
            refetchInvestmentsUnclaim()
            setClaim(false)
        }, 1500)

        if (singleInvest.profit_status !== 'completed') {
            setTimeout(() => {
                setLoading(false)
                setClaimError('')
            }, 1000)
            setLoading(true)
            return setClaimError(`profits still running`)
        }

        if (singleInvest.claim !== 'true') {

            try {
                setLoading(true)

                const formbody = {
                    invest_id: singleInvest.id
                }

                const response = await PostApi(Apis.investment.claim_investment, formbody)
                if (response.status === 200) {
                    setInvestment(response.msg)
                    refetchNotifications()
                    refetchUnreadNotis()
                    refetchInvestments()
                    refetchWallet()
                    refetchUps()
                }
            } catch (error) {
                //
            } finally {
                setLoading(false)
                setClaim(true)
            }
        }
    }


    return (
        <div className='relative w-fit h-fit'>
            <button className='outline-none w-fit h-fit py-[0.4rem] px-[1.5rem] text-[0.75rem] font-[550] text-[#e0dfdf]  bg-[#241a49]  hover:bg-[#17112e] rounded-[10rem] flex items-center gap-1' onClick={ClaimingInvestment} onMouseOver={() => setSingleInvest(item)} onMouseOut={() => setSingleInvest({})}>
                <span>{claim ? 'Claimed!' : 'Claim to wallet'}</span>
                {!claim ?
                    <div>
                        <RxTokens />
                    </div>
                    :
                    <div>
                        <IoMdCheckmarkCircleOutline className='text-[#52e652]' />
                    </div>
                }
            </button>
            <div className='absolute bottom-[-1.7rem] left-0 text-[#b84141] text-[0.8rem] flex items-center gap-1'><div>{claimError}</div>
                {claimError !== '' && <MdError />}
            </div>
            {loading && <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-[#0c091aa4] z-20">
                <div className='load'></div>
            </div>}
        </div>
    )
}

export default ClaimButtons