const barriersModel = require('../repositories/barriers');
const Acl = require('../middleware/acl');

// PT Risk Level Controller
exports.getPTRiskLevel = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    barriersModel.getPTRiskLevel((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getPTRiskLevelById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.getPTRiskLevelById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delPTRiskLevel = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.delPTRiskLevel(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addPTRiskLevel = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id,
        code: req.body.code,       
        display: req.body.display,       
    }
    barriersModel.addPTRiskLevel(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updatePTRiskLevelById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id,
        pt_risk_level_id: req.body.pt_risk_level_id,
        code: req.body.code,
        display: req.body.display
    }
    barriersModel.updatePTRiskLevelById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// PT Communication Needs Controller
exports.getPTCommNeeds = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    barriersModel.getPTCommNeeds((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getPTCommNeedsById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.getPTCommNeedsById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delPTCommNeeds = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.delPTCommNeeds(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addPTCommNeeds = async(req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,       
        display: req.body.display,       
    }
    barriersModel.addPTCommNeeds(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updatePTCommNeedsById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id,
        pt_comm_needs_id: req.body.pt_comm_needs_id,
        code: req.body.code,
        display: req.body.display
    }
    barriersModel.updatePTCommNeedsById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// ICD10 Controller
exports.getICD10 = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    barriersModel.getICD10((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getICD10ById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.getICD10ById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delICD10 = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.delICD10(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addICD10 = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id,
        icd10: req.body.icd10,       
        short: req.body.short,    
        long: req.body.long,       
    }
    barriersModel.addICD10(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateICD10ById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        _id: req.body._id,
        id: req.body.id,
        icd10: req.body.icd10,
        short: req.body.short,
        long: req.body.long
    }
    barriersModel.updateICD10ById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Disability Category Controller
exports.getDisabilityCategory = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    barriersModel.getDisabilityCategory((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getDisabilityCategoryById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.getDisabilityCategoryById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delDisabilityCategory = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id
    }
    barriersModel.delDisabilityCategory(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addDisabilityCategory = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
        id: req.body.id,
        display: req.body.display,                     
    }
    barriersModel.addDisabilityCategory(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateDisabilityCategoryById = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');
    
    let entry = {
        _id: req.body._id,
        id: req.body.id,
        display: req.body.display
    }
    barriersModel.updateDisabilityCategoryById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}