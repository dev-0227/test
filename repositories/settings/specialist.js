const connection = require('../../utilities/database');
var md5 = require('md5');

var query_string = function(str, value){
    var result = value?value:"NULL";
    if(str){
        result = '\"'+str.toString().replace(/\"/g,'`').replace(/\n/g,'<br>')+'\"';
    }
    return ', '+result;
}
const accounts = {
    list: (entry, callback) => {
        // create specialist table
        var createQuery = "CREATE TABLE `specialist` (`id` int(11) NOT NULL AUTO_INCREMENT,`fname` varchar(20) DEFAULT NULL,`lname` varchar(20) DEFAULT NULL,`mname` varchar(20) DEFAULT NULL,`email` varchar(50) DEFAULT NULL,`cel` varchar(25) DEFAULT NULL,`phone` varchar(25) DEFAULT NULL,`address` varchar(100) DEFAULT NULL,`city` varchar(30) DEFAULT NULL,`state` varchar(30) DEFAULT NULL,`fax` varchar(25) DEFAULT NULL,`zip` varchar(30) DEFAULT NULL,`plocation` varchar(100) DEFAULT NULL,`npi` varchar(30) DEFAULT NULL,`license` varchar(20) DEFAULT NULL,`clinic` text DEFAULT NULL,`contactname` varchar(20) DEFAULT NULL,`contactemail` varchar(20) DEFAULT NULL,`contactcel` varchar(25) DEFAULT NULL,`type` int(11) DEFAULT NULL,`specialty_id` text NOT NULL,`insurance_id` text DEFAULT NULL,`status` int(11) NOT NULL,`taxonomy` varchar(30) DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci";
        connection.query(createQuery, (err, result) => {
            if (!err) console.log("Successs!");
        })

        var where = "";
        let query = "SELECT specialist.*, specialty.`name` AS sname FROM `specialist`, `specialty` WHERE specialist.specialty_id = specialty.id ";
        if(entry.search.value!=""){
            where += "AND (";
            where += "specialist.fname LIKE '%"+entry.search.value+"%' ";
            where += "OR specialist.lname LIKE '%"+entry.search.value+"%' ";
            where += "OR specialist.email LIKE '%"+entry.search.value+"%' ";
            where += "OR specialist.phone LIKE '%"+entry.search.value+"%' ";
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
    
    add: (account, callback) => {
        let query = "INSERT INTO `specialist` (`fname`, `lname`, `mname`, `plocation`, `npi`, `license`, `email`, `phone`, `cel`,`address`, `fax`, `city`, `state`, `zip`, `clinic`, `contactname`, `contactemail`, `contactcel`,`type`, `specialty_id`, `insurance_id`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [account.fname, account.lname, account.mname, account.plocation, account.npi, account.license, account.email, account.tel, account.cel, account.address, account.fax, account.city, account.state, account.zip, 1, account.cname, account.cemail, account.ccel, account.type, account.specialty_id, account.insurance_id, account.status], (err, result) => {
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
        let query = "UPDATE `specialist` SET `fname`= ?, `lname` = ?, `mname` = ?, `plocation` = ?,`npi` = ?, `license` = ?, `email` = ?,  `phone` = ?, `cel` = ?,  `address` = ?, `fax` = ?, `city` = ?, `state` = ?, `zip` = ?, `contactname` = ?, `contactemail` = ?, `contactcel` = ?, `type` = ?, `specialty_id` = ?, `insurance_id` = ?, `status` = ? WHERE `id`= ? ";
        connection.query(query, [account.fname, account.lname, account.mname, account.plocation, account.npi, account.license, account.email, account.tel, account.cel, account.address, account.fax, account.city, account.state, account.zip, account.cname, account.cemail, account.ccel, account.type, account.specialty_id, account.insurance_id, account.status, account.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        // let query = "DELETE FROM `specialist` WHERE `id` >= 30";
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
        let query = "SELECT * FROM `specialist` WHERE type = '3' ORDER BY fname";
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
        let query = "SELECT * FROM `specialty` WHERE 1";
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
}
module.exports = accounts;