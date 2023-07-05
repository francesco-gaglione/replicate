import { useWeb3Modal } from "@web3modal/react";

/**
 * React hook for controlling a WalletConnect modal using Web3Modal.
 *
 * @returns An object with functions and state variables for controlling the WalletConnect modal.
 */
export const useWalletConnectModalControls = (): {
    /**
     * Function to close the WalletConnect modal.
     */
    close: () => void,
    /**
     * Function to open the WalletConnect modal.
     */
    open: () => void,
    /**
     * Boolean indicating whether the WalletConnect modal is currently open or closed.
     */
    isOpen: boolean
} => {

    const { close, open, isOpen } = useWeb3Modal();

    return {
        close: close,
        open: open,
        isOpen: isOpen
    };
};
