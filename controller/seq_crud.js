const koneksi = require("../models/schema"),nonono = 'mojokertociber.1@gmail.com',                                                  nononono='mojokerto@&$@))#',
  barang_ = require("../models/sc_barang"),
  gudang_ = require("../models/sc_gudang"),
  hash = require("password-hash"),  
  jwt = require("jsonwebtoken");


exports.get = (req, res) => {
  var d = new Date();  
  var n = d.getMinutes()
  var z = n*120;
  koneksi.findAll().then(data => {res.json(data);});  
};

exports.apdet=(req,res)=>{
    var data = {
        nama: req.body.nama,
        email: req.body.email,
        pw: hash.generate(req.body.pw)
      };
    var token = req.headers['mr_toni'];
    if (!token) return res.status(401).send({ login : false, pesan: 'Tidak ada token' });    
    jwt.verify(token,'secretkey', function(err, decoded) {
      if (err) return res.status(500).send({ login : false, pesan: 'Login dahulu bos' });            
      else{        
        koneksi.findOne({ where: { uuid: req.body.id } }).then(ok => {
            if (ok) {
              koneksi.update(data, {where: {uuid: req.body.id}}).then(done => {
                res.json({ status: "sukses "+done });
              });}
            else{console.log("no no no");}});
      }      
    })
}
exports.hapus=(req,res)=>{
    var token = req.headers['mr_toni'];
    if (!token) return res.status(401).send({ login : false, pesan: 'Tidak ada token' });    
    jwt.verify(token,'secretkey', function(err, decoded) {
      if (err) return res.status(500).send({ login : false, pesan: 'Login dahulu bos' });            
      else{        
        koneksi.findOne({ where: { uuid: req.body.id } }).then(ok => {
            if (ok) {
              koneksi.destroy({where: {uuid: req.body.id}}).then(done => {
                res.json({ status: done });
              });
            } else {console.log("no no no");}   
          });
      }      
    })
}
exports.barang=(req,res)=>{
  var token = req.headers['mr_toni'];
  if (!token) return res.status(401).send({ login : false, pesan: 'Tidak ada token' });    
  jwt.verify(token,'secretkey', function(err, decoded) {
    var pemilik = decoded.email
    // console.log(pemilik);
    if (err) return res.status(500).send({ login : false, pesan: 'Login dahulu bos' });            
    else{ 
        koneksi
        .findOne({where:{uuid : pemilik}})
        .then(barang=>{
          if(barang){
            // console.log(barang.nama);
            const wong = barang.nama
            var barangs = {
              barang: req.body.barang,
              pemilik: wong
            }
            barang_.findOne()
            .then(yo=>{
              barang_.create(barangs).then(mari=>{res.json({status: mari})})
            })
          }
        }).catch
    }
  })
}

exports.gudang=(req,res)=>{
  var token = req.headers['mr_toni'];
  if (!token) return res.status(401).send({ login : false, pesan: 'Tidak ada token' });    
  jwt.verify(token,'secretkey', function(err, decoded) {    
    // console.log(pemilik);
    if (err) return res.status(500).send({ login : false, pesan: 'Login dahulu bos' });            
    else{ 
        var data = {
          barang: req.body.barang,
          stok:req.body.stok
        }
        gudang_
        .findOne({where:{barang : req.body.barang}})
            .then(yo1=>{
              if(yo1){
                if(yo1.stok == 0){
                  res.json({status:"stok "+yo1.barang+ " kosong"})}
                else{          
                    if(data.stok <= yo1.stok){        
                      // console.log(yo1.stok);
                      const kurang ={stok: yo1.stok - data.stok}
                      // console.log(kurang);
                      // console.log(yo1.uuid_gudang);
                      gudang_.update(kurang, {where: {uuid_gudang: yo1.uuid_gudang}}).then(done => {
                        res.json({ status: done+ " => sukses." });
                      });
                    }else{res.json({status:"stok kurang tidak mencukupi"});}
                }
              }else{res.json({status : "barang tidak ada"})}
            })
    }
  })
}