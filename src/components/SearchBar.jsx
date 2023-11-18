import React, { useState, useEffect } from "react";
import axios from "axios";

import StockChart from "./StockChart";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(e.target.value);
    setIsLoading(true);

    axios
      .get(`http://localhost:3000/query/${searchInput}`, {
        crossDomain: true,
      })
      .then((response) => {
        setStockData(response.data);
        console.log(response.data);
        setError(null);
      })
      .catch((err) => {
        setError("Error fetching data");
        setStockData({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div>
        <select defaultValue={searchInput} onChange={handleChange}>
          <option value="AAPL">AAPL</option>
          <option value="MSFT">MSFT</option>
          <option value="TSLA">TSLA</option>
          <option value="AMZN">AMZN</option>
          <option value="META">META</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      {Object.keys(stockData).length === 0 ? (
        " "
      ) : (
        <StockChart jsonData={stockData}></StockChart>
      )}
    </div>
  );
}

export default SearchBar;
