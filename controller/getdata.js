const koneksi = require('../models/database.js'),
      jwt = require('jsonwebtoken')

exports.get=(req,res)=>{
    var token = req.headers['mr_toni'];
    if (!token) return res.status(401).send({ login : false, pesan: 'Tidak ada token' });    
    jwt.verify(token,'secretkey', function(err, decoded) {
      if (err) return res.status(500).send({ login : false, pesan: 'Login dahulu bos' });            
      else{
          koneksi.db.query('SELECT * FROM user_1',(err,ok)=>{
              res.json({mr_toni : ok})
          })          
      }      
    })
}