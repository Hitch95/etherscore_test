import React, { useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';
import { IoWalletOutline } from "react-icons/io5";

import { ThemeContext } from "./context/ThemeContext/ThemeContext";
import { Account } from "./components/Account/account";
import Header from './components/Header/header';
import WalletInfo from './components/WalletInfo/walletInfo';
import { WalletOptions } from "./wallet-options";
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

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext not found. Make sure ThemeProvider is wrapping your App.");
  };

  const { toggleTheme, isDarkMode } = themeContext;

  const toggleModal = () => setModalOpen((prev) => !prev);

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      <Header />
      {!isConnected && (
        <button 
          className={`${styles["connect-button"]} ${isDarkMode ? styles.dark : styles.light}`} 
          onClick={toggleModal}
        >
          {t("connect_wallet")}
          <IoWalletOutline />
        </button>
      )}

      <ConnectWallet />

      {isConnected && <WalletInfo />}

      {isModalOpen && (
        <div className={styles["modal-overlay"]}>
          <div className={`${styles["modal"]} ${isDarkMode ? styles.dark : styles.light}`}>
            <WalletOptions onClose={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
