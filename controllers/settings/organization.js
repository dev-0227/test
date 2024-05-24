const organization = require('../../repositories/settings/organization');

exports.list = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    organization.list((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.add = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        code: req.body.name,
        system: req.body.description,
        display: req.body.display,
        definition: req.body.definition
    }
    organization.add(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.chosen = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    organization.chosen(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.update = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        code: req.body.name,
        system: req.body.description,
        display: req.body.display,
        definition: req.body.definition
    }
    organization.update(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.delete = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    organization.delete(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
