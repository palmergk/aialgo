import React from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

const StatusSelector = ({ Statuses, status, HandleFunction, select, toggle, className }) => {

    return (
        <div className='relative'>
            <div className={`px-2 py-1 h-fit md:w-44 w-36 rounded-[3px] bg-white sha cursor-pointer ${className}`} onClick={() => toggle()} >
                <div className='flex justify-between items-center text-[0.8rem]'>
                    <span >{status}</span>
                    <div className='text-sm'>
                        {!select ? <TiArrowSortedDown />
                            :
                            <TiArrowSortedUp />
                        }
                    </div>
                </div>
            </div>
            {select &&
                <div className='h-fit w-full absolute top-[1.8rem] left-0 bg-white border border-[lightgrey] rounded-md z-10 text-[0.85rem] font-bold'>
                    {Statuses.map((item, i) => (
                        <div key={i} className={`flex flex-col px-2 py-0.5 cursor-pointer hover:bg-[#ececec] ${i !== Statuses.length - 1 && 'border-b border-[#ebeaea]'}`} onClick={() => { HandleFunction(item); toggle() }}>
                            <div className='flex items-center'>
                                <div>{item}</div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default StatusSelector