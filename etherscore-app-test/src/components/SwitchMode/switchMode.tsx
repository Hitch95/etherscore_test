import React, { FC, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from "./switchMode.module.css";

const SwitchMode = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeContext not found. Make sure ThemeProvider is used.");
    }

    const { toggleTheme, isDarkMode } = themeContext;

    return (
        <label className={styles.switch} onClick={toggleTheme}>
            <input type="checkbox" checked={isDarkMode} className={styles.checkbox} readOnly />
            <span className={styles.slider}></span>
        </label>
    );
};

export default SwitchMode;
