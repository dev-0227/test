
const setting = require('../repositories/tracking');
const tracking = require('../repositories/tracking')
const Acl = require('../middleware/acl');

exports.getAllPatientTracking = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'PATIENT_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    setting.getAllPatientTracking(req.query, (err, result) => {
        if (err) {
            res.status(405).json(err);
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
            res.status(405).json(err);
        } else {
            res.status(200).json({data: result});
        }
    });
}

exports.getAllFFSTracking = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'FFS_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    tracking.getAllFFSTracking(req.query, (err, result) => {
        if (err) {
            res.status(405).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}

exports.getFFSTrackByPtId = async(req, res, next) => {
    var can = await Acl.can(req.user, ['create'], 'FFS_TRACKING');
    if(!can)return res.status(405).json('Not Permission');

    tracking.getFFSTrackByPtId(req.body, (err, result) => {
        if (err) {
            res.status(405).json(err);
        } else {
            res.status(200).json({data: result});
        }
    });
}

exports.ffsExport = async(req, res, next) => {
    var can = await Acl.can(req.user, ['write'], 'FFS_TRACKING');
    if(!can)return res.status(405).json('Not Permission');
    
    await track.getNewFFS(req.body, (err, result) => {
        if (err) {
            res.status(404).json([])
        } else {
            var url = 'uploads'
            var filename = `FFS-${req.body.name}(${req.body.year}-${req.body.month}).csv`
            var myWorkSheet = csv.utils.json_to_sheet(result)
            var myWorkBook = csv.utils.book_new()
            csv.utils.book_append_sheet(myWorkBook, myWorkSheet, 'myWorkSheet')
            var write = async () => {
                await csv.writeFile(myWorkBook, url + '/' + filename)
            }
            write().then(() => {
                res.status(200).json({data: {
                    filename: filename,
                    url: url
                }})
            })
        }
    })
}
