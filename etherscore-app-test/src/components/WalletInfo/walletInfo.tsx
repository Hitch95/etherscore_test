import React, { useContext, useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { sepolia } from 'viem/chains';
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import styles from './walletInfo.module.css';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

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

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeContext not found. Make sure ThemeProvider is wrapping your App.");
    };

    const { toggleTheme, isDarkMode } = themeContext;

    const tableStyles = {
        backgroundColor: isDarkMode ? 'black' : 'white',
    };

    const tableCellStyles = {
        color: isDarkMode ? 'white' : 'black',
    };

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
        <div className={`${styles["wallet-info-container"]} ${isDarkMode ? styles.dark : styles.light}`}>
            <section>
                <p>{t("balance")} {balanceResult.data?.formatted} ETH</p>
            </section>
            <section>
                <h3>{t("lastTransaction")}</h3>
                {transactions.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={tableStyles}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableCellStyles}>Transaction Hash</TableCell>
                                    <TableCell sx={tableCellStyles}>Block Number</TableCell>
                                    <TableCell sx={tableCellStyles}>From</TableCell>
                                    <TableCell sx={tableCellStyles}>To</TableCell>
                                    <TableCell sx={tableCellStyles}>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((tx) => (
                                    <TableRow key={tx.hash}>
                                        <TableCell sx={tableCellStyles}>{tx.hash}</TableCell>
                                        <TableCell sx={tableCellStyles}>{tx.blockNum}</TableCell>
                                        <TableCell sx={tableCellStyles}>{tx.from}</TableCell>
                                        <TableCell sx={tableCellStyles}>{tx.to}</TableCell>
                                        <TableCell sx={tableCellStyles}>{Number(tx.value)} ETH</TableCell>
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
