const connection = require('../../utilities/database');

const organizations = {
    create: (callback) => {
        let query = "CREATE TABLE `f_vs_org_type` (`id` int(11) NOT NULL AUTO_INCREMENT,`code` char(255) NOT NULL,`system` varchar(255) DEFAULT NULL,`display` char(255) NOT NULL,`definition` text DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
        ConnectionPolicyInstance.query(query, (err, result) => {
            callback(err, result);
        });
    },
    list: (callback) => {
        let query = "SELECT * FROM `f_vs_org_type` ORDER BY code";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    add: (organization, callback) => {
       
        let query = "INSERT INTO `f_vs_org_type` (`id`, `code`, `system`,`display`,`definition`) VALUES (NULL, ? , ? , ? , ? )";
        connection.query(query, [organization.code, organization.system, organization.display, organization.definition], (err, result) => {
            callback(err, result);
        });
    },
    chosen: (entry, callback) => {
        let query = "SELECT * FROM `f_vs_org_type` WHERE `id`= ? "
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
    update: (entry, callback) => {
        let query = "UPDATE `f_vs_org_type` SET `code`= ?, `system` = ?, `display` = ?, `definition` = ? WHERE `id`= ? ";
        connection.query(query, [entry.code, entry.system, entry.display, entry.definition, entry.id], (err, result) => {
            callback(err, result);
        });
    },
    delete: (entry, callback) => {
        let query = "DELETE FROM `f_vs_org_type` WHERE `id`= ? ";
        connection.query(query, [entry.id], (err, result) => {
            callback(err, result);
        });
    },
}
module.exports = organizations;
