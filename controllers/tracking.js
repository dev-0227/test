
const setting = require('../repositories/tracking');
const tracking = require('../repositories/tracking')
const Acl = require('../middleware/acl');

exports.getAllPatientTracking = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    setting.getAllPatientTracking(req.query, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}

exports.getPtInsTrackByPtId = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    tracking.getPtInsTrackByPtId(req.body, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({data: result});
        }
    });
}
