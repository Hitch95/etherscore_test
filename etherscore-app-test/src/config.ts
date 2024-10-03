// import { createWalletClient, custom } from 'viem';

import { http, createConfig } from 'wagmi';
import { mainnet, base, sepolia } from 'viem/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
    chains: [mainnet, base, sepolia],
    connectors: [
        injected(),
        metaMask(),
        safe(),
    ],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
        [sepolia.id]: http(),
    },
});
