
const connection = require('../utilities/database');

const ptanalysisloader = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ptanalysis`
            connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }, 
    add: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ptanalysis (enccl, encid, ptid, pcpid, enctype, vtype, vid, vcode, status, date, clstatus, cldate, ptcopay, deduct, payid, payorid, payort, type, tdate, tmss, tid, cpt, cptdesc, mod1, icd, icddesc, cptpay, msgcode, insname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            connection.query(query, [entry.enccl, entry.encid, entry.ptid, entry.pcpid, entry.enctype, entry.vtype, entry.vid, entry.vcode, entry.status, entry.date, entry.clstatus, entry.cldate, entry.ptcopay, entry.deduct, entry.payid, entry.payorid, entry.payort, entry.type, entry.tdate, entry.tmss, entry.tid, entry.cpt, entry.cptdesc, entry.mod1, entry.icd, entry.icddesc, entry.cptpay, entry.msgcode, entry.insname], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    update: (entry) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE ptanalysis SET enccl = ?, encid = ?, ptid = ?, pcpid = ?, enctype = ?, vtype = ?, vid = ?, vcode = ?, status = ?, date = ?, clstatus = ?, cldate = ?, ptcopay = ?, deduct = ?, payid = ?, payorid = ?, payort = ?, type = ?, tdate = ?, tmss = ?, tid = ?, cpt = ?, cptdesc = ?, mod1 = ?, icd = ?, icddesc = ?, cptpay = ?, msgcode = ?, insname = ?`
            connection.query(query, [entry.enccl, entry.encid, entry.ptid, entry.pcpid, entry.enctype, entry.vtype, entry.vid, entry.vcode, entry.status, entry.date, entry.clstatus, entry.cldate, entry.ptcopay, entry.deduct, entry.payid, entry.payorid, entry.payort, entry.type, entry.tdate, entry.tmss, entry.tid, entry.cpt, entry.cptdesc, entry.mod1, entry.icd, entry.icddesc, entry.cptpay, entry.msgcode, entry.insname], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getTotal: (callback) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) AS total FROM ptanalysis`
            connection.query(query, (err, result) => {
                var total = 0
                if (!err) {
                    if (result.length > 0) total = result[0].total
                }
                resolve({total: total})
            })
        })
    }
}

module.exports = ptanalysisloader
