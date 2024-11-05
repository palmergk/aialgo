import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Dashboard from '../pages/auth/userDashboardPages/Dashboard'


const VerifyLinks = [
    { path: 'personalize', url: '/dashboard/settings/personalize' },
    { path: 'verify email', url: '/dashboard/settings/verify-email' },
    { path: 'verify kyc', url: '/dashboard/settings/kyc' },
]


const SettingsLayout = ({ children }) => {
    const location = useLocation()

    return (
        <Dashboard>
            <div>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white'>settings</div>
                <div className="flex items-center gap-1 mt-4">
                    {VerifyLinks.map((item, index) => (
                        <Link key={index} to={item.url} className={`py-1.5 px-4 rounded-lg capitalize md:text-sm text-[0.8rem] font-medium cursor-pointer text-semi-white ${location.pathname === item.url && ' bg-[#15102c]'} `}>{item.path}</Link>
                    ))}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Dashboard>
    )
}

export default SettingsLayout