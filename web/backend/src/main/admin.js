const Admin = require('../models/Admin');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
  generateKey: function() {
      console.log("CALLED GENERATE")
    return new Promise(function (resolve, reject) {
        Admin
        .findById(0)
        .remove() 
        .exec(function () {});

        let generatedKey = "";
        crypto.randomBytes(10, function(err, buffer){
            if(err){
                reject(err);
                return;
            }
            else {
                generatedKey = buffer.toString('base64');
            }
        })
        
        bcrypt.hash(generatedKey, 5, function(err, hash) {
            if(err){
                reject(err);
                return;
            }
            admin = new Admin({
                id: 0,
                key: hash
            });

            admin.save(function (error, talk) {
                if (error) {
                  reject({
                    code: 409,
                    message: 'Duplicate Data',
                  });
                  return;
                }
                else {
                    resolve({
                        code: 200
                    });
                    return;
                }
            });
        });
    });
  },
  authenticateKey: function (key) {
    return new Promise(function (resolve, reject) {
        Admin
            .find({ id: 0 })
            .exec(function (err, row) {
                console.log(row.key + "," + key);
            })
            .then(() => {
                bcrypt.compare(key,hash,function(err,res){
                    if(err){ 
                        console.log(err);
                        reject({
                            code: 403,
                            message: 'Invalid admin key'
                        });
                        return;
                    }
                    
                    resolve({
                        code: 200
                    });
                    return;
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    });
  }
};