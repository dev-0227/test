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
    addQualityProgram: (params, callback) => {
        let query = "INSERT INTO `quality_program` (`ins_id`, `ins_lob_id`, `name`, `display`, `definition`, `description`, `program_date`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [params.ins_id, params.ins_lob_id, params.name, params.display, params.definition, params.description, params.program_date], (err, result) => {
            callback(err, result);
        });
    },

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
