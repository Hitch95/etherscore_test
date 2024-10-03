import { useAccount } from 'wagmi';
import { Account } from "./account";
import { WalletOptions } from "./wallet-options";
import './App.css';

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;  
};

const App = () => {

  return (
    <>
      <div>
        <h1>Wallet Connection</h1>
        <ConnectWallet />
        <p>Click on the button to connect to your Metamask wallet.</p>
      </div>
    </>
  );
};

export default App;
