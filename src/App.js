import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import { SearchOutlined } from "@material-ui/icons";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Tracker|<span>cryptocurrency tracker</span></h1>
        <form  className="form-input-search">
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
          <SearchOutlined/>
        </form>
      </div>
      <div className="header-container">
        <div className="header-row">
          <h4 className="header-crypto">Crypto</h4>
          <h4 className="header-symbol">Symbol</h4>
          <h4 className="header-price">Price</h4>
          <h4 className="header-volume">Volume</h4>
          <h4 className="header-priceChange">Price Change</h4>
          <h4 className="header-marketCap">Market Cap.</h4>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
