import React, { useState } from 'react'
import { PhoneCodesApi } from '../services/PhoneCodes'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

const PhoneSelector = ({ phoneCode, HandleFunction, className }) => {
    const [phones, setPhones] = useState(PhoneCodesApi)
    const [select, setSelect] = useState(false)
    const [search, setSearch] = useState('')

    const FilterPhone = () => {
        const altPhones = PhoneCodesApi
        if (!search) {
            setPhones(PhoneCodesApi)
        }
        else {
            let searchResult = altPhones.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.dial_code.includes(search))
            setPhones(searchResult)
        }
    }

    return (
        <div className='relative'>
            <div className={`py-1 px-2 h-fit w-full bg-white sha cursor-pointer rounded-sm ${className}`} onClick={() => { setSelect(!select); setSearch(''); setPhones(PhoneCodesApi) }}>
                <div className='flex justify-between items-center text-[0.8rem] text-black'>
                    <span className='font-semibold'>{phoneCode}</span>
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
                    <div className='px-1'>
                        <input className='ipt border border-zinc-400 bg-transparent text-black px-1 py-1 w-full outline-none md:text-[0.85rem] text-base md:h-6 h-7 rounded-sm mb-1' type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={FilterPhone}></input>
                    </div>
                    <div className='overflow-y-auto scroll h-28 px-2'>
                        {phones.map((item, i) => (
                            <div className='mt-2' key={i}>
                                <div className='text-black cursor-pointer hover:bg-[#ececec] text-[0.85rem] font-bold' onClick={() => { HandleFunction(item.dial_code); setSelect(false) }}>{item.dial_code}</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default PhoneSelector