const koneksi = require('../models/database.js'),
      hash = require('password-hash'),
      jwt = require('jsonwebtoken')

exports.anyar = (req,res)=>{            
    var data ={
        id : req.body.id,
        nama : req.body.nama,
        email : req.body.email,
        pw : hash.generate(req.body.pw)
    }  
    var token = req.headers['mr_toni'];
    if (!token) return res.status(401).send({ login : false, pesan: 'Tidak ada token' });    
    jwt.verify(token,'secretkey', function(err, decoded) {
      if (err) return res.status(500).send({ login : false, pesan: 'Login dahulu bos' });            
      else{
        // console.log(decoded);
        let sql = "UPDATE user_1 SET nama='"+data.nama+"', email='"+data.email+"' WHERE id="+data.id
        koneksi.db.query(sql, (err, results) => {
          if(err) throw err;
          else{res.json({sukses : results})}
        });
      }      
    })
}

exports.hapus=(req,res)=>{
  var id = req.body.id
  var token = req.headers['mr_toni'];
    if (!token) return res.status(401).send({ login : false, pesan: 'Tidak ada token' });    
    jwt.verify(token,'secretkey', function(err, decoded) {
      if (err) return res.status(500).send({ login : false, pesan: 'Login dahulu bos' });            
      else{
        // console.log(decoded);
        var del = "DELETE FROM user_1 WHERE id = "+id
        koneksi.db.query(del,(err,results)=>{
          if(err) throw err;
          else{res.json({sukses : results})}
        })
      }      
    })
}