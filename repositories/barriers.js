const connection = require('../utilities/database');

const barriersModel = {
    // PT Risk Level Model
    getPTRiskLevel: (callback) => {
        let query = "SELECT * FROM `pt_risk_level`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getPTRiskLevelById: (entry, callback) => {
        let query = "SELECT * FROM `pt_risk_level` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addPTRiskLevel: (entry, callback) => {
        let query = "INSERT INTO `pt_risk_level` (`pt_risk_level_id`, `code`, `display`) VALUES (?, ?, ? )";
        connection.query(query, [entry.id, entry.code, entry.display], (err, result) => {
            callback(err, result);
        });
    },

    updatePTRiskLevelById: (entry, callback) => {
        let query = "UPDATE `pt_risk_level` SET `pt_risk_level_id`=?, `code`= ?, `display` = ? WHERE `id`= ? ";
        connection.query(query, [entry.pt_risk_level_id, entry.code, entry.display, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delPTRiskLevel: (entry, callback) => {
        let query = "DELETE FROM `pt_risk_level` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // PT Communication Needs Model
    getPTCommNeeds: (callback) => {
        let query = "SELECT * FROM `pt_communication_needs`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getPTCommNeedsById: (entry, callback) => {
        let query = "SELECT * FROM `pt_communication_needs` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addPTCommNeeds: (entry, callback) => {
        let query = "INSERT INTO `pt_communication_needs` (`pt_comm_needs_id`,`code`, `display`) VALUES (?, ?, ? )";
        connection.query(query, [entry.id, entry.code, entry.display], (err, result) => {
            callback(err, result);
        });
    },

    updatePTCommNeedsById: (entry, callback) => {
        let query = "UPDATE `pt_communication_needs` SET `pt_comm_needs_id`=?, `code`= ?, `display` = ? WHERE `id`= ? ";
        connection.query(query, [entry.pt_comm_needs_id, entry.code, entry.display, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delPTCommNeeds: (entry, callback) => {
        let query = "DELETE FROM `pt_communication_needs` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // ICD10 Model
    getICD10: (callback) => {
        let query = "SELECT * FROM `icd10_disability`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getICD10ById: (entry, callback) => {
        let query = "SELECT * FROM `icd10_disability` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addICD10: (entry, callback) => {
        let query = "INSERT INTO `icd10_disability` (`id`, `icd10`, `description_short`, `description_long`) VALUES (?, ?, ?, ? )";
        connection.query(query, [entry.id, entry.icd10, entry.short, entry.long], (err, result) => {
            callback(err, result);
        });
    },

    updateICD10ById: (entry, callback) => {
        let query = "UPDATE `icd10_disability` SET `id`=?, `icd10`= ?, `description_short` = ?, `description_long` = ? WHERE `_id`= ? ";
        connection.query(query, [entry.id, entry.icd10, entry.short, entry.long, entry.id], (err, result) => {
            callback(err, result);
        });
    },

    delICD10: (entry, callback) => {
        let query = "DELETE FROM `icd10_disability` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    // Disability Category Model
    getDisabilityCategory: (callback) => {
        let query = "SELECT * FROM `disability_category`";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    getDisabilityCategoryById: (entry, callback) => {
        let query = "SELECT * FROM `disability_category` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    
    addDisabilityCategory: (entry, callback) => {
        let query = "INSERT INTO `disability_category` (`id`, `display`) VALUES (?, ?)";
        connection.query(query, [entry.id, entry.display], (err, result) => {
            callback(err, result);
        });
    },

    updateDisabilityCategoryById: (entry, callback) => {
        let query = "UPDATE `disability_category` SET `id`=?, `display`= ? WHERE `_id`= ? ";
        connection.query(query, [entry.id, entry.display, entry._id], (err, result) => {
            callback(err, result);
        });
    },

    delDisabilityCategory: (entry, callback) => {
        let query = "DELETE FROM `disability_category` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
}

module.exports = barriersModel;