import { Connector, useConnect } from 'wagmi';
import { IoClose } from "react-icons/io5";

type WalletOptionsProps = {
  onClose: () => void;
};

export function WalletOptions({ onClose }: WalletOptionsProps) {
  const { connectors, connect } = useConnect();
  const filteredConnectors = connectors.filter((connector) => connector.id !== 'metaMaskSDK');

  return (
    <>
    <IoClose className='close-icon' onClick={onClose} />
      {filteredConnectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </>
  );
};
