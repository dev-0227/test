
const connection = require('../../utilities/database');

const vitals = {
    list: (callback) => {
        let query = "SELECT * FROM `f_vitals` WHERE 1 ORDER BY LOINC";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    add: (entry, callback) => {
        let query = "INSERT INTO `f_vitals` (`id`, `vname`, `vdescription`,`LOINC`,`LOINC_Name`, `UCUM_Units`,`SNOMED`,`ECL`) VALUES (NULL, ? , ? , ? , ?, ?, ?, ? )";
        connection.query(query, [entry.vname, entry.vdescription, entry.LOINC, entry.LOINC_Name, entry.UCUM_Units, entry.SNOMED,  entry.ECL], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `f_vitals` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    chosenForAsync: (entry) => {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM `f_vitals` WHERE `vname`= ? "
            connection.query(query, [entry.vname], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            });
        })
    },
    update: (entry, callback) => {
        let query = "UPDATE `f_vitals` SET `vname`= ?, `vdescription` = ?, `LOINC` = ?, `LOINC_Name`= ?, `UCUM_Units` = ?, `SNOMED` = ?, `ECL` = ? WHERE `id`= ? ";
        connection.query(query, [entry.vname, entry.vdescription, entry.LOINC, entry.LOINC_Name, entry.UCUM_Units, entry.SNOMED, entry.ECL,  entry.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `f_vitals` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },

    getpt: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM pt_vitals WHERE 1`
            connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    addpt: (entry, callback) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO pt_vitals (vid, vid1, vid2, encid, clinicid, pcpid, ptid, ptemrid, value, value1, value2, vdate, deleted, updatemethod, updateby, createddate, visittype, visitstatus, loadmethod, vtype) VALUES ('${entry.vid}', '${entry.vid1}', '${entry.vid2}', ${entry.encid}, ${entry.clinicid}, ${entry.pcpid}, ${entry.ptid}, '${entry.ptemrid}', '${entry.value}', '${entry.value1}', '${entry.value2}', '${entry.vdate}', ${entry.deleted}, '${entry.updatemethod}', ${entry.updateby}, '${entry.createddate}', '${entry.visittype}', '${entry.visitstatus}', '${entry.loadmethod}', ${entry.vtype})`
            connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    chosenpt: (entry, callback) => {
        let query = `SELECT * FROM pt_vitals WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    updatept: (entry, callback) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE pt_vitals SET vid = '${entry.vid}', vid1 = '${entry.vid1}', vid2 = '${entry.vid2}', encid = ${entry.encid}, clinicid = ${entry.clinicid}, pcpid = ${entry.pcpid}, ptid = ${entry.ptid}, ptemrid = '${entry.ptemrid}', value = '${entry.value}', value1 = '${entry.value1}', value2 = '${entry.value2}', vdate = '${entry.vdate}', deleted = ${entry.deleted}, updatemethod = '${entry.updatemethod}', updateby = ${entry.updateby}, createddate = '${entry.createddate}', visittype = '${entry.visittype}', visitstatus =  '${entry.visitstatus}', loadmethod = '${entry.loadmethod}', vtype = ${entry.vtype} WHERE id = ${entry.id}`
            connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    deletept: (entry, callback) => {
        let query = `DELETE FROM pt_vitals WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    countTotal: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) AS total FROM pt_vitals WHERE clinicid = ${entry.clinicid}`
            connection.query(query, (err, result) => {
                var total = 0
                if (!err) {
                    result.length ? total = result[0].total : total = 0
                    resolve(total)
                } else {
                    resolve(0)
                }
            })
        })
    }
}

module.exports = vitals;
