const medadheranceModel = require('../../repositories/settings/medadherance');

// Medications Status Controller
exports.getMedStatus = (req, res, next) => {
    medadheranceModel.getMedStatus((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedStatusById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedStatusById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedStatus = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedStatus(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedStatus = (req, res, next) => {
    let entry = {
        code: req.body.med_status_code,
        system: req.body.med_status_system,
        display: req.body.med_status_display,
        definition: req.body.med_status_definition
    }
    medadheranceModel.addMedStatus(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedStatusById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.updateMedStatusById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Form Controller
exports.getMedForm = (req, res, next) => {
    medadheranceModel.getMedForm((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedFormById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedFormById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedFormById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
    }
    medadheranceModel.updateMedFormById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedForm = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display        
    }
    medadheranceModel.addMedForm(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedForm = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedForm(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Codes Controller
exports.getMedCodes = (req, res, next) => {
    medadheranceModel.getMedCodes((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedCodesById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedCodesById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedCodes = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display        
    }
    medadheranceModel.addMedCodes(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedCodesById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
    }
    medadheranceModel.updateMedCodesById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedCodes = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedCodes(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Dispense Status Controller
exports.getMedDispStatus = (req, res, next) => {
    medadheranceModel.getMedDispStatus((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedDispStatusById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedDispStatusById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedDispStatus = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedDispStatus(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedDispStatus = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.addMedDispStatus(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedDispStatusById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.updateMedDispStatusById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Dispense Performer Controller
exports.getMedDispPerformer = (req, res, next) => {
    medadheranceModel.getMedDispPerformer((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedDispPerformer = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.addMedDispPerformer(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedDispPerformer = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedDispPerformer(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedDispPerformerById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedDispPerformerById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedDispPerformerById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.updateMedDispPerformerById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Request Status Controller
exports.getMedReqStatus = (req, res, next) => {
    medadheranceModel.getMedReqStatus((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedReqStatus = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.addMedReqStatus(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedReqStatus = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedReqStatus(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedReqStatusById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedReqStatusById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedReqStatusById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.updateMedReqStatusById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Request Priority Controller
exports.getMedReqPriority = (req, res, next) => {
    medadheranceModel.getMedReqPriority((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedReqPriority = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.addMedReqPriority(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedReqPriority = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedReqPriority(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedReqPriorityById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedReqPriorityById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedReqPriorityById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.updateMedReqPriorityById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Request Intent Controller
exports.getMedReqIntent = (req, res, next) => {
    medadheranceModel.getMedReqIntent((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedReqIntent = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.addMedReqIntent(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedReqIntent = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedReqIntent(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedReqIntentById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedReqIntentById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedReqIntentById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.updateMedReqIntentById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

// Medications Request Course Therapy Controller
exports.getMedReqCourse = (req, res, next) => {
    medadheranceModel.getMedReqCourse((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.addMedReqCourse = (req, res, next) => {
    let entry = {
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.addMedReqCourse(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.delMedReqCourse = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.delMedReqCourse(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.getMedReqCourseById = (req, res, next) => {
    let entry = {
        id: req.body.id
    }
    medadheranceModel.getMedReqCourseById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}

exports.updateMedReqCourseById = (req, res, next) => {
    let entry = {
        id: req.body.id,
        code: req.body.code,
        system: req.body.system,
        display: req.body.display,
        definition: req.body.definition
    }
    medadheranceModel.updateMedReqCourseById(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result});
        }
    });
}




// exports.list = (req, res, next) => {
//     prescribe.list((err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {            
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.getMedicine = (req, res, next) => {
//     let entry = {
//         name: req.body.name
//     }
//     prescribe.getMedicine(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.medicineList = (req, res, next) => {
//     let entry = {
//         name: req.query.name
//     }
//     console.log(entry);
//     prescribe.medicineList(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.medicineItem = (req, res, next) => {
//     let entry = {
//         id: req.body.id
//     }
//     prescribe.medicineItem(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.getMedicineItem = (req, res, next) => {
//     let entry = {
//         id: req.query.id
//     }
//     prescribe.getMedicineItem(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.setMedicine = (req, res, next) => {
//     let entry = {
//          med_name: req.body.med_name,
//          disease_name: req.body.disease_name,
//          patient_id: req.body.patient_id
//     }
//     prescribe.setMedicine(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.setPrescribe = (req, res, next) => {
//     let entry = {
//         patient_id: req.body.patient_id,
//         medication_id: req.body.medication_id
//     }
//     prescribe.setPrescribe(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.getDoctorList = (req, res, next) => {
//     let entry = {
//         name: req.body.name
//     }
//     prescribe.getDoctorList(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.getPatientList = (req, res, next) => {
//     let entry = {
//         name: req.body.name
//     }
//     console.log(entry);
//     prescribe.getPatientList(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }

// exports.getPrescribeInfo = (req, res, next) => {
//     let entry = {
//         prescribe_id: req.body.prescribe_id
//     }
//     console.log(entry);
//     prescribe.getPrescribeInfo(entry, (err, result) => {
//         if (err) {
//             res.status(404).json(err);
//         } else {
//             res.status(200).json({ data: result });
//         }
//     });
// }
