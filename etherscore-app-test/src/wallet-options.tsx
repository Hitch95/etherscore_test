import React, { useContext } from 'react';
import { Connector, useConnect } from 'wagmi';
import { IoClose } from "react-icons/io5";

import { ThemeContext } from "./context/ThemeContext/ThemeContext";
import styles from './App.module.css';

type WalletOptionsProps = {
  onClose: () => void;
};

export function WalletOptions({ onClose }: WalletOptionsProps) {
  const { connectors, connect } = useConnect();
  const filteredConnectors = connectors.filter((connector) => connector.id !== 'metaMaskSDK');

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext not found. Make sure ThemeProvider is wrapping your App.");
  };

  const { toggleTheme, isDarkMode } = themeContext;

  return (
    <>
      <IoClose className='close-icon' onClick={onClose} />
      {filteredConnectors.map((connector) => (
        <button
          className={`${styles["wallet-button"]} ${isDarkMode ? styles.dark : styles.light}`}
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </>
  );
};
