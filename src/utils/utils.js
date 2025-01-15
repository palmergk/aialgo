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
import india from '../assets/images/india.jfif'

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
        review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Evienet accusatinum'
    },
    {
        name: 'carlos rivera',
        image: spain,
        location: 'seville, spain',
        review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Evienet accusatinum'
    },
    {
        name: 'arthur allen',
        image: uk,
        location: 'manchester, UK',
        review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Evienet accusatinum'
    },
    {
        name: 'jeremy davis',
        image: us2,
        location: 'atlanta, US',
        review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Evienet accusatinum'
    },
    {
        name: 'kabir kumar',
        image: india,
        location: 'surat, india',
        review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Evienet accusatinum'
    }
]



