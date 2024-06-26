
const connection = require('../utilities/database');

const tracking = {
    getAllPatientTracking: (entry, callback) => {
        let query = `SELECT DISTINCT p.id, p.patientid, p.FNAME AS pfname, p.LNAME AS plname, p.PHONE AS pphone, p.DOB AS pdob, p.loadby, p.loadmethod, p.ptseen, s.display AS visitstatus, t.name AS visittype, t.color, n.display AS newpttype, m.fname, m.lname, m.mname, a.reason, a.created_date `
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
    }
}

module.exports = tracking
