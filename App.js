const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 1331;

const getDigest = require("./utility").getDigest;
const corsRouteHandler = require("./routes/cors");
const base64RouteHandler = require("./routes/base64");
const myipRouteHandler = require("./routes/myip");
const headersRouteHandler = require("./routes/headers");
const defaultRouteHandler = require("./routes/default");
const jwkHelper = require("./routes/jwk-helper");
const crypto = require("./routes/crypto");

app.disable("x-powered-by");

app.use(cors());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", true);
app.use(function (req, res, next) {
    let responseID = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("").sort(function () { return Math.random() - Math.random(); }).join("");
    res.setHeader('X-KCAK11-ResponseID', responseID);
    res.setHeader('X-Response-Digest', getDigest(responseID, 64));
    res.cookie('kcak11Client', req.hostname, { path: '/', secure: req.protocol === "https", httpOnly: false, sameSite: true });
    next();
});

app.get("/cors", corsRouteHandler);

app.get("/base64", base64RouteHandler);

app.get("/myip", myipRouteHandler);

app.get("/headers", headersRouteHandler);

app.post("/jwk-helper", jwkHelper);

app.post("/Crypto", crypto);

app.get("/", defaultRouteHandler);

app.all('*', (req, res) => {
    res.redirect(301, "/");
});

app.listen(port, function () {
    console.log("Listening on PORT: ", port);
});
