import { useContext } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { useTranslation } from 'react-i18next';

import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import styles from "./account.module.css";

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const { t, i18n } = useTranslation();

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext not found. Make sure ThemeProvider is wrapping your App.");
  };

  const { toggleTheme, isDarkMode } = themeContext;

  return (
    <div className={`${styles["account-container"]} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={`${styles["button-part"]} ${isDarkMode ? styles.dark : styles.light}`}>
        <button className={`${styles["disconnect-button"]} ${isDarkMode ? styles.dark : styles.light}`}
          onClick={() => disconnect()} 
        >
          {t("disconnect_wallet")}
        </button>
      </div>
      <div className={`${styles["address-part"]} ${isDarkMode ? styles.dark : styles.light}`}>
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        <p>{t("address")}</p>
        {address && <p>{ensName ? `${ensName} (${address})` : address}</p>}
      </div>
    </div>
  )
}
