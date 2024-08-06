const xlsx = require('node-xlsx');
const patientlist = require('../repositories/patientlist');
const tracking = require('../repositories/tracking')
const insurance = require('../repositories/insurance')
const event = require('../repositories/event');
const Acl = require('../middleware/acl');
const {getClinicsByUserType} = require('../repositories/settings/clinic')
const csv = require('xlsx')

var nodemailer = require('nodemailer');
const Excel = require('exceljs');
var fs = require('fs');
const config = require('../config');
var striptags = require('striptags');
let ejs = require("ejs");
let path = require("path");
const axios = require('axios')
const cors = require('cors');
const { BrandVettingContext } = require('twilio/lib/rest/messaging/v1/brandRegistration/brandVetting');
const { type } = require('os');

var mail = nodemailer.createTransport({
    host: config.emailaccess.host,
    port: config.emailaccess.port,
    secure: false,
    auth: {
        user: config.emailaccess.user,
        pass: config.emailaccess.password,
    }
});
var twilio = require('twilio')(
    config.twilio.TWILIO_ACCOUNT_SID,
    config.twilio.TWILIO_AUTH_TOKEN
  );
function ExcelDateToJSDate(serial) {
    let utc_days = serial - 25568;
    let utc_value = utc_days * 86400;
    let date_info = new Date(utc_value * 1000);

    let year = date_info.getFullYear();
    let month = date_info.getMonth() + 1;
    let dt = date_info.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + dt;
}
exports.ptloader = async (req, res, next) => {
    let clinicid = req.body.clinicid;
    let userid = req.body.userid;
    let pts = await patientlist.getpts(clinicid);
    await patientlist.setflagpts(clinicid);
    // var tmppts = [];
    // for(var  i = 0; i < pts.length;i++){
    //     tmppts.push(pts[i]['patientid']);
    // }
    let filePath = req.files[0].path;
    let pureSheet = [];
    // Parse a file
    const workSheetsFromFile = xlsx.parse(filePath);
    pureSheet = workSheetsFromFile[0].data;
    let headers = pureSheet[0];
    let rowCounter = 0;
    if(pureSheet.length<1)return;
    let entry = {
        user_id: userid,
        clinic_id: clinicid,
        type_id: 11, //Patient Record
        subtype_id: 38, //create
        outcome_id: 5, //'success',
        action_id: 1, //'Create',
        description: 'Loaded patients from csv-file',
        model_id: 0,
    }
    var event_result = await event.logger(entry);
    var pt_ids = "";
    // 1. Patient Information begin //
    for (row of pureSheet) {
        if (rowCounter != 0) {
            let entry = [];
            if (!pts.find(o => o.patientid == row[headers.indexOf('uid')])) {
            // if(!tmppts.includes(row[headers.indexOf("uid")])){
                entry = {
                    userid: userid,
                    clinicid:clinicid,
                    uid:row[headers.indexOf("uid")],
                    ufname:row[headers.indexOf("ufname")],
                    uminitial:row[headers.indexOf("uminitial")],
                    ulname:row[headers.indexOf("ulname")],
                    upPhone:row[headers.indexOf("upPhone")],
                    umobileno:row[headers.indexOf("umobileno")],
                    uemail:row[headers.indexOf("uemail")],
                    upaddress:row[headers.indexOf("upaddress")],
                    upcity:row[headers.indexOf("upcity")],
                    zipcode:row[headers.indexOf("zipcode")],
                    upstate:row[headers.indexOf("upstate")],
                    sex:row[headers.indexOf("sex")],
                    Age:row[headers.indexOf("Age")],
                    language:row[headers.indexOf("language")],
                    ethnicity:row[headers.indexOf("ethnicity")],
                    race:row[headers.indexOf("race")],
                    deceased:row[headers.indexOf("deceased")],
                    deceasedDate:(row[headers.indexOf("deceasedDate")]==null||row[headers.indexOf("deceasedDate")]=="")?null:(ExcelDateToJSDate(row[headers.indexOf("deceasedDate")])=="NaN-NaN-NaN"?null:ExcelDateToJSDate(row[headers.indexOf("deceasedDate")])),
                    DOB:(row[headers.indexOf("DOB")]==null||row[headers.indexOf("DOB")]=="")?null:(ExcelDateToJSDate(row[headers.indexOf("DOB")])=="NaN-NaN-NaN"?null:ExcelDateToJSDate(row[headers.indexOf("DOB")])),
                    event_id:event_result['insertId'],
                    insid:row[headers.indexOf('insid')],
                    insuranceName:row[headers.indexOf('insuranceName')],
                    subscriberno:row[headers.indexOf('subscriberno')],
                    marital:1,
                    loadmethod: 'Excel',
                    startDate:(row[headers.indexOf("startDate")]==null||row[headers.indexOf("startDate")]=="")?null:(ExcelDateToJSDate(row[headers.indexOf("startDate")])=="NaN-NaN-NaN"?null:ExcelDateToJSDate(row[headers.indexOf("startDate")])),
                };
                var result = await patientlist.ptloader(entry)
                if (result != null && result['insertId']) {
                    if(pt_ids != "")pt_ids += ","
                    pt_ids += result['insertId']
                }
            }   
        }
        rowCounter++;
    };
    var load_count = pt_ids.split(',').length;
    if(pt_ids=="")load_count = "0";
    entry = {
        id: event_result['insertId'],
        model_name: 'patient_list',
        model_id: pt_ids,
        description: 'Loaded '+load_count+' patients from csv-file'
    }
    event.update(entry);
    // 1. Patient Information end //
    // 2. Patient Insurance Information begin //
    rowCounter = 0
    var allTrack = await tracking.getAllPtInsTracking()
    var date = new Date(Date.now()).toISOString().substr(0, 10)
    for(row of pureSheet) {
        if (rowCounter > 0) {
            let data = {
                ins_id: row[headers.indexOf('insid')] ? row[headers.indexOf('insid')] : '',
                insurance_name: row[headers.indexOf('insuranceName')] ? row[headers.indexOf('insuranceName')] : '',
                subscriberid: row[headers.indexOf('subscriberno')] ? row[headers.indexOf('subscriberno')] : '',
                created_date: date,
                clinic_id: req.body.clinicid,
                ptemrid: row[headers.indexOf('uid')] ? row[headers.indexOf('uid')] : '',
                startDate: (row[headers.indexOf("startDate")]==null||row[headers.indexOf("startDate")]=="")?null:(ExcelDateToJSDate(row[headers.indexOf("startDate")])=="NaN-NaN-NaN"?null:ExcelDateToJSDate(row[headers.indexOf("startDate")])),
                seq_no: 1
            }
            if (!allTrack.find(o => o.ins_id == data.ins_id && o.ptemrid == data.ptemrid)) {
                var callback = await tracking.setPtInsTracking(data)
            }
        }
        rowCounter ++
    }
    // 2. Patient Information end //
    // 3. Insurance Lob Map begin //
    // for (row of pureSheet) {
    //     let lobmap = {
    //         insid: '',
    //         clinicid: clinicid,
    //         lobid: '',
    //         ecw_insid: row[headers.indexOf('insid')] ? row[headers.indexOf('insid')] : '',
    //         inslob: row[headers.indexOf('insuranceName')] ? row[headers.indexOf('insuranceName')] : ''
    //     }
    //     lobmap.inslob = lobmap.inslob.toUpperCase()
    //     await insurance.setInsLobMap(lobmap)
    // }
    // 3. Insurance Lob Map end //

    entry = {
        clinicid: req.body.clinicid,
    }
    patientlist.getTotal(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            result[0]['updated'] = load_count;
            res.status(200).json({ data: result });
        }
    });
}

exports.getData = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'PATIENT_INFO');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        clinicid: req.body.clinicid,
        flag: req.body.flag,
    }
    patientlist.getData(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getDataByPage = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'PATIENT_INFO');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        clinicid: req.body.clinicid,
        page: req.body.page?req.body.page:1,
        size: req.body.size?req.body.size:10,
        flag: req.body.flag,
        text: req.body.searchText
    }
    patientlist.getDataByPage(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.getTotal = (req, res, next) => {
    let entry = {
        clinicid: req.body.clinicid,
    }
    patientlist.getTotal(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getLanguages = (req, res, next) => {
    let entry = {}
    patientlist.getLanguages(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getRace = (req, res, next) => {
    let entry = {}
    patientlist.getRace(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getEthnicity = (req, res, next) => {
    let entry = {}
    patientlist.getEthnicity(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getMarital = (req, res, next) => {
    let entry = {}
    patientlist.getMarital(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.get = (req, res, next) => {
    patientlist.get(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.search = (req, res, next) => {
    patientlist.search(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}


exports.add = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_INFO');
    if(!can)return res.status(405).json('Not Permission');
    var deceased_at = req.body.deceased_at;
    if(req.body.deceased=="0"){
        deceased_at = ''
    }
    let entry = {
        clinicid: req.body.clinicid,
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        emr_id: req.body.emr_id,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone,
        mobile: req.body.mobile,
        language: req.body.language,
        city: req.body.city,
        address: req.body.address,
        address2: req.body.address2,
        zip: req.body.zip,
        state: req.body.state,
        ethnicity: req.body.ethnicity,
        race: req.body.race,
        marital: req.body.marital,
        deceased: req.body.deceased,
        deceased_at: deceased_at
    }
    patientlist.add(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            entry = {
                user_id: req.body.user_id,
                clinic_id: req.body.clinicid,
                type_id: 11, //Patient Record
                subtype_id: 38, //create
                outcome_id: 5, //'success',
                action_id: 1, //'Create',
                description: 'Added patient',
                patient_id: result.insertId,
                model_name: 'patient_list',
                model_id: result.insertId
            }
            event.logger(entry);
            res.status(200).json({ data: result });
        }
    });
    
}

exports.update = async(req, res, next) => {
    
    var deceased_at = req.body.deceased_at;
    if(req.body.deceased=="0"){
        deceased_at = ''
    }
    let entry = {
        id: req.body.id,
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        emr_id: req.body.emr_id,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone,
        mobile: req.body.mobile,
        language: req.body.language,
        city: req.body.city,
        address: req.body.address,
        address2: req.body.address2,
        zip: req.body.zip,
        state: req.body.state,
        ethnicity: req.body.ethnicity,
        race: req.body.race,
        marital: req.body.marital,
        deceased: req.body.deceased,
        deceased_at: deceased_at
    }
    patientlist.update(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
    
}

exports.setValue = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'PATIENT_INFO');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        key: req.body.key,
        value: req.body.value,
    }
    patientlist.setValue(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            entry = {
                user_id: req.body.user_id,
                clinic_id: req.body.clinicid,
                type_id: 11, //Patient Record
                subtype_id: 31, //Update
                outcome_id: 5, //'success',
                action_id: 3, //'Update',
                description: 'Updated patient [ '+req.body.key+' ]',
                patient_id: req.body.id
            }
            event.logger(entry);
            res.status(200).json({ data: result });
        }
    });
}

exports.delete = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    patientlist.delete(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.statisticNewPatients = async(req, res, next) => {
    let statistics = []
    let clinics = await getClinicsByUserType(req.query)
    var E = 0
    if (!clinics.data) res.status(200).json({data: [], recordsFiltered: 0, recordsTotal: 0})
    else {
        await clinics.data.forEach(clinic => {
            var statistic = []
            var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
            var e = 0
            months.forEach(month => {
                patientlist.statisticPtbyClinic({year: req.query.year, month: month, clinicid: clinic.id}, (result) => {
                    statistic.push({
                        month: month,
                        count: result
                    })
                    e ++
                    if (e == months.length) {
                        statistics.push({
                            id: clinic.id,
                            clinicname: clinic.name,
                            s: statistic
                        })
                        E ++
                        if (E == clinics.data.length) {
                            res.status(200).json({data: statistics, recordsFiltered: clinics.total, recordsTotal: clinics.total})
                        }
                    }
                })
            })
        })
    }
}

exports.export = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');
    
    await patientlist.getNewPatient(req.body, (err, result) => {
        if (err) {
            res.status(404).json([])
        } else {
            var url = 'uploads'
            var filename = `PATIENT-${req.body.name}(${req.body.year}-${req.body.month}).csv`
            var myWorkSheet = csv.utils.json_to_sheet(result)
            var myWorkBook = csv.utils.book_new()
            csv.utils.book_append_sheet(myWorkBook, myWorkSheet, 'myWorkSheet')
            var write = async () => {
                await csv.writeFile(myWorkBook, url + '/' + filename)
            }
            write().then(() => {
                res.status(200).json({data: {
                    filename: filename,
                    url: url
                }})
            })
        }
    })
}

exports.ecwbulk = async(req, res, next) => {
    let response = await axios.get(`${req.body.url}?key=${req.body.key}`)
    var existPTs = await patientlist.getAllPts()

    var cnt = 0, upt = 0, add = 0
    for (item of response.data) {
        if (!existPTs.find(o => o.fhirid == item.id)) {
            // get name begin //
            var name = '', fname = '', lname = '', mname = ''
            item.name[0].prefix !=null && item.name[0].prefix.length ? name = item.name[0].text.substr(item.name[0].prefix.length + 1, item.name[0].text.length) : name = item.name[0].text
            var nameList = name.split(' ')
            if (nameList.length > 2) {
                mname = nameList[nameList.length - 1]
                fname = nameList[nameList.length - 2]
                lname = nameList.splice(nameList.length - 2, 2).join(' ')
            }
            // get name end //

            let entry = {
                fname: fname,
                lname: lname,
                mname: mname,
                dob: item.birthDate,
                gender: 'male',
                clinicid: item.clinic,
                emr_id: item.identifier[0] ? item.identifier[0].value : '',
                fhirid: item.id,
                phone: item.telecom.length > 0 ? item.telecom[0].value : '',
                mobile: item.telecom.length > 0 && item.telecom[1] && item.telecom[1].use == 'mobile' ? item.telecom[1].value : '',
                email: item.telecom.length > 0 && item.telecom[1] && item.telecom[1].system == 'email' ? item.telecom[1].value : '',
                city: item.address ? item.address[0].city : '',
                state: item.address ? item.address[0].state : '',
                country: item.address ? item.address[0].country : '',
                zip: item.address ? item.address[0].postalCode : '',
                address: item.address ? item.address[0].line[0] : '',
                address2: '',
                loadmethod: 'ECW API',
                marital:1,
                language: 'English',
                flag: 0,
                loadby: req.body.userid,
            }
            if (item.telecom[2]) entry.email = item.telecom[2].value

            // check exist
            var r = await patientlist.existForAsync({emr_id: entry.emr_id, clinicid: entry.clinicid})
            if (r.length) {
                entry.id = r[0].id
                await patientlist.updateForAync(entry)
                upt ++
            }
            else {
                await patientlist.addForEcwbulk(entry)
                add ++
            }
            cnt ++
        }
    }

    res.status(200).json({total: response.data.length, count: cnt, update: upt, new: add})
}
