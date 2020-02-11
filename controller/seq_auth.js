const koneksi = require("../models/schema"),nonono = 'mojokertociber.1@gmail.com',                                                  nononono='mojokerto@&$@))#',
  hash = require("password-hash"),
  ml = require('nodemailer'),
  d = new Date(),
  n = d.getMinutes(),
  z1 = n*120,
  z2 = n*99,
  jwt = require("jsonwebtoken");


exports.get_ml=(req,res)=>{  
  const id = req.params._id,
        z1_ = req.params._z1,
        z2_ = req.params._z2     
  koneksi
  .findOne({where : {uuid : id}})
  .then(ok=>{
      if(z1_ != z1){
          res.json({status:'telah kadaluarsa'})          
      }
      else if(z2_ != z2){
          res.json({status:'telah kadaluarsa'})
      }
      else{
        let status = {status_data : 1}
        koneksi.update(status,({where : {uuid : id}})).then(statusmari=>{
        res.json({status:'user berhasil terverifikasi'})
        })
      }
  })
}

exports.regis = (req, res) => {
  var data = {
    nama: req.body.nama,
    email: req.body.email,
    pw: hash.generate(req.body.pw),
    status_data: 0
  };
  const s1 = data.nama,s2 = data.email,s3=req.body.pw    
  koneksi.findOne({ where: { email: req.body.email } }).then(ok => {
    if (!ok) {            
      var gm = /.+@(gmail|yahoo)\.com$/;    
      if(s1 === ""){res.json({status:' nama / email tidak boleh kosong bos'})}
      else if(s2 === ""){res.json({status:' name / email tidak boleh kosong bos'})}
      else if(s1.length > 50){res.json({status:'nama kedawan'})}
      else if(s1.length < 3){res.json({status:'masukan nama minimal 3 huruf'})} 
      else if(s3.length > 50){res.json({status:'Password kedawan'})} 
      else if(!/^[a-zA-Z]*$/.test(s1)){res.json({status:'karakter ilegal bos'})} 
      else if(!s2.endsWith('@gmail.com')){res.json({status:'hanya gmail diperbolehkan'})}           
      else{
        koneksi.create(data).then(done => {
          res.json({ status: done });
        });        
      }     
    }else {res.json({status:'User wes onok'})}
  });
};

exports.login = (req, res) => {
  var data = {
    email: req.body.email,
    pw: req.body.pw};
  koneksi
    .findOne({ where: { email: req.body.email } })
    .then(ok => {
      if(ok){           
        if(hash.verify(data.pw, ok.pw)){          
          if(ok.status_data == 0){
            var id = ok.uuid
            let transporter = ml.createTransport({
              service: 'gmail',
              auth: {user: nonono,pass: nononono}
            });
            let mailOptions = {
              from: 'mojokertociber.1@gmail.com',              
              to: ok.email,
              subject: "Login Website | Mr.Ti",
              text: "verifi email",
              html:"<a href=http://localhost:3000/tes/verifi_email/e23e951718"+z1+"/_FL4G44918c58401/xY841p"+id+"/Auth"+z2+">verifikasi email</a>"
            };          
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                else(res.json({status:'verifi email'}))
            });              
            }
          else{
            const data = {email: ok.uuid}
            const token = jwt.sign(data, "secretkey", { expiresIn: "1000s" });          
            res.json({token: token});
            console.log("login");
          }
        }else{res.json({ error: "gak onok bos /2" });}
      }else{res.json({ error: "gak onok bos /1" });}
    })
    .catch(err => {res.status(400).json({ error: err });});
};

exports.lupa_pw=(req,res)=>{                    //## IKI SG GET
    var data={
        email : req.body.email
    }
    koneksi
    .findOne({where :{email : data.email}})
    .then(ok=>{
        if(ok){
            if(ok.status_data == 0){
                res.json({status:'email anda belum terverifikasi'})
            }else{
                var id = ok.uuid                
            let transporter = ml.createTransport({
              service: 'gmail',
              auth: {user: nonono,pass: nononono}
            });
            let mailOptions = {
              from: 'mojokertociber.1@gmail.com',              
              to: ok.email,
              subject: "Lupa Password Website | Mr.Ti",
              text: "verifi email",
              html:"<a href=http://localhost:3000/tes/ganti_pw/w52mw2019586_FL4G44918z7724/xY841p"+id+"/Forget_>ubah password</a>"
            };          
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                else{res.json({status:'berhasil terkirim'})}
            });            
            }
        }
        else{res.json({status:'user tidak ada'})}
    })
}
exports.ganti_pw=(req,res)=>{                   //## IKI NGE POST
    const id = req.params._id
        let data={pw : hash.generate(req.body.pw)}
        koneksi.update(data,{where:{uuid : id}})
        .then(ok=>{
            res.json({status:'berhasil ganti password'})
        })      
}