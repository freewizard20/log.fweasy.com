import React, { useState, useEffect } from 'react'
import axios from 'axios';

const getPrice = () => {
    return axios.get("http://ap-south-1.linodeobjects.com/fweasy/price.js")
}

const getCurrency = () => {
    return axios.get("https://api.exchangeratesapi.io/latest?symbols=USD,KRW");
}

export default function PriceTable() {
    const [load, setLoad] = useState(false);
    const [priceList, setPriceList] = useState([]);
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        if (load === false) {
            axios
                .all([getPrice(), getCurrency()])
                .then(
                    axios.spread((price, currency) => {
                        setPriceList(priceList.concat(price));
                        setLoad(true);
                        setCurrency((currency.data.rates.KRW / currency.data.rates.USD).toFixed(2))
                    })
                )
        }
    }, [])

    return (
        <div>
            {currency}
        </div>
    )
}
