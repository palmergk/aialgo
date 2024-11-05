import React from 'react'
import { Link } from 'react-router-dom'
import AdminDashboard from '../../pages/auth/adminDashboardPages/AdminDashboard'


const SettingsLinks = [
  { path: 'wallets', url: '/admin-controls/settings/wallets' },
  { path: 'packages', url: '/admin-controls/settings/packages' },
  { path: 'personalize', url: '/admin-controls/settings/personalize' },
]


const SettingsLayout = ({ children }) => {

  return (
    <AdminDashboard>
      <div>
        <div className='uppercase font-bold md:text-2xl text-lg text-black'>settings</div>
        <div className="flex items-center gap-1 mt-4">
          {SettingsLinks.map((item, index) => (
            <Link key={index} to={item.url} className={`py-1.5 px-4 rounded-lg capitalize md:text-sm text-[0.8rem] font-medium cursor-pointer ${location.pathname === item.url ? ' bg-zinc-100' : ''} `}>{item.path}</Link>
          ))}
        </div>
        <div>
          {children}
        </div>
      </div>
    </AdminDashboard>
  )
}

export default SettingsLayout