
const connection = require('../../utilities/database');

const qualification = {
    // qualification type
    create: (callback) => {
        let query = "CREATE TABLE `f_vs_qualification` (`id` int(11) NOT NULL AUTO_INCREMENT,`code` char(255) DEFAULT NULL,`system` varchar(255) DEFAULT NULL,`display` char(255) DEFAULT NULL,`definition` text DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    list: (callback) => {
        
        let q = `INSERT INTO f_vs_qualification (code,system,display,definition) VALUES
        ('PN','http://terminology.hl7.org/CodeSystem/v2-0360','Advanced Practice Nurse','Advanced Practice Nurse'),
        ('AAS','http://terminology.hl7.org/CodeSystem/v2-0360','Associate of Applied Science','Associate of Applied Science'),
        ('AA','http://terminology.hl7.org/CodeSystem/v2-0360','Associate of Arts','Associate of Arts'),
        ('ABA','http://terminology.hl7.org/CodeSystem/v2-0360','Associate of Business Administration','Associate of Business Administration'),
        ('AE','http://terminology.hl7.org/CodeSystem/v2-0360','Associate of Engineering','Associate of Engineering'),
        ('AS','http://terminology.hl7.org/CodeSystem/v2-0360','Associate of Science','Associate of Science'),
        ('BA','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor of Arts','Bachelor of Arts'),
        ('BBA','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor of Business Administration','Bachelor of Business Administration'),
        ('BE','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor or Engineering','Bachelor or Engineering'),
        ('BFA','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor of Fine Arts','Bachelor of Fine Arts'),
        ('BN','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor of Nursing','Bachelor of Nursing'),
        ('BSL','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor of Science - Law','Bachelor of Science - Law'),
        ('BSN','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor on Science - Nursing','Bachelor on Science - Nursing'),
        ('BT','http://terminology.hl7.org/CodeSystem/v2-0360','Bachelor of Theology','Bachelor of Theology'),
        ('CER','http://terminology.hl7.org/CodeSystem/v2-0360','Certificate','Certificate'),
        ('CANP','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Adult Nurse Practitioner','Certified Adult Nurse Practitioner'),
        ('CMA','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Medical Assistant','Certified Medical Assistant'),
        ('CNP','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Nurse Practitioner','Certified Nurse Practitioner'),
        ('CNM','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Nurse Midwife	','Certified Nurse Midwife	'),
        ('CRN','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Registered Nurse','Certified Registered Nurse'),
        ('CNS','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Nurse Specialist','Certified Nurse Specialist'),
        ('CPNP','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Pediatric Nurse Practitioner','Certified Pediatric Nurse Practitioner'),
        ('CTR','http://terminology.hl7.org/CodeSystem/v2-0360','Certified Tumor Registrar','Certified Tumor Registrar'),
        ('DIP','http://terminology.hl7.org/CodeSystem/v2-0360','Diploma','Diploma'),
        ('DBA','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Business Administration','Doctor of Business Administration'),
        ('DED','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Education','Doctor of Education'),
        ('PharmD','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Pharmacy','Doctor of Pharmacy'),
        ('PHE','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Engineering','Doctor of Engineering'),
        ('PHD','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Philosophy','Doctor of Philosophy'),
        ('PHS','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Science	Doctor of Science','Doctor of Science'),
        ('MD','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Medicine','Doctor of Medicine'),
        ('DO','http://terminology.hl7.org/CodeSystem/v2-0360','Doctor of Osteopathy','Doctor of Osteopathy'),
        ('EMT','http://terminology.hl7.org/CodeSystem/v2-0360','Emergency Medical Technician','Emergency Medical Technician'),
        ('EMTP','http://terminology.hl7.org/CodeSystem/v2-0360','Emergency Medical Technician - Paramedic','Emergency Medical Technician - Paramedic'),
        ('FPNP','http://terminology.hl7.org/CodeSystem/v2-0360','Family Practice Nurse Practitioner','Family Practice Nurse Practitioner'),
        ('HS','http://terminology.hl7.org/CodeSystem/v2-0360','High School Graduate','High School Graduate'),
        ('JD','http://terminology.hl7.org/CodeSystem/v2-0360','Juris Doctor','Juris Doctor'),
        ('MA','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Arts','Master of Arts'),
        ('MBA','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Business Administration','Master of Business Administration'),
        ('MCE','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Civil Engineering','Master of Civil Engineering'),
        ('MDI','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Divinity','Master of Divinity'),
        ('MED','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Education','Master of Education'),
        ('MEE','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Electrical Engineering','Master of Electrical Engineering'),
        ('ME','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Engineering','Master of Engineering'),
        ('MFA','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Fine Arts','Master of Fine Arts'),
        ('MME','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Mechanical Engineering','Master of Mechanical Engineering'),
        ('MS','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Science','Master of Science'),
        ('MSL','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Science - Law','	Master of Science - Law'),
        ('MSN','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Science - Nursing','Master of Science - Nursing'),
        ('MTH','http://terminology.hl7.org/CodeSystem/v2-0360','Master of Theology','Master of Theology'),
        ('MDA','http://terminology.hl7.org/CodeSystem/v2-0360','Medical Assistant','	Medical Assistant'),
        ('MT','http://terminology.hl7.org/CodeSystem/v2-0360','Medical Technician','Medical Technician'),
        ('NG','http://terminology.hl7.org/CodeSystem/v2-0360','Non-Graduate','Non-Graduate'),
        ('NP','http://terminology.hl7.org/CodeSystem/v2-0360','Nurse Practitioner','Nurse Practitioner'),
        ('PA','http://terminology.hl7.org/CodeSystem/v2-0360','Physician Assistant','Physician Assistant'),
        ('RMA','http://terminology.hl7.org/CodeSystem/v2-0360','Registered Medical Assistant','Registered Medical Assistant'),
        ('RN','http://terminology.hl7.org/CodeSystem/v2-0360','Registered Nurse','Registered Nurse'),
        ('RPH','http://terminology.hl7.org/CodeSystem/v2-0360','Registered Pharmacist','Registered Pharmacist'),
        ('SEC','http://terminology.hl7.org/CodeSystem/v2-0360','Secretarial Certificate','Secretarial Certificate'),
        ('TS','http://terminology.hl7.org/CodeSystem/v2-0360','Trade School Graduate','Trade School Graduate');`;
        connection.query(q, (err, result) => {
        });

        let query = "SELECT * FROM `f_vs_qualification` ORDER BY code";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    add: (organization, callback) => {
       
        let query = "INSERT INTO `f_vs_qualification` (`code`, `system`,`display`,`definition`) VALUES (? , ? , ? , ? )";
        connection.query(query, [organization.code, organization.system, organization.display, organization.definition], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_qualification` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (entry, callback) => {
        let query = "UPDATE `f_vs_qualification` SET `code`= ?, `system` = ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `f_vs_qualification` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getid: (entry, callback) => {
        let query = "SELECT `id` FROM `f_vs_qualification` WHERE `code` = ?";
        connection.query(query, [entry.code], (err, result) => {
            callback(err, result);
        });
    },
}

module.exports = qualification;
