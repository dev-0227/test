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
        // let query = "SELECT ins_lob_id FROM `quality_program` WHERE `ins_id` = ? ORDER BY id ASC";
        // connection.query(query, [params.ins_id], (err, result) => {
        //     if (err) {
        //         callback(err, null);
        //         return;
        //     }            
        //     let lobs = [];
        //     // Initialize an array to store parsed JSON arrays
        //     let insLobIdArrays = [];            
        //     // Iterate over each row fetched from the database
        //     result.forEach(row => {
        //         let insLobIds = JSON.parse(row.ins_lob_id);
                
        //         insLobIds.forEach(insId => {
        //             let query = "SELECT lob FROM `inslob` WHERE `id` = ?";
        //             connection.query(query, [insId], (err, res) => {                        
                        
        //                 console.log(res);
                        
        //             })
        //         });
        //         // Add the parsed array to the result array
                
        //     });
        // });        
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
    },
    
}
module.exports = reportBuilderModel;