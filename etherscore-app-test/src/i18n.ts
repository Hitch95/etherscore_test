import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                connect_wallet: "Connect Wallet",
                balance: "Balance:",
                instruction: "Click on the button to connect to your wallet.",
            }
        },
        fr: {
            translation: {
                connect_wallet: "Se connecter au portefeuille",
                balance: "Solde:",
                instruction: "Cliquez sur le bouton pour vous connecter à votre portefeuille.",
            }
        },
    }
});

export default i18n;
