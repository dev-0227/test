
const crypto = require('crypto');
const fs = require('fs');

module.exports = generateRandomString = (length) => {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    const randomString = randomBytes.toString('hex').slice(0, length);
    return randomString;
}

module.exports = async function readfile (pathlist, index, callback) {
    if (pathlist.length == 0) callback(pathlist);
    else {
        if (pathlist[index]['photo'] == '') {
            pathlist[index]['photo'] = pathlist[index]['fname'].substr(0, 1).toUpperCase();
            if (pathlist.length -1 == index) callback(pathlist);
            else readfile(pathlist, ++index, callback);
        } else {
            fs.readFile(pathlist[index]['photo'], (err, data) => {
                if (err) {
                    pathlist[index]['photo'] = '';
                    console.log("Error");
                } else {
                    pathlist[index]['photo'] = Buffer.from(data).toString('base64');
                    if (pathlist.length -1 == index) callback(pathlist);
                    else readfile(pathlist, ++index, callback);
                }
            });
        }
    }
}
