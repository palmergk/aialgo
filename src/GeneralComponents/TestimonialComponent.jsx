import React, { useEffect, useState, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Testimonials } from '../utils/utils';

const TestimonialComponent = () => {
    const sliderRef = useRef(null)
    const containerRef = useRef(null)
    const [index, setIndex] = useState(0)
    const [slideWidth, setSlideWidth] = useState(0)

    useEffect(() => {
        if (containerRef.current) {
            setSlideWidth(containerRef.current.offsetWidth)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex >= Testimonials.length - 1 ? 0 : prevIndex + 1))
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const MoveForward = () => {
        setIndex((prevIndex) => (prevIndex < Testimonials.length - 1 ? prevIndex + 1 : prevIndex))
    }

    const MoveBackward = () => {
        setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
    }

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${index * slideWidth}px)`
            sliderRef.current.style.transition = 'all 0.6s ease-in-out'
        }
    }, [index, slideWidth])

    return (
        <div className='flex flex-col gap-10'>
            <div className='relative w-fit mx-auto text-semi-white'>
                <div className='text-[2rem] md:text-[3rem] font-semibold capitalize'>Testimonials</div>
                <div className='border-t-4 md:w-40 w-28 absolute top-0 right-0'></div>
                <div className='border-b-4 md:w-40 w-28 absolute bottom-0 left-0'></div>
            </div>
            <div className='h-fit md:w-5/6 w-full overflow-hidden mx-auto flex flex-col gap-4'>
                <div className='w-full overflow-hidden'>
                    <div ref={sliderRef} className='flex w-full'>
                        {Testimonials.map((item, i) => (
                            <div ref={i === 0 ? containerRef : null} key={i} className='flex-shrink-0 max-w-[32rem] border border-zinc-300 lg:p-10 p-5'>
                                <div className='flex flex-col gap-10'>
                                    <img alt='customer photo' src={item.image} className='md:size-28 size-24 rounded-full object-cover border-4 border-gray-200' />
                                    <div className='flex flex-col gap-6'>
                                        <div className='md:text-2xl text-xl font-bold capitalize'>{item.name}</div>
                                        <div className='text-base pb-5 md:w-full w-4/6'>{item.review}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex gap-8 items-center mt-10 text-3xl px-4'>
                    <div className='cursor-pointer' onClick={MoveBackward}>
                        <FaAngleLeft />
                    </div>
                    <div className='cursor-pointer' onClick={MoveForward}>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialComponent;
