
const ecwbulk = require('../../repositories/settings/ecwbulk')
const Acl = require('../../middleware/acl')

exports.getForPatient = async(req, res, next) => {
    ecwbulk.getForPatient((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    })
}

exports.getForPatientById = async(req, res, next) => {
    ecwbulk.getForPatientById(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    })
}

exports.getForEncounter = async(req, res, next) => {
    ecwbulk.getForEncounter((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    })
}

exports.getForEncounterById = async(req, res, next) => {
    ecwbulk.getForEncounterById(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    })
}

exports.addBulk = async(req, res, next) => {
    req.body.date = new Date(Date.now()).toUTCString()
    ecwbulk.addBulk(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    })
}

exports.editBulk = async(req, res, next) => {
    req.body.date = new Date(Date.now()).toUTCString()
    ecwbulk.editBulk(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    })
}

exports.deleteBulk = async(req, res, next) => {
    ecwbulk.deleteBulk(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    })
}
