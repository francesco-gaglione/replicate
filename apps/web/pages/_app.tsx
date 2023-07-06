import {createWalletConnectConfig, WalletConnectSupportedChains, WalletConnectWrapper} from 'react-components';
import { AppProps } from "next/app";
import { useAccount } from 'wagmi';
import '../styles/globals.css';

function AppLayout({ Component, pageProps }: any): JSX.Element {
    // Wagmi Hook
    const { address, isConnecting, isDisconnected } = useAccount()

    return (
        <>
            <div className='flex flex-col h-screen justify-center'>
                {/* Components */}
                <div data-testid="global-content-container"
                    className='flex flex-grow justify-center bg-content overflow-auto'>
                    <div className='container py-5 px-5'>
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
        </>
    )

}

createWalletConnectConfig("e13c98a2e244316aa8f73949f6922f01", [WalletConnectSupportedChains.POLYGON_MUMBAI])

// Main app component
export default function App({ Component }: AppProps) {

    return (
        <>
            <WalletConnectWrapper>
                <AppLayout Component={Component} />
            </WalletConnectWrapper>
        </>
    )
}
