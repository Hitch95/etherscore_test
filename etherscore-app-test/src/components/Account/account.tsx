import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { useTranslation } from 'react-i18next';
import styles from "./account.module.css";

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const { t, i18n } = useTranslation();

  return (
    <div className={styles["account-container"]}>
      <div className={styles["button-part"]}>
        <button className={styles["disconnect-button"]} onClick={() => disconnect()} >{t("disconnect_wallet")}</button>
      </div>
      <div className={styles["address-part"]}>
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        <p>{t("address")}</p>
        {address && <p>{ensName ? `${ensName} (${address})` : address}</p>}
      </div>
    </div>
  )
}
