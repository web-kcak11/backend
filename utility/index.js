const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const utility = {
    showError: function (req, res, err, msg) {
        let requestConfig = {
            method: 'get',
            url: "https://web-kcak11-cdn.kcak11.com/frontend/error-views/error.html",
            httpsAgent: httpsAgent,
            responseType: 'arraybuffer'
        };
        axios(requestConfig).then(function (response) {
            const status = (err.status || (err.response && err.response.status) || 500);
            res.setHeader("Content-type", "text/html");
            res.status(status);
            let errorMarkup = Buffer.from(response.data).toString("utf-8");
            errorMarkup = errorMarkup.replace("{{service_error_msg_details}}", "HTTP Status: " + status + "<br/>" + err.message);
            res.end(errorMarkup);
        });
    },
    /**
    getDigest: get a digest for the given input.
    */
    getDigest: function (a, len) {
        let str = "";
        let val = 1;
        let sum = 1;
        let tot = 0;
        for (let i = 0; i < a.length; i++) {
            tot += a.charCodeAt(i);
        }
        for (let i = 0; i < a.length; i++) {
            sum += val;
            val = a.charCodeAt(i) ^ 128 ^ ((i * 32) + i) ^ (i * 128) ^ val ^ sum ^ a.length ^ tot;
            try {
                str += encodeURIComponent(String.fromCharCode(val));
            } catch (ex) { }
        }
        let retVal = str.replace(/%/g, "").toLowerCase();
        retVal = len && !isNaN(len) ? retVal.substr(-len) : retVal.substr(2);
        return retVal;
    }
};
module.exports = utility;
