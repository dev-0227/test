const connection = require('../../utilities/database');

const organizations = {
    // organization type
    create_type: (callback) => {
        let query = "CREATE TABLE `f_vs_org_type` (`id` int(11) NOT NULL AUTO_INCREMENT,`code` char(255) NOT NULL,`system` varchar(255) DEFAULT NULL,`display` char(255) NOT NULL,`definition` text DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    list_type: (callback) => {
        let query = "SELECT * FROM `f_vs_org_type` ORDER BY display";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    add_type: (organization, callback) => {
       
        let query = "INSERT INTO `f_vs_org_type` (`code`, `system`,`display`,`definition`) VALUES (? , ? , ? , ? )";
        connection.query(query, [organization.code, organization.system, organization.display, organization.definition], (err, result) => {
            callback(err, result);
        });
    },
    chosen_type: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_org_type` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update_type: (entry, callback) => {
        let query = "UPDATE `f_vs_org_type` SET `code`= ?, `system` = ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    delete_type: (entry, callback) => {
        let query = "DELETE FROM `f_vs_org_type` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getid_type: (entry, callback) => {
        let query = "SELECT `id` FROM `f_vs_org_type` WHERE `code` = ?";
        connection.query(query, [entry.code], (err, result) => {
            callback(err, result);
        });
    },
    // organization
    create: (callback) => {
        let query = "CREATE TABLE `f_organization` (`id` int(11) NOT NULL AUTO_INCREMENT,`statusid` int(11) NOT NULL,`typeid` int(11) NOT NULL,`name` varchar(100) DEFAULT NULL,`alias` varchar(100) DEFAULT NULL,`description` text DEFAULT NULL,`modeid` int(11) NOT NULL,`address1` varchar(100) DEFAULT NULL,`address2` varchar(100) DEFAULT NULL,`address3` varchar(100) DEFAULT NULL,`city` varchar(100) DEFAULT NULL,`state` varchar(100) DEFAULT NULL,`zip` varchar(30) DEFAULT NULL,`phone1` varchar(25) DEFAULT NULL,`phone2` varchar(25) DEFAULT NULL,`phone3` varchar(25) DEFAULT NULL,`mobile` varchar(30) DEFAULT NULL,`fax` varchar(25) DEFAULT NULL,`email` varchar(25) DEFAULT NULL,`longitude` varchar(20) DEFAULT NULL,`latitude` varchar(20) DEFAULT NULL,`altitude` varchar(20) DEFAULT NULL,`characteristic` text DEFAULT NULL,`daysoperation` varchar(15) DEFAULT NULL,`hoursoperation` varchar(15) DEFAULT NULL,`virticalservice` varchar(30) DEFAULT NULL,`endpoint` varchar(50) DEFAULT NULL,`map` varchar(30) DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    list: (entry, callback) => {

        let q = 'ALERT TABLE   `f_organization` MODIFY column `modeid` int(11) NOT NULL';
        connection.query(q, (err, result) => {});

        var where = "";
        let query = "SELECT f_organization.*, f_vs_org_type.`display` AS display FROM `f_organization`, `f_vs_org_type` WHERE f_organization.typeid = f_vs_org_type.id ";
        if(entry.search.value!=""){
            where += "AND (";
            where += "f_organization.name LIKE '%"+entry.search.value+"%' ";
            where += "OR f_organization.alias LIKE '%"+entry.search.value+"%' ";
            where += "OR f_organization.email LIKE '%"+entry.search.value+"%' ";
            where += "OR f_organization.address1 LIKE '%"+entry.search.value+"%' ";
            where += "OR f_organization.phone1 LIKE '%"+entry.search.value+"%' ";
            where += ") "
            query += where;
        }
        query += "ORDER BY f_organization.name ";
        query += "LIMIT "+entry.start+","+entry.length;
        connection.query(query, (err, result) => {
            query = "SELECT count(*) as total FROM `f_organization`, `f_vs_org_type` WHERE f_organization.typeid = f_vs_org_type.id "+where
            connection.query(query, (err1, result1) => {
                if(err1)callback(err, result);
                else {
                    var total = 0;
                    if(result1.length>0)total = result1[0]['total']
                    callback(err, { data: result, recordsFiltered: total, recordsTotal: total });
                }
            });
        });
    },
    add: (organization, callback) => {
        let query = "INSERT INTO `f_organization` (`statusid`, `typeid`, `name`, `alias`, `description`, `modeid`, `address1`, `address2`, `address3`, `city`, `state`, `zip`, `phone1`, `phone2`, `phone3`, `mobile`, `fax`, `email`, `longitude`, `latitude`, `altitude`, `characteristic`, `daysoperation`, `hoursoperation`, `virticalservice`, `endpoint`, `map`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [organization.status, organization.type, organization.name, organization.alias, organization.description, organization.mode, organization.address1, organization.address2, organization.address3, organization.city, organization.state, organization.zip, organization.phone1, organization.phone2, organization.phone3, organization.mobile, organization.fax, organization.email, organization.longitude, organization.latitude, organization.altitude, organization.characteristic, organization.daysoperation, organization.hoursoperation, organization.virticalservice, organization.endpoint, organization.map], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `f_organization` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (organization, callback) => {
        let query = "UPDATE `f_organization` SET `statusid` = ?, `typeid` = ?, `name` = ?, `alias` = ?, `description` = ?, `modeid` = ?, `address1` = ?, `address2` = ?, `address3` = ?, `city` = ?, `state` = ?, `zip` = ?, `phone1` = ?, `phone2` = ?, `phone3` = ?, `mobile` = ?, `fax` = ?, `email` = ?, `longitude` = ?, `latitude` = ?, `altitude` = ?, `characteristic` = ?, `daysoperation` = ?, `hoursoperation` = ?, `virticalservice` = ?, `endpoint` = ?, `map` = ? WHERE `id`= ? ";
        connection.query(query, [organization.status, organization.type, organization.name, organization.alias, organization.description, organization.modeid, organization.address1, organization.address2, organization.address3, organization.city, organization.state, organization.zip, organization.phone1, organization.phone2, organization.phone3, organization.mobile, organization.fax, organization.email, organization.longitude, organization.latitude, organization.altitude, organization.characteristic, organization.daysoperation, organization.hoursoperation, organization.virticalservice, organization.endpoint, organization.map, organization.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `f_organization` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    getid: (entry, callback) => {
        let query = "SELECT `id` FROM `f_organization` WHERE `name` = ?";
        connection.query(query, [entry.name], (err, result) => {
            callback(err, result);
        });
    }
}
module.exports = organizations;
