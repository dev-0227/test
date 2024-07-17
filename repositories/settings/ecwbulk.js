
const connection = require('../../utilities/database')

const ecwbulk = {
    getForPatient: (callback) => {
        let query  = `SELECT * FROM ecw_bulk_scope WHERE scope = 'patient'`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    getForPatientById: (entry, callback) => {
        let query  = `SELECT * FROM ecw_bulk_scope WHERE scope = 'patient' AND id=${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    getForEncounter: (callback) => {
        let query  = `SELECT * FROM ecw_bulk_scope WHERE scope = 'encounter'`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    getForEncounterById: (entry, callback) => {
        let query  = `SELECT * FROM ecw_bulk_scope WHERE scope = 'encounter' AND id=${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    addBulk: (entry, callback) => {
        let query = `INSERT INTO ecw_bulk_scope(scope, endpoint, date) VALUES('${entry.scope}', '${entry.endpoint}', '${entry.date}')`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    editBulk: (entry, callback) => {
        let query = `UPDATE ecw_bulk_scope SET scope='${entry.scope}', endpoint='${entry.endpoint}', date='${entry.date}'`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    deleteBulk: (entry, callback) => {
        let query = `DELETE FROM ecw_bulk_scope WHERE id=${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    }
}

module.exports = ecwbulk
