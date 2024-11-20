import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { MdContentCopy } from 'react-icons/md'

const CopyButton = ({content, className}) => {
    const [copy, setCopy] = useState(false)

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(content)
        setCopy(true)
    }

    return (
        <>
            <button className={`outline-none w-fit h-fit py-1.5 px-2 text-semi-white text-xs bg-[#252525] rounded-md capitalize flex items-center justify-center ${className}`} type='button' onClick={() => copyFunction()}>
                {!copy ? <MdContentCopy /> : <FaCheck />}
            </button>
        </>
    )
}

export default CopyButton