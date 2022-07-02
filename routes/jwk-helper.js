var jwkToPem = require("jwk-to-pem");

function getPlainKey(key) {
    return key.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\n/g, "");
}

module.exports = function (req, res) {
    if (req.body && req.body.jwk) {
        var jwk = req.body.jwk;
        var publicKey = jwkToPem(jwk, { private: false });
        res.status(200);
        res.send({ publicKey: getPlainKey(publicKey) });
    } else {
        res.status(500);
        res.end("An error occured");
    }
};