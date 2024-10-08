const insurance = require('../repositories/insurance');


exports.list = (req, res, next) => {
    insurance.list((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getHedisList = (req, res, next) => {
    insurance.getHedisList((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}


exports.add = async (req, res, next) => {
    let entry = {
        name: req.body.name,
        abbr: req.body.abbr,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        hedis: req.body.hedis,
        status: req.body.status,
        lob: req.body.lob,
        // instype: req.body.instype,
        // payment_method: req.body.payment_method,
    }
    insurance.add(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.update = (req, res, next) => {
    let entry = {
        id: req.body.id,
        name: req.body.name,
        abbr: req.body.abbr,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        hedis: req.body.hedis,
        status: req.body.status,
        lob: req.body.lob,
        // instype: req.body.instype,
        // payment_method: req.body.payment_method,
    }
    insurance.update(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.chosen = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.chosen(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.delete = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.delete(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
/*
* Insurance Lob Map
*/
exports.insLobMapList = (req, res, next) => {
    insurance.insLobMapList(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })
}
exports.getInsLobMap = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.getInsLobMap(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.addInsLobMap = (req, res, next) => {
    let entry = {
        ecw_lobinsid: req.body.ecw_lobinsid,
        insid: req.body.insid,
        lobid: req.body.lobid,
        clinicid: req.body.clinicid,
        ecw_insid: req.body.ecw_insid,
    }
    insurance.addInsLobMap(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.updateInsLobMap = (req, res, next) => {
    let entry = {
        id: req.body.id,
        ecw_lobinsid: req.body.ecw_lobinsid,
        insid: req.body.insid,
        lobid: req.body.lobid,
        clinicid: req.body.clinicid,
        ecw_insid: req.body.ecw_insid,
    }
    insurance.updateInsLobMap(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.chosenInsLobMap = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.chosenInsLobMap(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.deleteInsLobMap = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.deleteInsLobMap(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.setInsLobMap = async(req, res, next) => {
    return new Promise((resolve, reject) => {
        insurance.setInsLobMap(req.body, (err, result) => {
            if (!err) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}
/*
* Insurance Lob Controller
*/
exports.lobList = (req, res, next) => {
    insurance.lobList(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })
}
exports.getlob = (req, res, next) => {
    insurance.getlob(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.addlob = (req, res, next) => {
    let entry = {
        insid: req.body.insid,
        clinicid: req.body.clinicid,
        name: req.body.name,
        desc: req.body.desc,
        variation: req.body.variation,
        type: req.body.type,
        emrid: req.body.emrid,
        fhirid: req.body.fhirid
    }
    insurance.addlob(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.updatelob = (req, res, next) => {
    let entry = {
        id: req.body.id,
        insid: req.body.insid,
        clinicid: req.body.clinicid,
        name: req.body.name,
        desc: req.body.desc,
        variation: req.body.variation,
        type: req.body.type,
        emrid: req.body.emrid,
        fhirid: req.body.fhirid,
    }
    insurance.updatelob(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.chosenlob = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.chosenlob(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.deletelob = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.deletelob(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.setDefaultIns = (req, res, next) => {
    let entry = {
        ins_id: req.body.ins_id,
        user_id: req.body.user_id
    }
    insurance.setDefaultIns(entry, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.getDefaultIns = (req, res, next) => {
    let entry = {
        user_id: req.body.user_id
    }
    insurance.getDefaultIns(entry, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.gettypeItem = (req, res, next) => {
    insurance.gettypeItem((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
/*
* Insurance Type Controller
*/
exports.gettype = (req, res, next) => {
    insurance.gettype(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}

exports.addtype = (req, res, next) => {
    let type = {
        display: req.body.display,
        description: req.body.description
    }
    insurance.addtype(type, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.deletetype = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.deletetype(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.chosentype = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.chosentype(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.updatetype = (req, res, next) => {
    let entry = {
        id: req.body.id,
        display: req.body.display,
        description: req.body.description,
    }
    insurance.updatetype(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
/*
* Payment Method Controller
*/
exports.getPaymentMethod = (req, res, next) => {
    insurance.getPaymentMethod((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.addPaymentMethod = (req, res, next) => {
    let type = {
        display: req.body.display,
        description: req.body.description
    }
    insurance.addPaymentMethod(type, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.delPaymentMethod = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.delPaymentMethod(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getPaymentMethodById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    insurance.getPaymentMethodById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.updatePaymentMethod = (req, res, next) => {
    let entry = {
        id: req.body.id,
        display: req.body.display,
        description: req.body.description,
    }
    insurance.updatePaymentMethod(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
