import React, { useContext, useEffect } from 'react'


import { AiOutlineSearch } from 'react-icons/ai'
import { RobinhoodContext } from '../context/RobinhoodContext'
import Link from 'next/link'


const styles = {
  container: 'flex w-screen h-16 bg-black px-24 py-3 mb-5 ',
  leftHeader: 'flex flex-1',
  logo: 'object-cover cursor-pointer',
  searchWrapper: 'flex flex-1',
  searchInputContainer:
    'text-white items-center flex  flex-1 -ml-64 border border-gray-400 mr-64 hover:bg-[#1E2123] duration-300 p-3 rounded-lg',
  searchIcon: 'text-gray-400 text-3xl mr-3',
  searchInputWrapper: 'text-gray-400 text-lg w-full',
  searchInput: 'bg-transparent outline-none w-full',
  rightHeader: 'flex items-center justify-end text-white gap-8',
  menuItem: 'cursor-pointer font-bold hover:text-green-500 duration-300',
}

const Header = () => {
  const {
    connectWallet,
    signOut,
    currentAccount,
    isAuthenticated,
    formattedAccount,
    
  } = useContext(RobinhoodContext)

  return (
    <div className={styles.container}>
      <div className={styles.leftHeader}>
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.searchInputContainer}>
          <AiOutlineSearch className={styles.searchIcon} />
          <div className={styles.searchInputWrapper}>
            <input placeholder='Search...' className={styles.searchInput} />
          </div>
        </div>
      </div>
      <div className={styles.rightHeader}>
      <Link href="/">
        <div className={styles.menuItem} >
          Porfolio
        </div></Link>
        <Link href="/Shop">
        <div className={styles.menuItem}  >Shop</div></Link>
        <Link href="/NFT">
        <div className={styles.menuItem}>NFT</div></Link>
        <div className={styles.menuItem}>Messages</div>
        {isAuthenticated && (
          <>
            <div className={styles.menuItem}>{formattedAccount}</div>
            <div className={styles.menuItem} onClick={() => signOut()}>
              Logout
            </div>
          </>
        )}

        {!isAuthenticated && (
          <div className={styles.menuItem} onClick={() => connectWallet()}>
            Login
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
