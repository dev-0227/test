const provider = require('../../repositories/settings/provider');
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
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');

    provider.list(req.query, (err, result) => {
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
    var can = await Acl.can(req.user, ['create'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        fname: req.body.fname,
        lname: req.body.lname,
        mname: req.body.mname,
        dob: req.body.dob,
        gender: req.body.gender,
        qualification: req.body.qualification,
        npi: req.body.npi,
        license: req.body.license,
        email: req.body.email,
        phone: req.body.phone,
        phone2: req.body.phone2,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        clinic: req.body.clinic,
        zip: req.body.zip,
        type: req.body.type,
        specialty: req.body.specialty,
        status: req.body.status,
        photo: req.body.photo,
        user: req.body.user
    }
    let check = await provider.checkuser(entry.fname, entry.lname, entry.mname, entry.phone);
    if(check.length == 0){
        provider.add(entry, (err, result) => {
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
    var can = await Acl.can(req.user, ['write'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');

    var imgpath = '';
    await provider.getPhotoName(req.body.id, (err, res1) => {
        if (!err) imgpath = res1[0].photo;
        //if state is update, read photo name uploaded.
        if (req.body.photostate == 'update' ) {    
            if (imgpath != '') {
                new Promise((resolve, reject) => {
                    provider.deleteImage(config.common.uploads + 'photoes/' + imgpath, (err) => {
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
            qualification: req.body.qualification,
            npi: req.body.npi,
            license: req.body.license,
            email: req.body.email,
            phone: req.body.phone,
            phone2: req.body.phone2,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            clinic: req.body.clinic,
            zip: req.body.zip,
            type: req.body.type,
            specialty: req.body.specialty,
            status: req.body.status,
            photo: req.body.photo
        }
        provider.update(entry, (err, result) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json({ data: result });
            }
        });
    });
}
exports.chosen = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    provider.chosen(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            if (result[0]['photo'] != '') {
                const filepath = config.common.uploads + 'photoes/';
                fs.readFile(filepath + result[0]['photo'], (err, data) => {
                    if (err) {
                        result[0]['photo'] = '';
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
    var can = await Acl.can(req.user, ['create'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    provider.getPhotoName(entry.id, (err1, res) => {
        var imgpath = '';
        if (!err1) imgpath = res[0]['photo'];

        provider.delete(entry, (err2, result) => {
            if (err2) {
                response.status(404).json("Failed!");
            } else {
                provider.deleteImage(config.common.uploads + 'photoes/' + imgpath, (err3) => {
                    setTimeout(() => {
                        // if (!err3) response.status(200).json({ data: result });
                        // else response.status(201).json({ data: result });
                        response.status(200).json({ data: result });
                    }, 200);
                });
            }
        });
    });
}
exports.updatepwd = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        pwd: req.body.pwd,
    }
    provider.updatepwd(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.updateanswer = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        question_id: req.body.question_id,
        answer: req.body.answer,
    }
    provider.updateanswer(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.updateclinic = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        clinics: req.body.clinics,
    }
    provider.updateclinic(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getProviderByClinic = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    provider.getProviderByClinic(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getClinic = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    provider.getClinic(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.setPCPInfo = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');

    provider.setPCPInfo(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getPCPInfo = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');

    provider.getPCPInfo(req.body, (err, result) => {
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
