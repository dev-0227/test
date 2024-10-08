
const connection = require('../../utilities/database');
var md5 = require('md5');
const accounts = {
    list: (callback) => {
        let query = "SELECT * FROM `clinics` WHERE 1";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    listForSearch: (entry, callback) => {
        var where = "";
        let query = "SELECT clinics.* FROM `clinics` ";
        if(entry.search.value!="") {
            where += "WHERE clinics.name LIKE '%"+entry.search.value+"%' ";
            where += "OR clinics.address1 LIKE '%"+entry.search.value+"%' ";
            where += "OR clinics.state LIKE '%"+entry.search.value+"%' ";
            where += "OR clinics.city LIKE '%"+entry.search.value+"%' ";
            where += "OR clinics.zip LIKE '%"+entry.search.value+"%' ";
            where += "OR clinics.phone LIKE '%"+entry.search.value+"%' ";
            where += "OR clinics.web LIKE '%"+entry.search.value+"%' ";
            query += where;
        }
        query += "ORDER BY clinics.name ";
        query += "LIMIT "+entry.start+","+entry.length;
        connection.query(query, (err, result) => {
            query = "SELECT count(*) as total FROM `clinics` " + where
            connection.query(query, (err1, result1) => {
                if(err1)callback(err, result);
                else {
                    var total = 0;
                    if(result1.length > 0) total = result1[0]['total']
                    callback(err, { data: result, recordsFiltered: total, recordsTotal: total });
                }
            });
        });
    },
    getByStatus: (callback) => {
        let query = "SELECT * FROM `clinics` WHERE `status` = '1' ORDER BY `name`"
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    add: (account, callback) => {
        let query = "INSERT INTO `clinics` (`id`, `name`, `acronym`, `address1`,`address2`,`city`,`state`,`zip`,`country`,`phone`,`cel`,`email`,`web`,`portal`,`placeservice`,`status`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
        connection.query(query, [account.name, account.acronym, account.address1, account.address2, account.city, account.state, account.zip, account.country, account.tel, account.fax, account.email, account.web, account.portal, account.pos, account.status], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `clinics` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (account, callback) => {
        let query = "UPDATE `clinics` SET `name`= ?, `acronym` = ?, `address1` = ?,  `address2` = ?,  `city` = ?, `state` = ?, `zip` = ?, `country` = ?, `phone` = ?, `cel` = ?, `email` = ?, `web` = ?, `portal` = ?, `placeservice` = ?, `status` = ?, `contact_name` = ?, `contact_email` = ?, `contact_tel` = ?, `contact_cel` = ?, `contact_web` = ?, `ex` = ? ";
        if(account.logo && account.logo !== undefined)query += ", `logo`= '"+account.logo+"'";
        query += "WHERE `id`= ? ";
        connection.query(query, [account.name, account.acronym, account.address1, account.address2, account.city, account.state, account.zip, account.country, account.tel, account.fax, account.email, account.web, account.portal, account.pos, account.status, account.cname, account.cemail, account.ctel, account.ccel, account.cweb, account.cex, account.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `clinics` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updateVCard: (entry, callback) => {
        let query = "UPDATE `clinics` SET `logo`=?, `fonts`=?, `layout`=?, `color`=?, `pattern`=? WHERE `id`= ? ";
        connection.query(query, [entry.logo, entry.fonts, entry.layout, entry.color, entry.pattern, entry.clinic_id], (err, result) => {
            callback(err, result);
        });
    },
    updatewebcheck: (entry, callback) => {
        let query = "UPDATE `clinics` SET `checkweb` = ? WHERE `id`= ? ";
        connection.query(query, [entry.value, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updateportalcheck: (entry, callback) => {
        let query = "UPDATE `clinics` SET `checkportal` = ? WHERE `id`= ? ";
        connection.query(query, [entry.value, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updatecontactcheck: (entry, callback) => {
        let query = "UPDATE `clinics` SET `checkcontact` = ? WHERE `id`= ? ";
        connection.query(query, [entry.value, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updateapcheck: (entry, callback) => {
        let query = "UPDATE `clinics` SET `apcheck` = ? WHERE `id`= ? ";
        connection.query(query, [entry.value, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getclinicmanagers: () => {
        query = "SELECT id,fname,lname,clinic FROM `managers` WHERE 1 ORDER BY fname";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                reject(err);
                } else {
                resolve(rows);
                }
            });
        });
    },
    addclinicmanagers: (entry) => {
        let query = "SELECT * FROM `clinicmanagers` WHERE clinicid = ?";
        connection.query(query, [entry.clinicid], (err, result) => {
            if(result.length == 0){
                let query = "INSERT INTO `clinicmanagers` (`id`, `clinicid`, `manager`, `status`) VALUES (NULL, ? , ? , ?)";
                return new Promise((resolve, reject) => {
                    connection.query(query, [entry.clinicid, entry.manager, 1], (err, rows) => {
                        if (err) {
                        reject(err);
                        } else {
                        resolve(rows);
                        }
                    });
                });
            }
            else{
                let query = "UPDATE `clinicmanagers` SET `manager` = ? WHERE `id`= ?";
                return new Promise((resolve, reject) => {
                    connection.query(query, [entry.manager,result[0]['id']], (err, rows) => {
                        if (err) {
                        reject(err);
                        } else {
                        resolve(rows);
                        }
                    });
                });
            }
        });
    },
    chosenclinicmanagers: (entry, callback) => {
        let query = "SELECT * FROM `clinicmanagers` WHERE `clinicid`= ? "
        connection.query(query, [entry.clinicid], (err, result) => {
            callback(err, result);
        });
    },
    getClinicsByUserType: (entry) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT `value` FROM `rolepermissions` WHERE `role_id` = ? AND perm_id = 3'
            connection.query(query, [entry.usertype], (err, result) => {
                if (!err) {
                    if (result) {
                        var value = result[0].value
                        if (value >= 100) {
                            if (entry.clinics != '') query = `SELECT id, name FROM clinics WHERE FIND_IN_SET(id, '${entry.clinics}') AND status = '1' `
                            else query = `SELECT id, name FROM clinics WHERE status = '1' `
                        }
                        else query = `SELECT id, name FROM clinics WHERE id = ${entry.clinicid} `
                        query += `ORDER BY name LIMIT ${entry.start},${entry.length}`
                        connection.query(query, (err1, result1) => {
                            if (!err) {
                                if (value >= 100) {
                                    if (entry.clinics != '') query = `SELECT COUNT(*) AS total FROM clinics WHERE FIND_IN_SET(id, '${entry.clinics}') AND status = '1'`
                                    else query = `SELECT COUNT(*) AS total FROM clinics WHERE status = '1'`
                                }
                                else query = `SELECT COUNT(*) AS total FROM clinics WHERE id = ${entry.clinicid}`
                                connection.query(query, (err2, result2) => {
                                    if (!err) {
                                        var total = 0
                                        if (result2) {
                                            total = result2[0].total
                                        }
                                        resolve({data: result1, total: total})
                                    }
                                })
                            } else reject(err1)
                        })
                    }
                }
            })
        })
    },

    //Hedis Quality Program
    addQualityProgram: (entry, callback) => {
        let query = `INSERT INTO hedis_quality_program (clinicid, insuranceid, qprogram, date, updateby) VALUES (?, ?, ?, ?, ?)`
        connection.query(query, [entry.clinicid, entry.insuranceid, entry.qprogram, new Date(Date.now()).toISOString().substr(0, 10), entry.updateby], (err, result) => {
            callback(err, result)
        })
    },
    updateQualityProgram: (entry, callback) => {
        let query = `UPDATE hedis_quality_program SET clinicid = ?, insuranceid = ?, qprogram = ?, date = ?, updateby = ? `
        if (entry.id) query += `WHERE id = ${entry.id}`
        else {
            query += `WHERE clinicid = ${entry.clinicid} `
            if (entry.insuranceid) query += `AND insuranceid = ${entry.insuranceid}`
        }
        connection.query(query, [entry.clinicid, entry.insuranceid, entry.qprogram, new Date(Date.now()).toISOString().substr(0, 10), entry.updateby], (err, result) => {
            callback(err, result)
        })
    },
    chosenQualityProgram: (entry, callback) => {
        let query = `SELECT * FROM hedis_quality_program WHERE clinicid = ${entry.clinicid} `
        if (entry.insuranceid) query += `AND insuranceid = ${entry.insuranceid}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    deleteQualityProgram: (entry, callback) => {
        let query = `DELETE FROM hedis_quality_program WHERE clinicid = ${entry.clinicid} `
        if (entry.insuranceid) query += `AND insuranceid = ${entry.insuranceid}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    getQualityList: (entry, callback) => {
        let query = `SELECT * FROM quality_program `
        if (entry.ins_id) query += `WHERE ins_id = ${entry.ins_id} `
        query += `LIMIT ${entry.start},${entry.length}`
        connection.query(query, (err, result) => {
            if (!err) {
                query = `SELECT COUNT(*) AS total FROM quality_program `
                if (entry.ins_id) query += `WHERE ins_id = ${entry.ins_id}`
                connection.query(query, (err1, result1) => {
                    if (!err1) {
                        var total = 0
                        if (result1[0]) total = result1[0].total
                        callback(err, { data: result, recordsFiltered: total, recordsTotal: total })
                    } else {
                        callback(err, {data: [], recordsFiltered: 0, recordsTotal: 0})
                    }
                })
            } else {
                callback(err, {data: [], recordsFiltered: 0, recordsTotal: 0})
            }
        })
    }
}
module.exports = accounts;
