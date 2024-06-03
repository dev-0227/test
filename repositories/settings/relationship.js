
const connection = require('../../utilities/database');

const relationship = {
    create: (callback) => {
        let query = "CREATE TABLE `relationship_c_s_o` (`id` int(11) NOT NULL AUTO_INCREMENT,`clinicid` int(11) DEFAULT NULL,`specialistid` int(11) DEFAULT NULL,`organizationid` text DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    getOrganizationByClinic: (entry, callback) => {
        let query = "SELECT * FROM `relationship_c_s_o` WHERE `clinicid` = ? AND `specialistid` = ?";
        connection.query(query, [entry.clinicid, entry.specialistid], (err, result) => {
            callback(err, result);
        });
    },
    getOrganizationBySpecialist: (entry, callback) => {
        let query = "SELECT * FROM `relationship_c_s_o` WHERE `specialistid` = ?";
        connection.query(query, [entry.specialistid], (err, result) => {
            callback(err, result);
        });
    },
    getOrganizationNames: (entry, callback) => {
        if (entry.length === 0) callback(null, []);
        else {
            let query ="SELECT `id`, `name`, `address1`, `phone1`, `city`, `state`, `zip` FROM `f_organization` WHERE ";
            for (var i = 0; i < entry.length; i ++) {
                if (i === 0) query += "`id` = ?";
                else query += " OR `id` = ?";
            }
            connection.query(query, entry, (err, result) => {
                callback(err, result);
            });
        }
    },
    add: (entry, callback) => {
        let organizations = "";
        if(entry.organizationid.length > 0){
            for(var i = 0;i < entry.organizationid.length; i++){
                if(i < entry.organizationid.length - 1)
                    organizations += parseInt(entry.organizationid[i])+",";
                else
                organizations += parseInt(entry.organizationid[i]);
            }
        }
        let query = "INSERT INTO `relationship_c_s_o` (`clinicid`, `specialistid`, `organizationid`) VALUES (?, ?, ?)";
        connection.query(query, [entry.clinicid, entry.specialistid, organizations], (err, result) => {
            callback(err, result);
        });
    },
    add_several: (entry, callback) => {
        let query = 'INSERT INTO `relationship_c_s_o` (`clinicid`, `specialistid`, `organizationid`) VALUES ?';
        let values = entry.rel.map(data => {
            if (data !== null && data.specialistid !== '') {
                let organizations = "";
                if (data.organizationid && data.organizationid.length > 0) {
                    data.organizationid.forEach((org, index) => {
                        if (index < data.organizationid.length - 1)
                            organizations += parseInt(org) + ",";
                        else
                            organizations += parseInt(org);
                    });
                }
                return [data.clinicid, data.specialistid, organizations];
            }
        }).filter(value => value !== undefined); // Filter out undefined values & specialistid
        connection.query(query, [values], (err, result) => {
            callback(err, result);
        });
    },
    updateOrganization: (entry, callback) => {
        let organizations = "";
        if(entry.organizationid.length > 0){
            for(var i = 0;i < entry.organizationid.length; i++){
                if(i < entry.organizationid.length - 1)
                    organizations += parseInt(entry.organizationid[i])+",";
                else
                organizations += parseInt(entry.organizationid[i]);
            }
        }
        let query = "UPDATE `relationship_c_s_o` SET `organizationid` = ? WHERE `clinicid` = ? AND `specialistid` = ?";
        connection.query(query, [organizations, entry.clinicid, entry.specialistid], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `relationship_c_s_o` WHERE `id` = ?";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    deleteBySpecialtyId: (sid, callback) => {
        let query = "DELETE FROM `relationship_c_s_o` WHERE `specialistid` = ?";
        connection.query(query, [sid], (err, result) => {
            callback(err, result);
        });
    }
}

module.exports = relationship;
