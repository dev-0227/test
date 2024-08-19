
const connection = require('../../utilities/database')

const lab = {
    list: (entry, callback) => {
        let query = `SELECT l.*, s.display AS sdisplay FROM lab_data AS l `
        query += `LEFT JOIN f_vs_specimentype AS s ON l.specimen_id = s.id `
        if (entry.search.value) query += `WHERE l.loinc_id LIKE '%${entry.search.value}%' OR l.display LIKE '%${entry.search.value}%' OR s.display LIKE '%${entry.search.value}%' `
        query += `ORDER BY l.display LIMIT ${entry.start},${entry.length}`
        connection.query(query, (err, result) => {
            if (err) {
                callback(err, {data: [], recordsFiltered: 0, recordsTotal: 0})
            } else {
                query = `SELECT COUNT(*) AS total FROM lab_data AS l `
                query += `LEFT JOIN f_vs_specimentype AS s ON l.specimen_id = s.id `
                if (entry.search.value) query += `WHERE l.loinc_id LIKE '%${entry.search.value}%' OR l.display LIKE '%${entry.search.value}%' OR s.display LIKE '%${entry.search.value}%'`
                connection.query(query, (err1, result1) => {
                    if (!err1) {
                        var total = 0
                        if (result1[0]) total = result1[0].total
                        callback(err1, {data: result, recordsFiltered: total, recordsTotal: total})
                    } else {
                        callback(err, {data: [], recordsFiltered: 0, recordsTotal: 0})
                    }
                })
            }
        })
    },
    add: (entry, callback) => {
        entry.created = new Date(Date.now()).toISOString().substr(0, 10)
        entry.updated = '1900-01-01'
        let query = `INSERT INTO lab_data (loinc_id, snomed_id, fhir_id, display, description, type, units, specimen_id, normal_range_min, normal_range_max, clia, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        connection.query(query, [entry.loinc_id, entry.snomed_id, entry.fhir_id, entry.display, entry.description, entry.type, entry.units, entry.specimen_id, entry.normal_range_min, entry.normal_range_max, entry.clia, entry.created, entry.updated], (err, result) => {
            callback(err, result)
        })
    },
    update: (entry, callback) => {
        entry.updated = new Date(Date.now()).toISOString().substr(0, 10)
        let query = `UPDATE lab_data SET loinc_id = ?, snomed_id = ?, fhir_id = ?, display = ?, description = ?, type = ?, units = ?, specimen_id = ?, normal_range_min = ?, normal_range_max = ?, clia = ?, updated = ? WHERE id = ?`
        connection.query(query, [entry.loinc_id, entry.snomed_id, entry.fhir_id, entry.display, entry.description, entry.type, entry.units, entry.specimen_id, entry.normal_range_min, entry.normal_range_max, entry.clia, entry.updated, entry.id], (err, result) => {
            callback(err, result)
        })
    },
    chosen: (entry, callback) => {
        let query = `SELECT l.*, s.display AS sdisplay FROM lab_data AS l `
        query += `LEFT JOIN f_vs_specimentype AS s ON l.specimen_id = s.id `
        query += `WHERE l.id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    delete: (entry, callback) => {
        let query = `DELETE FROM lab_data WHERE id = ${entry.id}`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    }
}

module.exports = lab
