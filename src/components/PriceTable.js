import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function PriceTable() {
    const [load, setLoad] = useState(false);
    const [priceList, setPriceList] = useState([]);

    useEffect(() => {
        if (load === false) {
            axios.get('http://ap-south-1.linodeobjects.com/fweasy/price.js')
                .then(({ data }) => {
                    setPriceList(priceList.concat(data));
                    setLoad(true);
                })

        }
    }, [])

    return (
        <div>

        </div>
    )
}
