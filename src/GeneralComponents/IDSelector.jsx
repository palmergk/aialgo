import React, { useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { ErrorAlert } from '../utils/utils'

const IDTypes = [
    "National ID Number",
    "Passport",
    "Driver's License",
    "Social Security Number (SSN)",
    "Residence Permit",
    "Tax ID",
    "Medicare Card",
    "National Insurance Number (NINo)",
    "Social Insurance Number (SIN)"
]

const IDSelector = ({ type, HandleFunction, className }) => {
    const [types, setTypes] = useState(IDTypes)
    const [select, setSelect] = useState(false)
    const [other, setOther] = useState('')

    const Submit = () => {
        if (!other) return ErrorAlert('Enter an identity type')
        HandleFunction(other)
        setOther('')
    }


    return (
        <div className='relative'>
            <div className={`py-1 px-2 h-fit w-full bg-white sha cursor-pointer rounded-sm ${className}`} onClick={() => { setSelect(!select); setOther(''); setTypes(IDTypes) }}>
                <div className='flex justify-between items-center text-[0.8rem] text-black'>
                    <span className='font-semibold'>{type}</span>
                    <div className='text-sm'>
                        {!select ? <TiArrowSortedDown />
                            :
                            <TiArrowSortedUp />
                        }
                    </div>
                </div>
            </div>
            {select &&
                <div className={`h-fit w-full bg-white sha absolute top-8 left-0 z-10 py-2 rounded-[3px] ${className}`}>
                    <div className='overflow-y-auto scroll h-28 px-4'>
                        {types.map((item, i) => (
                            <div className='mt-2' key={i}>
                                <div className='text-black cursor-pointer hover:bg-[#ececec] text-[0.85rem] font-bold' onClick={() => { HandleFunction(item); setSelect(false) }}>{item}</div>
                            </div>
                        ))}
                    </div>
                    <div className='px-4 mt-2 flex gap-2 items-center'>
                        <input className='ipt border border-zinc-400 bg-transparent text-black p-1 w-full outline-none md:text-[0.85rem] text-base md:h-6 h-7 rounded-sm' type='text' placeholder='Other (please specify)' value={other} onChange={(e) => setOther(e.target.value)}></input>
                        <button className='outline-none bg-[#252525] py-1.5 px-4 h-fit w-fit rounded-md capitalize text-xs text-white cursor-pointer font-medium' onClick={Submit}>submit</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default IDSelector