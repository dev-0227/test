
const affiliation = require('../repositories/affiliation')
const Acl = require('../middleware/acl')

exports.get = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.get(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })
}

exports.list = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')

    affiliation.list((err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({data: result})
        }
    })
}

exports.add = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.add(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}

exports.update = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.update(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}

exports.chosen = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.chosen(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}

exports.delete = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.delete(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}


exports.getInsClinicAffiliation = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.getInsClinicAffiliation(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })
}

exports.addInsClinicAffiliation = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.addInsClinicAffiliation(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}

exports.updateInsClinicAffiliation = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.updateInsClinicAffiliation(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}

exports.chosenInsClinicAffiliation = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.chosenInsClinicAffiliation(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}

exports.deleteInsClinicAffiliation = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'AFFILIATIONS')
    if (!can) return res.status(405).json('Not Permission')
    
    affiliation.deleteInsClinicAffiliation(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json({ data: result})
        }
    })
}
