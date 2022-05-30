import Main from '../components/Main'

import Header from '../components/Header'
const styles = {
  container: `flex flex-col items-center container-lg text-[#e5e8eb] `,
  

}

export default function Shop() {
  return (

    <div className={styles.container}>
   
        <Header />
     
    <Main />
  </div>
   
  )
}
