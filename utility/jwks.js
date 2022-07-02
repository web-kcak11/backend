var jose = require('node-jose');
var jwkToPem = require('jwk-to-pem')

var keystore = jose.JWK.createKeyStore();

function getPlainKey(key) {
    return key.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\n/g, "");
}

keystore.generate("RSA", 4096).then(async function (result) {
    var key = result;

    var privateKey = jwkToPem(key.toJSON(true), { private: true });
    console.log("\nPRIVATEKEY:\n", getPlainKey(privateKey));

    var publicKey = jwkToPem(key.toJSON(), { private: false });
    console.log("\nPUBLICKEY:\n", getPlainKey(publicKey));

    console.log("\nJWKS:\n" + JSON.stringify(key.toJSON(), null, 4));
});