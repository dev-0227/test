const express = require('express');
const controller = require('../controllers/setting');
const diagnosticProcedures = require('../controllers/settings/diagnosticprocedures');
const vitalController = require('../controllers/settings/vital');
const AuthGuard = require('../middleware/auth');
const relateController = require('../controllers/settings/relationship');
const ecwbulk = require('../controllers/settings/ecwbulk')
const lab = require('../controllers/settings/lab')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const config = require('../config');

// Get all logs route 
router.get('/');
router.get('/getstripe', controller.getstripe);
router.get('/getallquestions', controller.getallquestions);
router.post('/getallvkey', controller.getallvkey);
router.post('/getallrole', controller.getallrole);
router.post('/getallworkpc', controller.getallworkpc);
router.get('/getquestions', controller.getquestions);
router.post('/addsq', controller.addsq);
router.post('/updatesq', controller.updatesq);
router.post('/chosensq', controller.chosensq);
router.post('/deletesq', controller.deletesq);
router.post('/addvkey', controller.addvkey);
router.post('/updatevkey', controller.updatevkey);
router.post('/chosenvkey', controller.chosenvkey);
router.post('/deletevkey', controller.deletevkey);
router.post('/addrole', controller.addrole);
router.post('/updaterole', controller.updaterole);
router.post('/chosenrole', controller.chosenrole);
router.post('/deleterole', controller.deleterole);
router.post('/addworkpc', controller.addworkpc);
router.post('/deleteworkpc', controller.deleteworkpc);
router.get('/getchosenclinics', AuthGuard, controller.getchosenclinics);
router.get('/clinic/getAll', AuthGuard, controller.allclinic);
router.get('/getchoseninsurances', controller.getchoseninsurances);
router.get('/gethedisyear', controller.gethedisyear);
router.get('/gethediscolor', controller.gethediscolor);
router.post('/getoutputbtn', controller.getoutputbtn);
router.post('/getClinicins', controller.getClinicins);
router.post('/getClinic', controller.getClinic);
router.post('/getPhone', controller.getPhone);
router.post('/updatePhone', controller.updatePhone);
router.post('/getLogoaddress', controller.getLogoaddress);
router.post('/getPriceSMS', controller.getPriceSMS);
router.post('/getPricecall', controller.getPricecall);

router.post('/getAutoAmountSMS', controller.getAutoAmountSMS);
router.post('/getAutopayment', controller.getAutopayment);
router.post('/updatePriceSMS', controller.updatePriceSMS);
router.post('/updatePricecall', controller.updatePricecall);

router.post('/updateRepAmountSMS', controller.updateRepAmountSMS);
router.post('/updateRepCountsSMS', controller.updateRepCountsSMS);
router.post('/updateActivatesms', controller.updateActivatesms);
router.post('/updateActivatecall', controller.updateActivatecall);

router.post('/updateAutopayment', controller.updateAutopayment);
router.post('/getdatehedisloaded', controller.getdatehedisloaded);
router.post('/getavaiuserchosenclinic', controller.getavaiuserchosenclinic);
router.post('/getLanguage', controller.getLanguage);
router.post('/getHedisalerts', controller.getHedisalerts);
router.post('/setHedisalerts', controller.setHedisalerts);
router.post('/getptinfo', controller.getptinfo);
router.post('/contact', controller.contact);
router.get('/getcontacts', controller.getcontacts);
router.post('/deletecontact', controller.deletecontact);
router.post('/getcredithistory', controller.getcredithistory);

router.get('/getcontactquestions', controller.getcontactquestions);
router.post('/addcontactq', controller.addcontactq);
router.post('/updatecontactq', controller.updatecontactq);
router.post('/chosencontactq', controller.chosencontactq);
router.post('/deletecontactq', controller.deletecontactq);

router.get('/getcontactr', controller.getcontactr);
router.post('/addcontactr', controller.addcontactr);
router.post('/chosencontactr', controller.chosencontactr);
router.post('/updatecontactr', controller.updatecontactr);
router.post('/deletecontactr', controller.deletecontactr);

router.post('/getmodules', controller.getmodules);
router.get('/getcontactm', controller.getcontactm);
router.post('/addcontactm', controller.addcontactm);
router.post('/chosencontactm', controller.chosencontactm);
router.post('/updatecontactm', controller.updatecontactm);
router.post('/deletecontactm', controller.deletecontactm);
router.post('/generatemodule', controller.generatemodule);
router.post('/addconnection', controller.addconnection);
router.post('/updateconnectiondesc', controller.updateconnectiondesc);
router.post('/updateconnectiondesctype', controller.updateconnectiondesctype);
router.post('/getconnectiondesc', controller.getconnectiondesc);
router.post('/updateqrcodevalue', controller.updateqrcodevalue);
router.post('/updateqrcodeemails', controller.updateqrcodeemails);
router.post('/getqrcodetype', controller.getqrcodetype);
router.post('/getconnections', controller.getconnections);
router.post('/deleteconnections', controller.deleteconnections);
router.post('/chosenconnection', controller.chosenconnection);

router.get('/diagnosticprocedures', AuthGuard, diagnosticProcedures.list);
router.post('/diagnosticprocedures/create', AuthGuard, diagnosticProcedures.create);
router.post('/diagnosticprocedures/chosen', AuthGuard, diagnosticProcedures.chosen);
router.post('/diagnosticprocedures/update', AuthGuard, diagnosticProcedures.update);
router.post('/diagnosticprocedures/delete', AuthGuard, diagnosticProcedures.delete);

router.get('/vital', AuthGuard, vitalController.list);
router.post('/vital/add', AuthGuard, vitalController.add);
router.post('/vital/chosen', AuthGuard, vitalController.chosen);
router.post('/vital/update', AuthGuard, vitalController.update);
router.post('/vital/delete', AuthGuard, vitalController.delete);

router.post('/getcallactive',controller.getcallactive);
router.post('/addtwiliosubaccount',controller.addtwiliosubaccount);
router.post('/gettwiliosubaccount',controller.gettwiliosubaccount);

router.post('/appointment/doctor/type', controller.getAppointmentDoctorType);
router.post('/appointment/doctor/type/set', controller.setAppointmentDoctorType);

router.post('/relationship/getOrganizationByClinic', AuthGuard, relateController.getOrganizationByClinic);
router.post('/relationship/add', AuthGuard, relateController.add);
router.post('/relationship/updateOrganization', AuthGuard, relateController.updateOrganization);
router.post('/relationship/delete', AuthGuard, relateController.delete);
router.post('/relationship/set', AuthGuard, relateController.set);
router.post('/relationship/getOrganizationBySpecialist', AuthGuard, relateController.getOrganizationBySpecialist);
router.post('/relationship/getOrganizationNames', AuthGuard, relateController.getOrganizationNames);

// not used begin //
router.get('/map/get', AuthGuard, controller.getAllInsMap)
router.post('/map/add', AuthGuard, controller.addInsMap)
router.post('/map/update', AuthGuard, controller.updateInsMap)
router.post('/map/getbyclinicid', AuthGuard, controller.getByClinicId)
router.post('/map/getbyinsid', AuthGuard, controller.getByInsId)
router.post('/map/get', AuthGuard, controller.getInsMap)
router.post('/map/delete', AuthGuard, controller.deleteInsMap)
router.post('/map/deletebyinsid', AuthGuard, controller.deleteByInsId)
// not used end //

router.post('/bulk/getForPatient', AuthGuard, ecwbulk.getForPatient)
router.post('/bulk/getForPatientById', AuthGuard, ecwbulk.getForPatientById)
router.post('/bulk/getForEncounter', AuthGuard, ecwbulk.getForEncounter)
router.post('/bulk/getForEncounterById', AuthGuard, ecwbulk.getForEncounterById)
router.post('/bulk/add', AuthGuard, ecwbulk.addBulk)
router.post('/bulk/edit', AuthGuard, ecwbulk.editBulk)
router.post('/bulk/delete', AuthGuard, ecwbulk.deleteBulk)

// lab begin //
const storage = multer.diskStorage({
    destination: config.common.uploads,
    filename: (req, file, cb) => {
        cb(null, 'lablist-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).array('labfile');

router.post('/labloader', (req, res, next) => {
    upload(req, res, (err) => {
        if (!err) {
            lab.labloader(req, res, next);
        }
    });
});

router.post('/lab/get', AuthGuard, lab.get)
router.get('/lab', AuthGuard, lab.list)
router.post('/lab/add', AuthGuard, lab.add)
router.post('/lab/update', AuthGuard, lab.update)
router.post('/lab/chosen', AuthGuard, lab.chosen)
router.post('/lab/delete', AuthGuard, lab.delete)
// lab end //

module.exports = router;
