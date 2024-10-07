// import { createWalletClient, custom } from 'viem';

import { http, createConfig } from 'wagmi';
import { sepolia } from 'viem/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
    chains: [sepolia],
    connectors: [
        injected(),
        metaMask(),
        safe(),
    ],
    transports: {
        [sepolia.id]: http(),
    },
});
