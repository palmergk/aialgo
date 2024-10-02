import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Notfound from './utils/Notfound'
import { AdminDashboardPagesLinks, GeneralPagesLinks, UserDashboardPagesLinks } from './services/PageLinks'
import AuthRoute from './services/AuthRoute'
import AdminRoute from './services/AdminRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Notfound />} />
        {GeneralPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<item.component />} />
        ))}
        {UserDashboardPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<AuthRoute><item.component /></AuthRoute>} />
        ))}
        {AdminDashboardPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<AdminRoute><item.component /></AdminRoute>} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App