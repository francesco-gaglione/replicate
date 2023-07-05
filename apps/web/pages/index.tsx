import { ConnectButton } from "react-components";
import { useAccount } from "wagmi";

/**
 * Home page component
 */
export default function Home() {

    const {address} = useAccount();


    return (
        <>
            <ConnectButton></ConnectButton>
        </>
    )
}
