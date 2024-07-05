const provider = require('../../repositories/settings/provider');
const Acl = require('../../middleware/acl');
const xls = require('xlsx');
const config = require('../../config');
const fs = require('fs');
const loadFile = require('../../utilities/utils');

if(typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function(match, replace) {
       return this.replace(new RegExp(match, 'g'), () => replace)
    }
}
exports.list = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS')
    if(!can)return res.status(405).json('Not Permission')

    provider.list(req.query, async (err, result) => {
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
                if (result['data'][i]['sign'] != '') {
                    let buffer = await loadFile(`${config.common.uploads}photoes/${result['data'][i]['sign']}`)
                    buffer.length == 0 ? result['data'][i]['sign'] = '' : result['data'][i]['sign'] = buffer
                }
            }
        }
        res.status(200).json(result)
    })
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
        sign: req.body.sign,
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
    var can = await Acl.can(req.user, ['write'], 'CLINIC_PROVIDERS')
    if(!can)return res.status(405).json('Not Permission')

    var imgpath_photo = ''
    var imgpath_sign = ''

    provider.getImageNames(req.body.id, async(err, res1) => {
        if (!err) {
            imgpath_photo = res1[0].photo
            imgpath_sign = res1[0].sign
        }
        // provider photo
        //if state is update, read photo name uploaded.
        if (req.body.photostate == 'update' ) {    
            if (imgpath_photo != '') {
                await provider.deleteImage(config.common.uploads + 'photoes/' + imgpath_photo)
            }
        } else if (req.body.photostate == 'none') {
            req.body.photo = res1[0].photo
        }
        // provider sign
        //if state is update, read sign name uploaded.
        if (req.body.signstate == 'update' ) {
            if (imgpath_sign != '') {
                await provider.deleteImage(config.common.uploads + 'photoes/' + imgpath_sign)
            }
        } else if (req.body.signstate == 'none') {
            req.body.sign = res1[0].sign
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
            photo: req.body.photo,
            sign: req.body.sign,
        }
        provider.update(entry, (err, result) => {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json({ data: result })
            }
        })
    })
}
exports.chosen = async(req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    provider.chosen(entry, async (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            // read provider photo
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
            // read provider sign
            if (result[0]['sign'] != '') {
                let buffer = await loadFile(`${config.common.uploads}photoes/${result[0]['sign']}`)
                buffer.length == 0 ? result[0]['sign'] = '' : result[0]['sign'] = buffer
            }

            res.status(200).json({ data: result })
        }
    })
}
exports.delete = async(req, response, next) => {
    var can = await Acl.can(req.user, ['create'], 'CLINIC_PROVIDERS');
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    provider.getImageNames(entry.id, async (err1, res) => {
        var imgpath_photo = ''
        var imgpath_sign = ''
        if (!err1) {
            imgpath_photo = res[0]['photo']
            imgpath_sign = res[0]['sign']
        }

        provider.delete(entry, async (err2, result) => {
            if (err2) {
                response.status(404).json("Failed!")
            } else {
                await provider.deleteImage(`${config.common.uploads}photoes/${imgpath_photo}`)
                await provider.deleteImage(`${config.common.uploads}photoes/${imgpath_sign}`)
                response.status(200).json({ data: result })
            }
        })
    })
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

exports.getProviderByClinic = async (req, res, next) => {
    var can = await Acl.can(req.user, ['read'], 'CLINIC_PROVIDERS')
    if(!can)return res.status(405).json('Not Permission')
    provider.getProviderByClinic(req.body, async (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
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
