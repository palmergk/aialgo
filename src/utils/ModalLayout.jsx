import React, { useEffect, useRef } from 'react'

const ModalLayout = ({ children, closeView, toggler }) => {

  useEffect(() => {
    if (toggler) {
      window.addEventListener('click', (event) => {
        if (toggler.current !== null) {
          if (!toggler.current.contains(event.target)) {
            closeView()
          }
        }
      }, true)
    }
  }, [])

  return (
    <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center bg-[#0000008a] z-50'>
      <div className='w-11/12 mx-auto'>
        {children}
      </div>
    </div>
  )
}

export default ModalLayout