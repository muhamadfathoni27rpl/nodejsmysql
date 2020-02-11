const kontrol_login = require('../controller/auth'),
      kontrol_crud = require('../controller/crud'),
      kontrol_get = require('../controller/getdata'),
      seq_auth = require('../controller/seq_auth'),
      seq_crud = require('../controller/seq_crud')

module.exports=(app)=>{
    //iki tanpa sequelize
    app.get('/getdata',kontrol_get.get)
    app.post('/login',kontrol_login.masuk)
    app.post('/register',kontrol_login.daftar)
    app.put('/update',kontrol_crud.anyar)
    app.delete('/delete',kontrol_crud.hapus)

    // + sequelize
    app.get('/tes/data',seq_crud.get)
    app.get('/tes/verifi_email/e23e951718:_z1'+'/_FL4G44918c58401/xY841p:_id'+'/Auth:_z2',seq_auth.get_ml)
    app.post('/tes/ganti_pw/w52mw2019586_FL4G44918z7724/xY841p:_id'+'/Forget',seq_auth.ganti_pw)
    app.post('/tes/lupa_password',seq_auth.lupa_pw)
    app.post('/tes/regis',seq_auth.regis)
    app.post('/tes/login',seq_auth.login)    
    app.put('/tes/apdet',seq_crud.apdet)
    app.delete('/tes/hapus',seq_crud.hapus)
    app.post('/tes/barang',seq_crud.barang)
    app.post('/tes/gudang',seq_crud.gudang)
}