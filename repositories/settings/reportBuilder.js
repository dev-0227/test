/*
* Report Builder Model
*/
const connection = require('../../utilities/database');

const reportBuilderModel = {   
    getInsuranceList: (callback) => {
        let query = "SELECT id, insName FROM `insurances` WHERE 1 ORDER BY insName";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },    
    getInsuranceLOBList: (params, callback) => {
        let query = "SELECT id, lob FROM `inslob` WHERE `insid` = ? ORDER BY id ASC";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        });
    },
    getInsuranceTypeList: (params, callback) => {
        let query = "SELECT `ins_type`.id, `ins_type`.display FROM `ins_type` JOIN `inslob` ON `ins_type`.id = `inslob`.type_id WHERE `inslob`.id = ?";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        });
    },  
    getQualityProgramList: (params, callback) => {
        let query = "SELECT quality_program.*, GROUP_CONCAT(lob SEPARATOR ',') as lob FROM quality_program, quality_lob, inslob WHERE quality_lob.quality_program_id = quality_program.id AND  quality_lob.inslob_id = inslob.id AND quality_program.ins_id = ?  GROUP BY quality_lob.quality_program_id";
        connection.query(query, [params.ins_id], (err, result) => {
            callback(err, result);
        });

    },
    // addQualityProgram: (params, callback) => {
    //     let query = "INSERT INTO `quality_program` (`ins_id`, `ins_lob_id`, `name`, `display`, `definition`, `description`, `program_date`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    //     connection.query(query, [params.ins_id, params.ins_lob_id, params.name, params.display, params.definition, params.description, params.program_date], (err, result) => {
    //         callback(err, result);
    //     });
    // },

    addQualityProgram: (params, callback) => {
        if (!Array.isArray(params.ins_lob_id)) {
            callback(new Error('ins_lob_id must be an array'));
            return;
        }
        
        let values = [];
        
        
        
        // Prepare the base INSERT query
        let query = "INSERT INTO `quality_program` (`ins_id`, `name`, `display`, `definition`, `description`, `program_date`) VALUES (?, ?, ?, ?, ?, ?)";
        
        // Iterate over each ins_lob_id and execute individual INSERT queries
        connection.query(query, [params.ins_id, params.name, params.display, params.definition, params.description, params.program_date], (err, result) => {
            callback(err, result);
           
            for (let i = 0; i < params.ins_lob_id.length; i++) {
                let query = "INSERT INTO `quality_lob` (`inslob_id`, `quality_program_id`) VALUES (?, ?)";    
                connection.query(query, [params.ins_lob_id[i], result.insertId], (err, res) => {
                    console.log(res);
                })
                // values.push(params.ins_lob_id[i]);
            }
        });
    },

    delQualityProgram: (params, callback) => {
        let query1 = "DELETE FROM `quality_program` WHERE `id`= ? ";
        connection.query(query1, [params.id], (err, result) => {
            callback(err, result);
        });
        let query2 = "DELETE FROM `quality_lob` WHERE `quality_program_id`= ? ";
        connection.query(query2, [params.id], (err, res) => {
            console.log(res);
        });

    },
    updateQualityProgram: (params, callback) => {
        let query = "UPDATE `quality_program` SET `name` = ?, `display` = ?, `definition` = ?, `description` = ? , `program_date` = ? WHERE `id`= ? ";
        connection.query(query, [params.name, params.display, params.definition, params.description, params.program_date, params.id], (err, result) => {
            callback(err, result);
        });
        let query2 = "DELETE FROM `quality_lob` WHERE `quality_program_id`= ? ";
        connection.query(query2, [params.id], (err, res) => {
            if (!err) {
                for (let i = 0; i < params.ins_lob_id.length; i++) {
                    let query = "INSERT INTO `quality_lob` (`inslob_id`, `quality_program_id`) VALUES (?, ?)";    
                    connection.query(query, [params.ins_lob_id[i], params.id], (err, res) => {
                        console.log(res);
                    })
                }
            }
        });
    },    
    getSelectLOBList: (params, callback) => {
        let query = "SELECT inslob_id FROM `quality_lob` WHERE `quality_program_id` = ?";
        connection.query(query, [params.id], (err, result) => {                      
            var res = result.map(r => r.inslob_id);            
            callback(err, res);
        });
    },GetCutPointList: (callback) => {
        let query = "SELECT * FROM cutpoint_measure";
        connection.query(query, (err, result) => {                      
            callback(err, result);
        });
    },

    AddCutPointItem: (params, callback) => {
        let query = "INSERT INTO cutpoint_measure (display, target_rate, active) VALUES (?, ?, ? )";
        connection.query(query, [params.display, params.target_rate, params.active], (err, result) => {
            callback(err, result);
        });
    },

    DelCutPointItem: (params, callback) => {
        let query1 = "DELETE FROM cutpoint_measure WHERE id= ? ";
        connection.query(query1, [params.id], (err, result) => {
            callback(err, result);
        });
    },

    UpdateCutPointItem: (params, callback) => {
        let query = "UPDATE cutpoint_measure SET display= ?, target_rate= ?, active = ? WHERE id= ? ";
        connection.query(query, [params.display, params.target_rate, params.active, params.id], (err, result) => {
            callback(err, result);
        });
    },
    
    // 
    GetOverallQualityScoreList: (callback) => {
        let query = "SELECT * FROM overall_quality_score";
        connection.query(query, (err, result) => {                      
            callback(err, result);
        });
    },

    AddOverallQualityScoreItem: (params, callback) => {
        let query = "INSERT INTO overall_quality_score (display, target_rate, active) VALUES (?, ?, ? )";
        connection.query(query, [params.display, params.target_rate, params.active], (err, result) => {
            callback(err, result);
        });
    },

    DelOverallQualityScoreItem: (params, callback) => {
        let query1 = "DELETE FROM overall_quality_score WHERE id= ? ";
        connection.query(query1, [params.id], (err, result) => {
            callback(err, result);
        });
    },
    UpdateOverallQualityScoreItem: (params, callback) => {
        let query = "UPDATE overall_quality_score SET display= ?, target_rate= ?, active = ? WHERE id= ? ";
        connection.query(query, [params.display, params.target_rate, params.active, params.id], (err, result) => {
            callback(err, result);
        });
    },
    //
    GetQuarterlyMeasureList: (callback) => {
        let query = "SELECT * FROM quarterly_measure";
        connection.query(query, (err, result) => {                      
            callback(err, result);
        });
    },

    AddQuarterlyMeasureItem: (params, callback) => {
        let query = "INSERT INTO quarterly_measure (display, description, target_rate, active) VALUES (?, ?, ?, ? )";
        connection.query(query, [params.display, params.description, params.target_rate, params.active], (err, result) => {
            callback(err, result);
        });
    },

    DelQuarterlyMeasureItem: (params, callback) => {
        let query1 = "DELETE FROM quarterly_measure WHERE id= ? ";
        connection.query(query1, [params.id], (err, result) => {
            callback(err, result);
        });
    },
    UpdateQuarterlyMeasureItem: (params, callback) => {
        let query = "UPDATE quarterly_measure SET display= ?, description=?, target_rate= ?, active = ? WHERE id= ? ";
        connection.query(query, [params.display, params.description, params.target_rate, params.active, params.id], (err, result) => {
            callback(err, result);
        });
    },
    // 
    GetSpecificIncentiveTypeList: (callback) => {
        let query = "SELECT * FROM measure_specific_incentive_type";
        connection.query(query, (err, result) => {                      
            callback(err, result);
        });
    },

    AddSpecificIncentiveTypeItem: (params, callback) => {
        let query = "INSERT INTO measure_specific_incentive_type (code, display, description, formula) VALUES (?, ?, ?, ?)";
        connection.query(query, [params.code, params.display, params.description, params.formula], (err, result) => {
            callback(err, result);
        });
    },

    DelSpecificIncentiveTypeItem: (params, callback) => {
        let query1 = "DELETE FROM measure_specific_incentive_type WHERE id= ? ";
        connection.query(query1, [params.id], (err, result) => {
            callback(err, result);
        });
    },
    UpdateSpecificIncentiveTypeItem: (params, callback) => {
        let query = "UPDATE measure_specific_incentive_type SET code= ?, display=?, description= ?, formula = ? WHERE id= ? ";
        connection.query(query, [params.code, params.display, params.description, params.formula, params.id], (err, result) => {
            callback(err, result);
        });
    },

    //////
    // 
    GetProgramOQSList: (params, callback) => {
        let query = "SELECT report_oqs.id, quality_program.name as program_name, overall_quality_score.display as overall_quality_score, overall_quality_score.target_rate, report_oqs.paid_OQS, report_oqs.date FROM report_oqs JOIN quality_program ON report_oqs.quality_program_id = quality_program.id JOIN overall_quality_score ON report_oqs.OQS_id = overall_quality_score.id WHERE report_oqs.quality_program_id = ?";
        connection.query(query, [params.quality_program_id], (err, result) => {
            callback(err, result);
        });
    },

    GetOverallQualityScoreItme: (params, callback) => {
        let query = "SELECT * From overall_quality_score WHERE id = ?";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        });
    },

    AddProgramOQSItem: (params, callback) => {
        let query = "INSERT INTO report_oqs (quality_program_id, OQS_id, paid_OQS, date) VALUES (?, ?, ?, ?)";
        connection.query(query, [params.quality_program_id, params.OQS_id, params.paid_OQS, params.date], (err, result) => {
            callback(err, result);
        });
    },

    DelProgramOQSItem: (params, callback) => {
        let query1 = "DELETE FROM report_oqs WHERE id= ? ";
        connection.query(query1, [params.id], (err, result) => {
            callback(err, result);
        });
    },
    GetMeasureNameList: (callback) => {
        let query = "SELECT id, title as name FROM f_qpp_measure_data WHERE measureId IS NOT NULL AND eyear = 2024";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    GetClinicNameList: (callback) => {
        let query = "SELECT id, name FROM clinics";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    GetReportNameList: (callback) => {
        let query = "SELECT id, name FROM quality_program";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    GetCutpointNameList: (callback) => {
        let query = "SELECT id, display as `name` FROM cutpoint_measure";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    AddSpecificCutpointMeasureItem: (params, callback) => {
        let query = "INSERT INTO specific_cutpoint_measure (measure_id, clinic_id, report_id, cutpoint_id, measure_range, active, create_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [params.measure, params.clinic, params.report, params.cutpoint, params.range, params.active, params.created_date], (err, result) => {
            callback(err, result);
        });
    },
    GetSpecificCutpointMeasureList: (callback) => {
        let query = "SELECT specific_cutpoint_measure.id, f_qpp_measure_data.measureId as quality_id, f_qpp_measure_data.title as measure, clinics.name as clinic, quality_program.name as report, cutpoint_measure.display as cutpoint, specific_cutpoint_measure.measure_range as measure_range, specific_cutpoint_measure.active as active, specific_cutpoint_measure.create_date as created_date FROM specific_cutpoint_measure JOIN f_qpp_measure_data ON specific_cutpoint_measure.measure_id = f_qpp_measure_data.id JOIN clinics on specific_cutpoint_measure.clinic_id = clinics.id JOIN quality_program ON specific_cutpoint_measure.report_id = quality_program.id JOIN cutpoint_measure ON specific_cutpoint_measure.cutpoint_id = cutpoint_measure.id";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    DelSpecificCutpointMeasureItem: (params, callback) => {
        let query1 = "DELETE FROM specific_cutpoint_measure WHERE id= ? ";
        connection.query(query1, [params.id], (err, result) => {
            callback(err, result);
        });
    },

    GetSpecificCutpointMeasureById: (params, callback) => {
        let query = "SELECT * FROM specific_cutpoint_measure WHERE id = ?";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        });
    },

    UpdateSpecificCutpointMeasureItem: (params, callback) => {
        let query = "UPDATE specific_cutpoint_measure SET measure_id= ?, clinic_id=?, report_id= ?, cutpoint_id = ?, measure_range = ?, active = ?, create_date = ? WHERE id= ? ";
        connection.query(query, [params.measure, params.clinic, params.report, params.cutpoint, params.range, params.active, params.created_date, params.id], (err, result) => {
            callback(err, result);
        });
    },
    
    GetMeasureQualityId: (params, callback) => {
        let query = "SELECT measureId FROM f_qpp_measure_data WHERE id = ?";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        });
    },

    // Measure Program Cutpoint
    GetMeasureProgramCutpoints: (callback) => {
        let query = `
            SELECT 
                measure_program_cutpoint.id, 
                measure_hedis.measureId as quality_id, 
                measure_hedis.title as measure, 
                hedis_quality_program.name as report, 

                c1.display as cutpoint_1, 
                measure_program_cutpoint.cutpoint_1_range,

                c2.display as cutpoint_2, 
                measure_program_cutpoint.cutpoint_2_range,

                c3.display as cutpoint_3, 
                measure_program_cutpoint.cutpoint_3_range,

                c4.display as cutpoint_4, 
                measure_program_cutpoint.cutpoint_4_range,

                c5.display as cutpoint_5, 
                measure_program_cutpoint.cutpoint_5_range,
                
                measure_program_cutpoint.payment_1_score,
                measure_program_cutpoint.payment_2_score,
                measure_program_cutpoint.payment_3_score,
                measure_program_cutpoint.payment_4_score,
                measure_program_cutpoint.payment_5_score,

                measure_program_cutpoint.active as active, 
                measure_program_cutpoint.date

                FROM measure_program_cutpoint 

                JOIN measure_hedis ON measure_program_cutpoint.measure_id = measure_hedis.id 
                JOIN hedis_quality_program ON measure_program_cutpoint.report_id = hedis_quality_program.id 
                JOIN cutpoint_measure as c1 ON measure_program_cutpoint.cutpoint_1_id = c1.id 
                JOIN cutpoint_measure as c2 ON measure_program_cutpoint.cutpoint_2_id = c2.id 
                JOIN cutpoint_measure as c3 ON measure_program_cutpoint.cutpoint_3_id = c3.id 
                JOIN cutpoint_measure as c4 ON measure_program_cutpoint.cutpoint_4_id = c4.id 
                JOIN cutpoint_measure as c5 ON measure_program_cutpoint.cutpoint_5_id = c5.id 
                Order By id DESC
        `;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    
    InsertMeasureProgramCutpoint: (params, callback) => {
        let query = `INSERT INTO 
            measure_program_cutpoint ( 
                measure_id, 
                report_id, 
                cutpoint_1_id, 
                cutpoint_1_range,
                cutpoint_2_id, 
                cutpoint_2_range,
                cutpoint_3_id, 
                cutpoint_3_range,
                cutpoint_4_id, 
                cutpoint_4_range,
                cutpoint_5_id, 
                cutpoint_5_range,                
                payment_1_score,
                payment_2_score,
                payment_3_score,
                payment_4_score,
                payment_5_score,
                active, 
                date)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query, [
                params.measure, 
                params.report, 
                params.cutpoint1, 
                params.cutpoint1_range, 
                params.cutpoint2, 
                params.cutpoint2_range,                 
                params.cutpoint3, 
                params.cutpoint3_range,                 
                params.cutpoint4, 
                params.cutpoint4_range,                 
                params.cutpoint5, 
                params.cutpoint5_range, 
                params.payment1,
                params.payment2,
                params.payment3,
                params.payment4,
                params.payment5,
                params.active, 
                params.date
            ], 
            (err, result) => {
            callback(err, result);
        });
    },

    GetMeasureProgramCutpointById: (params, callback) => {
        let query = `SELECT 
                        measure_program_cutpoint.*, 
                        measure_hedis.title, 
                        measure_hedis.measureId 
                    FROM measure_program_cutpoint 
                    JOIN measure_hedis ON measure_program_cutpoint.measure_id = measure_hedis.id 
                    WHERE measure_program_cutpoint.id = ?`;
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        });
    },

    UpdateMeasureProgramCutpointItem: (params, callback) => {
        let query = `UPDATE 
                        measure_program_cutpoint 
                    SET 
                        measure_id= ?, 
                        report_id= ?, 
                        cutpoint_1_id = ?, 
                        cutpoint_1_range = ?,
                        cutpoint_2_id = ?, 
                        cutpoint_2_range = ?,
                        cutpoint_3_id = ?, 
                        cutpoint_3_range = ?,
                        cutpoint_4_id = ?, 
                        cutpoint_4_range = ?,
                        cutpoint_5_id = ?, 
                        cutpoint_5_range = ?,
                        payment_1_score = ?,
                        payment_2_score = ?,
                        payment_3_score = ?,
                        payment_4_score = ?,
                        payment_5_score = ?,       
                        active = ?, 
                        date = ? 
                    WHERE id= ? `;

        connection.query(query, [
                    params.measure, 
                    params.report, 
                    params.cutpoint1, 
                    params.range1,                     
                    params.cutpoint2, 
                    params.range2, 
                    params.cutpoint3, 
                    params.range3, 
                    params.cutpoint4, 
                    params.range4, 
                    params.cutpoint5, 
                    params.range5, 
                    params.payment1,
                    params.payment2,                    
                    params.payment3,                    
                    params.payment4,
                    params.payment5,
                    params.active, 
                    params.date,
                    params.id
                ], 
                    (err, result) => {
            callback(err, result);
        });
    },

    DelMeasureProgramCutpointItem: (params, callback) => {
        let query = "DELETE FROM measure_program_cutpoint WHERE id= ? ";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        });
    },

    // Report Builder 
    CheckSpecificCutpointMeasure: (params, callback) => {
        let query = "SELECT count(specific_cutpoint_measure.id) as count, hedis_quality_program.name as name FROM specific_cutpoint_measure JOIN hedis_quality_program ON hedis_quality_program.id = specific_cutpoint_measure.report_id WHERE report_id = ?";
        connection.query(query, [params.report_id], (err, result) => {
            callback(err, result);
        });
    },

    CheckMeasureProgramCutpoint: (params, callback) => {
        let query = "SELECT COUNT(measure_program_cutpoint.id) AS count, hedis_quality_program.name as name FROM measure_program_cutpoint JOIN hedis_quality_program ON hedis_quality_program.id = measure_program_cutpoint.report_id WHERE measure_program_cutpoint.report_id = ?";
        connection.query(query, [params.report_id], (err, result) => {
            callback(err, result);
        });
    },

    GetHedisReportList: (callback) => {       
        let query = `SELECT hedis_quality_program.name as name, 
                    insurances.insName as insurance, 
                    hedis_report_builder_report.*
                FROM hedis_report_builder_report 
                JOIN hedis_quality_program ON hedis_report_builder_report.quality_program_id = hedis_quality_program.id 
                JOIN insurances ON hedis_quality_program.ins_id = insurances.id
                ORDER BY hedis_report_builder_report.id DESC`;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    
    GetHedisMeasureListByReportId: (params, callback) => {
        let query = `
            SELECT 
		            hedis_report_builder_measure.*, 
		            measure_hedis.title as measure, 
		            measure_hedis.measureId as quality_id,
					measure_specific_incentive_type.display as incentive_type,
					hcd_table.Health_Care_Domain as measure_categories,
                    measure_attribution.display as measure_attribution
                FROM hedis_report_builder_measure 
                    JOIN measure_hedis ON hedis_report_builder_measure.measure_id = measure_hedis.id 
					LEFT JOIN measure_specific_incentive_type ON hedis_report_builder_measure.incentive_type_id = measure_specific_incentive_type.id
					LEFT JOIN hcd_table ON hedis_report_builder_measure.measure_categories_id = hcd_table.id
                    LEFT JOIN measure_attribution ON measure_attribution.id = hedis_report_builder_measure.measure_attr_id
                WHERE hedis_report_builder_measure.hedis_report_builder_report_id = ?
                ORDER BY hedis_report_builder_measure.id DESC
        `;
        connection.query(query, [params.hedis_report_builder_report_id], (err, result) => {
            callback(err, result);
        });
    },

    InsertHedisReportItem: (params, callback) => {
        let query = `INSERT INTO 
                    hedis_report_builder_report 
                    (   
                        quality_program_id, 
                        start_date,
                        end_date,
                        report_OQS,
                        OQS_used
                    )  
                    VALUES (?, ?, ?, ?, ?)`;
        connection.query(query, [                
                params.quality_program_id, 
                params.start_date, 
                params.end_date, 
                params.report_OQS,
                params.OQS_used,                 
            ], 
            (err, result) => {
            callback(err, result);
        });
    },    
    //TODO
    DelHedisReportItem: (params, callback) => {
        // let queryReport = "DELETE FROM hedis_report_builder_report WHERE id= ? ";
        // connection.query(query, [params.id], (err, result) => {
        //     callback(err, result);
        // });
        // let queryMeasure = "DELETE FROM hedis_reportBuilder_measure WHERE hedis_reportBuilder_report_id= ? ";
        // connection.query(query2, [params.id], (err, result) => {
        //     console.log(result);
        // });
        connection.beginTransaction(err => {
            if (err) { 
                return callback(err);
            }
        
            let queryReport = "DELETE FROM hedis_report_builder_report WHERE id= ? ";
            connection.query(queryReport, [params.id], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        callback(err);
                    });
                }
        
                let queryMeasure = "DELETE FROM hedis_report_builder_measure WHERE hedis_report_builder_report_id= ? ";
                connection.query(queryMeasure, [params.id], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            callback(err);
                        });
                    }
        
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                callback(err);
                            });
                        }
                        callback(null, result);
                    });
                });
            });
        });
        
    },
    //TODO
    UpdateHedisReportItem: (params, callback) => {
        let query = `UPDATE 
                        hedis_report_builder_report
                    SET 
                        quality_program_id= ?, 
                        start_date= ?, 
                        end_date = ?, 
                        report_OQS = ?,
                        OQS_used = ?
                    WHERE id= ? `;

        connection.query(query, [
                    params.report_id, 
                    params.start_date, 
                    params.end_date, 
                    params.report_OQS, 
                    params.OQS_used,
                    params.id
                ], 
                    (err, result) => {
            callback(err, result);
        });
    },

    GetHedisReportStep1ItemById: (params, callback) => {
               
         let query = `SELECT 
                        hedis_report_step_2.*, 
                        f_qpp_measure_data.title as measure, 
                        f_qpp_measure_data.measureId as quality_id 
                    FROM hedis_report_step_2 
                    JOIN f_qpp_measure_data ON hedis_report_step_2.measure_id = f_qpp_measure_data.id 
                    WHERE hedis_step1_id = ?`;       
       
        connection.query(query, [params.hedis_step1_id], (err, result) => {
            callback(err, result);
        });
    },

    InsertHedisMeasureItem: (params, callback) => {
        // Start transaction
        connection.beginTransaction((err) => {
            if (err) {
                return callback(err, null); // Return early if there's an error starting the transaction
            }
    
            let query = `
                INSERT INTO hedis_report_builder_measure (
                    hedis_report_builder_report_id,
                    measure_id,
                    minimum_denominator_active,
                    minimum_denominator_value,
                    dual_improvement_active,
                    patient_incentive_active,
                    patient_incentive_value,                
                    incentive_type_id,
                    measure_categories_id,
                    specific_improvement_active,
                    specific_improvement_value,
                    cutpoint_score_active,
                    cutpoint_score_value,
                    OQS_active,
                    OQS_weight,
                    measure_attr_id,
                    tier_1_active,
                    tier_2_active,
                    tier_3_active,
                    tier_4_active,
                    tier_5_active,
                    cutpoint_active,
                    cutpoint_1_active,
                    cutpoint_1_value,
                    cutpoint_2_active,
                    cutpoint_2_value,
                    cutpoint_3_active,
                    cutpoint_3_value,
                    cutpoint_4_active,
                    cutpoint_4_value,
                    cutpoint_5_active,
                    cutpoint_5_value,
                    pay_score_active,
                    pay_score_1_active,
                    pay_score_1_value,
                    pay_score_2_active,
                    pay_score_2_value,
                    pay_score_3_active,
                    pay_score_3_value,
                    pay_score_4_active,
                    pay_score_4_value,
                    pay_score_5_active,
                    pay_score_5_value,
                    pay_per_numberator_active,
                    pay_per_numberator_1_value,
                    pay_per_numberator_2_value
                )  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
            // First query execution
            connection.query(query, [
                params.hedis_report_id,
                params.select_measure_id,
                params.minimum_denominator_active,
                params.minimum_denominator_value,
                params.dual_improvement_active,
                params.patient_incentive_active,
                params.patient_incentive_value,
                params.incentive_type_id,
                params.measure_categories_id,
                params.specific_improvement_active,
                params.specific_improvement_value,
                params.cutpoint_score_active,
                params.cutpoint_score_value,
                params.OQS_active,
                params.OQS_weight,
                params.measure_attr_id,
                params.tier_1_active,
                params.tier_2_active,
                params.tier_3_active,
                params.tier_4_active,
                params.tier_5_active,
                params.cutpoint_active,
                params.cutpoint_1_active,
                params.cutpoint_1_value,
                params.cutpoint_2_active,
                params.cutpoint_2_value,
                params.cutpoint_3_active,
                params.cutpoint_3_value,
                params.cutpoint_4_active,
                params.cutpoint_4_value,
                params.cutpoint_5_active,
                params.cutpoint_5_value,
                params.pay_score_active,
                params.pay_score_1_active,
                params.pay_score_1_value,
                params.pay_score_2_active,
                params.pay_score_2_value,
                params.pay_score_3_active,
                params.pay_score_3_value,
                params.pay_score_4_active,
                params.pay_score_4_value,
                params.pay_score_5_active,
                params.pay_score_5_value,
                params.pay_per_numberator_active,
                params.pay_per_numberator_1_value,
                params.pay_per_numberator_2_value
            ], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        callback(err, null); // Rollback transaction if there's an error
                    });
                }
    
                let query1 = "INSERT INTO hedis_quality_tracker (quality_program_id, mid) VALUES (?, ?)";
                // Second query execution
                connection.query(query1, [params.quality_program_id, params.select_measure_id], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            callback(err, null); // Rollback transaction if there's an error
                        });
                    }
    
                    // Commit transaction if all queries are successful
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                callback(err, null); // Rollback transaction if commit fails
                            });
                        }
                        callback(null, result); // Return the result if everything went well
                    });
                });
            });
        });
    },
    
    // InsertHedisMeasureItem: (params, callback) => {
    //     let query = `INSERT INTO 
    //         hedis_report_builder_measure (                 
    //             hedis_report_builder_report_id,
    //             measure_id,
    //             minimum_denominator_active,
    //             minimum_denominator_value,
    //             dual_improvement_active,
    //             patient_incentive_active,
    //             patient_incentive_value,                
    //             incentive_type_id,
    //             measure_categories_id,
    //             specific_improvement_active,
    //             specific_improvement_value,
    //             cutpoint_score_active,
    //             cutpoint_score_value,
    //             OQS_active,
    //             OQS_weight,
    //             measure_attr_id,
    //             tier_target_active,
    //             tier_cutpoint_1_active,
    //             tier_cutpoint_1_value,
    //             tier_cutpoint_2_active,
    //             tier_cutpoint_2_value,
    //             tier_cutpoint_3_active,
    //             tier_cutpoint_3_value,
    //             tier_cutpoint_4_active,
    //             tier_cutpoint_4_value,
    //             tier_cutpoint_5_active,
    //             tier_cutpoint_5_value,
    //             pay_score_active,
    //             pay_score_1_active,
    //             pay_score_1_value,
    //             pay_score_2_active,
    //             pay_score_2_value,
    //             pay_score_3_active,
    //             pay_score_3_value,
    //             pay_score_4_active,
    //             pay_score_4_value,
    //             pay_score_5_active,
    //             pay_score_5_value,
    //             pay_per_numberator_active,
    //             pay_per_numberator_1_value,
    //             pay_per_numberator_2_value
    //         )  
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    //     connection.query(query, [                
    //         params.hedis_report_id,
    //         params.select_measure_id,
    //         params.minimum_denominator_active,
    //         params.minimum_denominator_value,
    //         params.dual_improvement_active,
    //         params.patient_incentive_active,
    //         params.patient_incentive_value,
    //         params.incentive_type_id,
    //         params.measure_categories_id,
    //         params.specific_improvement_active,
    //         params.specific_improvement_value,
    //         params.cutpoint_score_active,
    //         params.cutpoint_score_value,
    //         params.OQS_active,
    //         params.OQS_weight,
    //         params.measure_attr_id,
    //         params.tier_target_active,
    //         params.tier_cutpoint_1_active,
    //         params.tier_cutpoint_1_value,
    //         params.tier_cutpoint_2_active,
    //         params.tier_cutpoint_2_value,
    //         params.tier_cutpoint_3_active,
    //         params.tier_cutpoint_3_value,
    //         params.tier_cutpoint_4_active,
    //         params.tier_cutpoint_4_value,
    //         params.tier_cutpoint_5_active,
    //         params.tier_cutpoint_5_value,
    //         params.pay_score_active,
    //         params.pay_score_1_active,
    //         params.pay_score_1_value,
    //         params.pay_score_2_active,
    //         params.pay_score_2_value,
    //         params.pay_score_3_active,
    //         params.pay_score_3_value,
    //         params.pay_score_4_active,
    //         params.pay_score_4_value,
    //         params.pay_score_5_active,
    //         params.pay_score_5_value,
    //         params.pay_per_numberator_active,
    //         params.pay_per_numberator_1_value,
    //         params.pay_per_numberator_2_value
    //         ], 
    //         (err, result) => {
    //         callback(err, result);
    //     });

    //     let query1 = "INSERT INTO hedis_quality_tracker (quality_program_id, mid) VALUES (?, ?)";
    //     connection.query(query1, [params.quality_program_id, params.select_measure_id], (err, result) => {
    //         console.log(result);
    //     });
    // }, 

    GetHedisMeasureItemById: (params, callback) => {               
        let query = `SELECT 
                       hedis_report_builder_measure.*, 
                       measure_hedis.title as measure, 
                       measure_hedis.measureId as quality_id 
                   FROM hedis_report_builder_measure 
                   JOIN measure_hedis ON hedis_report_builder_measure.measure_id = measure_hedis.id 
                   WHERE hedis_report_builder_measure.id = ?`;       
      
       connection.query(query, [params.measure_id], (err, result) => {
           callback(err, result);
       });
   },

//    DelHedisMeasureItem: (params, callback) => {
//         let query = "DELETE FROM hedis_report_builder_measure WHERE id= ? ";
//         connection.query(query, [params.id], (err, result) => {
//             callback(err, result);
//         });

//         let query1 = "DELETE FROM hedis_quality_tracker WHERE quality_program_id= ? AND mid= ?";
//         connection.query(query1, [params.quality_program_id, params.measure_id], (err, result) => {
//             console.log(result);
//         });

//    },
    DelHedisMeasureItem: (params, callback) => {
        // Start transaction
        connection.beginTransaction((err) => {
            if (err) {
                return callback(err, null); // Return early if there's an error starting the transaction
            }

            let query = "DELETE FROM hedis_report_builder_measure WHERE id = ?";
            connection.query(query, [params.id], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        callback(err, null); // Rollback transaction if there's an error
                    });
                }

                let query1 = "DELETE FROM hedis_quality_tracker WHERE quality_program_id = ? AND mid = ?";
                connection.query(query1, [params.quality_program_id, params.measure_id], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            callback(err, null); // Rollback transaction if there's an error
                        });
                    }

                    // Commit transaction if both delete operations are successful
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                callback(err, null); // Rollback transaction if commit fails
                            });
                        }
                        callback(null, result); // Return the result if everything went well
                    });
                });
            });
        });
    },


   UpdateHedisMeasureItem: (params, callback) => {
            let query = `UPDATE 
                            hedis_report_builder_measure 
                        SET 
                            minimum_denominator_active = ?, 
                            minimum_denominator_value = ?,
                            dual_improvement_active = ?,
                            patient_incentive_active = ?,
                            patient_incentive_value = ?,
                            incentive_type_id = ?,
                            measure_categories_id = ?, 
                            specific_improvement_active = ?,                            
                            specific_improvement_value = ?,
                            cutpoint_score_active = ?,
                            cutpoint_score_value = ?,
                            OQS_active = ?,
                            OQS_weight = ?,    
                            measure_attr_id = ?, 
                            cutpoint_active = ?,
                            tier_1_active = ?,                           
                            cutpoint_1_active = ?,
                            cutpoint_1_value = ?,
                            tier_2_active = ?,                           
                            cutpoint_2_active = ?,
                            cutpoint_2_value = ?,
                            tier_3_active = ?,                           
                            cutpoint_3_active = ?,
                            cutpoint_3_value = ?,
                            tier_4_active = ?,                           
                            cutpoint_4_active = ?,
                            cutpoint_4_value = ?,
                            tier_5_active = ?,                           
                            cutpoint_5_active = ?,
                            cutpoint_5_value = ?,
                            pay_score_active = ?,
                            pay_score_1_active = ?,
                            pay_score_1_value = ?,
                            pay_score_2_active = ?,
                            pay_score_2_value = ?,
                            pay_score_3_active = ?,
                            pay_score_3_value = ?,
                            pay_score_4_active = ?,
                            pay_score_4_value = ?,
                            pay_score_5_active = ?,
                            pay_score_5_value = ?                          
                        WHERE id= ? `;

            connection.query(query, [
                        params.minimum_denominator_active, 
                        params.minimum_denominator_value, 
                        params.dual_improvement_active,
                        params.patient_incentive_active,
                        params.patient_incentive_value,                        
                        params.incentive_type_id,
                        params.measure_categories_id,
                        params.specific_improvement_active,
                        params.specific_improvement_value,
                        params.cutpoint_score_active,
                        params.cutpoint_score_value,
                        params.OQS_active,
                        params.OQS_weight,
                        params.measure_attr_id,
                        params.cutpoint_active,
                        params.tier_1_active,
                        params.cutpoint_1_active,
                        params.cutpoint_1_value,
                        params.tier_2_active,
                        params.cutpoint_2_active,
                        params.cutpoint_2_value,
                        params.tier_3_active,
                        params.cutpoint_3_active,
                        params.cutpoint_3_value,
                        params.tier_4_active,
                        params.cutpoint_4_active,
                        params.cutpoint_4_value,
                        params.tier_5_active,
                        params.cutpoint_5_active,
                        params.cutpoint_5_value,                        
                        params.pay_score_active,
                        params.pay_score_1_active,
                        params.pay_score_1_value,
                        params.pay_score_2_active,
                        params.pay_score_2_value,
                        params.pay_score_3_active,
                        params.pay_score_3_value,
                        params.pay_score_4_active,
                        params.pay_score_4_value,
                        params.pay_score_5_active,
                        params.pay_score_5_value,
                        params.id                        
                    ], 
                        (err, result) => {
                callback(err, result);
            });
    },

    GetIncentiveType: (callback) => {
        let query = "SELECT id, display as name FROM measure_specific_incentive_type";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    GetMeasureCategories: (callback) => {
        let query = "SELECT id, Health_Care_Domain as name FROM hcd_table";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    GetMeasureAttr: (callback) => {
        let query = "SELECT id, display as name FROM measure_attribution";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    CheckMeasureForSelect: (params, callback) => {
        let query = "SELECT count(hedis_report_builder_measure.id) as count FROM hedis_report_builder_measure WHERE measure_id = ? AND hedis_report_builder_report_id = ?";
        connection.query(query, [params.measure_id, params.report_id], (err, result) => {
            callback(err, result);
        });
    },

    CheckMeasureCutpoint: (params, callback) => {
        let query = `SELECT count(measure_program_cutpoint.id) as count, 
                        measure_program_cutpoint.* 
                     FROM measure_program_cutpoint WHERE measure_id = ? AND report_id = ?`;
        connection.query(query, [params.measure_id, params.report_id], (err, result) => {
            callback(err, result);
        });
    },

    GetReportMeasure: (params, callback) => {
        let query = `SELECT hedis_report_builder_measure.*, measure_attribution.display as attribution, hcd_table.Health_Care_Domain, measure_specific_incentive_type.display as incentive_type, measure_hedis.title as measure FROM hedis_report_builder_measure 
                     JOIN measure_hedis ON hedis_report_builder_measure.measure_id = measure_hedis.id 
                     LEFT JOIN measure_attribution ON hedis_report_builder_measure.measure_attr_id = measure_attribution.id 
                     LEFT JOIN hcd_table ON hedis_report_builder_measure.measure_categories_id = hcd_table.id
                     LEFT JOIN measure_specific_incentive_type ON hedis_report_builder_measure.incentive_type_id = measure_specific_incentive_type.id
                     WHERE hedis_report_builder_report_id = ?`;
        connection.query(query, [params.report_id], (err, result) => {
            callback(err, result);
        });
    },

    GetInsuranceNameForReport: (params, callback) => {
        let query =`SELECT insurances.insName as ins_name FROM quality_program
                    JOIN insurances ON quality_program.ins_id = insurances.id 
                    WHERE quality_program.id = ?`;
        connection.query(query, [params.report_id], (err, result) => {
            callback(err, result);
        });
    },
    
    
    
    /* Measure Definition / Measure Attribution */ 
    GetMeasureAttrList: (callback) => {
        let query = "SELECT * FROM measure_attribution ORDER BY id DESC";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    NewMeasureAttrItem: (params, callback) => {
        let query = "INSERT INTO measure_attribution (display, description) VALUES (?, ?)";
        connection.query(query, [params.display, params.description], (err, result) => {
            callback(err, result);
        }); 
    },

    DeleteMeasureAttrItem: (params, callback) => {
        let query = "DELETE FROM measure_attribution WHERE id= ? ";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        }); 
    },

    UpdateMeasureAttrItem: (params, callback) => {
        let query = `UPDATE 
                        measure_attribution
                     SET 
                        display= ?, 
                        description = ?
                     WHERE id= ?`;

        connection.query(query, [params.display, params.description, params.id], (err, result) => {
            callback(err, result);
        });           
    },

    GetHedisQualityTrackerList: (callback) => {
        let query = `SELECT hedis_quality_tracker.*, measure_hedis.title as measure_name FROM hedis_quality_tracker
                    JOIN measure_hedis ON hedis_quality_tracker.mid = measure_hedis.id 
                    ORDER BY id DESC`;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    
    // qualityPrograms: (callback) => {
    //     let query = `SELECT quality_program.*, insurances.insName as ins_name FROM quality_program
    //                 JOIN insurances ON quality_program.ins_id = insurances.id 
    //                 ORDER BY id DESC`;
    //     connection.query(query, (err, result) => {
    //         callback(err, result);
    //     });
    // },   

    qualityPrograms: (callback) => {

        let query = `SELECT insurances.insName as ins_name, hedis_quality_program.name, hedis_report_builder_report.* FROM hedis_report_builder_report							
		                JOIN hedis_quality_program ON hedis_quality_program.id = hedis_report_builder_report.quality_program_id
		                JOIN insurances ON hedis_quality_program.ins_id = insurances.id 
		            ORDER BY id DESC`;
                
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    }, 

    qualityProgramMeasures: (params, callback) => {
        let query = `SELECT 
                        measure_hedis.title as measures, hedis_quality_tracker.*
                     FROM hedis_quality_tracker 
                        JOIN measure_hedis ON hedis_quality_tracker.mid = measure_hedis.id
                     WHERE quality_program_id= ? AND clinic_id = ?
                     ORDER BY id DESC`;

        connection.query(query, [params.quality_program_id, params.clinic_id], (err, result) => {
            callback(err, result);
        });           
    },
    
    qualityProgramTracker: (params, callback) => {
        let query = `UPDATE 
                        hedis_quality_tracker
                     SET 
                        rate= ?, 
                        score = ?,
                        trend = ?,
                        num = ?,
                        den = ?,
                        missing = ?,
                        ins_avg = ?,
                        tier_1 = ?,
                        tier_2 = ?,
                        tier_3 = ?,
                        Q1_target = ?,
                        Q2_target = ?,
                        status = ?
                     WHERE id= ?`;
        connection.query(query, [
            params.rate, 
            params.score, 
            params.trend, 
            params.num, 
            params.den, 
            params.missing,
            params.hf_avg, 
            params.tier_1, 
            params.tier_2, 
            params.tier_3, 
            params.Q1_target, 
            params.Q2_target, 
            params.status,
            params.id], 
            (err, result) => {
            callback(err, result);
        });           
    },

    clinicName: (params, callback) => {
        let query = `SELECT name FROM clinics WHERE id = ?`;
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        })
    },

    // insertTracker: (params, callback) => {
    //     let query = `SELECT 
    //                     hedis_reportbuilder_measure.measure_id
    //                  FROM hedis_reportbuilder_measure 
    //                  WHERE hedis_reportbuilder_measure.hedis_reportbuilder_report_id= ?`;

    //     connection.query(query, [params.hedis_reportBuilder_report_id], (err, res) => {
            
    //         for (let i = 0; i < res.length; i++) {

    //             const checkQuery = `SELECT * FROM hedis_quality_tracker WHERE quality_program_id = ? AND mid = ? AND clinic_id = ?`;
    //             connection.query(checkQuery, [params.hedis_reportBuilder_report_id, res[i].measure_id, params.clinic_id], (err, resCheck) => {
    //                 if (resCheck.length == 0) {
    //                     const insertQuery = 'INSERT INTO hedis_quality_tracker (quality_program_id, mid, clinic_id) VALUES (?, ?, ?)';
    //                     connection.query(insertQuery, [params.hedis_reportBuilder_report_id, result[i].measure_id, params.clinic_id], (err, resInsert) => {
    //                        callback(err, resInsert);                      
    //                     });
    //                 } else {                        
    //                     callback(err, resCheck);
    //                 }                
    //             });
    //         }      
    //         callback(err, res);   
    //     });     
        
    // },

    insertTracker: (params, callback) => {
        let query = `SELECT 
                        hedis_report_builder_measure.measure_id
                     FROM hedis_report_builder_measure 
                     WHERE hedis_report_builder_measure.hedis_report_builder_report_id = ?`;
    
        connection.query(query, [params.hedis_reportBuilder_report_id], (err, res) => {
            if (err) {
                return callback(err); 
            }
    
            // Check if there are no measures found
            if (res.length === 0) {
                return callback(null, { message: 'No measures found.' }); // Nothing to insert
            }
    
            let insertPromises = []; // Array to hold promises for insertions
    
            for (let i = 0; i < res.length; i++) {
                const measureId = res[i].measure_id;
                const checkQuery = `SELECT * FROM hedis_quality_tracker WHERE quality_program_id = ? AND mid = ? AND clinic_id = ?`;
    
                // Push the promise to the array
                insertPromises.push(new Promise((resolve, reject) => {
                    connection.query(checkQuery, [params.hedis_reportBuilder_report_id, measureId, params.clinic_id], (err, resCheck) => {
                        if (err) {
                            return reject(err); // Handle query error
                        }
    
                        // If no existing record, insert new one
                        if (resCheck.length === 0) {
                            const insertQuery = 'INSERT INTO hedis_quality_tracker (quality_program_id, mid, clinic_id) VALUES (?, ?, ?)';
                            connection.query(insertQuery, [params.hedis_reportBuilder_report_id, measureId, params.clinic_id], (err, resInsert) => {
                                if (err) {
                                    return reject(err); // Handle insert error
                                }
                                resolve(resInsert); // Resolve the promise
                            });
                        } else {
                            resolve(resCheck); // If exists, resolve with existing record
                        }
                    });
                }));
            }
    
            // Wait for all insertions to complete
            Promise.all(insertPromises)
                .then(results => {
                    callback(null, results); // Call callback with results
                })
                .catch(err => {
                    callback(err); // Handle any error in the promises
                });
        });
    },

    getCutpoints: (params, callback) => {
        let query = `SELECT 
                hedis_report_builder_measure.*
                    FROM hedis_report_builder_measure WHERE measure_id = ? AND hedis_report_builder_report_id = ?`;
        connection.query(query, [params.measure_id, params.quality_program_id], (err, result) => {
            callback(err, result);
        })
    },

    /**Specific Measure Cutpoint */    
   
    GetSpecificMeasureCutpoint: (callback) => {
        let query = `
            SELECT 
                specific_measure_cutpoint.id, 
                measure_hedis.measureId as quality_id, 
                measure_hedis.title as measure, 
                hedis_quality_program.name as report, 
                clinics.name as clinic,

                c1.display as cutpoint_1, 
                specific_measure_cutpoint.cutpoint_1_range,

                c2.display as cutpoint_2, 
                specific_measure_cutpoint.cutpoint_2_range,

                c3.display as cutpoint_3, 
                specific_measure_cutpoint.cutpoint_3_range,

                c4.display as cutpoint_4, 
                specific_measure_cutpoint.cutpoint_4_range,

                c5.display as cutpoint_5, 
                specific_measure_cutpoint.cutpoint_5_range,
                
                specific_measure_cutpoint.payment_1_score,
                specific_measure_cutpoint.payment_2_score,
                specific_measure_cutpoint.payment_3_score,
                specific_measure_cutpoint.payment_4_score,
                specific_measure_cutpoint.payment_5_score,

                specific_measure_cutpoint.active as active, 
                specific_measure_cutpoint.date

                FROM specific_measure_cutpoint 

                JOIN measure_hedis ON specific_measure_cutpoint.measure_id = measure_hedis.id 
                JOIN hedis_quality_program ON specific_measure_cutpoint.report_id = hedis_quality_program.id 
                JOIN clinics ON specific_measure_cutpoint.clinic_id = clinics.id 
                JOIN cutpoint_measure as c1 ON specific_measure_cutpoint.cutpoint_1_id = c1.id 
                JOIN cutpoint_measure as c2 ON specific_measure_cutpoint.cutpoint_2_id = c2.id 
                JOIN cutpoint_measure as c3 ON specific_measure_cutpoint.cutpoint_3_id = c3.id 
                JOIN cutpoint_measure as c4 ON specific_measure_cutpoint.cutpoint_4_id = c4.id 
                JOIN cutpoint_measure as c5 ON specific_measure_cutpoint.cutpoint_5_id = c5.id 
                Order By id DESC
        `;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    
    InsertSpecificMeasureCutpoint: (params, callback) => {
        let query = `INSERT INTO 
            specific_measure_cutpoint ( 
                measure_id,
                insurance_id, 
                report_id,                 
                clinic_id,
                cutpoint_1_id, 
                cutpoint_1_range,
                cutpoint_2_id, 
                cutpoint_2_range,
                cutpoint_3_id, 
                cutpoint_3_range,
                cutpoint_4_id, 
                cutpoint_4_range,
                cutpoint_5_id, 
                cutpoint_5_range,                
                payment_1_score,
                payment_2_score,
                payment_3_score,
                payment_4_score,
                payment_5_score,
                active, 
                date)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query, [
                params.measure, 
                params.insurance,
                params.report, 
                params.clinic,
                params.cutpoint1, 
                params.cutpoint1_range, 
                params.cutpoint2, 
                params.cutpoint2_range,                 
                params.cutpoint3, 
                params.cutpoint3_range,                 
                params.cutpoint4, 
                params.cutpoint4_range,                 
                params.cutpoint5, 
                params.cutpoint5_range, 
                params.payment1,
                params.payment2,
                params.payment3,
                params.payment4,
                params.payment5,
                params.active, 
                params.date
            ], 
            (err, result) => {
            callback(err, result);
        });
    },
    
    DelSpecificMeasureCutpoint: (params, callback) => {
        let query = "DELETE FROM specific_measure_cutpoint WHERE id= ? ";
        connection.query(query, [params.id], (err, result) => {
            callback(err, result);
        }); 
    },

    UpdateSpecificMeasureCutpoint: (params, callback) => {
        let query = `UPDATE 
                        specific_measure_cutpoint 
                    SET                         
                        report_id = ?, 
                        clinic_id = ?,
                        insurance_id = ?,
                        cutpoint_1_id = ?, 
                        cutpoint_1_range = ?, 
                        cutpoint_2_id = ?, 
                        cutpoint_2_range = ?, 
                        cutpoint_3_id = ?, 
                        cutpoint_3_range = ?, 
                        cutpoint_4_id = ?, 
                        cutpoint_4_range = ?, 
                        cutpoint_5_id = ?, 
                        cutpoint_5_range = ?, 
                        payment_1_score = ?,
                        payment_2_score = ?,
                        payment_3_score = ?,
                        payment_4_score = ?,
                        payment_5_score = ?,
                        active = ?, 
                        date = ? 
                    WHERE id= ? `;

        connection.query(query, [                
                    params.report, 
                    params.clinic,
                    params.insurance,
                    params.cutpoint1, 
                    params.range1, 
                    params.cutpoint2, 
                    params.range2, 
                    params.cutpoint3, 
                    params.range3, 
                    params.cutpoint4, 
                    params.range4, 
                    params.cutpoint5, 
                    params.range5, 
                    params.payment1,
                    params.payment2,
                    params.payment3,
                    params.payment4,
                    params.payment5,
                    params.active, 
                    params.date, 
                    params.id
                ], 
                    (err, result) => {
            callback(err, result);
        });
    },

    

    setDefaultIns: (params, callback) => {
        let query = "SELECT userid FROM `report_default_ins` WHERE `userid` = ? ";
        connection.query(query, [params.userid], (err, result) => {
            if (err) {
                return callback(err, null);
            }
    
            if (result.length == 0) {
                let insertQuery = "INSERT INTO `report_default_ins` (`insid`, `userid`) VALUES (?, ?) ";
                connection.query(insertQuery, [params.insid, params.userid], (err, result) => {
                    return callback(err, result);
                });
            } else {
                let updateQuery = "UPDATE `report_default_ins` SET `insid` = ? WHERE `userid`= ?";
                connection.query(updateQuery, [params.insid, params.userid], (err, result) => {
                    return callback(err, result);
                });
            }
        });
    },

    getDefaultIns: (params, callback) => {
        let query = "SELECT insid FROM `report_default_ins` WHERE `userid` = ?";
        connection.query(query, [params.userid], (err, result) => {
            callback(err, result);
        });
    },
}
module.exports = reportBuilderModel;
