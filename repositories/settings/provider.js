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
        let query = "INSERT INTO `doctors` (`fname`, `lname`, `mname`, `dob`, `gender`, `qualification`, `npi`, `license`, `email`, `password`, `phone`, `phone2`, `address`, `address2`, `city`, `country`, `state`, `zip`, `type`, `specialty`, `photo`, `status`, `sign`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [account.fname, account.lname, account.mname, account.dob, account.gender, account.qualification, account.npi, account.license, account.email, account.password, account.phone, account.phone2, account.address, account.address2, account.city, account.country, account.state, account.zip, account.type, account.specialty, account.photo, account.status, account.sign], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT `doctors`.* FROM `doctors` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (account, callback) => {
        let query = "UPDATE `doctors` SET `fname`= ?, `lname` = ?, `mname` = ?, `dob`= ?, `gender` = ?, `qualification` = ?, `npi` = ?, `license` = ?, `email` = ?,  `phone` = ?, `phone2` = ?,  `address` = ?, `address2` = ?, `password` = ?, `city` = ?, `state` = ?, `zip` = ?, `country` = ?, `photo` = ?, `type` = ?, `specialty` = ?, `status` = ?, `sign` = ? WHERE `id`= ? ";
        connection.query(query, [account.fname, account.lname, account.mname, account.dob, account.gender, account.qualification, account.npi, account.license, account.email, account.phone, account.phone2, account.address, account.address2, account.password, account.city, account.state, account.zip, account.country, account.photo, account.type, account.specialty, account.status, account.sign, account.id], (err, result) => {
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
        let query = "UPDATE `doctors` SET `clinic` = ? WHERE `id`= ?";
        connection.query(query, [clinics, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getProviderByClinic: (entry, callback) => {
        let query = "SELECT `doctors`.`id`, `doctors`.`fname`, `doctors`.`lname`, `doctors`.`address`, `doctors`.`phone`, `doctors`.`photo`, `sign`, `f_vs_qualification`.`display` AS `qualification` FROM  `doctors`, `f_vs_qualification` WHERE FIND_IN_SET(?, `doctors`.`clinic`) AND `f_vs_qualification`.`id` = `doctors`.`qualification` ORDER BY `doctors`.`fname`";
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
    getClinic: (entry, callback) => {
        let query = "SELECT `clinics`.`id`, `clinics`.`name`, `doctors`.`address`, `doctors`.`phone`, `doctors`.`city`, `doctors`.`state`, `doctors`.`zip` FROM `doctors`, `clinics` WHERE FIND_IN_SET(`clinics`.`id`, `doctors`.`clinic`) AND `doctors`.`id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result)
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
    getSignName: (id, callback) => {
        let query = "SELECT sign FROM doctors WHERE `id` = ?";
        connection.query(query, [id], (err, result) => {
            callback(err, result)
        })
    },
    getImageNames: (id, callback) => {
        let query = "SELECT photo, sign FROM doctors WHERE `id` = ?"
        connection.query(query, [id], (err, result) => {
            callback(err, result)
        })
    },
    deleteImage: (filepath, callback) => {
        return new Promise((resolve, reject) => {
            fs.unlink(filepath, (err) => {
                if (err) {
                    reject({ status: 'fail' })
                } else {
                    resolve({ status: 'success' })
                }
            })
        })
    },
    setPCPInfo: (entry, callback) => {
        // delete old data
        query = "DELETE FROM `pcp_external_ids` WHERE `doctorid` = ?";
        connection.query(query, [entry.doctorid], (err, result) => {
            if (!err) {
                //add new data
                query = "INSERT INTO `pcp_external_ids` (`doctorid`, `clinicid`, `usertypeid`, `pcpid`, `emrid`, `doctorfhirid`, `insuranceid`, `doctorinsid`, `createdat`, `createdby`) VALUES ";
                entry.pcp.forEach(item => {
                    if (item != undefined && item != null) {
                        query += `(${item.doctorid},${item.clinicid},${item.usertypeid},'${item.pcpid}','${item.emrid}','${item.pcpfhirid}','${item.insuranceid}','${item.doctorinsid}','${Date.now()}','${item.user}'),`
                    }
                })
                query = query.substr(0, query.length - 1);   query + ';'
                connection.query(query, (err1, result1) => {
                    callback(err1, result1);
                });
            }
            else callback(err, result);
        });
    },
    getPCPInfo: (entry, callback) => {
        let query = 'SELECT * FROM `pcp_external_ids` WHERE `doctorid` = ?';
        connection.query(query, [entry.doctorid], (err, result) => {
            callback(err, result);
        });
    }
}
module.exports = accounts;
