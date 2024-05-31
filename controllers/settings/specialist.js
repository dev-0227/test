const specialist = require('../../repositories/settings/specialist');
const Acl = require('../../middleware/acl');
const xls = require('xlsx');
const config = require('../../config');
const fs = require('fs');
const readfile = require('../../utilities/utils');

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
            res.status(404).json("Failed!");
        } else {
            for (var i = 0; i < result['data'].length; i ++) {
                if (result['data'][i]['photo'] != '')
                    result['data'][i]['photo'] = config.common.uploads + 'photoes/' + result['data'][i]['photo'];
            }
            readfile(result['data'], 0, (res1) => {
                res.status(200).json(result);
            });
        }
    });
}
exports.add = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        fname: req.body.fname,
        lname: req.body.lname,
        mname: req.body.mname,
        dob: req.body.dob,
        gender: req.body.gender,
        language: req.body.language,
        speciality: req.body.speciality,
        qualification: req.body.qualification,
        npi: req.body.npi,
        license: req.body.license,
        email: req.body.email,
        tel: req.body.tel,
        cel: req.body.cel,
        address: req.body.address,
        address2: req.body.address2,
        fax: req.body.fax,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        web: req.body.web,
        zip: req.body.zip,
        cname: req.body.cname,
        cemail: req.body.cemail,
        ccel: req.body.ccel,
        type: 3,
        specialty_id: req.body.specialty_id,
        insurance_id: req.body.insurance_id,
        status: 1,
        taxonomy: req.body.taxonomy,
        photo: req.body.photo
    }
    let check = await specialist.checkuser(entry.fname, entry.lname, entry.mname, entry.tel);
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
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');

    var imgpath = '';
    await specialist.getPhotoName(req.body.id, (err, res1) => {
        if (!err) imgpath = res1[0].photo;
        //if state is update, read photo name uploaded.
        if (req.body.photostate == 'update' ) {    
            if (imgpath != '') {
                new Promise((resolve, reject) => {
                    specialist.deleteImage(config.common.uploads + 'photoes/' + imgpath, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
        } else if (req.body.photostate == 'none') {
            req.body.photo = res1[0].photo;
        }

        let entry = {
            id: req.body.id,
            fname: req.body.fname,
            lname: req.body.lname,
            mname: req.body.mname,
            dob: req.body.dob,
            gender: req.body.gender,
            language: req.body.language,
            speciality: req.body.speciality,
            qualification: req.body.qualification,
            npi: req.body.npi,
            license: req.body.license,
            email: req.body.email,
            tel: req.body.tel,
            cel: req.body.cel,
            address: req.body.address,
            address2: req.body.address2,
            web: req.body.web,
            fax: req.body.fax,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
            cname: req.body.cname,
            cemail: req.body.cemail,
            ccel: req.body.ccel,
            type: 3,
            status: req.body.status,
            specialty_id: req.body.specialty_id,
            insurance_id: req.body.insurance_id,
            taxonomy: req.body.taxonomy,
            photo: req.body.photo
        }
        specialist.update(entry, (err, result) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json({ data: result });
            }
        });
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
            if (result[0]['photo'] != '') {
                const filepath = config.common.uploads + 'photoes/';
                fs.readFile(filepath + result[0]['photo'], (err, data) => {
                    if (err) {
                        result[0]['photo'] = '';
                        console.log("Loading Image Error");
                        res.status(200).json({ data: result });
                    } else {
                        result[0]['photo'] = Buffer.from(data).toString('base64');
                        res.status(200).json({ data: result });
                    }
                });
            } else {
                res.status(200).json({ data: result });
            }
        }
    });
}
exports.delete = async(req, response, next) => {
    var can = await Acl.can(req.user, ['create'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    specialist.getPhotoName(entry.id, (err1, res) => {
        var imgpath = '';
        if (!err1) imgpath = res[0]['photo'];

        specialist.delete(entry, (err2, result) => {
            if (err2) {
                response.status(404).json("Failed!");
            } else {
                specialist.deleteImage(config.common.uploads + 'photoes/' + imgpath, (err3) => {
                    setTimeout(() => {
                        if (!err3) response.status(200).json({ data: result });
                        else response.status(201).json({ data: result });
                    }, 200);
                });
            }
        });
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
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
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

exports.updateorganizations = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    
    let entry = {
        id: req.body.id,
        organizations: req.body.organizations
    }
    specialist.updateorganizations(entry, (err, result) => {
        if (err) res.status(404).json(err);
        else res.status(200).json({data: result});
    })
}

exports.getOrgan = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    
    let entry = {
        id: req.body.id
    }
    specialist.getOrgan(entry, (err, result) => {
        if (err) res.status(404).json(err);
        else res.status(200).json({data: result});
    })
}

exports.getClinics = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    
    let entry = {
        id: req.body.id
    }
    specialist.getClinics(entry, (err, result) => {
        if (err) res.status(404).json(err);
        else res.status(200).json({data: result});
    })
}

exports.getSpecialistByMeasureId = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'USER_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    
    let entry = {
        measureid: req.body.measureid
    }
    specialist.getSpecialistByMeasureId(entry, (err, result) => {
        if (err) res.status(404).json(err);
        else res.status(200).json({data: result});
    })
}
