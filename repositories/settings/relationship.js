
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
    add: (entry, callback) => {
        let organizations = "";
        if(entry.organizations.length > 0){
            for(var i = 0;i < entry.organizations.length; i++){
                if(i < entry.organizations.length - 1)
                    organizations += parseInt(entry.organizations[i])+",";
                else
                organizations += parseInt(entry.organizations[i]);
            }
        }
        let query = "INSERT INTO `relationship_c_s_o` (`clinicid`, `specialistid`, `organizationid`) VALUES (?, ?, ?)";
        connection.query(query, [entry.clinicid, entry.specialistid, organizations], (err, result) => {
            callback(err, result);
        });
    },
    updateOrganization: (entry, callback) => {
        let organizations = "";
        if(entry.organizations.length > 0){
            for(var i = 0;i < entry.organizations.length; i++){
                if(i < entry.organizations.length - 1)
                    organizations += parseInt(entry.organizations[i])+",";
                else
                organizations += parseInt(entry.organizations[i]);
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
    }
}

module.exports = relationship;
