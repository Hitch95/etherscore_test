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
                address: "Address:",
                disconnect_wallet: "Disconnect",
                balance: "Balance:",
                instruction: "Click on the button to connect to your wallet.",
                lastTransaction: "Last transactions (10 max)",
            }
        },
        fr: {
            translation: {
                connect_wallet: "Se connecter au portefeuille",
                address: "Adresse:",
                disconnect_wallet: "Se deconnecter",
                balance: "Solde:",
                instruction: "Cliquez sur le bouton pour vous connecter à votre portefeuille.",
                lastTransaction: "Dernières transactions (10 max)",
            }
        },
    }
});

export default i18n;
