let crypto = require('crypto');
const axios = require('axios');

const { getSdk, handleError, serialize } = require('../api-util/sdk');





module.exports = (req, res) => {
    let date = new Date()
    date = date.toUTCString()
    let hmac = crypto.createHmac("sha256", process.env.PAVE_SECRET);
    hmac.setEncoding('hex');
    hmac.end(`${process.env.PAVE_USERNAME}:${process.env.PAVE_API_KEY}@${date}`, function () {

        let config = {
            method: 'post',
            url: 'https://openapi.paveapi.com/v1/sessions',
            headers: {
                'API-Key': process.env.PAVE_API_KEY,
                'API-Token': hmac.read(),
                'API-Timestamp': date
            }
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                res.status(200).send(response.data)
            })
            .catch(function (error) {
                console.log(error);
                handleError(res, error);
            });
    });
};
