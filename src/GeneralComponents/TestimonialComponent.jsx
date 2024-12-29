import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Testimonials } from '../utils/utils'

const TestimonialComponent = () => {

    useEffect(() => {
        let index = 0;
        let slider = document.querySelector('.slider')
        setInterval(() => {
            if (index < 72) {
                index += 18
            } else {
                index = 0
            }
            slider.style.transform = `translateX(-${index}%)`
            slider.style.transition = 'all 0.6s ease-in-out'
        }, 3000)
    }, [])

    return (
        <div className='flex flex-col gap-10'>
            <div className='relative w-fit mx-auto text-semi-white'>
                <div className='text-[2rem] md:text-[3rem]  font-semibold capitalize'>Testimonials</div>
                <div className='border-t-4 md:w-40 w-28 absolute top-0 right-0'></div>
                <div className='border-b-4 md:w-40 w-28 absolute bottom-0 left-0'></div>
            </div>
            <div className='h-fit md:w-5/6 overflow-x-hidden mx-auto flex flex-col gap-4'>
                <div className='w-fit'>
                    <div className='flex w-full md:-ml-10 -ml-5 slider' >
                        {Testimonials.map((item, i) => (
                            <div key={i} className='md:w-[32rem] w-72 border border-zinc-300 lg:p-10 p-5'>
                                <div className='flex flex-col gap-10'>
                                    <img alt='customer photo' src={item.image} className='md:size-28 size-24 rounded-full object-cover border-4 border-gray-200'></img>
                                    <div className='flex flex-col gap-6'>
                                        <div className='md:text-xl text-lg font-bold capitalize'>{item.name}</div>
                                        <div className='md:text-base text-sm pb-5'>{item.review}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className='flex gap-8 items-center mt-10 text-2xl px-4'>
                    <div className='cursor-pointer' onClick={MoveBackward}>
                        <FaAngleLeft />
                    </div>
                    <div className='cursor-pointer' onClick={MoveForward}>
                        <FaAngleRight />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default TestimonialComponent