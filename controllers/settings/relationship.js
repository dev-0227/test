
const relationship = require('../../repositories/settings/relationship');

exports.getOrganizationByClinic = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        clinicid: req.body.clinicid,
        specialistid: req.body.specialistid
    }
    relationship.getOrganizationByClinic(entry, (err, result) => {
        if (!err) res.status(200).json({data: result});
        else res.status(404).json(err);
    });
}

exports.add = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        clinicid: req.body.clinicid,
        specialistid: req.body.specialistid,
        organizations: req.body.organizations
    }
    relationship.add(entry, (err, result) => {
        if (!err) res.status(200).json({data: result});
        else res.status(404).json(err);
    });
}

exports.updateOrganization = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        clinicid: req.body.clinicid,
        specialistid: req.body.specialistid,
        organizations: req.body.organizations
    }
    relationship.updateOrganization(entry, (err, result) => {
        if (!err) res.status(200).json({data: result});
        else res.status(404).json(err);
    });
}

exports.delete = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    relationship.delete(entry, (err, result) => {
        if (!err) res.status(200).json({data: result});
        else res.status(404).json(err);
    });
}

exports.set = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        clinicid: req.body.clinicid,
        specialistid: req.body.specialistid,
        organizations: req.body.organizations
    }

    relationship.getOrganizationByClinic(entry, (err, result) => {
        if (!err) {
            if (!result[0]) {
                relationship.add(entry, (err, result1) => {
                    if (!err) res.status(200).json({data: result1});
                    else res.status(404).json(err);
                });
            } else {
                relationship.updateOrganization(entry, (err, result1) => {
                    if (!err) res.status(200).json({data: result1});
                    else res.status(404).json(err);
                });
            }
        } else {
            res.status(404).json(err);
        }
    });
}
