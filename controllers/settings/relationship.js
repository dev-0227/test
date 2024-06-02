
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

exports.getOrganizationBySpecialist = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        specialistid: req.body.specialistid
    }
    relationship.getOrganizationBySpecialist(entry, (err, result) => {
        if (!err) res.status(200).json({data: result});
        else res.status(404).json(err);
    })
}

exports.getOrganizationNames = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        clinicid: req.body.clinicid,
        specialistid: req.body.specialistid
    }
    relationship.getOrganizationByClinic(entry, (err, result) => {
        if (!err) {
            if (result.length > 0) relationship.getOrganizationNames(result[0].organizationid.split(','), (err1, result1) => {
                if (!err1) res.status(200).json({data: result1});
                else res.status(404).json(err); 
            });
            else res.status(200).json({data: []});
        }
        else res.status(404).json(err);
    });
}

exports.add = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        clinicid: req.body.clinicid,
        specialistid: req.body.specialistid,
        organizationid: req.body.organizationid
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
        organizationid: req.body.organizationid
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
        rel: req.body.organizationid,
        specialistid: req.body.specialistid
    }
    relationship.deleteBySpecialtyId(entry.specialistid, (err, result) => {
        if (!err) {
            relationship.add_several(entry, (err1, result1) => {
                if (!err1) res.status(200).json({data: result1});
                else res.status(404).json(err);
            });
        }
    });
}
