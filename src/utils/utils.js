import toast from 'react-hot-toast';
import bitcoin from '../assets/images/bitcoin.png'
import usdt from '../assets/images/usdt.png'
import ethereum from '../assets/images/ethereum.png'
import solana from '../assets/images/solana.png'
import xrp from '../assets/images/xrp.png'

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

export const questions = [
    {
        title: 'What is artificial intelligence?',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, exercitationem fugiat dolorum at officiis laboriosam labore, cum quod magni animi cumque vero ea est ratione soluta facere sapiente. Laborum, quis?'
    },
    {
        title: 'What is cryptocurrency trading?',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo consequuntur, est repellendus repudiandae culpa mollitia nemo incidunt commodi libero adipisci!'
    },
    {
        title: 'How do i start my crypto trading experience as a beginner?',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo consequuntur, est repellendus repudiandae culpa mollitia nemo incidunt commodi libero adipisci!'
    },
    {
        title: 'What are the risks involved?',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, exercitationem fugiat dolorum at officiis laboriosam labore, cum quod magni animi cumque vero ea est ratione soluta facere sapiente. Laborum, quis?'
    },
    {
        title: 'What trading plan is the best?',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, exercitationem fugiat dolorum at officiis laboriosam labore, cum quod magni animi cumque vero ea est ratione soluta facere sapiente. Laborum, quis?'
    },
    {
        title: 'When can i withdraw my profits?',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, exercitationem fugiat dolorum at officiis laboriosam labore, cum quod magni animi cumque vero ea est ratione soluta facere sapiente. Laborum, quis?'
    },
]

export const PredefineCryptoImages = [
    bitcoin,
    usdt,
    ethereum,
    solana,
    xrp
]



