const specialist = require('../../repositories/settings/specialist');
const Acl = require('../../middleware/acl');
const xls = require('xlsx');
const config = require('../../config');
const fs = require('fs');
const loadFile = require('../../utilities/utils');

if(typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function(match, replace) {
       return this.replace(new RegExp(match, 'g'), () => replace);
    }
}
exports.list = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE')
    if(!can)return res.status(405).json('Not Permission')

    specialist.list(req.query, async (err, result) => {
        if (err) {
            res.status(404).json("Failed!")
        } else {
            for (var i = 0; i < result['data'].length; i ++) {
                if (result['data'][i]['photo'] != '') {
                    let buffer = await loadFile(`${config.common.uploads}photoes/${result['data'][i]['photo']}`)
                    if (buffer.length == 0) {
                        result['data'][i]['photo'] = result['data'][i]['fname'].substr(0, 1).toUpperCase()
                    } else {
                        result['data'][i]['photo'] = buffer
                    }
                } else {
                    result['data'][i]['photo'] = result['data'][i]['fname'].substr(0, 1).toUpperCase()
                }
            }
        }
        res.status(200).json(result)
    })
}
exports.listBymeasureID = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE');
    if(!can)return res.status(405).json('Not Permission');

    if (req.query.measureid === null || req.query.measureid === undefined || req.query.measureid === '') res.status(200).json({data: []});
    else {
        specialist.listBymeasureID(req.query, (err, result) => {
            if (err) {
                res.status(404).json("Failed!");
            } else {
                res.status(200).json(result);
            }
        });
    }
}
exports.add = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'SPECIALIST_MANAGE');
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
    var can = await Acl.can(req.user, ['write'], 'SPECIALIST_MANAGE')
    if(!can)return res.status(405).json('Not Permission')

    var imgpath = ''
    specialist.getPhotoName(req.body.id, async(err, res1) => {
        if (!err) {
            imgpath = res1[0].photo
        }
        //if state is update, read photo name uploaded.
        if (req.body.photostate == 'update' ) {    
            if (imgpath != '') {
                await specialist.deleteImage(config.common.uploads + 'photoes/' + imgpath)
            }
        } else if (req.body.photostate == 'none') {
            req.body.photo = res1[0].photo
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
                res.status(404).json(err)
            } else {
                res.status(200).json({ data: result })
            }
        })
    })
}
exports.chosen = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    specialist.chosen(entry, async (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            if (result[0]['photo'] != '') {
                let buffer = await loadFile(`${config.common.uploads}photoes/${result[0]['photo']}`)
                if (buffer.length == 0) {
                    result[0]['photo'] = result[0]['fname'].substr(0, 1).toUpperCase()
                } else {
                    result[0]['photo'] = buffer
                }
            } else {
                result[0]['photo'] = result[0]['fname'].substr(0, 1).toUpperCase()
            }
            res.status(200).json({ data: result })
        }
    })
}
exports.delete = async(req, response, next) => {
    var can = await Acl.can(req.user, ['create'], 'SPECIALIST_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    specialist.getPhotoName(entry.id, async (err1, res) => {
        var imgpath = ''
        if (!err1)
            imgpath = res[0]['photo']

        specialist.delete(entry, async (err2, result) => {
            if (err2) {
                response.status(404).json("Failed!")
            } else {
                await specialist.deleteImage(`${config.common.uploads}photoes/${imgpath}`)
                response.status(200).json({ data: result })
            }
        })
    })
}
exports.updatepwd = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'SPECIALIST_MANAGE');
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
    var can = await Acl.can(req.user, ['write'], 'SPECIALIST_MANAGE');
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
exports.updateclinic = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'SPECIALIST_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        clinics: req.body.clinics,
    }
    specialist.updateclinic(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getSpecialistByClinic = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE');
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
    var can = await Acl.can(req.user, ['write'], 'SPECIALIST_MANAGE');
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
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE');
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
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE');
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
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE');
    if(!can)return res.status(405).json('Not Permission');
    
    let entry = {
        measureid: req.body.measureid,
        clinicid: req.body.clinicid
    }
    if (req.body.measureid === undefined || req.body.measureid === null) res.status(200).json({data: []});
    else {
        specialist.getSpecialistByMeasureId(entry, (err, result) => {
            if (err) res.status(404).json(err);
            else res.status(200).json({data: result});
        });
    }
}

exports.updateClinics = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'SPECIALIST_MANAGE');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
         clinics: req.body.clinics
    }
    specialist.updateClinics(entry, (err, result) => {
        if (err) res.status(404).json(err);
        else res.status(200).json({data: result});
    })
}

exports.getSpecialistByClinic = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'SPECIALIST_MANAGE');
    if(!can)return res.status(405).json('Not Permission');

    let entry = {
         clinic_id: req.body.clinic_id
    }
    specialist.getSpecialistByClinic(entry, async (err, result) => {
        if (err) res.status(404).json(err)
        else {
            for (var i = 0; i < result.length; i ++) {
                if (result[i]['photo'] != '') {
                    let buffer = await loadFile(`${config.common.uploads}photoes/${result[i]['photo']}`)
                    if (buffer.length == 0) {
                        result[i]['photo'] = result[i]['fname'].substr(0, 1).toUpperCase()
                    } else {
                        result[i]['photo'] = buffer
                    }
                } else {
                    result[i]['photo'] = result[i]['fname'].substr(0, 1).toUpperCase()
                }
            }
            res.status(200).json({data: result})
        }
    })
}
