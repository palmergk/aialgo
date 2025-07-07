import toast from 'react-hot-toast';
import bitcoin from '../assets/images/bitcoin.png'
import usdt from '../assets/images/usdt.png'
import ethereum from '../assets/images/ethereum.png'
import solana from '../assets/images/solana.png'
import xrp from '../assets/images/xrp.png'
import us from '../assets/images/us.jfif'
import us2 from '../assets/images/us-black.webp'
import spain from '../assets/images/spanish.jfif'
import uk from '../assets/images/uk.webp'

export const ErrorAlert = (message) => {
    return toast.error(message, {
        position: "top-center",
    })
}

export const SuccessAlert = (message) => {
    return toast.success(message, {
        position: "top-center"
    })
}

export const CookieName = 'aiwebgiddys'

export const UserRole = [
    {
        role: 'user',
        url: '/dashboard'
    },
    {
        role: 'admin',
        url: '/admin-controls'
    },
    {
        role: 'super admin',
        url: '/admin-controls'
    },
]

export const MoveToTop = () => {
    document.documentElement.scrollTo({
        top: 0
    })
}

export const PredefineCryptoImages = [
    {
        name: 'bitcoin.png',
        abb: 'btc',
        path: bitcoin
    },
    {
        name: 'usdt.png',
        abb: 'usdt',
        path: usdt
    },
    {
        name: 'ethereum.png',
        abb: 'eth',
        path: ethereum
    },
    {
        name: 'solana.png',
        abb: 'sol',
        path: solana
    },
    {
        name: 'xrp.png',
        abb: 'xrp',
        path: xrp
    },
]

export const FAQS = [
    {
        title: 'What is artificial intelligence?',
        content: 'Artificial intelligence (AI) is a set of technologies that enable computers to perform a variety of advanced functions.'
    },
    {
        title: 'What is cryptocurrency trading?',
        content: 'Cryptocurrency trading is the act of speculating on cryptocurrencies market price movements.'
    },
    {
        title: 'Can i trade and earn as a beginner?',
        content: `Absolutely! The AI algo trade system is designed for easy use to aid cryptocurrency trading for everyone whether you're experienced or not.`
    },
    {
        title: 'What are the risks involved?',
        content: 'The AI algo trade system has a trading efficiency of 95%, we provide users with the best trading experience with no substantial trading risks involved.'
    },
    {
        title: 'What trading plan is the best?',
        content: 'The bigger the trading plan, the bigger the profits and bonuses attainable.'
    },
    {
        title: 'When can i withdraw my profits?',
        content: 'Every user on our platform has full control of their trading account and assests. Withdrawals can be made whenever and wherever you desire.'
    },
]

export const Testimonials = [
    {
        name: 'henry calvin',
        image: us,
        location: 'NYC, US',
        review: 'Trading in crypto has always been risky, but this algorithmic system made things so much easier. In just a few weeks, I saw more consistent gains than I ever had manually. NYC’s fast-paced lifestyle needs tools like this.'
    },
    {
        name: 'carlos rivera',
        image: spain,
        location: 'Seville, Spain',
        review: 'I didn’t expect an automated trading system to understand the market so well. It’s been consistently accurate, and I no longer have to stay glued to charts all day. It’s been a huge help.'
    },
    {
        name: 'arthur allen',
        image: uk,
        location: 'Manchester, UK',
        review: 'The algorithm is incredibly responsive to market shifts. I was skeptical at first, but after seeing consistent profits for months now, I’m convinced it’s the future of crypto trading. It’s taken so much guesswork out of the process.'
    },
    {
        name: 'jeremy davis',
        image: us2,
        location: 'Atlanta, US',
        review: 'As someone who works full-time, I needed something reliable and low-maintenance. This system runs on autopilot and still beats my old trading strategy by a mile. It’s been a game changer for me.'
    },
];




