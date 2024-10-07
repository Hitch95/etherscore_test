import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { sepolia } from 'viem/chains';
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import styles from './walletInfo.module.css';

const API_KEY = import.meta.env.VITE_API_KEY;

const alchemy = new Alchemy({
  apiKey: API_KEY,
  network: Network.ETH_SEPOLIA,
});

const WalletInfo = () => {
  const { address } = useAccount();
  const balanceResult = useBalance({ address, chainId: sepolia.id, blockTag: "latest" });
  const [transactions, setTransactions] = useState<any[]>([]);

  const getTransfers = async () => {
    if (!address) return;

    try {
      const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        toAddress: address,
        excludeZeroValue: true,
        category: [AssetTransfersCategory.ERC20, AssetTransfersCategory.EXTERNAL],
      });
      console.log("Transfers:", data.transfers);
      setTransactions(data.transfers);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
  };

  useEffect(() => {
    if (address) {
      getTransfers();
    }
  }, [address]);

  return (
    <div>
      <p>Balance: {Number(balanceResult.data?.formatted)} ETH</p>
      <h2>Last 10 Transactions</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.hash}>
              <p>Hash: {tx.hash}</p>
              <p>Block Number: {tx.blockNumber}</p>
              <p>From: {tx.from}</p>
              <p>To: {tx.to}</p>
              <p>Value: {Number(tx.value)} ETH</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default WalletInfo;
