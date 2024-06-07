import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {                       //transaction platform.
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [Order, setOrder] = useState(0);

 
  const increment = async () => {
    if (atm && account) {
      try {
        const tx = await atm.increment();
        await tx.wait();
        getOrder();
      } catch (error) {
        console.error("Error incrementing:", error);
      }
    }
  };

  const decrement = async () => {
    if (atm && account) {
      try {
        const tx = await atm.decrement();
        await tx.wait();
        getOrder();
      } catch (error) {
        console.error("Error decrementing:", error);
      }
    }
  };

  const getOrder = async () => {
    if (atm && account) {
      const OrderValue = await atm.Order();
      setOrder(OrderValue.toNumber());
    }
  };

  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  //local addre.

  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccount(accounts);
      });
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({method: "eth_accounts"});
      handleAccount(accounts);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  
  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <>
        <div className="user-info" style={{ margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", width: "60%", backgroundColor: "#f9f9f9" }}>
        <div className="account-info" style={{ marginBottom: "1rem" }}>
          <p>user Account: {account}</p>
          <p>Total Balance: {balance}</p>
        </div>
        <button className="button" style={{ margin: "0.5rem", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: "#ff0c47", color: "white" }} onClick={deposit}>
          Deposit 1 ETH
        </button>
        <button className="button" style={{ margin: "0.5rem", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: "#ff6647", color: "white" }} onClick={withdraw}>
          Withdraw 1 ETH
        </button>
      </div>

      <div className="user-info" style={{ margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", width: "60%", backgroundColor: "#f9f9f9" }}>
        <h1>Your ERC20 TOKEN Shopping</h1>
        <p>Your Total Token order: {Order}</p>
        <button className="button" style={{ margin: "0.5rem", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: "ff66f6", color: "white" }} onClick={increment}>
          Place order
        </button>
        <button className="button" style={{ margin: "0.5rem", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: "#000000", color: "white" }} onClick={decrement}>
          Cancel order
        </button>
        </div>
      </>
    );
    
  }

  useEffect(() => {
    getWallet();
    getOrder(); 
  }, []);

  return (
    <main className="container">
      <header><h1>My ETHEREUM Transaction Platform</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
        
      `}</style>
    </main>
  )
}
