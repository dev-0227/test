const connection = require('../../utilities/database');
var md5 = require('md5');
const fs = require('fs');

var query_string = function(str, value){
    var result = value?value:"NULL";
    if(str){
        result = '\"'+str.toString().replace(/\"/g,'`').replace(/\n/g,'<br>')+'\"';
    }
    return ', '+result;
}
const accounts = {
    list: (entry, callback) => {
        var where = "";
        let query = "SELECT doctors.*, specialty.`name` AS sname FROM `doctors`, `specialty` WHERE doctors.specialty = specialty.id ";
        if(entry.search.value!=""){
            where += "AND (";
            where += "doctors.fname LIKE '%"+entry.search.value+"%' ";
            where += "OR doctors.lname LIKE '%"+entry.search.value+"%' ";
            where += "OR doctors.email LIKE '%"+entry.search.value+"%' ";
            where += "OR doctors.phone LIKE '%"+entry.search.value+"%' ";
            where += "OR doctors.emrid LIKE '%"+entry.search.value+"%' ";
            where += "OR doctors.address LIKE '%"+entry.search.value+"%' ";
            where += "OR specialty.name LIKE '%"+entry.search.value+"%' ";
            where += ") "
            query += where;
        }
        query += "ORDER BY doctors.fname ";
        query += "LIMIT "+entry.start+","+entry.length;
        connection.query(query, (err, result) => {
            query = "SELECT count(*) as total FROM `doctors`, `specialty` WHERE doctors.specialty = specialty.id "+where
            connection.query(query, (err1, result1) => {
                if(err1)callback(err, result);
                else {
                    var total = 0;
                    if(result1.length>0)total = result1[0]['total']
                    callback(err, { data: result, recordsFiltered: total, recordsTotal: total });
                }
            });
        });
    },
    checkuser: (fname, lname, mname, phone) => {
        let query = "SELECT id FROM `doctors` WHERE `fname` = ? AND `lname` = ? AND `mname` = ? AND `phone` = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [fname, lname, mname, phone], (err, rows) => {
                if (err) {
                reject(err);
                } else {
                resolve(rows);
                }
            });
        });
    },
    add: (account, callback) => {
        let query = "INSERT INTO `doctors` (`fname`, `lname`, `mname`, `dob`, `gender`, `emrid`, `qualification`, `npi`, `phpfhirid`, `license`, `email`, `password`, `phone`, `phone2`, `address`, `address2`, `city`, `country`, `state`, `zip`, `type`, `specialty`, `photo`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [account.fname, account.lname, account.mname, account.dob, account.gender, account.emrid, account.qualification, account.npi, account.phpfhirid, account.license, account.email, account.password, account.phone, account.phone2, account.address, account.address2, account.city, account.country, account.state, account.zip, account.type, account.specialty, account.photo, account.status], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `doctors` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (account, callback) => {
        let query = "UPDATE `doctors` SET `fname`= ?, `lname` = ?, `mname` = ?, `dob`= ?, `gender` = ?, `emrid` = ?, `qualification` = ?, `phpfhirid` = ?, `npi` = ?, `license` = ?, `email` = ?,  `phone` = ?, `phone2` = ?,  `address` = ?, `address2` = ?, `password` = ?, `city` = ?, `state` = ?, `zip` = ?, `country` = ?, `photo` = ?, `type` = ?, `specialty` = ?, `status` = ? WHERE `id`= ? ";
        connection.query(query, [account.fname, account.lname, account.mname, account.dob, account.gender, account.emrid, account.qualification, account.phpfhirid, account.npi, account.license, account.email, account.phone, account.phone2, account.address, account.address2, account.password, account.city, account.state, account.zip, account.country, account.photo, account.type, account.specialty, account.status, account.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `doctors` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updatepwd: (entry, callback) => {
        let query = "UPDATE `doctors` SET `password` = ? WHERE `id`= ? ";
        connection.query(query, [md5(entry.pwd), entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updateclinic: (entry, callback) => {
        let clinics = entry.clinics.join(',');
        // if(entry.clinics.length > 0){
        //     for(var i = 0;i < entry.clinics.length; i++){
        //         if(i < entry.clinics.length - 1)
        //             clinics += parseInt(entry.clinics[i])+",";
        //         else
        //             clinics += parseInt(entry.clinics[i]);
        //     }
        // }
        let query = "UPDATE `doctors` SET `clinic` = ? WHERE `id`= ?";
        connection.query(query, [clinics, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getProviderByClinic: (entry, callback) => {
        let query = "SELECT * FROM `doctors` WHERE FIND_IN_SET(?, `clinic`) ORDER BY fname";
        connection.query(query,[entry.clinic_id], (err, result) => {
            callback(err, result);
        });
    },
    getProvider: (entry) => {
        let query = "SELECT * FROM `doctors` ORDER BY fname";
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

    getSpecialty: (entry) => {
        let query = "SELECT * FROM `specialty` ORDER BY name";
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
    //util
    getPhotoName: (id, callback) => {
        let query = "SELECT photo FROM doctors WHERE `id` = ?";
        connection.query(query, [id], (err, result) => {
            callback(err, result);
        });
    },
    deleteImage: (filepath, callback) => {
        fs.unlink(filepath, (err) => {
            callback(err);
        })
    }
}
module.exports = accounts;
