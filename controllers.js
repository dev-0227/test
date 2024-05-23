
exports.login = (req, res, next) => {
    return res.status(200).json("Result : ", req.body);
}

exports.test = (req, res, next) => {
    return res.status(200).json("Result : ", req.body);
}
