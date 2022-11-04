import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { RobinhoodProvider } from '../context/RobinhoodContext'
import { ModalProvider } from 'react-simple-hook-modal'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <MoralisProvider
      // This should be in a .env file
      serverUrl='https://w4ztxxc4ouc8.grandmoralis.com:2053/server'
      appId='bAbCPw73cSQ0ebHGs2Sjcgh7mFRhHDTPEYyDlcvy'
    >
      <RobinhoodProvider>
      <ModalProvider>
        <Component {...pageProps} />
        </ModalProvider>
      </RobinhoodProvider>
    </MoralisProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
