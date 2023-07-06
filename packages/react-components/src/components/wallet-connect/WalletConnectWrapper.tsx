import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum'
import {Web3Modal} from '@web3modal/react'
import React from 'react'
import {configureChains, createConfig, WagmiConfig} from 'wagmi'
import {mainnet, polygon, polygonMumbai, goerli} from 'wagmi/chains'

export enum WalletConnectSupportedChains {
    ETHEREUM_MAINNET,
    ETHEREUM_GOERLI,
    POLYGON_MAINNET,
    POLYGON_MUMBAI
}

let wagmiConfig: any;
let id: string;
let ethereumClient: EthereumClient;

export function createWalletConnectConfig(projectId: string, chains: Array<WalletConnectSupportedChains>) {
    id = projectId;

    const mappedChains: any[] = generateChainArray(chains);

    const {publicClient} = configureChains(mappedChains, [w3mProvider({projectId})])
    wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({projectId: projectId, chains: mappedChains}),
        publicClient
    })
    ethereumClient = new EthereumClient(wagmiConfig, mappedChains);

}


export function WalletConnectWrapper(props: {children: React.ReactNode }) {
    const { children} = props;

    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                {children}
            </WagmiConfig>
            <Web3Modal projectId={id} ethereumClient={ethereumClient}/>
        </>
    )

}

function generateChainArray(chains: Array<WalletConnectSupportedChains>): Array<any> {
    let mappedChains: Array<any> = chains.map((el: WalletConnectSupportedChains)=> {
        switch (el) {
            case WalletConnectSupportedChains.ETHEREUM_MAINNET:
                return mainnet;
            case WalletConnectSupportedChains.ETHEREUM_GOERLI:
                return goerli;
            case WalletConnectSupportedChains.POLYGON_MAINNET:
                return polygon;
            case WalletConnectSupportedChains.POLYGON_MUMBAI:
                return polygonMumbai;
            default:
                return mainnet;
        }
    });
    console.log("mapped chains: ", mappedChains)
    return mappedChains;
}
