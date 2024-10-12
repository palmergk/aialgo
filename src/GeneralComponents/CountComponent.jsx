import React, { useEffect, useRef, useState } from 'react'

const CountComponent = () => {
    const [userCount, setUserCount] = useState(0)
    const [dailyCount, setDailyCount] = useState(0)
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [tradeCount, setTradeCount] = useState(0)
    const ref = useRef()

    useEffect(() => {
        const element = ref.current

        let index = 0
        let index2 = 0
        let index3 = 0
        let index4 = 0

        const countFunction = () => {

            if (userCount < 1) {
                let countOne = setInterval(() => {
                    if (index === 44) {
                        clearInterval(countOne)
                    } else {
                        index += 4
                        setUserCount(index)
                    }
                }, 100)

                let countTwo = setInterval(() => {
                    if (index2 === 320) {
                        clearInterval(countTwo)
                    } else {
                        index2 +=32
                        setDailyCount(index2)
                    }
                }, 100)

                let countThree = setInterval(() => {
                    if (index3 === 2.24) {
                        clearInterval(countThree)
                    } else {
                        index3 += 0.224
                        setWeeklyCount(index3)
                    }
                }, 100)

                let countFour = setInterval(() => {
                    if (index4 === 95) {
                        clearInterval(countFour)
                    } else {
                        index4 += 5
                        setTradeCount(index4)
                    }
                }, 100)
            }
        }

        const handleObserver = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                requestAnimationFrame(countFunction)
            }
        }

        const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 })
        observer.observe(element)

    }, [])


    return (
        <div className='w-full h-fit bg-[#192633] py-14 px-4 rounded-md relative overflow-hidden' ref={ref}>
            <div className='relative w-fit mx-auto text-semi-white'>
                <div className='text-[2rem] md:text-[3rem] text-white font-[550] capitalize'>the numbers</div>
                <div className='border-t-4 md:w-48 w-32 absolute top-0 left-0'></div>
                <div className='border-b-4 md:w-48 w-32 absolute bottom-0 right-0'></div>
            </div>
            <div className='flex items-center flex-wrap gap-10 md:gap-32 justify-center mt-14'>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='md:text-5xl text-4xl font-extrabold text-white'>{userCount}K<span className='font-[500]'></span></div>
                    <div className='capitalize text-xs font-bold text-[#c0bebe]'>satisfield users</div>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='md:text-5xl text-4xl font-extrabold text-white'>{dailyCount}K<span className='font-[500]'></span></div>
                    <div className='capitalize text-xs font-bold text-[#c0bebe]'>daily investments</div>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='md:text-5xl text-4xl font-extrabold text-white'>{weeklyCount}M<span className='font-[500]'></span></div>
                    <div className='capitalize text-xs font-bold text-[#c0bebe]'>weekly investments</div>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='md:text-5xl text-4xl font-extrabold text-white'>{tradeCount}<span className='font-[500] text-4'>%</span></div>
                    <div className='capitalize text-xs font-bold text-[#c0bebe]'>trade efficiency</div>
                </div>
            </div>
        </div>
    )
}

export default CountComponent