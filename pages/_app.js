import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { RobinhoodProvider } from '../context/RobinhoodContext'
import { ModalProvider } from 'react-simple-hook-modal'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
    <MoralisProvider
      // This should be in a .env file
      serverUrl='https://c0smvt5l81wn.usemoralis.com:2053/server'
      appId='HUEpcBuWsZlMXyOrQ2kSZTqCFGp5UqNE3fjbLlOX'
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
