const connection = require('../utilities/database');
const accounts = {
    list: (callback) => {
        let query = "SELECT id,insId,insName,insaddress,insaddress2,abbrName,hedis_active,Inactive FROM `insurances` WHERE 1 ORDER BY insName";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    getHedisList: (callback) => {
        let query = "SELECT id, insName, abbrName FROM `insurances` WHERE `hedis_active`=1 ORDER BY insName";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    add: (account, callback) => {
        let query = "INSERT INTO `insurances` (`id`, `insName`, `abbrName`, `insemail`, `insphone`,`insfax`,`insaddress`,`insaddress2`,`inscity`,`insstate`,`inszip`,`hedis_active`,`Inactive`) VALUES (NULL, ? , ? , ? , ? , ?,  ? , ?, ?,  ? , ?, ?, ? )";
        connection.query(query, [account.name, account.abbr, account.email, account.phone, account.fax, account.address1, account.address2, account.city, account.state, account.zip, account.hedis, account.status], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `insurances` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (entry, callback) => {
        let query = "UPDATE `insurances` SET `insName`= ?, `abbrName`= ?, `insemail` = ?, `insphone` = ?,  `insfax` = ?,  `insaddress` = ?, `insaddress2` = ?, `inscity` = ?, `insstate` = ?, `inszip` = ?, `hedis_active` = ?, `Inactive` = ? WHERE `id`= ? ";
        connection.query(query, [entry.name, entry.abbr, entry.email, entry.phone, entry.fax, entry.address1, entry.address2, entry.city, entry.state, entry.zip, entry.hedis, entry.status, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `insurances` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    /*
    * Insurance Lob Modal
    */
    lobList: (entry, callback) => {
        let query = `SELECT * FROM inslob WHERE insid = ? ORDER BY lob`
        connection.query(query, [entry.insid], (err1, result1) => {
            if (!err1) {
                query = `SELECT COUNT(*) AS total FROM inslob WHERE insid = ?`
                connection.query(query, [entry.insid], (err2, result2) => {
                    var total = 0
                    if (!err2) {
                        if (result2.length > 0) total = result2[0].total
                    }
                    callback(err2, {data: result1, recordsFiltered: total, recordsTotal: total})
                })
            } else callback(err1, {data: [entry.insid], recordsFiltered: 0, recordsTotal: 0})
        })
    },
    getlob: (entry,callback) => {
        let query = "SELECT inslob.*, ins_type.display as type  FROM `inslob` LEFT JOIN `ins_type` on `inslob`.`type_id` = `ins_type`.`id` WHERE insid = ? ORDER BY lob";
        connection.query(query,[entry.id], (err, result) => {
            callback(err, result);
        });
    },
    addlob: (account, callback) => {
        let query = "INSERT INTO `inslob` (`id`, `insid`, `lob`, `description`,`variation`,`type_id`, `ins_emrid`, `ins_fhirid`) VALUES (NULL, ? , ? , ? , ?, ?, ? ,?)";
        connection.query(query, [account.insid, account.name, account.desc, account.variation, account.type, account.emrid, account.fhirid], (err, result) => {
            callback(err, result);
        });
    },
    chosenlob: (entry, callback) => {
        let query = "SELECT * FROM `inslob` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updatelob: (entry, callback) => {
        let query = "UPDATE `inslob` SET `lob`= ?, `description` = ?, `variation` = ?,  `type_id` = ?, `ins_emrid` = ?, `ins_fhirid` = ? WHERE `id`= ? ";
        connection.query(query, [entry.name, entry.desc, entry.variation, entry.type, entry.emrid, entry.fhirid, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    deletelob: (entry, callback) => {
        let query = "DELETE FROM `inslob` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    setDefaultIns: (params, callback) => {
        let query = "SELECT user_id FROM `ins_set_default` WHERE `user_id` = ? ";
        connection.query(query, [params.user_id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
    
            if (result.length == 0) {
                let insertQuery = "INSERT INTO `ins_set_default` (`ins_id`, `user_id`) VALUES (?, ?) ";
                connection.query(insertQuery, [params.ins_id, params.user_id], (err, result) => {
                    return callback(err, result);
                });
            } else {
                let updateQuery = "UPDATE `ins_set_default` SET `ins_id` = ? WHERE `user_id`= ?";
                connection.query(updateQuery, [params.ins_id, params.user_id], (err, result) => {
                    return callback(err, result);
                });
            }
        });
    },
    getDefaultIns: (params, callback) => {
        let query = "SELECT ins_id FROM `ins_set_default` WHERE `user_id` = ?";
        connection.query(query, [params.user_id], (err, result) => {
            callback(err, result);
        });
    },
    gettypeItem: (callback) => {
        let query = "SELECT * FROM `ins_type` ORDER BY id asc";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    /*
    * Insurance Type Modal
    */
    gettype: (entry, callback) => {
        let query = `SELECT * FROM ins_type `
        if (entry.filter && entry.filter.lehgth > 0) query += `WHERE display LIKE '%${entry.filter}%' OR description LIKE '%${entry.filter}%'`
        query += ` ORDER BY display`
        connection.query(query, (err, result) => {
            if (!err) {
                query = `SELECT COUNT(*) AS total FROM ins_type`
                if (entry.filter && entry.filter.lehgth > 0) query += ` WHERE display LIKE '%${entry.filter}%' OR description LIKE '%${entry.filter}%'`
                connection.query(query, (err1, result1) => {
                    if (!err1) {
                        var total = 0
                        if (result1.length) {
                            total = result1[0].total
                        }
                    }
                    callback(err1, {data: result, recordsFiltered: total, recordsTotal: total})
                })
            } else callback(err, {data: [], recordsFiltered: 0, recordsTotal: 0})
        });
    },
    addtype: (type, callback) => {
        let query = "INSERT INTO `ins_type` (`display`, `description`) VALUES (?,  ?)";
        connection.query(query, [type.display, type.description], (err, result) => {
            callback(err, result);
        });
    },
    deletetype: (entry, callback) => {
        let query = "DELETE FROM `ins_type` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    chosentype: (entry, callback) => {
        let query = "SELECT * FROM `ins_type` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updatetype: (entry, callback) => {
        let query = "UPDATE `ins_type` SET `display`= ?, `description` = ? WHERE `id`= ? ";
        connection.query(query, [entry.display, entry.description, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    /*
    * Payment Method Modal
    */
    getPaymentMethod: (callback) => {
        let query = "SELECT * FROM `ins_lob_payform` ORDER BY id";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    addPaymentMethod: (type, callback) => {
        let query = "INSERT INTO `ins_lob_payform` (`display`, `description`) VALUES (?,  ?)";
        connection.query(query, [type.display, type.description], (err, result) => {
            callback(err, result);
        });
    },
    delPaymentMethod: (entry, callback) => {
        let query = "DELETE FROM `ins_lob_payform` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getPaymentMethodById: (entry, callback) => {
        let query = "SELECT * FROM `ins_lob_payform` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updatePaymentMethod: (entry, callback) => {
        let query = "UPDATE `ins_lob_payform` SET `display`= ?, `description` = ? WHERE `id`= ? ";
        connection.query(query, [entry.display, entry.description, entry.id], (err, result) => {
            callback(err, result);
        });
    },
}
module.exports = accounts;
