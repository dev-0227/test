
const connection = require('../utilities/database')

const affiliation = {
    get: (entry, callback) => {
        let query = `SELECT * FROM affiliation `
        if (entry.filter && entry.filter.length > 0) query += `WHERE name LIKE '%${entry.filter}%'`
        query += ` ORDER BY name`
        connection.query(query, (err, result) => {
            if (!err) {
                query = `SELECT COUNT(*) AS total FROM affiliation`
                if (entry.filter && entry.filter.length > 0) query += ` WHERE name LIKE '%${entry.filter}%'`
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
    add: (entry, callback) => {
        let query = `INSERT INTO affiliation (name, tel, fax, email, state, city, status) VALUES ('${entry.name}', '${entry.tel}', '${entry.fax}', '${entry.email}', '${entry.state}', '${entry.city}', ${entry.status})`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    update: (entry, callback) => {
        let query = `UPDATE affiliation SET name = '${entry.name}', tel = '${entry.tel}', fax = '${entry.fax}', email = '${entry.email}', state = '${entry.state}', city = '${entry.city}', status = ${entry.status} WHERE id = ${entry.id}`
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
    }
}

module.exports = affiliation
