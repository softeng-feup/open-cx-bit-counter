const Admin = require('../models/Admin');
const crypto = require('express-session');

module.exports = {
  generateKey: function() {
    return new Promise(function (resolve, reject) {

        crypto.randomBytes(10, function(err, buffer){
            if(err){
                reject(err);
            }
            else {
                generatedKey = buffer.toString('base64');
            }
        })
        
        bcrypt.hash(generatedKey, salt, function(err, hash) {
            admin = new Admin({
                id: 0,
                key: hash
            });

            admin.save().
                exec(function () {
                resolve({
                  code: 200
                })
            });
        });
    });
  },
  authenticateKey: function (key) {
    return new Promise(function (resolve, reject) {
        Admin
            .find({ id: 0 })
            .exec(function (err, hash) {
                bcrypt.compare(key,hash,function(err,res){
                    if(err){ 
                        console.log(error)
                        reject({
                            code: 403,
                            message: 'Invalid admin key'
                        });
                    }
                    
                    generateToken();
                    resolve({
                        code: 200
                    })
                })
            });
    });
  }
};