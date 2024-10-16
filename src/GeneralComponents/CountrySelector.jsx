import React, { useState } from 'react'
import { countryApi } from '../services/CountryAPI'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

const CountrySelector = ({ usercountry, setUserCountry, className }) => {
    const [countries, setCountries] = useState(countryApi)
    const [select, setSelect] = useState(false)
    const [search, setSearch] = useState('')


    const FilterCountry = () => {
        const altCountries = countryApi
        if (!search) {
            setCountries(countryApi)
        }
        else {
            let searchResult = altCountries.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
            setCountries(searchResult)
        }
    }

    return (
        <div className='relative'>
            <div className='flex gap-1 items-center'>
                {usercountry.flag !== null && <img className='h-5 w-auto' src={usercountry.flag}></img>}
                <div className={`px-2 py-1 h-fit w-full bg-white sha cursor-pointer rounded-[3px] ${className}`} onClick={() => { setSelect(!select); setSearch(''); setCountries(countryApi) }}>
                    <div className='flex justify-between items-center text-[0.8rem] text-black'>
                        <span className='font-semibold'>{usercountry.name}</span>
                        <div className='text-sm'>
                            {!select ? <TiArrowSortedDown />
                                :
                                <TiArrowSortedUp />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {select &&
                <div className={`h-fit w-full bg-white sha absolute top-8 left-0 z-10 py-2 rounded-sm ${className}`}>
                    <div className='px-4'>
                        <input className='ipt border border-[#a7a6a6] bg-transparent text-black px-2 py-1 w-full outline-none md:text-[0.85rem] text-base md:h-6 h-7 rounded-sm mb-1' type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={FilterCountry}></input>
                    </div>
                    <div className='overflow-y-auto scroll h-28 px-4'>
                        {countries.map((item, i) => (
                            <div key={i} className='flex gap-2 items-center mt-2 text-black text-[0.85rem] font-bold cursor-pointer hover:bg-semi-white' onClick={() => { setUserCountry(item); setSelect(false) }}>
                                <img src={item.flag} className='w-4 h-auto object-cover'></img>
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default CountrySelector