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
        let query = "SELECT * FROM `inslob` WHERE insid = ? ORDER BY lob";
        connection.query(query,[entry.id], (err, result) => {
            callback(err, result);
        });
    },
    addlob: (account, callback) => {
        let query = "INSERT INTO `inslob` (`insid`, `lob`, `description`,`variation`,`type`) VALUES (? , ? , ? , ?,  ?)";
        connection.query(query, [account.insid, account.name, account.desc, account.variation, account.type], (err, result) => {
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
        let query = "UPDATE `inslob` SET `lob`= ?, `description` = ?, `variation` = ?,  `type` = ? WHERE `id`= ? ";
        connection.query(query, [entry.name, entry.desc, entry.variation, entry.type, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    deletelob: (entry, callback) => {
        let query = "DELETE FROM `inslob` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
}
module.exports = accounts;