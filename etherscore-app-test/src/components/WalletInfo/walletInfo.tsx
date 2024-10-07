import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { sepolia } from 'viem/chains';
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
    const { t, i18n } = useTranslation();

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
        <div className={styles['wallet-info-container']}>
            <section>
                <p>{t("balance")} {balanceResult.data?.formatted} ETH</p>
            </section>
            <section>
                <h3>{t("lastTransaction")}</h3>
                {transactions.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Transaction Hash</TableCell>
                                    <TableCell>Block Number</TableCell>
                                    <TableCell>From</TableCell>
                                    <TableCell>To</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((tx) => (
                                    <TableRow key={tx.hash}>
                                        <TableCell>{tx.hash}</TableCell>
                                        <TableCell>{tx.blockNum}</TableCell>
                                        <TableCell>{tx.from}</TableCell>
                                        <TableCell>{tx.to}</TableCell>
                                        <TableCell>{Number(tx.value)} ETH</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p>No transactions found.</p>
                )}
            </section>
        </div>
    );
};

export default WalletInfo;
