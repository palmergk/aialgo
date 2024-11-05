import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { IoWalletOutline } from 'react-icons/io5';
import { Apis, PostApi } from '../services/API';
import { NOTIFICATIONS, UNREADNOTIS } from '../store';
import { useAtom } from 'jotai';
import moment from 'moment';
import { ErrorAlert } from '../utils/utils';


const ClaimButtons = ({ item, refetchInvestments, refetchInvestmentsUnclaim }) => {
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [claim, setClaim] = useState({
        id: null,
        status: ''
    })
    const [loading, setLoading] = useState(false)

    const ClaimingInvestment = async () => {
        setTimeout(() => {
            refetchInvestmentsUnclaim()
        }, 1500)

        if (item.status !== 'completed') {
            setTimeout(() => {
                setLoading(false)
            }, 1500)

            setLoading(true)
            return ErrorAlert(`Investment running till ${moment(new Date(item.endDate)).format('DD-MM-yyyy')} / ${moment(new Date(item.endDate)).format('h:mm')}`)
        }

        setLoading(true)
        const formbody = {
            invest_id: item.id
        }
        try {
            const response = await PostApi(Apis.investment.claim_investment, formbody)
            if (response.status === 200) {
                setClaim({
                    id: response.invt.id,
                    status: response.invt.claim
                })
                refetchInvestments()
                setNotifications(response.notis)
                setUnreadNotis(response.unread)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='relative w-fit'>
            <button className='outline-none py-2 px-5 text-xs font-medium text-semi-white bg-[#241a49]  hover:bg-[#17112e] rounded-full flex items-center gap-1' onClick={ClaimingInvestment}>
                <span>{claim.id === item.id && claim.status === 'true' ? 'Claimed' : 'Claim to wallet'}</span>
                {claim.id === item.id && claim.status === 'true' ?
                    <IoMdCheckmarkCircleOutline className='text-[#52e652] text-sm' />
                    :
                    <IoWalletOutline className='text-sm' />
                }
            </button>
            {loading &&
                <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-[#0c091aa4] rounded-full z-10">
                    <div className='load'></div>
                </div>
            }
        </div>
    )
}

export default ClaimButtons