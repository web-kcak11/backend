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
    }
};
module.exports = utility;