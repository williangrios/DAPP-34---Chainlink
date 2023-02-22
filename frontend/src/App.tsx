import React, { useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { ethers } from "ethers";
import {ToastContainer, toast} from "react-toastify";
import ChainlinkOracle from './artifacts/contracts/ChainlinkOracle.sol/ChainlinkOracle.json';
//import dotenv from 'dotenv';

import WRHeader from 'wrcomponents/dist/WRHeader';
import WRFooter from 'wrcomponents/dist/WRFooter';
import WRContent from 'wrcomponents/dist/WRContent';
import WRTools from 'wrcomponents/dist/WRTools';

function App() {
  const alchemyUrl = "https:..url here"
  const [loading, setLoading] = useState(false)
  const [priceOf, setPriceOf] = useState(0);
  const [provider, setProvider] = useState(new ethers.JsonRpcProvider(alchemyUrl));
  const contractAddress = "0xfe3877e12BdFaB17834Da0795F4B59dBC6130012";
  const [contract, setContract] = useState(new ethers.Contract(contractAddress, ChainlinkOracle.abi, provider))
  
  const getPrice = async (e:  React.ChangeEvent<any>) => {
    e.preventDefault();
    setLoading(true);
    let x = await contract.getLatestPrice(priceOf);
    toastMessage(`Price: ${x[0].toString()}`);
    toastMessage(`Decimals: ${x[1].toString()}`);
    setLoading(false);
  }

  function toastMessage(text: string) {
    toast.info(text)  ;
  }

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000}/>
      <WRHeader title="CHAINLINK PRICES" image={true} />
      <WRContent>
        <>
          {loading &&
            <h1>Loading...</h1>
          }
        
          <form onSubmit={getPrice}>
            <label>Select quotation</label>
            <select onChange={(e) => setPriceOf(e.target.selectedIndex)}>
              <option>BTC/USD</option>
              <option>CZK/USD</option>
              <option>DAI/USD</option>
              <option>ETH/USD</option>
              <option>FORTH/USD</option>
              <option>LINK/USD</option>
              <option>SNX/USD</option>
              <option>XAU/USD</option>
            </select>
            <input type='submit' value="Check price" />
          </form>
        </>
      </WRContent>
      <WRTools react={true} hardhat={true} bootstrap={true} solidity={true} css={true} javascript={true} ethersjs={true} />
      <WRFooter /> 
    </div>
  );

  
}

export default App;
