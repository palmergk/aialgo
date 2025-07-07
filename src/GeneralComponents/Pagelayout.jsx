import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

const Pagelayout = ({ children }) => {
  useEffect(() => {
    const removeGoogleTranslateOffset = () => {
      document.body.style.top = '0px'
      document.body.style.position = 'static'
    }

    removeGoogleTranslateOffset()

    window.addEventListener('resize', removeGoogleTranslateOffset)
    const observer = new MutationObserver(removeGoogleTranslateOffset)
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })

    return () => {
      window.removeEventListener('resize', removeGoogleTranslateOffset)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Pagelayout;
