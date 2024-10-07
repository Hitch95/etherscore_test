import React, { FC, useContext, useState } from 'react';
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import i18n from 'i18next';

import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import SwitchMode from '../SwitchMode/switchMode';
import styles from"./header.module.css";

const Header = () => {
    const [showPopup, setShowPopup] = useState(false);

    const languages = [
        { code: "fr", name: i18n.language === "fr" ? "Français" : "French" },
        { code: "en", name: i18n.language === "fr" ? "Anglais" : "English" },
    ];

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setShowPopup(false);
    };

    const getLanguageName = (code: string) => {
        const language = languages.find(lang => lang.code === code);
        return language ? language.name : code;
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext not found. Make sure ThemeProvider is wrapping your App.");
  };

  const { toggleTheme, isDarkMode } = themeContext;

    return (
        <nav>
            <header>
                <SwitchMode />
                <button onClick={togglePopup} className={`${isDarkMode ? styles.dark : styles.light}`}>
                    <TbWorld className={styles["world-icon"]} />
                    <span>{getLanguageName(i18n.language)}</span>
                    <IoIosArrowDown className={styles["arrow-icon"]} />
                </button>

                {showPopup && (
                    <ul className={`${styles.popup} ${isDarkMode ? styles.dark : styles.light}`}>
                        {languages.map(lang => (
                            <li
                            key={lang.code}
                            className={`${styles["language-option"]} ${isDarkMode ? styles.dark : styles.light}`}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.name}
                        </li>
                        ))}
                    </ul>
                )}
            </header>
        </nav>
    );
};

export default Header;
