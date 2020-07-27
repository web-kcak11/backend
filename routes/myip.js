module.exports = function (req, res) {
    var xForwardedFor = (req.headers["x-forwarded-for"] || "").split(", ")[0];
    var result = { "myip": xForwardedFor };
    if (req.headers["cf-ipcountry"]) {
        result["country"] = req.headers["cf-ipcountry"];
    }
    res.status(200);
    res.json(result);
};