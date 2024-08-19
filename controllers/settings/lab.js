
const lab = require('../../repositories/settings/lab')
const Acl = require('../../middleware/acl')

exports.list = async(req, res, next) => {
    lab.list(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })
}

exports.add = async(req, res, next) => {
    lab.add(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
}

exports.update = async(req, res, next) => {
    lab.update(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
}

exports.chosen = async(req, res, next) => {
    lab.chosen(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
}

exports.delete = async(req, res, next) => {
    lab.delete(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
}
