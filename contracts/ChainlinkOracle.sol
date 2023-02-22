// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

//import "https://github.com/smartcontractkit/chainlink/blob/master/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ChainlinkOracle {

    //deployed to 0xfe3877e12BdFaB17834Da0795F4B59dBC6130012

    struct Price{
        AggregatorV3Interface priceFeed ;
        int decimals;
    }

    Price[] internal prices;

    constructor() {
        prices.push( Price(AggregatorV3Interface(0xA39434A63A52E749F02807ae27335515BA4b07F7), 8)); //btc usd
        prices.push( Price(AggregatorV3Interface(0xAE45DCb3eB59E27f05C170752B218C6174394Df8), 8)); //czk usd
        prices.push( Price(AggregatorV3Interface(0x0d79df66BE487753B02D015Fb622DED7f0E9798d), 8)); //dai usd
        prices.push( Price(AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e), 8)); //eth usd
        prices.push( Price(AggregatorV3Interface(0x7A65Cf6C2ACE993f09231EC1Ea7363fb29C13f2F), 8)); //forth usd
        prices.push( Price(AggregatorV3Interface(0x48731cF7e84dc94C5f84577882c14Be11a5B7456), 8)); //link usd
        prices.push( Price(AggregatorV3Interface(0xdC5f59e61e51b90264b38F0202156F07956E2577), 8)); //snx usd
        prices.push( Price(AggregatorV3Interface(0x7b219F57a8e9C7303204Af681e9fA69d17ef626f), 18)); //xau usd

    }

    function getLatestPrice(uint indexPriceFeed) public view returns (int price, int decimals) {
        //latestRoundData outputs
        //uint80 roundId, int price, uint startedAt, uint timeStamp, uint80 answeredInRound
        ( , int price, , , ) = prices[indexPriceFeed].priceFeed.latestRoundData();
        return (price , prices[indexPriceFeed].decimals);
    }
}
