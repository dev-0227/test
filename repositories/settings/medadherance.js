const connection = require('../../utilities/database');

const medadheranceModel = {
    // Medications Status Model
    getMedStatus: (callback) => {
        let query = "SELECT * FROM `f_vs_med_status`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getMedStatusById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_med_status` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addMedStatus: (entry, callback) => {
        let query = "INSERT INTO `f_vs_med_status` (`code`, `system`,`display`,`definition`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition], (err, result) => {
            callback(err, result);
        });
    },

    updateMedStatusById: (entry, callback) => {
        let query = "UPDATE `f_vs_med_status` SET `code`= ?, `system`= ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedStatus: (entry, callback) => {
        let query = "DELETE FROM `f_vs_med_status` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // Medications Form Model
    getMedForm: (callback) => {
        let query = "SELECT * FROM `f_vs_med_form`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getMedFormById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_med_form` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    addMedForm: (entry, callback) => {
        let query = "INSERT INTO `f_vs_med_form` (`code`, `system`, `display`) VALUES (?, ?, ?)";
        connection.query(query, [entry.code, entry.system, entry.display], (err, result) => {
            callback(err, result);
        });
    },

    updateMedFormById: (entry, callback) => {
        let query = "UPDATE `f_vs_med_form` SET `code`= ?, `system`= ?, `display` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedForm: (entry, callback) => {
        let query = "DELETE FROM `f_vs_med_form` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // Medications Codes Model
    getMedCodes: (callback) => {
        let query = "SELECT * FROM `f_vs_med_codes`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getMedCodesById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_med_codes` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },    

    addMedCodes: (entry, callback) => {
        let query = "INSERT INTO `f_vs_med_codes` (`code`, `system`, `display`) VALUES (?, ?, ?)";
        connection.query(query, [entry.code, entry.system, entry.display], (err, result) => {
            callback(err, result);
        });
    },

    updateMedCodesById: (entry, callback) => {
        let query = "UPDATE `f_vs_med_codes` SET `code`= ?, `system`= ?, `display` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.id], (err, result) => {
            callback(err, result);
        });
    },    

    delMedCodes: (entry, callback) => {
        let query = "DELETE FROM `f_vs_med_codes` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    

    // Medications Dispense Status Model
    getMedDispStatus: (callback) => {
        let query = "SELECT * FROM `f_vs_med_dis_status`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getMedDispStatusById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_med_dis_status` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addMedDispStatus: (entry, callback) => {
        let query = "INSERT INTO `f_vs_med_dis_status` (`code`, `system`,`display`,`definition`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition], (err, result) => {
            callback(err, result);
        });
    },

    updateMedDispStatusById: (entry, callback) => {
        let query = "UPDATE `f_vs_med_dis_status` SET `code`= ?, `system`= ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedDispStatus: (entry, callback) => {
        let query = "DELETE FROM `f_vs_med_dis_status` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // Medications Dispense Performer Model
    getMedDispPerformer: (callback) => {
        let query = "SELECT * FROM `f_vs_med_dis_per_funct`";
        connection.query(query, (err, result) => {
            callback(err, result);
        })
    },

    getMedDispPerformerById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_med_dis_per_funct` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addMedDispPerformer: (entry, callback) => {
        let query = "INSERT INTO `f_vs_med_dis_per_funct` (`code`, `system`,`display`,`definition`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition], (err, result) => {
            callback(err, result);
        });
    },

    updateMedDispPerformerById: (entry, callback) => {
        let query = "UPDATE `f_vs_med_dis_per_funct` SET `code`= ?, `system`= ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedDispPerformer: (entry, callback) => {
        let query = "DELETE FROM `f_vs_med_dis_per_funct` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // Medications Request Status Model
    getMedReqStatus: (callback) => {
        let query = "SELECT * FROM `f_vs_medreq_status`";
        connection.query(query, (err, result) => {
            callback(err, result);
        })
    },

    getMedReqStatusById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_medreq_status` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addMedReqStatus: (entry, callback) => {
        let query = "INSERT INTO `f_vs_medreq_status` (`code`, `system`,`display`,`definition`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition], (err, result) => {
            callback(err, result);
        });
    },

    updateMedReqStatusById: (entry, callback) => {
        let query = "UPDATE `f_vs_medreq_status` SET `code`= ?, `system`= ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedReqStatus: (entry, callback) => {
        let query = "DELETE FROM `f_vs_medreq_status` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // Medications Request Priority Model
    getMedReqPriority: (callback) => {
        let query = "SELECT * FROM `f_vs_medreq_priority`";
        connection.query(query, (err, result) => {
            callback(err, result);
        })
    },

    getMedReqPriorityById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_medreq_priority` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addMedReqPriority: (entry, callback) => {
        let query = "INSERT INTO `f_vs_medreq_priority` (`code`, `system`,`display`,`definition`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition], (err, result) => {
            callback(err, result);
        });
    },

    updateMedReqPriorityById: (entry, callback) => {
        let query = "UPDATE `f_vs_medreq_priority` SET `code`= ?, `system`= ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedReqPriority: (entry, callback) => {
        let query = "DELETE FROM `f_vs_medreq_priority` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

     // Medications Request Intent Model
    getMedReqIntent: (callback) => {
        let query = "SELECT * FROM `f_vs_medreq_intent`";
        connection.query(query, (err, result) => {
            callback(err, result);
        })
    },

    getMedReqIntentById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_medreq_intent` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addMedReqIntent: (entry, callback) => {
        let query = "INSERT INTO `f_vs_medreq_intent` (`code`, `system`,`display`,`definition`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition], (err, result) => {
            callback(err, result);
        });
    },

    updateMedReqIntentById: (entry, callback) => {
        let query = "UPDATE `f_vs_medreq_intent` SET `code`= ?, `system`= ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedReqIntent: (entry, callback) => {
        let query = "DELETE FROM `f_vs_medreq_intent` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // Medications Request Course Therapy Model
    getMedReqCourse: (callback) => {
        let query = "SELECT * FROM `f_vs_medreq_course_therapy`";
        connection.query(query, (err, result) => {
            callback(err, result);
        })
    },

    getMedReqCourseById: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_medreq_course_therapy` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addMedReqCourse: (entry, callback) => {
        let query = "INSERT INTO `f_vs_medreq_course_therapy` (`code`, `system`,`display`,`definition`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition], (err, result) => {
            callback(err, result);
        });
    },

    updateMedReqCourseById: (entry, callback) => {
        let query = "UPDATE `f_vs_medreq_course_therapy` SET `code`= ?, `system`= ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delMedReqCourse: (entry, callback) => {
        let query = "DELETE FROM `f_vs_medreq_course_therapy` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
}

module.exports = medadheranceModel;