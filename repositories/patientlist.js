const connection = require('../utilities/database');

const patientlist = {
    getpts: (clinicid) => {
        let query = "SELECT patientid FROM `patient_list` WHERE clinicid = "+clinicid;
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
    setflagpts: (clinicid) => {
        let query = "UPDATE `patient_list` SET flag = 0 WHERE clinicid = "+clinicid;
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
    
    getnewpts: (clinicid, callback) => {
        let query = "SELECT COUNT(*) AS total FROM `patient_list` WHERE flag = 1 AND clinicid ="+clinicid;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },

    ptloader: (entry, callback) => {
        //exist
        let query = `SELECT id, startDate FROM patient_list WHERE patientid = ${entry.uid} AND clinicid = ${entry.clinicid}`
        return new Promise((resolve, reject) => {
            connection.query(query, [], (err1, result1) => {
                if (!err1) {
                    if (result1.length) {
                        if (result1[0].startDate && entry.startDate > result1[0].startDate) {
                            query = `UPDATE patient_list SET startDate = ${entry.startDate}`
                            connection.query(query, [], (err2, result2) => {
                                if (err2) {
                                    reject(err2)
                                } else {
                                    resolve(result2)
                                }
                            })
                        } else {
                            resolve(null)
                        }
                    } else {
                        query = "INSERT INTO `patient_list` (`id`, `clinicid`, `patientid`, `FNAME`,`LNAME`,`MNAME`,`PHONE`,`MOBILE`,`EMAIL`,`ADDRESS`,`CITY`,`ZIP`,`State`,`GENDER`,`AGE`,`DOB`,`flag`,`race`,`ethnicity_CDC`,`Language`,`marital_status`,`Deceased`,`Deceased_at`,`event_id`,`ptseen`,`newpttype`,`loaddate`,`loadby`,`loadmethod`, `INS_ID`, `INS_NAME`, `subscriberno`, `startDate`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                        connection.query(query, [entry.clinicid, entry.uid, entry.ufname, entry.ulname, entry.uminitial, entry.upPhone, entry.umobileno, entry.uemail, entry.upaddress, entry.upcity, entry.zipcode, entry.upstate, entry.sex, entry.Age, entry.DOB, 1, entry.race, entry.ethnicity, entry.language, entry.marital, entry.deceased, entry.deceasedDate, entry.event_id,0,1,new Date(Date.now()).toISOString().substr(0, 10),entry.userid,entry.loadmethod,entry.insid,entry.insuranceName,entry.subscriberno,entry.startDate], (err, result) => {
                            if (err) {
                                reject(err)
                                } else {
                                resolve(result)
                                }
                            }
                        )
                    }
                } else {
                    reject(err1)
                }
            })
        })
    },
    get: (entry, callback) => {
        var query = "";
        if(entry.pt_id!=""){
            query = "SELECT * FROM `patient_list` WHERE id='"+entry.pt_id+"'";
        }else if(entry.emr_id!=""){
            query = "SELECT * FROM `patient_list` WHERE patientid='"+entry.emr_id+"'";
        }else{
            query = "SELECT * FROM `patient_list` WHERE 1";
        }
        
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    add: (entry, callback) => {
        var query = "INSERT INTO `patient_list` (`id`, `clinicid`, `patientid`, `FNAME`,`LNAME`,`MNAME`,`PHONE`,`MOBILE`,`EMAIL`,`ADDRESS`,`ADDRESS2`,`CITY`,`ZIP`,`State`,`GENDER`,`DOB`,`flag`,`race`,`ethnicity_CDC`,`Language`,`marital_status`,`Deceased`,`Deceased_at`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [entry.clinicid, entry.emr_id, entry.fname, entry.lname, entry.mname, entry.phone, entry.mobile, entry.email, entry.address, entry.address2, entry.city, entry.zip, entry.state, entry.gender, entry.dob, 0, entry.race, entry.ethnicity, entry.language, entry.marital, entry.deceased, entry.deceased_at], (err, result) => {
            callback(err, result);
        });
    },
    update: (entry, callback) => {
        var query = "UPDATE `patient_list` SET `patientid`=?, `FNAME`=?,`LNAME`=?,`MNAME`=?,`PHONE`=?,`MOBILE`=?,`EMAIL`=?,`ADDRESS`=?,`ADDRESS2`=?,`CITY`=?,`ZIP`=?,`State`=?,`GENDER`=?,`DOB`=?,`flag`=?,`race`=?,`ethnicity_CDC`=?,`Language`=?,`marital_status`=?,`Deceased`=?,`Deceased_at`=? WHERE id=?";
        connection.query(query, [entry.emr_id, entry.fname, entry.lname, entry.mname, entry.phone, entry.mobile, entry.email, entry.address, entry.address2, entry.city, entry.zip, entry.state, entry.gender, entry.dob, 0, entry.race, entry.ethnicity, entry.language, entry.marital, entry.deceased, entry.deceased_at, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    ptinfoloader: (entry, callback) => {
        var query = "INSERT INTO `pt_info` (`id`, `clinicid`, `ptid`, `language`,`race`,`ethnicity`) VALUES (NULL, ? , ? , ? , ?,  ?)";
        connection.query(query, [entry.clinicid, entry.uid, entry.language, entry.race, entry.ethnicity], (err, result1) => {
            callback(err, result1);
        });
    },
    getData: (entry, callback) => {
        let query = "";
        if(entry.flag == 1)
            query = "SELECT * FROM `patient_list` WHERE flag = 1 AND clinicid ="+entry.clinicid;
        else
            query = "SELECT * FROM `patient_list` WHERE clinicid ="+entry.clinicid;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    getDataByPage: (entry, callback) => {
        let query = "";
        var search = "";
        if(entry.text != ""){
            search = " AND (";
            search += "patientid LiKE '%"+entry.text+"%' ";
            search += "OR FNAME LiKE '%"+entry.text+"%' ";
            search += "OR LNAME LiKE '%"+entry.text+"%' ";
            search += "OR PHONE LiKE '%"+entry.text+"%' ";
            search += "OR EMAIL LiKE '%"+entry.text+"%' ";
            search += "OR CITY LiKE '%"+entry.text+"%' ";
            search += "OR ZIP LiKE '%"+entry.text+"%' ";
            search += "OR Language LiKE '%"+entry.text+"%' ";
            search += ")";
            
        }
        if(entry.flag == 1)
            query = "SELECT COUNT(*) as total FROM `patient_list` WHERE flag = 1 AND clinicid ="+entry.clinicid+search;
        else
            query = "SELECT COUNT(*) as total FROM `patient_list` WHERE clinicid ="+entry.clinicid+search;
        
        connection.query(query, (err1, result1) => {
            if(!err1){
                var result = {};
                result.total = result1[0]['total'];
                var start = (entry.page-1) * entry.size;
                
                if(entry.flag == 1)
                    query = "SELECT * FROM `patient_list` WHERE flag = 1 AND clinicid ="+entry.clinicid+search+" Limit "+start+", "+entry.size;
                else
                    query = "SELECT * FROM `patient_list` WHERE clinicid ="+entry.clinicid+search+" Limit "+start+", "+entry.size;
                    
                connection.query(query, (err2, result2) => {
                    result.data = result2;
                    callback(err2, result);
                });
            }else{
                callback(err1, result1);
            }
        });
    },
    
    getTotal: (entry, callback) => {
        let query = "SELECT COUNT(*) AS total FROM `patient_list` WHERE clinicid ="+entry.clinicid;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    getLanguages: (entry, callback) => {
        let query = "SELECT id, code, english FROM `f_vs_cov_languages` WHERE 1";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    getRace: (entry, callback) => {
        let query = "SELECT id, code, display, internalId FROM `f_vs_race` WHERE 1";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    getEthnicity: (entry, callback) => {
        let query = "SELECT id, code, display, internalId FROM `f_vs_ethnicity` WHERE 1";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    getMarital: (entry, callback) => {
        let query = "SELECT id, code, display FROM `f_vs_marital_status` WHERE 1";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    setValue: (entry, callback) => {
        var tmp = "";
        if(entry.key == "FNAME"){
            tmp = "FNAME";
        }
        else if(entry.key == "LNAME"){
            tmp = "LNAME";
        }
        else if(entry.key == "PHONE"){
            tmp = "PHONE";
        }
        else if(entry.key == "MOBILE"){
            tmp = "MOBILE";
        }
        else if(entry.key == "EMAIL"){
            tmp = "EMAIL";
        }
        else if(entry.key == "ADDRESS"){
            tmp = "ADDRESS";
        }
        else if(entry.key == "ADDRESS2"){
            tmp = "ADDRESS2";
        }
        else if(entry.key == "CITY"){
            tmp = "CITY";
        }
        else if(entry.key == "ZIP"){
            tmp = "ZIP";
        }
        else if(entry.key == "GENDER"){
            tmp = "GENDER";
        }
        else if(entry.key == "DOB"){
            tmp = "DOB";
            entry.value = new Date(entry.value)
        }
        else if(entry.key == "LANGUAGE"){
            tmp = "Language";
        }
        else if(entry.key == "DECEASED"){
            tmp = "Deceased_at";
            entry.value = new Date(entry.value)
        }
        let query = "UPDATE `patient_list` SET "+tmp+" = ? WHERE id = ?";
        connection.query(query,[entry.value,entry.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        query = "DELETE  FROM `patient_list` WHERE id ="+entry.id;
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    search: (entry, callback) => {
        var query = "SELECT * FROM `patient_list` WHERE ";
        if(entry.item=="name"){
            var names = entry.text.split(" ");
            if(names.length==1){
                query += "( FNAME LIKE '%"+names[0]+"%' ";
                query += "OR LNAME LIKE '%"+names[0]+"%') ";
            }else{
                query += "( FNAME LIKE '%"+names[0]+"%' ";
                query += "AND LNAME LIKE '%"+names[1]+"%') ";
            }
        }
        if(entry.item=="dob"){
            var dob = new Date(entry.text);
            query += "DOB ='"+dob.toISOString().split("T")[0]+"%' ";
        }
        if(entry.item=="emr_id"){
            query += "( id LIKE '%"+entry.text+"%' ";
            query += "OR patientid LIKE '%"+entry.text+"%') ";
        }
        if(entry.item=="phone"){
            query += "( PHONE LIKE '%"+entry.text+"%' ";
            query += "OR MOBILE LIKE '%"+entry.text+"%') ";
        }
        if(entry.item=="insurance"){
            query += "INS_ID PHONE '%"+entry.text+"%' ";
        }
        query += " AND clinicid='"+entry.clinic_id+"' ";
        query += " LIMIT 10;";
        
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    statisticPtbyClinic: (entry, callback) => {
        let query = `SELECT COUNT(*) AS cnt FROM patient_list WHERE loaddate LIKE '%${entry.year}-${entry.month}%' AND clinicid = ${entry.clinicid}`
        connection.query(query, (err, result) => {
            if (!err) {
                if (result) callback(result[0].cnt)
            } else callback(0)
        })
    },
    getNewPatient: (entry, callback) => {
        let query = `SELECT p.patientid AS uid, p.FNAME AS ufname, p.LNAME AS ulname, p.GENDER AS sex, p.DOB, p.PHONE AS upPhone, p.MOBILE AS umobileno, p.EMAIL AS uemail, p.ADDRESS AS upaddress, p.CITY AS upcity, p.State AS upstate, p.ZIP AS zipcode, p.Language AS language, p.ethnicity_CDC AS ethnicity, p.race, p.INS_ID AS insid, p.INS_NAME AS insuranceName, p.subscriberno FROM patient_list AS p WHERE clinicid = ${entry.clinicid} AND loaddate LIKE '%${entry.year}-${entry.month}%'`
        connection.query(query, (err, result) => {
            callback(err, result)
        })
    },
    getAllPts: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT id, clinicid, patientid, emr_fhirid AS fhirid, FNAME AS fname, LNAME AS lname, PHONE AS phone FROM patient_list WHERE 1`
            connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    existForAsync: (entry) => {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM patient_list WHERE patientid = ? AND clinicid = ?`
            connection.query(query, [entry.emr_id, entry.clinicid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateForAync: (entry) => {
        return new Promise((resolve, reject) => {
            var query = `UPDATE patient_list SET emr_fhirid = ?, PHONE = ?, MOBILE = ?, EMAIL = ?, CITY = ?, STATE = ?, ZIP = ?, ADDRESS = ?, loadby = ?, loaddate = ?, loadmethod = ? WHERE id = ?`
            connection.query(query, [entry.fhirid, entry.phone, entry.mobile, entry.email, entry.city, entry.state, entry.zip, entry.address, entry.loadby, entry.loaddate, entry.loadmethod, entry.id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    addForEcwbulk: (entry) => {
        return new Promise((resolve, reject) => {
            var query = "INSERT INTO `patient_list` (`clinicid`, `patientid`, `emr_fhirid`, `FNAME`,`LNAME`,`MNAME`,`PHONE`,`MOBILE`,`EMAIL`,`ADDRESS`,`ADDRESS2`,`CITY`,`ZIP`,`State`,`GENDER`,`DOB`,`flag`,`Language`,`loadby`,`loaddate`,`loadmethod`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(query, [entry.clinicid, entry.emrid, entry.fhirid, entry.fname, entry.lname, entry.mname, entry.phone, entry.mobile, entry.email, entry.address, entry.address2, entry.city, entry.zip, entry.state, entry.gender, entry.dob, 0, entry.language, entry.loadby, new Date(Date.now()).toISOString().substr(0, 10), entry.loadmethod], (err, result) => {
                if (!err) {
                    resolve({})
                } else {
                    reject(err)
                }
            })
        })
    }
}

module.exports = patientlist;
