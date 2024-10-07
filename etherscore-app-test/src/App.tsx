import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';
import { IoWalletOutline } from "react-icons/io5";

import { Account } from "./account";
import { WalletOptions } from "./wallet-options";
import Header from './components/Header/header';
import WalletInfo from './components/WalletInfo/walletInfo';
import styles from './App.module.css';

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return null;
};

const App = () => {
  const { isConnected } = useAccount();
  const [isModalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleModal = () => setModalOpen((prev) => !prev);

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  return (
    <div className={styles.container}>
      <Header />
      <button className={styles["connect-button"]} onClick={toggleModal}>
        {t("connect_wallet")}
        <IoWalletOutline />
      </button>

      <ConnectWallet />

      {isConnected && <WalletInfo />}

      {isModalOpen && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal"]}>
            <WalletOptions onClose={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
