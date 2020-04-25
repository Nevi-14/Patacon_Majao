const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const helpers = require('../lib/helpers');
const {isLoggedIn} = require('../lib/auth');
const {isNotLoggedIn} = require('../lib/auth');
// -----------------------    Ruta para renderizar singup   --------------------------
router.get('/signup',isLoggedIn, async (req, res) => {
    const empleados = await pool.query('SELECT  * FROM  empleados ');
    const roles = await pool.query('SELECT  * FROM  roles ');
    res.render('auth/signup', {
      empleados, roles,
      javascript: 'settings.js',
      style: 'settings.css',
      layout: 'settings'
    });
  });
  // -----------------------    Ruta para POST singup   -------------------------------

  router.post('/signup', async (req, res) => {
    const { Ced_Empleado, Usuario, Contrasena, Cod_Rol} = req.body
  
    const newUser = {
      Ced_Empleado,
      Usuario,
      Contrasena,
      Cod_Rol
    };
    newUser.Contrasena = await helpers.encryptPassword(Contrasena);
  
    const result =  await pool.query('INSERT INTO usuarios set ?', [newUser]);
    newUser.Cod_login = result.insertId;
    res.redirect('/profile');
  
  });


  // Signin

router.get('/signin', isNotLoggedIn,(req, res) => {
  res.render('auth/signin', {
    style: 'singin.css',
    layout: 'main'
  });

});

router.post('/signin', (req, res, next) => {

  passport.authenticate('local.signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req,res,next);


});
router.get('/editPassword',  isLoggedIn, async (req, res) => {
  const usuarios = await pool.query('SELECT * FROM usuarios');
  res.render('auth/editPassword', {
    usuarios,
    style: 'settings.css',
    javascript: 'settings.js',
    layout: 'settings'
  });
  
});

router.post('/editPassword', async(req,res) =>{
  const {Contrasena,Cod_Login  } = req.body;
 const updatePassword = {
  Contrasena
 };
 updatePassword.Contrasena = await helpers.encryptPassword(Contrasena);

  
 const result =  await pool.query('update  usuarios  set? where  Cod_Login =?', [updatePassword,Cod_Login]);
 req.flash('success', 'Se cambio la contraseña con exito');
 res.redirect('/profile');
});



// Profile
router.get('/profile',isLoggedIn,(req,res) =>{

  res.render('profile',{
      javascript: 'system.js',
     style: 'settings.css',
     layout: 'system' });
});

router.get('/logout',(req,res)=>{
  // Passport nos brida este metodo de logout

req.logOut();
res.redirect('/');
});


module.exports = router;