
const connection = require('../utilities/database');

const tracking = {
    getAllPatientTracking: (entry, callback) => {
        let query = `SELECT DISTINCT p.id, p.patientid, p.FNAME AS pfname, p.LNAME AS plname, p.PHONE AS pphone, p.DOB AS pdob, p.loadby, p.loadmethod, p.ptseen, p.INS_ID AS pinsid, i.insName AS pinsname, l.insName AS plobname, il.insName AS pinsnamel, ll.insName AS plobnamel, p.subscriberno AS psub, s.display AS visitstatus, t.name AS visittype, t.color, n.display AS newpttype, m.fname, m.lname, m.mname, a.reason, a.created_date `
        query += `FROM patient_list AS p `
        query += `LEFT JOIN f_appointment AS a ON a.patient_id = p.id AND a.clinic_id = ${entry.clinicid} `
        query += `LEFT JOIN f_vs_appt_status AS s ON a.status = s.id `
        query += `LEFT JOIN f_appointment_type AS t ON a.appt_type = t.id `
        query += `LEFT JOIN managers AS m ON m.id = p.loadby `
        query += `LEFT JOIN newpttype AS n ON p.newpttype = n.id `
        // insurance name for ecw_insid in ins_lob_map //
        query += `LEFT JOIN ins_lob_map AS ilm ON ilm.clinicid = ${entry.clinicid} AND ilm.ecw_insid = p.INS_ID `
        query += `LEFT JOIN insurances AS i ON i.id = ilm.insid AND ilm.ecw_insid = p.INS_ID AND ilm.clinicid = ${entry.clinicid} `
        query += `LEFT JOIN insurances AS l ON l.id = ilm.lobid AND ilm.ecw_insid = p.INS_ID AND ilm.clinicid = ${entry.clinicid} `
        // insurance name for ecw_loginsid in ins_lob_map //
        query += `LEFT JOIN ins_lob_map AS ilml ON ilml.clinicid = ${entry.clinicid} AND ilml.ecw_loginsid = p.INS_ID `
        query += `LEFT JOIN insurances AS il ON il.id = ilml.insid AND ilml.ecw_loginsid = p.INS_ID AND ilml.clinicid = ${entry.clinicid} `
        query += `LEFT JOIN insurances AS ll ON ll.id = ilml.lobid AND ilml.ecw_loginsid = p.INS_ID AND ilml.clinicid = ${entry.clinicid} `
        
        query += `WHERE p.clinicid = ${entry.clinicid} `
        query += `AND p.loaddate LIKE '%${entry.year}-${entry.month}%' `

        let where = ``
        where += `AND (p.patientid LIKE '%${entry.all}%' OR p.INS_NAME LIKE '%${entry.all}%' OR p.FNAME LIKE '%${entry.all}%' OR p.LNAME LIKE '%${entry.all}%' OR p.PHONE LIKE '%${entry.all}%' OR p.DOB LIKE '%${entry.all}%' OR m.fname LIKE '%${entry.all}%' OR m.mname LIKE '%${entry.all}%' OR m.lname LIKE '%${entry.all}%' OR p.loadmethod LIKE '%${entry.all}%' OR p.newpttype LIKE '%${entry.all}%' `
        where += `OR a.reason LIKE '%${entry.all}%' OR a.created_date LIKE '%${entry.all}%') `
        if (entry.visitstatus != 0) where += `AND a.status = ${entry.visitstatus} `
        if (entry.visittype != 0) where += `AND a.appt_type = ${entry.visittype} `
        query += where

        query += `ORDER BY p.patientid `
        query += `LIMIT ${entry.start},${entry.length}`
        connection.query(query, (err, result) => {
            if (err) {
                callback(err, [])
            }
            else {
                query = `SELECT COUNT(DISTINCT p.patientid) AS total `
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
        let query = `SELECT DISTINCT p.id, p.patientid AS ptemrid, p.FNAME AS fname, p.LNAME AS lname, p.DOB AS dob, p.GENDER AS gender, p.loadmethod, p.ptseen, p.INS_ID AS pinsid, p.loaddate AS loaddate, i.insName AS pinsname, l.insName AS plobname, il.insName AS pinsnamel, ll.insName AS plobnamel, p.subscriberno AS subscriberno `
        query += `FROM patient_list AS p `
        // insurance name for ecw_insid in ins_lob_map //
        query += `LEFT JOIN ins_lob_map AS ilm ON ilm.clinicid = ${entry.clinicid} AND ilm.ecw_insid = p.INS_ID `
        query += `LEFT JOIN insurances AS i ON i.id = ilm.insid AND ilm.ecw_insid = p.INS_ID AND ilm.clinicid = ${entry.clinicid} `
        query += `LEFT JOIN insurances AS l ON l.id = ilm.lobid AND ilm.ecw_insid = p.INS_ID AND ilm.clinicid = ${entry.clinicid} `
        // insurance name for ecw_loginsid in ins_lob_map //
        query += `LEFT JOIN ins_lob_map AS ilml ON ilml.clinicid = ${entry.clinicid} AND ilml.ecw_loginsid = p.INS_ID `
        query += `LEFT JOIN insurances AS il ON il.id = ilml.insid AND ilml.ecw_loginsid = p.INS_ID AND ilml.clinicid = ${entry.clinicid} `
        query += `LEFT JOIN insurances AS ll ON ll.id = ilml.lobid AND ilml.ecw_loginsid = p.INS_ID AND ilml.clinicid = ${entry.clinicid} `
        
        query += `WHERE p.clinicid = ${entry.clinicid} AND p.id = ${entry.patientid}`
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
            let query = `INSERT INTO pt_ins_track (ins_id, insurance_name, subscriberid, clinic_id, ptemrid, seq_no, create_date, startDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            connection.query(query, [entry.ins_id, entry.insurance_name, entry.subscriberid, entry.clinic_id, entry.ptemrid, entry.seq_no, entry.created_date, entry.startDate], (err1, result1) => {
                if (!err1) {
                    resolve({status: 0, result: result1})
                } else {
                    reject([])
                }
            })
        })
    },
    addNewPtTracking: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO newpt_track (insid, lobname, memberid, clinicid, patientid, ptfhirid, pcpname, ptfname, ptmname, ptlname, ptdob, ptaddress, ptaddress2, ptemail, ptcity, ptstate, ptphone, loadby, loadmethod, loaddate, ptseen, visittype, reason, rosterstatus, visitstatus, visitdos, loadid, recertdate, disdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            connection.query(query, [entry.insid, entry.lobname, entry.memberid, entry.clinicid, entry.patientid, entry.ptfhirid, entry.pcpname, entry.ptfname, entry.ptmname, entry.ptlname, entry.ptdob, entry.ptaddress, entry.ptaddress2, entry.ptemail, entry.ptcity, entry.ptstate, entry.ptphone, entry.loadby, entry.loadmethod, entry.loaddate, entry.ptseen, entry.visittype, entry.reason, entry.rosterstatus, entry.visittsatus, entry.visitdos, entry.loadid, entry.recertdate, entry.disdate], (err, result) => {
                if (!err) {
                    resolve({status: 0, result: result})
                } else {
                    resolve([])
                }
            })
        })
    },
    updateNewPtTracking: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE newpt_track SET insid = ?, lobname = ?, memberid = ?, clinicid = ?, patientid = ?, ptfhirid = ?, pcpname = ?, ptfname = ?, ptmname = ?, ptlname = ?, ptdob = ?, ptaddress = ?, ptaddress2 = ?, ptemail = ?, ptcity = ?, ptstate = ?, ptphone = ?, loadby = ?, loadmethod = ?, loaddate = ?, ptseen = ?, visittype = ?, reason = ?, rosterstatus = ?, visitstatus = ?, visitdos = ?, loadid = ?, recertdate = ?, disdate = ? WHERE id = ?`
            connection.query(query, [entry.insid, entry.lobname, entry.memberid, entry.clinicid, entry.patientid, entry.ptfhirid, entry.pcpname, entry.ptfname, entry.ptmname, entry.ptlname, entry.ptdob, entry.ptaddress, entry.ptaddress2, entry.ptemail, entry.ptcity, entry.ptstate, entry.ptphone, entry.loadby, entry.loadmethod, entry.loaddate, entry.ptseen, entry.visittype, entry.reason, entry.rosterstatus, entry.visittsatus, entry.visitdos, entry.loadid, entry.recertdate, entry.disdate, entry.id], (err, result) => {
                if (!err) {
                    resolve({status: 0, result: result})
                } else {
                    resolve([])
                }
            })
        })
    },
    getNewPtTrackingByPtId: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT id FROM newpt_track WHERE patientid = ${entry.patientid} AND clinicid = ${entry.clinicid}`
            connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result[0])
                } else {
                    reject(err)
                }
            })
        })
    }
}

module.exports = tracking
