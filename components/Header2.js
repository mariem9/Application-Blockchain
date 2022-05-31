import React, { useContext } from 'react'
import { CgMenuGridO } from 'react-icons/cg'


import { RobinhoodContext } from '../context/RobinhoodContext'
import { FaCoins } from 'react-icons/fa'
import { AiOutlineHistory } from 'react-icons/ai'
import Link from 'next/link'
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from 'react-simple-hook-modal'
import 'react-simple-hook-modal/dist/styles.css'
import BuyModal from './BuyModal'

const Header2 = () => {
  const styles = {
    container: `h-[100px] w-full flex items-center gap-5`,
    // logo: `flex items-center ml-[20px] cursor-pointer flex-1`,
    search: `p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-black`,
    searchInput: `bg-transparent focus:outline-none border-none flex-1 items-center flex`,
    menu: `flex items-center gap-6`,
    menuItem: `flex items-center text-md font-bold cursor-pointer text-white`,
    coins: `ml-[10px]`,
  }

  const { balance, buyTokens } = useContext(RobinhoodContext)
  const { openModal, isModalOpen, closeModal } = useModal()
  return (
    
    <ModalProvider>
      <div className={styles.container}>
        
        <div className={styles.menu}>
          <div className={styles.menuItem}>New Releases</div>
          <div className={styles.menuItem}>Featured</div>
          {balance ? (
            <div
              className={(styles.balance, styles.menuItem)}
              onClick={openModal}
            >
              {balance}
              <FaCoins className={styles.coins} />
              <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                <BuyModal close={closeModal} buyTokens={buyTokens} />
              </Modal>
            </div>
          ) : (
            <div
              className={(styles.balance, styles.menuItem)}
              onClick={openModal}
            >
              0 AC <FaCoins className={styles.coins} />
              <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                <BuyModal close={closeModal} buyTokens={buyTokens} />
              </Modal>
            </div>
          )}
          <div>
              <Link href='/history'>
     <div className={styles.menuItem}  >
       <AiOutlineHistory />
       Transaction History
     </div>
   </Link></div> 
          <CgMenuGridO fontSize={30} className={styles.menuItem} />
        </div>
      </div>
    

     
   </ModalProvider>
 
  )
}

export default Header2
