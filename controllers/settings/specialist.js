const specialist = require('../../repositories/settings/specialist');
const Acl = require('../../middleware/acl');
const manager = require('../../repositories/manager');
const xls = require('xlsx');

if(typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function(match, replace) {
       return this.replace(new RegExp(match, 'g'), () => replace);
    }
}
exports.list = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    specialist.list(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}
exports.add = async(req, res, next) => {
    // var can = await Acl.can(req.user, ['create'], 'USER_MANAGE');
    // if(!can)return res.status(405).json('Not Permission');
    let entry = {
        fname: req.body.fname,
        lname: req.body.lname,
        mname: req.body.mname,
        plocation: req.body.plocation,
        speciality: req.body.speciality,
        npi: req.body.npi,
        license: req.body.license,
        email: req.body.email,
        tel: req.body.tel,
        cel: req.body.cel,
        address: req.body.address,
        fax: req.body.fax,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        cname: req.body.cname,
        cemail: req.body.cemail,
        ccel: req.body.ccel,
        type: 3,
        specialty_id: req.body.specialty_id,
        insurance_id: req.body.insurance_id,
        status: 1
    }
    let check = await manager.checkuser(entry.email);
    if(check.length == 0){
        specialist.add(entry, (err, result) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json({ data: result });
            }
        });
    }
    else{
        res.status(200).json({ data: "existed" });
    }
    
}
exports.update = async(req, res, next) => {
    // var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    // if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        mname: req.body.mname,
        plocation: req.body.plocation,
        speciality: req.body.speciality,
        npi: req.body.npi,
        license: req.body.license,
        email: req.body.email,
        tel: req.body.tel,
        cel: req.body.cel,
        address: req.body.address,
        fax: req.body.fax,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        cname: req.body.cname,
        cemail: req.body.cemail,
        ccel: req.body.ccel,
        type: 3,
        status: req.body.status,
        specialty_id: req.body.specialty_id,
        insurance_id: req.body.insurance_id,
        taxonomy: req.body.taxonomy
    }
    specialist.update(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.chosen = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    specialist.chosen(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.delete = async(req, res, next) => {
    // var can = await Acl.can(req.user, ['create'], 'USER_MANAGE');
    // if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    specialist.delete(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.updatepwd = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        pwd: req.body.pwd,
    }
    specialist.updatepwd(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.updateanswer = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        question_id: req.body.question_id,
        answer: req.body.answer,
    }
    specialist.updateanswer(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.updateclinics = async(req, res, next) => {
    // var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    // if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        clinics: req.body.clinics,
    }
    specialist.updateclinics(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getSpecialistByClinic = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    specialist.getSpecialistByClinic(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

function getKey(fname, lname, phone){
    var key = fname?fname.toString().split(" ")[0]:"";
    key += lname?lname.toString().split(" ")[0]:"";
    key += phone?phone:"";
    return key;
}

exports.import = async (req, res, next) => {
    var datas = xls.readFile(req.files[0].path);
    var sheet_name_list = datas.SheetNames;
    var xData = xls.utils.sheet_to_json(datas.Sheets[sheet_name_list[0]]);

    specialist.import(xData, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
