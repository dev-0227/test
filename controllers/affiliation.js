
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
