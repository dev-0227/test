
const connection = require('../utilities/database');

const tracking = {
    getAllPatientTracking: (entry, callback) => {
        let query = `SELECT DISTINCT p.id, p.patientid, p.FNAME AS pfname, p.LNAME AS plname, p.PHONE AS pphone, p.DOB AS pdob, p.loadby, p.loadmethod, p.ptseen, p.INS_ID AS pinsid, s.display AS visitstatus, t.name AS visittype, t.color, n.display AS newpttype, m.fname, m.lname, m.mname, a.reason, a.created_date `
        query += `FROM patient_list AS p `
        query += `LEFT JOIN f_appointment AS a ON a.patient_id = p.id AND a.clinic_id = ${entry.clinicid} `
        query += `LEFT JOIN f_vs_appt_status AS s ON a.status = s.id `
        query += `LEFT JOIN f_appointment_type AS t ON a.appt_type = t.id `
        query += `LEFT JOIN managers AS m ON m.id = p.loadby `
        query += `LEFT JOIN newpttype AS n ON p.newpttype = n.id `
        query += `WHERE p.clinicid = ${entry.clinicid} `
        query += `AND p.loaddate LIKE '%${entry.year}-${entry.month}%' `

        let where = ``
        where += `AND (p.patientid LIKE '%${entry.all}%' OR p.FNAME LIKE '%${entry.all}%' OR p.LNAME LIKE '%${entry.all}%' OR p.PHONE LIKE '%${entry.all}%' OR p.DOB LIKE '%${entry.all}%' OR m.fname LIKE '%${entry.all}%' OR m.mname LIKE '%${entry.all}%' OR m.lname LIKE '%${entry.all}%' OR p.loadmethod LIKE '%${entry.all}%' OR p.newpttype LIKE '%${entry.all}%' `
        where += `OR a.reason LIKE '%${entry.all}%' OR a.created_date LIKE '%${entry.all}%') `
        if (entry.visitstatus != 0) where += `AND a.status = ${entry.visitstatus} `
        if (entry.visittype != 0) where += `AND a.appt_type = ${entry.visittype} `
        query += where

        query += `ORDER BY p.patientid `
        query += `LIMIT ${entry.start},${entry.length}`
        connection.query(query, (err, result) => {
            if (err) callback(err, result)
            else {
                query = `SELECT COUNT(DISTINCT p.id) AS total `
                query += `FROM patient_list AS p `
                query += `LEFT JOIN f_appointment AS a ON a.patient_id = p.id AND a.clinic_id = ${entry.clinicid} `
                query += `LEFT JOIN f_vs_appt_status AS s ON a.status = s.id `
                query += `LEFT JOIN f_appointment_type AS t ON a.appt_type = t.id `
                if (entry.visitstatus != 0) query += `AND a.status = ${entry.visitstatus} `
                query += `LEFT JOIN managers AS m ON m.id = p.loadby `
                query += `LEFT JOIN newpttype AS n ON p.newpttype = n.id `
                query += `WHERE p.clinicid = ${entry.clinicid} `
                query += `AND p.loaddate LIKE '%${entry.year}-${entry.month}%' `

                query += where
                connection.query(query, (err1, result1) => {
                    if (err) {
                        callback(err, result)
                    }else {
                        var total = 0;
                        if(result1 && result1.length > 0)total = result1[0]['total']
                        callback(err, {data: result, recordsFiltered: total, recordsTotal: total })
                    }
                })
            }
        })
    },
    getPtInsTrackByPtId: (entry, callback) => {
        // let query = `SELECT * FROM pt_ins_track WHERE ptemrid = ${entry.patientid}`
        let query = `SELECT DISTINCT t.*, p.FNAME, p.LNAME, p.ADDRESS, p.CITY, p.ZIP, p.GENDER, p.DOB, p.LANGUAGE, p.PHONE, p.MOBILE, p.EMAIL FROM pt_ins_track AS t `
        query += `LEFT JOIN patient_list AS p ON p.patientid = t.ptemrid AND p.clinicid = ${entry.clinicid} `
        query += `WHERE t.ptemrid = ${entry.patientid} AND t.clinic_id = ${entry.clinicid}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    getAllPtInsTracking: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT ins_id, ptemrid FROM pt_ins_track`
            connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    setPtInsTracking: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO pt_ins_track (ins_id, insurance_name, subscriberid, clinic_id, ptemrid, create_date) VALUES ('${entry.ins_id}', '${entry.insurance_name}', '${entry.subscriberid}', ${entry.clinic_id}, '${entry.ptemrid}', '${entry.created_date}')`
            connection.query(query, (err1, result1) => {
                if (!err1) {
                    resolve({status: 0, result: result1})
                } else reject([])
            })
        })
    }
}

module.exports = tracking
