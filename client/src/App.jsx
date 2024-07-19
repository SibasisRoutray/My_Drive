import upload from './artifacts/contracts/upload.sol/upload.json';
import FileUpload from './FileUpload';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Display from './Display';
import './App.css';
import NavBar from './NavBar.jsx'
import LandingPage from './Landing.jsx';



function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
       

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress = "0xae9cfDD799790DCCEEaf59811F90fbbA49188b87";
        const contract = new ethers.Contract(
          contractAddress,
          upload.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("MetaMask not installed");
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <div>
      
      
      <div>
      <NavBar/>
     
      <LandingPage/>
        <h3>Connected Account: {account ? account : "Account not selected"}</h3>
        <FileUpload account={account} provider={provider} contract={contract} ></FileUpload>
        <Display contract={contract} account={account} />
      </div>
    </div>
  );
}

export default App;
