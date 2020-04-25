
// Modulo passport que ayuda a interactuar con redes sociales  en este caso haremos una autenticacion local con la base de datos
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

//-------------- Passport use Local Signin -----------------------------//

passport.use('local.signin', new LocalStrategy({
  usernameField: 'Usuario',
  passwordField: 'Contrasena',
  passReqToCallback: true
}, async (req, Usuario, Contrasena, done) => {


  const rows = await pool.query('select  empleados.Nom_Empleado,empleados.Primer_Apellido,empleados.Segundo_Apellido  ,usuarios.Cod_login,usuarios.Usuario,usuarios.Contrasena,usuarios.Ced_Empleado,usuarios.Cod_Rol from empleados  inner join usuarios on  empleados.Ced_Empleado = usuarios.Ced_Empleado WHERE Usuario = ?', [Usuario]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(Contrasena, user.Contrasena)

    if (validPassword) {

      done(null, user, req.flash('success', 'Bienvenido ' + user.Nom_Empleado  + ' ' + user.Primer_Apellido));
     
   
    } else {
      done(null, false, req.flash('message', 'Contraseña Incorrecta'));



    }
  } else {
    return done(null, false, req.flash('message', 'El usuario  No existe'));
  
  }
}));





//-------------- Serializar el usuario  -----------------------------//
passport.serializeUser((user, done) => {
  done(null, user.Cod_login);
});
//-------------- Deserializar el usuario  -----------------------------//
passport.deserializeUser(async (Cod_login, done) => {
  const rows = await pool.query('select Cod_login,Usuario,Contrasena,Ced_Empleado,Cod_Rol from usuarios where Cod_login=?',[Cod_login]);
  done(null, rows[0]);

});

