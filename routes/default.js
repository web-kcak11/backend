const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = function (req, res) {
    let requestConfig = {
        method: 'get',
        url: 'https://web-kcak11-cdn.kcak11.com/frontend/?ts=' + new Date().getTime(),
        httpsAgent: httpsAgent
    };
    axios(requestConfig).then(function (response) {
        res.status(response.status || 200);
        res.send(response.data);
    }).catch(function (err) {
        res.status(err.status || 500);
        res.end("An error occured");
        console.log(err);
    });
};