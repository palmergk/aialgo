import React from 'react'
import Header from './Header'
import Footer from './Footer'


const Pagelayout = ({ children }) => {
  return (
    <>
      <div className='h-20'>
        <Header />
      </div>
      <div>
        {children}
      </div>
      <div>
      <Footer />
      </div>
    </>
  )
}

export default Pagelayout