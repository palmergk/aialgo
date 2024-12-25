import React, { useState } from 'react'
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";

const PasswordToTextInput = ({name, value, onChange, onKeyUp, placeholder, className}) => {
    const [eye, setEye] = useState(false)
    const EyeIcon = eye ? HiOutlineEye : HiOutlineEyeSlash

    return (
        <div className='relative'>
            <input className={`outline-none border border-light bg-transparent lg:text-[0.85rem] text-base w-48 h-fit rounded-[3px] pl-2 pr-8 py-1 text-black ipt ${className?.main}`} placeholder={placeholder} name={name} value={value} onChange={onChange} onKeyUp={onKeyUp} type={`${eye ? 'text' : 'password'}`}></input>
            <EyeIcon className={`absolute top-2 right-2 cursor-pointer text-light text-lg ${className?.icon}`} onClick={() => setEye(!eye)} />
        </div>
    )
}

export default PasswordToTextInput