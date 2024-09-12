/*
* Report Builder Controller
*/
const reportBuilderModel = require('../../repositories/settings/reportBuilder');

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

// Measure Program Cutpoint
exports.GetMeasureProgramCutpoints = (req, res, next) => {
    reportBuilderModel.GetMeasureProgramCutpoints((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.InsertMeasureProgramCutpoint = (req, res, next) => {
    let params = {
        measure : req.body.measure,
        report : req.body.report, 
        cutpoint1 : req.body.cutpoint1, 
        cutpoint1_range : req.body.cutpoint1_range, 
        payment1: req.body.payment1,
        cutpoint2 : req.body.cutpoint2, 
        cutpoint2_range : req.body.cutpoint2_range, 
        payment2: req.body.payment2,
        cutpoint3 : req.body.cutpoint3, 
        cutpoint3_range : req.body.cutpoint3_range,         
        payment3: req.body.payment3,
        cutpoint4 : req.body.cutpoint4, 
        cutpoint4_range : req.body.cutpoint4_range, 
        payment4: req.body.payment4,
        cutpoint5 : req.body.cutpoint5, 
        cutpoint5_range : req.body.cutpoint5_range, 
        payment5: req.body.payment5,
        active : req.body.active,
        date: req.body.date
    }
    reportBuilderModel.InsertMeasureProgramCutpoint(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetMeasureProgramCutpointById = (req, res, next) => {
    let params = {
        id: req.params.id
    }
    reportBuilderModel.GetMeasureProgramCutpointById(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateMeasureProgramCutpointItem = (req, res, next) => {
    let params = {
        id: req.params.id,
        measure : req.body.measure,
        report : req.body.report, 
        cutpoint1 : req.body.cutpoint1, 
        range1 : req.body.range1, 
        payment1: req.body.payment1,
        cutpoint2 : req.body.cutpoint2, 
        range2 : req.body.range2, 
        payment2: req.body.payment2,
        cutpoint3 : req.body.cutpoint3, 
        range3 : req.body.range3, 
        payment3: req.body.payment3,
        cutpoint4 : req.body.cutpoint4, 
        range4 : req.body.range4, 
        payment4: req.body.payment4,
        cutpoint5 : req.body.cutpoint5, 
        range5 : req.body.range5, 
        payment5: req.body.payment5,
        active : req.body.active,
        date: req.body.date
    }
    reportBuilderModel.UpdateMeasureProgramCutpointItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelMeasureProgramCutpointItem = (req, res, next) => {
    let entry = {
        id: req.params.id
    }
    reportBuilderModel.DelMeasureProgramCutpointItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

/* Begin Measure Definition / Measure Attribution */
exports.GetMeasureAttrList = (req, res, next) => {
    reportBuilderModel.GetMeasureAttrList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.NewMeasureAttrItem = (req, res, next) => {
    let params = {
        display: req.body.display,
        description: req.body.description
    }
    reportBuilderModel.NewMeasureAttrItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DeleteMeasureAttrItem = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.DeleteMeasureAttrItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateMeasureAttrItem = (req, res, next) => {
    let params = {
        id: req.body.id, 
        display: req.body.display,
        description: req.body.description
    }
    reportBuilderModel.UpdateMeasureAttrItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}





/* End Measure Definition / Measure Attribution */



// Hedis Report Measure
exports.CheckSpecificCutpointMeasure = (req, res, next) => {
    let params = {
        report_id: req.body.report_id
    }
    reportBuilderModel.CheckSpecificCutpointMeasure(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.CheckMeasureProgramCutpoint = (req, res, next) => {
    let params = {
        report_id: req.body.report_id
    }
    reportBuilderModel.CheckMeasureProgramCutpoint(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetHedisReportList = (req, res, next) => {
    reportBuilderModel.GetHedisReportList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetHedisMeasureListByReportId = (req, res, next) => {    
    let params = {
        hedis_report_builder_report_id : req.body.hedis_report_builder_report_id
    }    
    reportBuilderModel.GetHedisMeasureListByReportId(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}



exports.InsertHedisReportItem = (req, res, next) => {
    let params = {
        quality_program_id : req.body.quality_program_id,
        start_date : req.body.start_date, 
        end_date : req.body.end_date, 
        report_OQS: req.body.report_OQS,
        OQS_used: req.body.OQS_used,     
    }
    
    reportBuilderModel.InsertHedisReportItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelHedisReportItem = (req, res, next) => {
    let params = {
        id: req.params.id
    }
    reportBuilderModel.DelHedisReportItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateHedisReportItem = (req, res, next) => {
    let params = {
        id: req.params.id,
        report_id : req.body.report_id,
        start_date : req.body.start_date, 
        end_date : req.body.end_date, 
        report_OQS: req.body.report_OQS,
        OQS_used: req.body.OQS_used,     
    }
    
    reportBuilderModel.UpdateHedisReportItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


exports.GetHedisReportStep1ItemById = (req, res, next) => {
    let params = {
        hedis_step1_id: req.body.hedis_step1_id
    }
    reportBuilderModel.GetHedisReportStep1ItemById(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.InsertHedisMeasureItem = (req, res, next) => {
    let params = {
        hedis_report_id: req.body.hedis_report_id,
        select_measure_id: req.body.select_measure_id,
        minimum_denominator_active: req.body.minimum_denominator_active,
        minimum_denominator_value: req.body.minimum_denominator_value,
        dual_improvement_active: req.body.dual_improvement_active,
        patient_incentive_active: req.body.patient_incentive_active,
        patient_incentive_value: req.body.patient_incentive_value,
        
        incentive_type_id: req.body.incentive_type_id,
        measure_categories_id: req.body.measure_categories_id,
        measure_attr_id: req.body.measure_attr_id,

        specific_improvement_active: req.body.specific_improvement_active,
        specific_improvement_value: req.body.specific_improvement_value,
        cutpoint_score_active: req.body.cutpoint_score_active,
        cutpoint_score_value: req.body.cutpoint_score_value,
        OQS_active: req.body.OQS_active,
        OQS_weight: req.body.OQS_weight,

        pay_per_numberator_active: req.body.pay_per_numberator_active,
        pay_per_numberator_1_value: req.body.pay_per_numberator_1_value,
        pay_per_numberator_2_value: req.body.pay_per_numberator_2_value,      
        
        tier_1_active: req.body.tier_1_active,
        tier_2_active: req.body.tier_2_active,
        tier_3_active: req.body.tier_3_active,
        tier_4_active: req.body.tier_4_active,
        tier_5_active: req.body.tier_5_active,
        
        cutpoint_active: req.body.cutpoint_active,
        cutpoint_1_active: req.body.cutpoint_1_active,
        cutpoint_1_value: req.body.cutpoint_1_value,
        cutpoint_2_active: req.body.cutpoint_2_active,
        cutpoint_2_value: req.body.cutpoint_2_value,
        cutpoint_3_active: req.body.cutpoint_3_active,
        cutpoint_3_value: req.body.cutpoint_3_value,
        cutpoint_4_active: req.body.cutpoint_4_active,
        cutpoint_4_value: req.body.cutpoint_4_value,
        cutpoint_5_active: req.body.cutpoint_5_active,
        cutpoint_5_value: req.body.cutpoint_5_value,

        pay_score_active: req.body.pay_score_active,
        pay_score_1_active: req.body.pay_score_1_active,
        pay_score_1_value: req.body.pay_score_1_value,
        pay_score_2_active: req.body.pay_score_2_active,
        pay_score_2_value: req.body.pay_score_2_value,
        pay_score_3_active: req.body.pay_score_3_active,
        pay_score_3_value: req.body.pay_score_3_value,
        pay_score_4_active: req.body.pay_score_4_active,
        pay_score_4_value: req.body.pay_score_4_value,
        pay_score_5_active: req.body.pay_score_5_active,
        pay_score_5_value: req.body.pay_score_5_value,
        quality_program_id: req.body.quality_program_id
    }
    
    reportBuilderModel.InsertHedisMeasureItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


exports.GetHedisMeasureItemById = (req, res, next) => {
    let params = {
        measure_id: req.body.measure_id
    }
    reportBuilderModel.GetHedisMeasureItemById(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelHedisMeasureItem = (req, res, next) => {
    let entry = {
        id: req.body.id,
        quality_program_id: req.body.quality_program_id,
        measure_id: req.body.measure_id
    }
    reportBuilderModel.DelHedisMeasureItem(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateHedisMeasureItem = (req, res, next) => {
    let params = {    
        id: req.params.id,            
        minimum_denominator_active: req.body.minimum_denominator_active,
        minimum_denominator_value: req.body.minimum_denominator_value,
        dual_improvement_active: req.body.dual_improvement_active,
        patient_incentive_active: req.body.patient_incentive_active,
        patient_incentive_value: req.body.patient_incentive_value,
        
        incentive_type_id: req.body.incentive_type_id,
        measure_categories_id: req.body.measure_categories_id,
        measure_attr_id: req.body.measure_attr_id,

        specific_improvement_active: req.body.specific_improvement_active,
        specific_improvement_value: req.body.specific_improvement_value,
        cutpoint_score_active: req.body.cutpoint_score_active,
        cutpoint_score_value: req.body.cutpoint_score_value,
        OQS_active: req.body.OQS_active,
        OQS_weight: req.body.OQS_weight,

        pay_per_numberator_active: req.body.pay_per_numberator_active,
        pay_per_numberator_1_value: req.body.pay_per_numberator_1_value,
        pay_per_numberator_2_value: req.body.pay_per_numberator_2_value,      
        
        tier_1_active: req.body.tier_1_active,
        tier_2_active: req.body.tier_2_active,
        tier_3_active: req.body.tier_3_active,
        tier_4_active: req.body.tier_4_active,
        tier_5_active: req.body.tier_5_active,
        
        cutpoint_active: req.body.cutpoint_active,
        cutpoint_1_active: req.body.cutpoint_1_active,
        cutpoint_1_value: req.body.cutpoint_1_value,
        cutpoint_2_active: req.body.cutpoint_2_active,
        cutpoint_2_value: req.body.cutpoint_2_value,
        cutpoint_3_active: req.body.cutpoint_3_active,
        cutpoint_3_value: req.body.cutpoint_3_value,
        cutpoint_4_active: req.body.cutpoint_4_active,
        cutpoint_4_value: req.body.cutpoint_4_value,
        cutpoint_5_active: req.body.cutpoint_5_active,
        cutpoint_5_value: req.body.cutpoint_5_value,

        pay_score_active: req.body.pay_score_active,
        pay_score_1_active: req.body.pay_score_1_active,
        pay_score_1_value: req.body.pay_score_1_value,
        pay_score_2_active: req.body.pay_score_2_active,
        pay_score_2_value: req.body.pay_score_2_value,
        pay_score_3_active: req.body.pay_score_3_active,
        pay_score_3_value: req.body.pay_score_3_value,
        pay_score_4_active: req.body.pay_score_4_active,
        pay_score_4_value: req.body.pay_score_4_value,
        pay_score_5_active: req.body.pay_score_5_active,
        pay_score_5_value: req.body.pay_score_5_value
    }
    
    reportBuilderModel.UpdateHedisMeasureItem(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetIncentiveType = (req, res, next) => {
    reportBuilderModel.GetIncentiveType((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetMeasureCategories = (req, res, next) => {
    reportBuilderModel.GetMeasureCategories((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetMeasureAttr = (req, res, next) => {
    reportBuilderModel.GetMeasureAttr((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.CheckMeasureForSelect = (req, res, next) => {
    let params = { 
        measure_id: req.body.measure_id,
        report_id: req.body.report_id
    }
    reportBuilderModel.CheckMeasureForSelect(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.CheckMeasureCutpoint = (req, res, next) => {
    let params = { 
        measure_id: req.body.measure_id,
        report_id: req.body.report_id
    }
    reportBuilderModel.CheckMeasureCutpoint(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


exports.GetReportMeasure = (req, res, next) => {
    let params = { 
        report_id: req.body.report_id
    }
    reportBuilderModel.GetReportMeasure(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetInsuranceNameForReport = (req, res, next) => {
    let params = { 
        report_id: req.body.report_id
    }
    reportBuilderModel.GetInsuranceNameForReport(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.GetHedisQualityTrackerList = (req, res, next) => {
    reportBuilderModel.GetHedisQualityTrackerList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.qualityPrograms = (req, res, next) => {
    reportBuilderModel.qualityPrograms((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.qualityProgramMeasures = (req, res, next) => {
    let params = { 
        quality_program_id: req.body.quality_program_id,
        clinic_id: req.body.clinic_id
    }
    reportBuilderModel.qualityProgramMeasures(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.qualityProgramTracker = (req, res, next) => {
    let params = { 
        id: req.params.id,
        rate: req.body.rate,
        score: req.body.score,
        trend: req.body.trend,
        num: req.body.num,
        den: req.body.den,
        missing: req.body.missing,
        hf_avg: req.body.hf_avg,
        tier_1: req.body.tier_1,
        tier_2: req.body.tier_2,
        tier_3: req.body.tier_3,
        Q1_target: req.body.Q1_target,
        Q2_target: req.body.Q2_target,
        status: req.body.status
    }
    reportBuilderModel.qualityProgramTracker(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


exports.clinicName = (req, res, next) => {
    let params = { 
        id: req.body.clinic_id
    }
    reportBuilderModel.clinicName(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


exports.insertTracker = (req, res, next) => {
    let params = { 
        clinic_id: req.body.clinic_id,
        hedis_reportBuilder_report_id: req.body.hedis_reportBulder_report_id
    }
    reportBuilderModel.insertTracker(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getCutpoints = (req, res, next) => {
    let params = { 
        measure_id: req.body.measure_id,
        quality_program_id: req.body.quality_program_id
    }
    reportBuilderModel.getCutpoints(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}


/** Specific Measure Cutpoint */
exports.GetSpecificMeasureCutpoint = (req, res, next) => {
    reportBuilderModel.GetSpecificMeasureCutpoint((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.InsertSpecificMeasureCutpoint = (req, res, next) => {
    let params = {
        measure : req.body.measure,
        report : req.body.report, 
        insurance: req.body.insurance,
        clinic: req.body.clinic,
        cutpoint1 : req.body.cutpoint1, 
        cutpoint1_range : req.body.cutpoint1_range, 
        payment1: req.body.payment1,
        cutpoint2 : req.body.cutpoint2, 
        cutpoint2_range : req.body.cutpoint2_range, 
        payment2: req.body.payment2,
        cutpoint3 : req.body.cutpoint3, 
        cutpoint3_range : req.body.cutpoint3_range,         
        payment3: req.body.payment3,
        cutpoint4 : req.body.cutpoint4, 
        cutpoint4_range : req.body.cutpoint4_range, 
        payment4: req.body.payment4,
        cutpoint5 : req.body.cutpoint5, 
        cutpoint5_range : req.body.cutpoint5_range, 
        payment5: req.body.payment5,
        active : req.body.active,
        date: req.body.date
    }
    reportBuilderModel.InsertSpecificMeasureCutpoint(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.DelSpecificMeasureCutpoint = (req, res, next) => {
    let params = {
        id: req.body.id
    }
    reportBuilderModel.DelSpecificMeasureCutpoint(params, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.UpdateSpecificMeasureCutpoint = (req, res, next) => {
    let params = {
        id: req.params.id,
        
        report : req.body.report, 
        clinic : req.body.clinic, 
        insurance: req.body.insurance,

        cutpoint1 : req.body.cutpoint1, 
        range1 : req.body.cutpoint1_range, 
        cutpoint2 : req.body.cutpoint2, 
        range2 : req.body.cutpoint2_range, 
        cutpoint3 : req.body.cutpoint3, 
        range3 : req.body.cutpoint3_range, 
        cutpoint4 : req.body.cutpoint4, 
        range4 : req.body.cutpoint4_range, 
        cutpoint5 : req.body.cutpoint5, 
        range5 : req.body.cutpoint5_range, 

        payment1 : req.body.payment1,  
        payment2 : req.body.payment2, 
        payment3 : req.body.payment3, 
        payment4 : req.body.payment4, 
        payment5 : req.body.payment5, 

        active : req.body.active,
        date: req.body.date
    }
    reportBuilderModel.UpdateSpecificMeasureCutpoint(params, (err, result) => {
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
