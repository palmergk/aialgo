import React, { useEffect, useRef, useState } from 'react';

const CountComponent = () => {
  const ref = useRef(null);
  const [hasCounted, setHasCounted] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [tradeCount, setTradeCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasCounted]);

  useEffect(() => {
    if (!hasCounted) return;

    const duration = 1500;
    const fps = 60;
    const intervalTime = 1000 / fps;
    const steps = duration / intervalTime;
    let step = 0;

    const targets = {
      user: 85,
      daily: 210,
      weekly: 1.5,
      trade: 95,
    };

    const interval = setInterval(() => {
      step++;

      setUserCount(Math.min(Math.floor((step / steps) * targets.user), targets.user));
      setDailyCount(Math.min(Math.floor((step / steps) * targets.daily), targets.daily));
      setWeeklyCount(Math.min(parseFloat(((step / steps) * targets.weekly).toFixed(2)), targets.weekly));
      setTradeCount(Math.min(Math.floor((step / steps) * targets.trade), targets.trade));

      if (step >= steps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [hasCounted]);

  return (
    <div
      ref={ref}
      className="w-full h-fit bg-[#192633] py-14 px-4 rounded-md relative overflow-hidden"
    >
      <div className="relative w-fit mx-auto text-semi-white">
        <div className="text-[2rem] md:text-[3rem] text-white font-[550] capitalize">
          the numbers
        </div>
        <div className="border-t-4 md:w-48 w-32 absolute top-0 left-0"></div>
        <div className="border-b-4 md:w-48 w-32 absolute bottom-0 right-0"></div>
      </div>

      <div className="flex items-center flex-wrap gap-10 md:gap-20 lg:gap-32 justify-center mt-14">
        <div className="flex flex-col gap-1 items-center">
          <div className="md:text-5xl text-4xl font-extrabold text-white">
            {userCount}K
          </div>
          <div className="capitalize text-xs font-bold text-[#c0bebe]">
            satisfied users
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="md:text-5xl text-4xl font-extrabold text-white">
            {dailyCount}K
          </div>
          <div className="capitalize text-xs font-bold text-[#c0bebe]">
            daily investments
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="md:text-5xl text-4xl font-extrabold text-white">
            {weeklyCount}M
          </div>
          <div className="capitalize text-xs font-bold text-[#c0bebe]">
            weekly investments
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="md:text-5xl text-4xl font-extrabold text-white">
            {tradeCount}
            <span className="font-[500]">%</span>
          </div>
          <div className="capitalize text-xs font-bold text-[#c0bebe]">
            trade efficiency
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountComponent;
