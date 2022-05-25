import Main from '../components/Main'

import Header from '../components/Header'
const styles = {
  container: `h-full w-full flex `,
}

export default function Shop() {
  return (

    <div className={styles.container}>
        <Header />
     
    <Main />
  </div>
   
  )
}
