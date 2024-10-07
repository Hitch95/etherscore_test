import React, { useState } from 'react';
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import i18n from 'i18next';

import SwitchMode from '../SwitchMode/switchMode';
import styles from"./header.module.css";

const Header =() => {
    const [showPopup, setShowPopup] = useState(false);

    const languages = [
        { code: "fr", name: i18n.language === "fr" ? "Français" : "French" },
        { code: "en", name: i18n.language === "fr" ? "Anglais" : "English" },
    ];

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setShowPopup(false);
    };

    const getLanguageName = (code: string) => {
        const language = languages.find(lang => lang.code === code);
        return language ? language.name : code;
    };

    return (
        <nav>
            <header>
                <SwitchMode />
                <button onClick={togglePopup}>
                    <TbWorld className={styles["world-icon"]} />
                    <span>{getLanguageName(i18n.language)}</span>
                    <IoIosArrowDown className={styles["arrow-icon"]} />
                </button>

                {showPopup && (
                    <div className={styles.popup}>
                        {languages.map(lang => (
                            <div
                            key={lang.code}
                            className={styles["language-option"]}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.name}
                        </div>
                        ))}
                    </div>
                )}
            </header>
        </nav>
    );
};

export default Header;
