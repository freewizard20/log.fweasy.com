import React, { useState, useEffect } from "react";
import axios from "axios";

const getPrice = () => {
  return axios.get("http://ap-south-1.linodeobjects.com/fweasy/price.js");
};

const getCurrency = () => {
  return axios.get("https://api.exchangeratesapi.io/latest?symbols=USD,KRW");
};

// https://api.bithumb.com/public/ticker/ALL
// https://api.binance.com/api/v3/ticker/price
// https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH
// https://api.coinone.co.kr/ticker/?currency=ETH,BTC

export default function PriceTable() {
  const [load, setLoad] = useState(false);
  const [priceList, setPriceList] = useState([]);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    if (load === false) {
      axios.all([getPrice(), getCurrency()]).then(
        axios.spread((price, currency) => {
          setPriceList(priceList.concat(price));
          setLoad(true);
          setCurrency(
            (currency.data.rates.KRW / currency.data.rates.USD).toFixed(2)
          );
        })
      );
    }
  }, []);

  return (
    <div>
      {currency}
      <table
        className="pure-table pure-table-striped"
        style={{ margin: "0 auto" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Honda</td>
            <td>Accord</td>
            <td>2009</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Toyota</td>
            <td>Camry</td>
            <td>2012</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Hyundai</td>
            <td>Elantra</td>
            <td>2010</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Ford</td>
            <td>Focus</td>
            <td>2008</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Nissan</td>
            <td>Sentra</td>
            <td>2011</td>
          </tr>
          <tr>
            <td>6</td>
            <td>BMW</td>
            <td>M3</td>
            <td>2009</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Honda</td>
            <td>Civic</td>
            <td>2010</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Kia</td>
            <td>Soul</td>
            <td>2010</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
