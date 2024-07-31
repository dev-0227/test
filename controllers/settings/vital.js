const vitals = require('../../repositories/settings/vital');
const event = require('../../repositories/event');
const Acl = require('../../middleware/acl');
const xlsx = require('node-xlsx');

exports.list = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(200).json({ data: [] });
    vitals.list((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
    
}

exports.add = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        vname: req.body.name,
        vdescription: req.body.description,
        vdescription: req.body.description,
        LOINC: req.body.code.toString().trim(),
        LOINC_Name: req.body.comment,
        UCUM_Units: req.body.unit,
        SNOMED: req.body.snomed,
        ECL: req.body.ecl,
    }
    vitals.add(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            entry = {
                user_id: req.body.user_id,
                type_id: 11, //Patient Record
                subtype_id: 38, //create
                outcome_id: 5, //'success',
                action_id: 1, //'Create',
                description: 'Added vital',
                model_name: 'f_vital',
                model_id: result.insertId
            }
            event.logger(entry);
            res.status(200).json({ data: result });
        }
    });
}

exports.chosen = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    vitals.chosen(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.update = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        vname: req.body.name,
        vdescription: req.body.description,
        vdescription: req.body.description,
        LOINC: req.body.code.toString().trim(),
        LOINC_Name: req.body.comment,
        UCUM_Units: req.body.unit,
        SNOMED: req.body.snomed,
        ECL: req.body.ecl,
    }
    vitals.update(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            entry = {
                user_id: req.body.user_id,
                type_id: 11, //Patient Record
                subtype_id: 31, //Update
                outcome_id: 5, //'success',
                action_id: 3, //'Update',
                description: "Updated vital",
                model_name: 'f_vital',
                model_id: req.body.id
            }
            event.logger(entry);
            res.status(200).json({ data: result });
        }
    });
}

exports.delete = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    vitals.delete(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}



exports.getpt = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(200).json('Not Permission');

    vitals.getpt((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.addpt = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    
    vitals.addpt(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.chosenpt = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    
    vitals.chosenpt(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.updatept = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    
    vitals.updatept(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.deletept = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'SETTING_VITAL_INFO');
    if(!can)return res.status(405).json('Not Permission');
    
    vitals.deletept(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}



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

exports.vitalloader = async(req, res, next) => {
    // 1. getpatient vital information begin //
    let vitalList = await vitals.getpt()

    let pureSheet = []

    const workSheetsFromFile = xlsx.parse(req.files[0].path)
    pureSheet = workSheetsFromFile[0].data
    let headers = pureSheet[0]
    let rowCounter = 0
    let addCount = 0

    if(pureSheet.length < 1) return
    // 1. getpatient vital information end //

    // 2. add patient vital information begin //

    var vid = await vitals.chosenForAsync({vname: 'BP-S'})
    var vid1 = await vitals.chosenForAsync({vname: 'BP-D'})
    var vid2 = await vitals.chosenForAsync({vname: 'BP'})

    for (row of pureSheet) {
        if (rowCounter > 0) {
            let vData = {
                vid: vid[0].LOINC,
                vid1: vid1[0].LOINC,
                vid2: vid2[0].LOINC,
                encid: row[headers.indexOf('encounterid')],
                clinicid: req.body.clinicid,
                pcpid: row[headers.indexOf('doctorid')],
                ptid: 0,
                ptemrid: row[headers.indexOf('patientId')],
                value: row[headers.indexOf('Value')] ? row[headers.indexOf('Value')] : '',
                value1: row[headers.indexOf('Value1')] ? row[headers.indexOf('Value1')] : '',
                value2: row[headers.indexOf('Value2')] ? row[headers.indexOf('Value2')] : '',
                vdate: row[headers.indexOf("date")] ? ExcelDateToJSDate(row[headers.indexOf("date")]) : '',
                deleted: 0,
                updatemethod: '',
                updateby: req.body.userid,
                createddate: new Date(Date.now()).toISOString().substr(0, 10),
                visittype: row[headers.indexOf('ENC_VISIT_TYPE')],
                visitstatus: row[headers.indexOf('ENC_STATUS')],
                loadmethod: 'Excel',
                vtype: req.body.vtype
            }
            var _id = 0
            if (!vitalList.find(o => {
                _id = o.id
                return o.encid == row[headers.indexOf('encounterid')] && o.vtype == req.body.vtype && o.clinicid == req.body.clinicid
            })) { // add new
                await vitals.addpt(vData)
                addCount ++
            } else { // update
                vData.id = _id
                await vitals.updatept(vData)
            }
        }
        rowCounter ++
    }
    // 2. add patient vital information end //

    // 3. get total patient vital information begin //
    let totalCount = await vitals.countTotal()
    // 3. get total patient vital information end //
    res.status(200).json({total: totalCount, readCount: rowCounter - 1, addCount: addCount})
}

exports.ecwbulk = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'LOADERS_VITAL_LOADER');
    if(!can)return res.status(405).json('Not Permission');

    vitals.ecwbulk(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
