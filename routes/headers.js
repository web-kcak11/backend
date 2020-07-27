module.exports = function (req, res) {
    res.status(200);
    res.json(req.headers);
};