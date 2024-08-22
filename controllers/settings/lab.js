
const lab = require('../../repositories/settings/lab')
const xlsx = require('node-xlsx')
const Acl = require('../../middleware/acl')

exports.get = async(req, res, next) => {
    lab.get((err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({data: result})
        }
    })
}

exports.list = async(req, res, next) => {
    lab.list(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })
}

exports.add = async(req, res, next) => {
    lab.add(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
}

exports.update = async(req, res, next) => {
    lab.update(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
}

exports.chosen = async(req, res, next) => {
    lab.chosen(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
}

exports.delete = async(req, res, next) => {
    lab.delete(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result })
        }
    })
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

exports.labloader = async(req, res, next) => {
    let clinicid = req.body.clinicid
    let userid = req.body.userid
    let labid = req.body.labid

    let data = await lab.chosenForAsync({id: labid})
    var filter = {
        clinicid: clinicid,
        lid: data[0] ? data[0].loinc_id : 0
    }

    let filePath = req.files[0].path
    let pureSheet = []

    const workSheetsFromFile = xlsx.parse(filePath)
    pureSheet = workSheetsFromFile[0].data
    let headers = pureSheet[0]
    let rowCounter = 0
    let newLabs = 0
    if (pureSheet.length < 1) return

    let allLabs = await lab.getPtLabsByFilterForAsync(filter)

    for (row of pureSheet) {
        if (rowCounter > 0) {
            let entry = {
                id: '',
                clinicid: clinicid,
                pcpid: row[headers.indexOf("doctorid")] ?? '',
                ptid: row[headers.indexOf("patientId")] ?? null,
                lid: filter.lid,
                lid1: '',
                labfhirid: '',
                labname: '',
                lab_root_name: row[headers.indexOf("Lab_testName")] ?? '',
                reportid: row[headers.indexOf("RId_HL7")] ?? null,
                value: row[headers.indexOf("value_HL7")] ?? '',
                value1: '',
                resultstatus: '',
                dos: row[headers.indexOf("Lab_ResultDate")] ? ExcelDateToJSDate(row[headers.indexOf("Lab_ResultDate")]) : '1900-01-01',
                deleted: '',
                updatemethod: 'Excel',
                loadmethod: 'Excel',
                updateby: userid,
                createby: userid,
                createdate: new Date(Date.now()).toISOString().substr(0, 10),
                encid: row[headers.indexOf("Lab_D_Encounter")] ?? '',
                visittype: row[headers.indexOf("VISIT_TYPE")] ?? '',
                visitstatus: row[headers.indexOf("ENC_STATUS")] ?? '',
                visitdate: row[headers.indexOf("date")] ? ExcelDateToJSDate(row[headers.indexOf("date")]) : '1900-01-01',
                vtype: ''
            }
            if (!allLabs.find(o => {
                entry.id = o.id
                return o.clinicid = entry.clinicid && o.ptid == entry.ptid && o.lid == entry.lid
            })) {
                await lab.addPtLabsForAsync(entry)
                newLabs ++
            } else {
                await lab.upatePtLabsForAsync(entry)
            }
        }
        rowCounter ++
    }

    res.status(200).json({total: await lab.getPtLabsCountByFilterForAsync(filter), readCount: rowCounter - 1, addCount: newLabs})
}
