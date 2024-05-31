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
        let query = "SELECT specialist.*, specialty.`name` AS sname FROM `specialist`, `specialty` WHERE specialist.specialty_id = specialty.id ";
        if(entry.search.value!=""){
            where += "AND (";
            where += "specialist.fname LIKE '%"+entry.search.value+"%' ";
            where += "OR specialist.lname LIKE '%"+entry.search.value+"%' ";
            where += "OR specialist.email LIKE '%"+entry.search.value+"%' ";
            where += "OR specialist.phone LIKE '%"+entry.search.value+"%' ";
            where += "OR specialist.city LIKE '%"+entry.search.value+"%' ";
            where += "OR specialty.name LIKE '%"+entry.search.value+"%' ";
            where += ") "
            query += where;
        }
        query += "ORDER BY specialist.fname ";
        query += "LIMIT "+entry.start+","+entry.length;
        connection.query(query, (err, result) => {
            query = "SELECT count(*) as total FROM `specialist`, `specialty` WHERE specialist.specialty_id = specialty.id "+where
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
        let query = "SELECT id FROM `specialist` WHERE `fname` = ? AND `lname` = ? AND `mname` = ? AND `phone` = ?";
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
        let query = "INSERT INTO `specialist` (`fname`, `lname`, `mname`, `dob`, `gender`, `language`, `qualification`, `npi`, `web`, `license`, `email`, `phone`, `cel`, `address`, `address2`, `fax`, `city`, `country`, `state`, `zip`, `contactname`, `contactemail`, `contactcel`,`type`, `specialty_id`, `insurance_id`, `taxonomy`, `photo`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [account.fname, account.lname, account.mname, account.dob, account.gender, account.language, account.qualification, account.npi, account.web, account.license, account.email, account.tel, account.cel, account.address, account.address2, account.fax, account.city, account.country, account.state, account.zip, account.cname, account.cemail, account.ccel, account.type, account.specialty_id, account.insurance_id, account.taxonomy, account.photo, account.status], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `specialist` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (account, callback) => {
        let query = "UPDATE `specialist` SET `fname`= ?, `lname` = ?, `mname` = ?, `dob`= ?, `gender` = ?, `language` = ?, `qualification` = ?, `web` = ?, `npi` = ?, `license` = ?, `email` = ?,  `phone` = ?, `cel` = ?,  `address` = ?, `address2` = ?, `fax` = ?, `city` = ?, `state` = ?, `zip` = ?, `country` = ?, `contactname` = ?, `contactemail` = ?, `contactcel` = ?, `taxonomy` = ?, `photo` = ?, `type` = ?, `specialty_id` = ?, `insurance_id` = ?, `status` = ? WHERE `id`= ? ";
        connection.query(query, [account.fname, account.lname, account.mname, account.dob, account.gender, account.language, account.qualification, account.web, account.npi, account.license, account.email, account.tel, account.cel, account.address, account.address2, account.fax, account.city, account.state, account.zip, account.country, account.cname, account.cemail, account.ccel, account.taxonomy, account.photo, account.type, account.specialty_id, account.insurance_id, account.status, account.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `specialist` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updatepwd: (entry, callback) => {
        let query = "UPDATE `specialist` SET `password` = ? WHERE `id`= ? ";
        connection.query(query, [md5(entry.pwd), entry.id], (err, result) => {
            callback(err, result);
        });
    },
    updateanswer: (entry, callback) => {
        let query = "SELECT * FROM `security_authentification` WHERE user_id = ? AND question_id = ?";
        connection.query(query, [entry.id,entry.question_id], (err, result) => {
            if(result.length == 0){
                let query = "INSERT INTO `security_authentification` (`id`, `user_id`, `question_id`, `answer`) VALUES (NULL, ? , ? , ? )";
                connection.query(query, [entry.id, entry.question_id, entry.answer], (err, result) => {
                    callback(err, result);
                });
            }
            else{
                let query = "UPDATE `security_authentification` SET `answer` = ? WHERE `user_id`= ? AND `question_id`= ? ";
                connection.query(query, [entry.answer, entry.id, entry.question_id], (err, result) => {
                    callback(err, result);
                });
            }
        });
    },
    updateclinics: (entry, callback) => {
        let clinics = "";
        if(entry.clinics.length > 0){
            for(var i = 0;i < entry.clinics.length; i++){
                if(i < entry.clinics.length - 1)
                    clinics += parseInt(entry.clinics[i])+",";
                else
                    clinics += parseInt(entry.clinics[i]);
            }
        }
        let query = "UPDATE `specialist` SET `clinic` = ? WHERE `id`= ?";
        connection.query(query, [clinics, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getSpecialistByClinic: (entry, callback) => {
        let query = "SELECT * FROM `specialist` WHERE type = '3' AND FIND_IN_SET(?, `clinic`) ORDER BY fname";
        connection.query(query,[entry.clinic_id], (err, result) => {
            callback(err, result);
        });
    },
    getSpecialist: (entry) => {
        let query = "SELECT * FROM `specialist` ORDER BY fname";
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
        let query = "SELECT * FROM `specialty` WHERE 1 ORDER BY name";
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
    import: (xData, callback) => {
        var i = 0;
        for(i = 0; i < xData.length; i ++) {
            query = "INSERT INTO `specialist` (`fname`, `mname`, `lname`, `npi`, `license`, `email`, `phone`, `cel`, `address`, `fax`, `city`, `state`, `zip`, `clinic`, `measure_id`, `emrid`, `taxonomy`, `specialty_id`, `type`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(query, [xData[i].ufname, xData[i].uminitial, xData[i].ulname, xData[i].NPI, xData[i].Licenseid, xData[i].uemail, xData[i].upPhone, xData[i].cel, xData[i].upaddress, xData[i].FaxNo, xData[i].upcity, xData[i].upstate, xData[i].zipcode, xData[i].clinic, xData[i].measureID, xData[i].doctorID, xData[i].Taxonomy, xData[i].specialtyID, 3, 1], (err, result) => {
                 if (err) console.log(err);
            });
        }

        query = "SELECT * FROM `specialist` ORDER BY fname";
        connection.query(query, (err, result) => {
            callback(err, i);
        });
    },
    //util
    getPhotoName: (id, callback) => {
        let query = "SELECT photo FROM specialist WHERE `id` = ?";
        connection.query(query, [id], (err, result) => {
            callback(err, result);
        });
    },
    deleteImage: (filepath, callback) => {
        fs.unlink(filepath, (err) => {
            callback(err);
        })
    },
    updateorganizations: (entry, callback) => {
        let query = "UPDATE `specialist` SET `organization` = ? WHERE `id`= ?";
        connection.query(query, [entry.organizations, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getOrgan: (entry, callback) => {
        let query = "SELECT `organization` FROM `specialist` WHERE `id`= ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getClinics: (entry, callback) => {
        let query = "SELECT `clinic` FROM `specialist` WHERE `id`= ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getSpecialistByMeasureId: (entry, callback) => {
        let query = "SELECT `specialist`.* FROM `specialist`, `specialty`, `measure_hedis` WHERE `measure_hedis`.`measureId` = `specialty`.`mid` AND `specialty`.`id` = `specialist`.`specialty_id` AND `measure_hedis`.`measureId` = ? ORDER BY `specialist`.`fname`";
        connection.query(query, [entry.measureid], (err, result) => {
            callback(err, result);
        });
    }
}
module.exports = accounts;
