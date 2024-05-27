const organization = require('../../repositories/settings/organization');

// organization type

exports.list_type = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    organization.list_type((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.add_type = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    //check duplicate
    organization.getid_type(entry, (err, result) => {
        if (result.length) res.status(200).json({msg: 'exist'});
        else {
            organization.add_type(entry, (err, result) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json({ data: result });
                }
            });
        }
    });
}

exports.chosen_type = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    organization.chosen_type(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.update_type = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    organization.getid_type(entry, (err, result) => {
        if (result.length && result[0].id != entry.id) res.status(200).json({msg: 'exist'});
        else {
            organization.update_type(entry, (err, result) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json({ data: result });
                }
            });
        }
    });
}

exports.delete_type = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    organization.delete_type(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

 // organization

exports.list = async(req, res, next) => {

    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    organization.list(req.query, (err, result) => {
        if (err) {
            res.status(404).json("Failed");
        } else {
            res.status(200).json(result);
            return;
        }
    });
}

exports.add = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        status: req.body.status,
        name: req.body.name,
        type: req.body.type,
        alias: req.body.alias,
        mode: req.body.mode,
        address1: req.body.address1,
        address2: req.body.address2,
        address3: req.body.address3,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        phone3: req.body.phone3,
        mobile: req.body.mobile,
        fax: req.body.fax,
        email: req.body.email,
        description: req.body.description,
        characteristic: req.body.characteristic,
        city: req.body.city,
        state: req.body.state,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        altitude: req.body.altitude,
        daysoperation: req.body.daysoperation,
        hoursoperation:req.body.hoursoperation,
        virticalservice: req.body.virticalservice,
        endpoint: req.body.endpoint,
        map: req.body.map,
        zip: req.body.zip
    }
    organization.getid(entry, (err, result) => {
        if (result.length) res.status(200).json({msg: 'exist'});
        else {
            organization.add(entry, (err, result) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json({ data: result });
                }
            });
        }
    });
}

exports.chosen = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    organization.chosen(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.update = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id,
        status: req.body.status,
        name: req.body.name,
        type: req.body.type,
        alias: req.body.alias,
        mode: req.body.mode,
        address1: req.body.address1,
        address2: req.body.address2,
        address3: req.body.address3,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        phone3: req.body.phone3,
        mobile: req.body.mobile,
        fax: req.body.fax,
        email: req.body.email,
        description: req.body.description,
        characteristic: req.body.characteristic,
        city: req.body.city,
        state: req.body.state,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        altitude: req.body.altitude,
        daysoperation: req.body.daysoperation,
        hoursoperation:req.body.hoursoperation,
        virticalservice: req.body.virticalservice,
        endpoint: req.body.endpoint,
        map: req.body.map,
        zip: req.body.zip
    }
    organization.getid(entry, (err, result) => {
        if (result.length && result[0].id != entry.id) res.status(200).json({msg: 'exist'});
        else {
            organization.update(entry, (err, result) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json({ data: result });
                }
            });
        }
    });
}

exports.delete = async(req, res, next) => {
    var can = req.user['role']=="0"?true:false;
    if(!can)return res.status(405).json('Not Permission');
    let entry = {
        id: req.body.id
    }
    organization.delete(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
