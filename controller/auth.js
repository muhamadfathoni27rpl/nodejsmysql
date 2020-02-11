const koneksi = require('../models/database.js'),
      hash = require('password-hash'),
      jwt = require('jsonwebtoken')

exports.masuk = (req,res) =>{
    var data = {        
        email:req.body.email,
        pw : req.body.pw}
            
    const sql = 'SELECT * FROM user_1 WHERE email = ?'
    if(data){
        koneksi.db.query(sql,[data.email],(err,results)=>{
            if(err) throw err
            else if(results.length>0){
                for(i=0;i<results.length;i++){
                    var sesi = data.email
                    var array = results[i].pw                    
                    var mari = hash.verify(data.pw,array)                    
                    if(mari == true){                        
                        jwt.sign({sesi},'secretkey',{expiresIn:'1000s'},(err,token)=>{res.json({token})})
                    }
                    else{res.json("salah bos /2")}
                }
            }
            else{res.json("eror")}            
        })
    }
}

exports.daftar=(req,res)=>{    
    var data = {
        nama : req.body.nama,
        email:req.body.email,
        pw : hash.generate(req.body.pw)}
        koneksi.db.query('INSERT INTO user_1 SET ?',data,(err,results)=>{
        if(err) throw err
        else{res.json("sukses")}
    })
}