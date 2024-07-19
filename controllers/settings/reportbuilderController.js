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

// Measure-CutPoint List 
exports.GetCutPointList = (req, res, next) => {
    reportBuilderModel.GetCutPointList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.AddCutPointItem = (req, res, next) => {
    let params = {
        display: req.body.display,
        target_rate: req.body.target_rate,
        active: req.body.active,
    }
    reportBuilderModel.AddCutPointItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelCutPointItem = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    reportBuilderModel.DelCutPointItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateCutPointItem = (req, res, next) => {
    let params = {
        id: req.body.id,
        display: req.body.display,
        target_rate: req.body.target_rate,
        active: req.body.active
    }
    reportBuilderModel.UpdateCutPointItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// OverallQualityScore List
exports.GetOverallQualityScoreList = (req, res, next) => {
    reportBuilderModel.GetOverallQualityScoreList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.AddOverallQualityScoreItem = (req, res, next) => {
    let params = {
        display: req.body.display,
        target_rate: req.body.target_rate,
        active: req.body.active,
    }
    reportBuilderModel.AddOverallQualityScoreItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelOverallQualityScoreItem = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    reportBuilderModel.DelOverallQualityScoreItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateOverallQualityScoreItem = (req, res, next) => {
    let params = {
        id: req.body.id,
        display: req.body.display,
        target_rate: req.body.target_rate,
        active: req.body.active
    }
    reportBuilderModel.UpdateOverallQualityScoreItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Quarterly Measure List

exports.GetQuarterlyMeasureList = (req, res, next) => {
    reportBuilderModel.GetQuarterlyMeasureList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.AddQuarterlyMeasureItem = (req, res, next) => {
    let params = {
        display: req.body.display,
        description: req.body.description,
        target_rate: req.body.target_rate,
        active: req.body.active,
    }
    reportBuilderModel.AddQuarterlyMeasureItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelQuarterlyMeasureItem = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    reportBuilderModel.DelQuarterlyMeasureItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateQuarterlyMeasureItem = (req, res, next) => {
    let params = {
        id: req.body.id,
        display: req.body.display,
        description: req.body.description,
        target_rate: req.body.target_rate,
        active: req.body.active
    }
    reportBuilderModel.UpdateQuarterlyMeasureItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Specific Incentive Type List

exports.GetSpecificIncentiveTypeList = (req, res, next) => {
    reportBuilderModel.GetSpecificIncentiveTypeList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.AddSpecificIncentiveTypeItem = (req, res, next) => {
    let params = {
        code: req.body.code,
        display: req.body.display,
        description: req.body.description,        
        formula: req.body.formula,
    }
    reportBuilderModel.AddSpecificIncentiveTypeItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelSpecificIncentiveTypeItem = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    reportBuilderModel.DelSpecificIncentiveTypeItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateSpecificIncentiveTypeItem = (req, res, next) => {
    let params = {
        id: req.body.id,
        code: req.body.code,
        display: req.body.display,
        description: req.body.description,        
        formula: req.body.formula,
    }
    reportBuilderModel.UpdateSpecificIncentiveTypeItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}




// ProgramOverallQualityScore List
exports.GetProgramOQSList = (req, res, next) => {
    let params = {
        quality_program_id: req.body.quality_program_id
    }
    reportBuilderModel.GetProgramOQSList(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetOverallQualityScoreItme = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.GetOverallQualityScoreItme(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


exports.AddProgramOQSItem = (req, res, next) => {
    let params = {
        quality_program_id :  req.body.quality_program_id, 
        paid_OQS : req.body.paid_OQS,
        date : req.body.date,
        OQS_id : req.body.OQS_id
    }
    reportBuilderModel.AddProgramOQSItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelProgramOQSItem = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    reportBuilderModel.DelProgramOQSItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetMeasureNameList = (req, res, next) => {
    reportBuilderModel.GetMeasureNameList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetClinicNameList = (req, res, next) => {
    reportBuilderModel.GetClinicNameList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetReportNameList = (req, res, next) => {
    reportBuilderModel.GetReportNameList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetCutpointNameList = (req, res, next) => {
    reportBuilderModel.GetCutpointNameList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


exports.AddSpecificCutpointMeasureItem = (req, res, next) => {
    let params = {
        measure : req.body.measure, 
        clinic : req.body.clinic, 
        report : req.body.report, 
        cutpoint : req.body.cutpoint, 
        range : req.body.range, 
        active : req.body.active,
        created_date: req.body.created_date
    }
    reportBuilderModel.AddSpecificCutpointMeasureItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetSpecificCutpointMeasureList = (req, res, next) => {
    reportBuilderModel.GetSpecificCutpointMeasureList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelSpecificCutpointMeasureItem = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    reportBuilderModel.DelSpecificCutpointMeasureItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetSpecificCutpointMeasureById = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.GetSpecificCutpointMeasureById(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateSpecificCutpointMeasureItem = (req, res, next) => {
    let params = {
        id: req.body.id,
        measure : req.body.measure, 
        clinic : req.body.clinic, 
        report : req.body.report, 
        cutpoint : req.body.cutpoint, 
        range : req.body.range, 
        active : req.body.active,
        created_date: req.body.created_date
    }
    reportBuilderModel.UpdateSpecificCutpointMeasureItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetMeasureQualityId = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.GetMeasureQualityId(params, (err, result) => {
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
