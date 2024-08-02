
const xlsx = require('node-xlsx');
const Acl = require('../middleware/acl');
const ptanalysisloader = require('../repositories/ptanalysisloader');

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

exports.ptanalysisloader = async(req, res, next) => {
    let all = await ptanalysisloader.getAll()

    let filePath = req.files[0].path;
    let pureSheet = [];
    // Parse a file
    const workSheetsFromFile = xlsx.parse(filePath)
    pureSheet = workSheetsFromFile[0].data
    let headers = pureSheet[0]
    let rowCounter = 0

    for (row of pureSheet) {
        var _id = 0
        if(rowCounter != 0) {
            let data = {
                enccl: row[headers.indexOf('ENC_CL')] ? row[headers.indexOf('ENC_CL')] : '',
                encid: row[headers.indexOf('ENC_ID')] ? row[headers.indexOf('ENC_ID')] : '',
                ptid: row[headers.indexOf('PT_ID')] ? row[headers.indexOf('PT_ID')] : '',
                pcpid: row[headers.indexOf('PCP_ID')] ? row[headers.indexOf('PCP_ID')] : '',
                enctype: row[headers.indexOf('enctype')] ? row[headers.indexOf('enctype')] : '',
                vtype: row[headers.indexOf('VTYPE')] ? row[headers.indexOf('VTYPE')] : '',
                vid: row[headers.indexOf('vid')] ? row[headers.indexOf('vid')] : '',
                vcode: row[headers.indexOf('VCODE')] ? row[headers.indexOf('VCODE')] : '',
                status: row[headers.indexOf('STATUS')] ? row[headers.indexOf('STATUS')] : '',
                date: row[headers.indexOf('date')] ? ExcelDateToJSDate(row[headers.indexOf('date')]) : '',
                clstatus: row[headers.indexOf('CLStatus')] ? row[headers.indexOf('CLStatus')] : '',
                cldate: row[headers.indexOf('CLDate')] ? ExcelDateToJSDate(row[headers.indexOf('CLDate')]) : '',
                ptcopay: row[headers.indexOf('PTCopay')] ? row[headers.indexOf('PTCopay')] : '',
                deduct: row[headers.indexOf('deduct')] ? row[headers.indexOf('deduct')] : '',
                payid: row[headers.indexOf('PayID')] ? row[headers.indexOf('PayID')] : '',
                payorid: row[headers.indexOf('payorId')] ? row[headers.indexOf('payorId')] : '',
                payort: row[headers.indexOf('PayorT')] ? row[headers.indexOf('PayorT')] : '',
                type: row[headers.indexOf('type')] ? row[headers.indexOf('type')] : '',
                tdate: row[headers.indexOf('T_date')] ? ExcelDateToJSDate(row[headers.indexOf('T_date')]) : '',
                tmss: row[headers.indexOf('T_mss')] ? row[headers.indexOf('T_mss')] : '',
                tid: row[headers.indexOf('T_id')] ? row[headers.indexOf('T_id')] : '',
                cpt: row[headers.indexOf('cpt')] ? row[headers.indexOf('cpt')] : '',
                cptdesc: row[headers.indexOf('CPT_DESC')] ? row[headers.indexOf('CPT_DESC')] : '',
                mod1: row[headers.indexOf('Mod1')] ? row[headers.indexOf('Mod1')] : '',
                icd: row[headers.indexOf('ICD')] ? row[headers.indexOf('ICD')] : '',
                icddesc: row[headers.indexOf('ICD_DESC')] ? row[headers.indexOf('ICD_DESC')] : '',
                cptpay: row[headers.indexOf('CPT_PAY')] ? row[headers.indexOf('CPT_PAY')] : '',
                msgcode: row[headers.indexOf('MsgCode')] ? row[headers.indexOf('MsgCode')] : '',
                insname: row[headers.indexOf('InsName')] ? row[headers.indexOf('InsName')] : ''
            }
            if (!all.find(o => {
                _id = o.id
                return o.enccl == row[headers.indexOf('ENC_CL')] && o.encid == row[headers.indexOf('ENC_ID')] && o.ptid == row[headers.indexOf('PT_ID')] && o.pcpid == row[headers.indexOf('PCP_ID')]
            })) {
                // add
                await ptanalysisloader.add(data)
            } else {
                // update
                await ptanalysisloader.update(data)
            }
        }
        rowCounter ++
    }

    var result = await ptanalysisloader.getTotal()

    res.status(200).json({total: result.total})
}

exports.getTotal = async(req, res, next) => {
    res.status(200).json({total: await ptanalysisloader.getTotal()})
}
