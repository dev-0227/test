const connection = require('../../utilities/database');

const organizations = {
    create: (callback) => {
        let query = "CREATE TABLE `f_vs_org_type` (`id` int(11) NOT NULL AUTO_INCREMENT,`code` char(255) NOT NULL,`system` varchar(255) DEFAULT NULL,`display` char(255) NOT NULL,`definition` text DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
        ConnectionPolicyInstance.query(query, (err, result) => {
            callback(err, result);
        });
        //test
        query = "insert  into `f_vs_org_type`(`id`,`code`,`system`,`display`,`definition`) values "
        query += "(1,'prov','http://terminology.hl7.org/CodeSystem/organization-type','Healthcare Provider','An organization that provides healthcare services.'),"
        query += "(2,'dept','http://terminology.hl7.org/CodeSystem/organization-type','Hospital Department','A department or ward within a hospital (Generally is not applicable to top level organizations)'),"
        query += "(3,'team','http://terminology.hl7.org/CodeSystem/organization-type','Organizational team','An organizational team is usually a grouping of practitioners that perform a specific function within an organization (which could be a top level organization, or a department).'),"
        query += "(4,'govt','http://terminology.hl7.org/CodeSystem/organization-type','Government','A political body, often used when including organization records for government bodies such as a Federal Government, State or Local Government.'),"
        query += "(5,'ins','http://terminology.hl7.org/CodeSystem/organization-type','Insurance Company','A company that provides insurance to its subscribers that may include healthcare related policies.'),"
        query += "(6,'pay','http://terminology.hl7.org/CodeSystem/organization-type','Payer','A company, charity, or governmental organization, which processes claims and/or issues payments to providers on behalf of patients or groups of patients.'),"
        query += "(7,'edu','http://terminology.hl7.org/CodeSystem/organization-type','Educational Institute','An educational institution that provides education or research facilities.'),"
        query += "(8,'reli','http://terminology.hl7.org/CodeSystem/organization-type','Religious Institution','An organization that is identified as a part of a religious institution.'),"
        query += "(9,'crs','http://terminology.hl7.org/CodeSystem/organization-type','Clinical Research Sponsor','An organization that is identified as a Pharmaceutical/Clinical Research Sponsor.'),"
        query += "(10,'cg','http://terminology.hl7.org/CodeSystem/organization-type','Community Group','An un-incorporated community group.'),"
        query += "(11,'bus','http://terminology.hl7.org/CodeSystem/organization-type','Non-Healthcare Business or Corporation','An organization that is a registered business or corporation but not identified by other types.'),"
        query += "(12,'other','http://terminology.hl7.org/CodeSystem/organization-type','Other','Other type of organization not already specified.');"
        connection.query(query, (err, result) => {
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
