
const connection = require('../utilities/database')

const affiliation = {
    get: (entry, callback) => {
        let query = `SELECT * FROM affiliation `
        if (entry.search.value && entry.search.value.length > 0) query += `WHERE name LIKE '%${entry.search.value}%' OR address LIKE '%${entry.search.value}%'`
        query += ` ORDER BY name LIMIT ${entry.start},${entry.length}`
        connection.query(query, (err, result) => {
            if (!err) {
                query = `SELECT COUNT(*) AS total FROM affiliation`
                if (entry.search.value && entry.search.value.length > 0) query += ` WHERE name LIKE '%${entry.search.value}%' OR address LIKE '%${entry.search.value}%'`
                connection.query(query, (err1, result1) => {
                    if (!err1) {
                        var total = 0
                        if (result1.length > 0) {
                            total = result1[0].total
                        }
                    }
                    callback(err1, {data: result, recordsFiltered: total, recordsTotal: total})
                })
            } else callback(err, {data: [], recordsFiltered: 0, recordsTotal: 0})
        })
    },
    list: (callback) => {
        let query = `SELECT * FROM affiliation WHERE 1`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    add: (entry, callback) => {
        let query = `INSERT INTO affiliation (name, tel, fax, email, state, city, status, web, address, address2, zip) VALUES ('${entry.name}', '${entry.tel}', '${entry.fax}', '${entry.email}', '${entry.state}', '${entry.city}', ${entry.status}, '${entry.web}', '${entry.address}', '${entry.address2}', '${entry.zip}')`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    update: (entry, callback) => {
        let query = `UPDATE affiliation SET name = '${entry.name}', tel = '${entry.tel}', fax = '${entry.fax}', email = '${entry.email}', state = '${entry.state}', city = '${entry.city}', status = ${entry.status}, web = '${entry.web}', address = '${entry.address}', address2 = '${entry.address2}', zip = '${entry.zip}' WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    delete: (entry, callback) => {
        let query = `DELETE FROM affiliation WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    chosen: (entry, callback) => {
        let query = `SELECT * FROM affiliation WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    getInsClinicAffiliation: (entry, callback) => {
        let query = `SELECT cic.*, c.name AS clinic, i.insName AS insurance, a.name AS affiliation, it.display AS insType, pm.display AS payMethod FROM clinic_ins_characteristics AS cic ` 
        query += `JOIN clinics AS c ON c.id = cic.clinicid `
        query += `JOIN insurances AS i ON i.id = cic.insid `
        query += `JOIN affiliation AS a ON a.id = cic.affiliationid `
        query += `JOIN ins_type AS it ON it.id = cic.instypeid `
        query += `JOIN ins_lob_payform AS pm ON pm.id = cic.paymethodid `
        if (entry.search.value && entry.search.value.length > 0) query += `WHERE clinic LIKE '%${entry.search.value}%' OR insurance LIKE '%${entry.search.value}%' OR affiliation LIKE '%${entry.search.value}%' `
        query += `ORDER BY clinicid LIMIT ${entry.start},${entry.length}`
        connection.query(query, (err, result) => {
            if (!err) {
                query = `SELECT COUNT(*) AS total FROM clinic_ins_characteristics`
                if (entry.search.value && entry.search.value.length > 0) query += ` WHERE clinic LIKE '%${entry.search.value}%' OR insurance LIKE '%${entry.search.value}%' OR affiliation LIKE '%${entry.search.value}%'`
                connection.query(query, (err1, result1) => {
                    if (!err1) {
                        var total = 0
                        if (result1.length > 0) {
                            total = result1[0].total
                        }
                    }
                    callback(err1, {data: result, recordsFiltered: total, recordsTotal: total})
                })
            } else callback(err, {data: [], recordsFiltered: 0, recordsTotal: 0})
        })
    },
    addInsClinicAffiliation: (entry, callback) => {
        let query = `INSERT INTO clinic_ins_characteristics (clinicid, insid, instypeid, paymethodid, affiliationid) VALUES (${entry.clinicid}, ${entry.insid}, ${entry.instypeid}, ${entry.paymethodid}, ${entry.affiliationid})`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    updateInsClinicAffiliation: (entry, callback) => {
        let query = `UPDATE clinic_ins_characteristics SET clinicid = ${entry.clinicid}, insid = ${entry.insid}, instypeid = ${entry.instypeid}, paymethodid = ${entry.paymethodid}, affiliationid = ${entry.affiliationid} WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    deleteInsClinicAffiliation: (entry, callback) => {
        let query = `DELETE FROM clinic_ins_characteristics WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    chosenInsClinicAffiliation: (entry, callback) => {
        let query = `SELECT * FROM clinic_ins_characteristics WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    chosenInsClinicAffiliationByInsurance: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT cic.paymethodid, cic.instypeid, it.display AS instype, p.display AS paymethod FROM insurances AS i, clinic_ins_characteristics AS cic `
            query += `LEFT JOIN ins_lob_payform AS p ON p.id = cic.paymethodid `
            query += `LEFT JOIN ins_type AS it ON it.id = cic.instypeid `
            query += `WHERE cic.clinicid = ${entry.clinicid} AND (cic.insid = i.id AND i.insId = ${entry.insid})`
            connection.query(query, (err, result) => {
                if (!err) {
                    if (result.length > 0) {
                        resolve({paymethodid: result[0].paymethodid, instypeid: result[0].instypeid})
                    } else {
                        resolve({paymethodid: 0, instypeid: 0})
                    }
                } else {
                    reject(err)
                }
            })
        })
    }
}

module.exports = affiliation
