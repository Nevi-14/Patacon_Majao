const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const  pdf = require('html-pdf');

const { database } = require('./keys');

// Initializations aqui vamos a inicializar los modulos 

const app = express();
require('./lib/passport');
 
  // Settings colocamos las configuraciones que necesita nuestro servidor express

  app.set('port', process.env.PORT || 4000); // Si existe un puerto en el sistema tomalo de lo contrario usa el 4000
  app.set('views', path.join(__dirname, 'views')); //Le dice a node odnde esta la carpeta views
  app.engine('.hbs', exphbs({
         // Join une directorios
         defaultLayout: 'main',
         layoutsDir: path.join(app.get('views'), 'layouts'),
         partialsDir: path.join(app.get('views'), 'partials'),
         extname: '.hbs',
         helpers: require('./lib/handlebars')

}))
app.set('view engine', '.hbs', '.html');


  // Middlewares son funciones que se ejecutan cada vez que un usuario hace una peticion al servidor
 
  app.use(morgan('dev')); // Dev para ver msj por consola
  app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

   // urlencode nos permite recibir los datos que nos envian los usuarios
   app.use(session({
     secret: 'nelsonmorera',
     resave: false,
     saveUninitialized: false,
     store: new MySQLStore(database)
   }));
   app.use(flash());
   app.use(passport.initialize());
   app.use(passport.session());



   
 

   // Global variables, variables globales quela aplicacion va a necesitar 

   app.use((req,res,next) =>{ // Toma la informacion del usuario y lo que el servidor quiere y despues continua con el proceso
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    // requerimos la varible para hacerlas publicas en nuestras vistas
    app.locals.user = req.user;

    next();
  });

   // Routes, vamos a definir las url's de nuestro servidor
   app.use(require('./routes/index'));
   app.use(require('./routes/authentication'));
   app.use('/links', require('./routes/links'));

   // Public una carpeta con recursos en donde tendremos codigo que el navegador puede acceder.
   app.use(express.static(path.join(__dirname, 'public')));


   // Starting the service , iniciamos nuestro servidor

   app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
  });
  