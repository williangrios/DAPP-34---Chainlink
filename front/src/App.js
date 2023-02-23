//libs
import { ethers } from "ethers";
import {ToastContainer, toast} from "react-toastify";
import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import WRHeader from 'wrcomponents/dist/WRHeader';
import WRFooter from 'wrcomponents/dist/WRFooter';
import WRContent from 'wrcomponents/dist/WRContent';
import WRTools from 'wrcomponents/dist/WRTools';

//styles 
import './App.css';

//abis
import ChainlinkOracle from './artifacts/contracts/ChainlinkOracle.sol/ChainlinkOracle.json';

function App() {
  const alchemyUrl = "https://eth-goerli.g.alchemy.com/v2/nWBr-TblWJsjiT3l6_4LX9nH1-IORPya"
  const [loading, setLoading] = useState(false)
  const [priceOf, setPriceOf] = useState(0);
  const [provider, setProvider] = useState(new ethers.JsonRpcProvider(alchemyUrl));
  const contractAddress = "0xfe3877e12BdFaB17834Da0795F4B59dBC6130012";
  const [contract, setContract] = useState(new ethers.Contract(contractAddress, ChainlinkOracle.abi, provider))
  
  const getPrice = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await contract.getLatestPrice(priceOf);
    const decimals = Number(response[1]);
    const value = Number(response[0]);
    toastMessage( `The price is ${( value / (10 ** decimals)).toString()}`);
    setLoading(false);
  }

  function toastMessage(text) {
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
      <WRTools react={true} hardhat={true} solidity={true} css={true} javascript={true} ethersjs={true} alchemy={true}/>
      <WRFooter /> 
    </div>
  );

  
}

export default App;
