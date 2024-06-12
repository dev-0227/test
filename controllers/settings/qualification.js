
const qualification = require('../../repositories/settings/qualification');

exports.list = async(req, res, next) => {
    qualification.list((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.add = async(req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    //check duplicate
    qualification.getid(entry, (err, result) => {
        if (result.length) res.status(200).json({msg: 'exist'});
        else {
            qualification.add(entry, (err, result) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json({ data: result });
                }
            });
        }
    });
}

exports.chosen = async(req, res, next) => {
    let entry = {
        id: req.body.id
    }
    qualification.chosen(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.update = async(req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    qualification.getid(entry, (err, result) => {
        if (result.length && result[0].id != entry.id) res.status(200).json({msg: 'exist'});
        else {
            qualification.update(entry, (err, result) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json({ data: result });
                }
            });
        }
    });
}

exports.delete = async(req, res, next) => {
    let entry = {
        id: req.body.id
    }
    qualification.delete(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
