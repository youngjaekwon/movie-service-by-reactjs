import { useState, useEffect } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [inputValue, setInputValue] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);
  const [coinName, setCoinName] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [coinSelected, setCoinSelected] = useState(false);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onCoinSelectChange = (event) => {
    const coinId = event.target.value;
    if (coinId === "-") {
      setCoinSelected(false);
      return;
    }
    const selectedCoin = coins.find((coin) => coin.id === coinId);

    setCoinPrice(selectedCoin.quotes.USD.price);
    setCoinName(selectedCoin.name);
    setCoinSymbol(selectedCoin.symbol);
    setCoinSelected(true);
  };
  const onInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select onChange={onCoinSelectChange}>
            <option key="default">-</option>
            {coins.map((coin) => {
              return (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
                </option>
              );
            })}
          </select>
        )}
        <input
          onChange={onInputChange}
          type="number"
          placeholder="Type USD here!"
        />
      </div>
      {coinSelected ? (
        <h3>
          With ${inputValue} USD, you can buy {inputValue / coinPrice}{" "}
          {coinSymbol} of {coinName}.
        </h3>
      ) : null}
    </div>
  );
}

export default App;
