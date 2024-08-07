import React, { useState } from 'react'
import AdminDashboard from '../AdminDashboard'
import { Link, useLocation } from 'react-router-dom'


const SettingsLinks = [
  { path: 'add wallet', url: '/admin-controls/settings' },
  { path: 'add package', url: '/admin-controls/settings/packages' },
  { path: 'personalize', url: '/admin-controls/settings/personalize' },
]


const SettingsLayout = ({ children }) => {
  const location = useLocation()

  return (
    <AdminDashboard>
      <div className='h-screen'>
        <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>settings</div>
        <div className="flex items-center gap-1 mt-4">
          {SettingsLinks.map((item, index) => (
            <Link key={index} to={item.url} className={`py-1.5 px-4 rounded-lg capitalize text-sm font-medium cursor-pointer ${location.pathname === item.url ? ' bg-zinc-100' : ''} `}>{item.path}</Link>
          ))}
        </div>
        <div className='mt-10'>
          {children}
        </div>
      </div>
    </AdminDashboard>
  )
}

export default SettingsLayout