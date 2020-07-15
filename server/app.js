const { exec } = require("child_process");
const cron = require('node-cron');
const axios = require('axios');
fs = require('fs');

const get_price = () => {
    return axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );
};

const getPriceETH = () => {
    return axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    );
};

cron.schedule("* * * * * *", () => {
    axios
        .all([get_price(), getPriceETH()])
        .then(
            axios.spread((dataPriceBTC, dataPriceETH) => {
                const writefile = `[
                    {"ticker":"BTC", "price": ${dataPriceBTC.data.price}},
                    {"ticker":"ETH", "price": ${dataPriceETH.data.price}}
                ]`

                fs.writeFile('price.js', writefile, (err) => {
                    exec('s3cmd put price.js s3://fweasy -P', (error, stdout, stderr) => {
                        if (err) console.log(error.message)
                        else console.log(stdout);
                    })
                })
            })
        )
})