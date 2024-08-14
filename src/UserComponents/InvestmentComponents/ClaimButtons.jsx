import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { IoWalletOutline } from 'react-icons/io5';
import { MdError } from 'react-icons/md'
import { Apis, PostApi } from '../../services/API';
import { NOTIFICATIONS, UNREADNOTIS } from '../../store';
import { useAtom } from 'jotai';


const ClaimButtons = ({ item, refetchInvestments, refetchInvestmentsUnclaim }) => {
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)
    const [claim, setClaim] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const ClaimingInvestment = async () => {

        setTimeout(() => {
            refetchInvestmentsUnclaim()
            setClaim(false)
        }, 1500)

        if (item.status !== 'completed') {
            setTimeout(() => {
                setLoading(false)
                setError('')
            }, 1000)

            setLoading(true)
            return setError(`profit still running`)
        }

        if (item.claim !== 'true') {
            try {
                setLoading(true)

                const formbody = {
                    invest_id: item.id
                }

                const response = await PostApi(Apis.investment.claim_investment, formbody)
                if (response.status === 200) {
                    refetchInvestments()
                    setNotifications(response.notis)
                    setUnreadNotis(response.unread)
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
        <div className='relative w-fit'>
            <button className='outline-none py-2 px-6 text-xs font-medium text-semi-white bg-[#241a49]  hover:bg-[#17112e] rounded-full flex items-center gap-1' onClick={ClaimingInvestment}>
                <span>{claim ? 'Claimed' : 'Claim to wallet'}</span>
                {!claim ?
                    <div>
                        <IoWalletOutline className='text-sm' />
                    </div>
                    :
                    <div>
                        <IoMdCheckmarkCircleOutline className='text-[#52e652] text-sm' />
                    </div>
                }
            </button>
            <div className='absolute -bottom-6 left-0 text-[#c42e2e] text-xs flex items-center gap-1'><div>{error}</div>
                {error !== '' && <MdError />}
            </div>
            {loading && <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-[#0c091aa4] z-20">
                <div className='load'></div>
            </div>}
        </div>
    )
}

export default ClaimButtons