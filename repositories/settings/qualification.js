
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
