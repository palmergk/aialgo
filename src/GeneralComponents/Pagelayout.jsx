import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Apis, UserGetApi } from '../services/API'
import { useAtom } from 'jotai'
import { ADMINSTORE } from '../store'


const Pagelayout = ({ children }) => {
  const [, setAdminStore] = useAtom(ADMINSTORE)

  useEffect(() => {
    const FetchAdminStore = async () => {
      try {
        const response = await UserGetApi(Apis.admin.get_admin_store)
        if (response.status === 200) {
          setAdminStore(response.msg)
        }
  
      } catch (error) {
        //
      }
    }
    FetchAdminStore()
  }, [])

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