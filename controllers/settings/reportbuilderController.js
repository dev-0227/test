/*
* Report Builder Controller
*/
const reportBuilderModel = require('../../repositories/settings/reportBuilderModel');

exports.getInsuranceList = (req, res, next) => {
    reportBuilderModel.getInsuranceList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getInsuranceTypeList = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.getInsuranceTypeList(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getInsuranceLOBList = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.getInsuranceLOBList(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getQualityProgramList = (req, res, next) => {
    let params = {
        ins_id: req.body.ins_id,
    }
    reportBuilderModel.getQualityProgramList(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}
exports.addQualityProgram = (req, res, next) => {
    let params = {
        ins_id: req.body.ins_id,
        ins_lob_id: req.body.ins_lob_id,
        name: req.body.name,
        display: req.body.display,
        definition: req.body.definition,
        description: req.body.description,
        program_date: req.body.program_date
    }
    reportBuilderModel.addQualityProgram(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}
exports.delQualityProgram = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    reportBuilderModel.delQualityProgram(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}
exports.updateQualityProgram = (req, res, next) => {
    let params = {
        id: req.body.id,
        ins_id: req.body.ins_id,
        ins_lob_id: req.body.ins_lob_id,
        name: req.body.name,
        display: req.body.display,
        definition: req.body.definition,
        description: req.body.description,
        program_date: req.body.program_date
    }
    reportBuilderModel.updateQualityProgram(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getSelectLOBList = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.getSelectLOBList(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.setDefaultIns = (req, res, next) => {
    let entry = {
        insid: req.body.ins_id,
        userid: req.body.user_id
    }
    reportBuilderModel.setDefaultIns(entry, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.getDefaultIns = (req, res, next) => {
    let entry = {
        userid: req.body.user_id
    }
    reportBuilderModel.getDefaultIns(entry, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
