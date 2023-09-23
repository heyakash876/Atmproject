import { useState, useEffect } from "react";
import { ethers } from "ethers";

import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [canAfford, setCanAfford] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };
  const deposit2 = async () => {
    if (atm) {
      let tx = await atm.deposit(2);
      await tx.wait();
      getBalance();
    }
  };
  const deposit4 = async () => {
    if (atm) {
      let tx = await atm.deposit(4);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };
  const withdraw2 = async () => {
    if (atm) {
      let tx = await atm.withdraw(2);
      await tx.wait();
      getBalance();
    }
  };
  const withdraw4 = async () => {
    if (atm) {
      let tx = await atm.withdraw(4);
      await tx.wait();
      getBalance();
    }
  };
  const multiplyValue = async () => {
    if (atm) {
      try {
        const tx = await atm.multiplyBalance(2);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error(error);
      }
    }
  };
  async function checkAffordability() {
    if (atm) {
      setLoading(true);
      try {
        let result = await atm.canAfford(1);
        setCanAfford(result); // Update the state variable with the result
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  }
  async function checkIsActive() {
    if (atm) {
      try {
        let result = await atm.isActiveAccount();
        setIsActive(result);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="bank-container">
        <p className="account-info">Your Account: {account}</p>
        <p className="account-info">Your Balance: {balance}</p>
        <div className="bank-button">
          <label>Deposit : &nbsp;&nbsp;&nbsp;</label>
          <button onClick={deposit}> 1 ETH</button>
          <button onClick={deposit2}> 2 ETH</button>
          <button onClick={deposit4}> 4 ETH</button>
          <label>Withdraw : </label>
          <button onClick={withdraw}> 1 ETH</button>
          <button onClick={withdraw2}> 2 ETH</button>
          <button onClick={withdraw4}> 4 ETH</button>
        </div>
        <label>Multiply : </label>
        <button onClick={multiplyValue}> 2x</button>
        <div>
        <button onClick={checkAffordability}>Check if I can afford 1 ETH transaction</button>
      {loading ? <p>Loading...</p> : null}
      {canAfford !== null ? (
        <p>{checkAffordability?'You can afford this transaction' : 'You cannot afford this transaction'}</p>
      ) : null}
      <div>
      <button onClick={checkIsActive}>Check if my account is active</button>
      <p>{ checkIsActive ? 'Your account is active' : 'Your account is not active'}</p>
    </div>
    </div>
        
      </div>
      
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Easy Wallet Connect</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          body {
            font-family: "Arial", sans-serif;
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          .bank-container,
          .transfer {
            width: 80%;
            max-width: 500px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
          }

          .account-info {
            font-size: 18px;
            color: #333;
          }

          input[type="text"],
          input[type="number"] {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            border-radius: 4px;
            border: none;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
          }

          .bank-button {
            width: 100%;
            background-color: #4caf50; /* Green */
            color: white;
            padding: 14px;
            margin-top: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition-duration: 0.4s;
          }

          .bank-button:hover {
            background-color: #45a049;
          }
        `}
      </style>
    </main>
  );
}
