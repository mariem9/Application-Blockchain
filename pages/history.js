import React, { useContext, useEffect } from 'react'

import Header from '../components/Header'
import { RobinhoodContext } from '../context/RobinhoodContext'


import Transaction from '../components/Transaction'

const history = () => {
  const styles = {
    container: `h-full w-full flex bg-black`,
    main:'flex flex-col items-center container-lg text-black',

    tableContainer: `w-full h-full flex flex-col p-[100px] justify-center`,
    pageTitle: `text-2xl font-bold text-left mt-[50px] mb-[30px] text-white`,
    transactions: `flex gap-[50px] flex-row flex-wrap`,
  }
  const { ownedItems } = useContext(RobinhoodContext)
   useEffect(() => {
     console.log(ownedItems)
   }, [])

  return (
    <div className={styles.container}>
    

      <div className={styles.main}>
        <Header />
        <div className={styles.tableContainer}>
          {ownedItems ? (
            <div className={styles.pageTitle}>Purchase History</div>
          ) : (
            <div className={styles.pageTitle}>No Purchase History</div>
          )}
          <div className={styles.transactions}>
            {ownedItems.map((item, Shop) => {
              return <Transaction key={Shop} item={item} Shop={Shop} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default history
