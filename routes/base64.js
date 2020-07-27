const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const showError = require("../utility").showError;

module.exports = function (req, res) {
    const timeout = Number(req.query.timeout) || 15000;
    let url = req.query.url;
    let urlExists = true;
    if (!url) {
        url = "https://web-kcak11-cdn.kcak11.com/frontend/error-views/b64-missing-url.html";
        urlExists = false;
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setTimeout(function () {
        source.cancel('Operation timed-out.<br/>No response within ' + (timeout / 1000) + ' seconds.<br/><br/>Try using the \'timeout\' parameter to increase the timeout.<br/>e.g.: ?timeout=20000&url=... for timing out after 20 seconds.');
    }, timeout);
    let requestConfig = {
        method: 'get',
        url: url,
        httpsAgent: httpsAgent,
        timeout: timeout,
        cancelToken: source.token,
        responseType: 'arraybuffer'
    };

    axios(requestConfig).then(function (response) {
        if (urlExists) {
            const result = {};
            result["url"] = req.query.url;
            result["base64Data"] = Buffer.from(response.data).toString('base64');
            res.status(response.status || 200);
            res.json(result);
        } else {
            res.status(urlExists ? (response.status || 200) : 500);
            res.end(Buffer.from(response.data));
        }
    }).catch(function (err) {
        if (axios.isCancel(err)) {
            console.log('Request canceled:', err.message);
        } else {
            console.log(err);
        }
        showError(req, res, err);
    });
};