const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const { check, validationResult } = require('express-validator');
// Web Cotation
router.get('/addWebCotation', (req, res) => {
  res.render('links/addWebCotation', {
    javascript: 'contact.js',
    style: 'contact.css',
    layout: 'main'
  });
});
router.post('/addWebCotation',[


],async (req, res) => {
  const { Nombre_Cliente, Telefono_Cliente, Correo_Cliente, Descripcion } = req.body


  const newLink = {
    Nombre_Cliente,
    Telefono_Cliente,
    Correo_Cliente,
    Descripcion
  };
  // Al ser una peticion asincrona se utiliza el metodo await 
  await pool.query('INSERT INTO solicitud_cotizacion set ?', [newLink]);
  req.flash('success', 'Solicitud enviada gracias!.');
  res.redirect('/links/addWebCotation');
});



// Web Cotation
router.get('/showWebCotations',isLoggedIn, async (req, res) => {
  const webCoatations = await pool.query('SELECT * FROM solicitud_cotizacion');
  res.render('links/showWebCotations', {
    webCoatations,
    javascript: 'system.js',
    style: 'system.css',
    layout: 'system'
  });
});
router.get('/deleteWebCotation/:Cod_Solicitud', async (req, res) => {
  const { Cod_Solicitud } = req.params;
  await pool.query('DELETE FROM solicitud_cotizacion WHERE Cod_Solicitud =? ', [Cod_Solicitud]);
  res.redirect('/links/showWebCotations')
});
router.get('/addWebUser/:Cod_Solicitud', async (req, res) => {
  const { Cod_Solicitud } = req.params;
  const addUser = await pool.query('SELECT * FROM solicitud_cotizacion where Cod_Solicitud =?', [Cod_Solicitud]);

  res.render('links/addWebUser', { addUser: addUser[0], style: 'quotation.css', javascript:'users.js' ,layout: 'settings' });

});
// Add Customer
router.get('/addCustomer', isLoggedIn, async (req, res) => {
  res.render('links/addCustomer', {
    javascript: 'users.js',
    style: 'quotation.css',
    layout: 'settings'
  });
});


router.post('/addCustomers', async (req, res) => {
  const { Ced_Cliente, Nombre_Cliente, Primer_Apellido, Segundo_Apellido, Correo_Cliente, Telefono_Cliente } = req.body;
  const Clientes = {
    Ced_Cliente,
    Nombre_Cliente,
    Primer_Apellido,
    Segundo_Apellido,
    Correo_Cliente,
    Telefono_Cliente
  };
  await pool.query('INSERT INTO Clientes set ?', [Clientes]);
  req.flash('success', 'Usuario Guardado Correctamente');
  res.redirect('/links/showCustomers')

});

router.get('/deleteCustomer/:Cod_Cliente', async (req, res) => {
  const { Cod_Cliente } = req.params;
  await pool.query('DELETE FROM clientes WHERE Cod_Cliente =? ', [Cod_Cliente]);
  res.redirect('/links/showCustomers')
});

router.get('/editCustomer/:Cod_Cliente', async (req, res) => {
  const { Cod_Cliente } = req.params;
  const editCod_Cliente = await pool.query('SELECT * FROM clientes where Cod_Cliente =?', [Cod_Cliente]);
  res.render('links/editCustomer', {
    editCod_Cliente: editCod_Cliente[0],

    style: 'quotation.css',
    javascript: 'users.js',
    layout: 'settings'
  });
});
router.post('/editCustomer/:Cod_Cliente', async (req, res) => {
  const { Cod_Cliente } = req.params;
  const { Ced_Cliente, Nombre_Cliente, Primer_Apellido, Segundo_Apellido, Correo_Cliente, Telefono_Cliente } = req.body;
  const updateCustomer = {
    Ced_Cliente,
    Nombre_Cliente,
    Primer_Apellido,
    Segundo_Apellido,
    Correo_Cliente,
    Telefono_Cliente
  };

  await pool.query('update clientes set?  where Cod_Cliente =?', [updateCustomer, Cod_Cliente]);
  res.redirect('/links/showCustomers');
});




router.get('/showCustomers', isLoggedIn, async (req, res) => {
  const customers = await pool.query('SELECT * FROM clientes');
  res.render('links/showCustomers', {
    customers,
    javascript: 'system.js',
    style: 'system.css',
    layout: 'system'
  });
});


router.get('/showEmployees',  isLoggedIn, async (req, res) => {
  const employees = await pool.query('SELECT * FROM empleados');
  res.render('links/showEmployees', {
    employees,
    javascript: 'system.js',
    style: 'system.css',
    layout: 'system'
  });
});
router.get('/addEmployees', isLoggedIn, async (req, res) => {
  res.render('links/addEmployees', {
    javascript: 'employee.js',
    style: 'quotation.css',
    layout: 'settings'
  });
});
router.post('/addEmployees', async (req, res) => {
  const { Ced_Empleado, Nom_Empleado, Primer_Apellido, Segundo_Apellido, Correo_Empleado, Telefono_Empleado } = req.body

  const employee = {
    Ced_Empleado,
    Nom_Empleado,
    Primer_Apellido,
    Segundo_Apellido,
    Correo_Empleado,
    Telefono_Empleado

  };
  await pool.query('INSERT INTO empleados set ?', [employee]);

  res.redirect('/links/showEmployees');

});
router.get('/editEmployees/:Ced_Empleado', async (req, res) => {
  const { Ced_Empleado } = req.params;
  const editEmployees = await pool.query('SELECT * FROM empleados where Ced_Empleado =?', [Ced_Empleado]);
  res.render('links/editEmployees', {
    editEmployees: editEmployees[0],

    style: 'quotation.css',
    javascript: false,
    layout: 'settings'
  });
});

router.post('/editEmployees/:Ced_Empleado', async (req, res) => {
  const { Ced_Empleado } = req.params;
  const { Nom_Empleado, Primer_Apellido, Segundo_Apellido, Correo_Empleado, Telefono_Empleado } = req.body;
  const updateEmployees = {
    Nom_Empleado,
    Primer_Apellido,
    Segundo_Apellido,
    Correo_Empleado,
    Telefono_Empleado
  };
  await pool.query('update empleados set?  where Ced_Empleado =?', [updateEmployees, Ced_Empleado]);
  res.redirect('/links/showEmployees');
});
router.get('/deleteEmployees/:Ced_Empleado', async (req, res) => {
  const { Ced_Empleado } = req.params;
  await pool.query('DELETE FROM empleados WHERE Ced_Empleado =? ', [Ced_Empleado]);
  res.redirect('/links/showEmployees');
});

router.get('/showProducts', isLoggedIn, async (req, res) => {
  const categoria = await pool.query('select Cod_Categoria, Nombre_Categoria from categoria ');
  const producto = await pool.query('SELECT * FROM producto');
  res.render('links/showProducts', {
    producto, categoria,
    style: 'system.css',
    javascript: 'system.js',
    layout: 'system'
  });
});

router.get('/addProducts', isLoggedIn, async (req, res) => {
  const categoria = await pool.query('select Cod_Categoria, Nombre_Categoria from categoria ');
  const producto = await pool.query('SELECT * FROM producto');
  res.render('links/addProducts', {
    producto, categoria,
    style: 'quotation.css',
    javascript: 'products.js',
    layout: 'settings'
  });
});



router.post('/addProducts', async (req, res) => {
  const { Cod_Producto, Nombre_Producto, Precio_Producto, Cod_Categoria, Descripcion } = req.body;

  const Producto = {
    Cod_Producto,
    Nombre_Producto,
    Precio_Producto,
    Cod_Categoria,
    Descripcion

  };
  await pool.query('INSERT INTO Producto set ?', [Producto]);
  res.redirect('/links/showProducts');

});
router.get('/editProducts/:Cod_Producto', async (req, res) => {
  const categoria = await pool.query('select Cod_Categoria, Nombre_Categoria from categoria ');
  const { Cod_Producto } = req.params;
  const editProdcuto = await pool.query('SELECT * FROM producto where Cod_Producto =?', [Cod_Producto]);
  res.render('links/editProducts', {
    editProdcuto: editProdcuto[0], categoria,

    style: 'quotation.css',
    javascript: 'products.js',
    layout: 'settings'
  });
});

router.post('/editProducts/:Cod_Producto', async (req, res) => {
  const { Cod_Producto } = req.params;
  const { Nombre_Producto, Precio_Producto, Cod_Categoria, Descripcion } = req.body;
  const updateProducts = {
    Nombre_Producto,
    Precio_Producto,
    Cod_Categoria,
    Descripcion
  };

  await pool.query('update producto set?  where Cod_Producto =?', [updateProducts, Cod_Producto]);
  res.redirect('/links/showProducts');
});

router.get('/deleteProduct/:Cod_Producto', async (req, res) => {
  const { Cod_Producto } = req.params;
  await pool.query('DELETE FROM producto WHERE Cod_Producto =? ', [Cod_Producto]);
  res.redirect('/links/showProducts');
});

router.get('/settings', (req, res) => {
  res.render('links/settings', {
    style: 'settings.css',
    javascript: false,
    layout: 'settings'
  });
});


router.get('/addCategory', isLoggedIn, async (req, res) => {
  const categories = await pool.query('SELECT * FROM categoria');
  res.render('links/addCategory', {
    categories,
    style: 'settings.css',
    javascript: 'settings.js',
    layout: 'settings'
  });
});
router.post('/addCategory', async (req, res) => {
  const { Cod_Categoria, Nombre_Categoria } = req.body

  const categories = {
    Cod_Categoria,
    Nombre_Categoria

  };
  await pool.query('INSERT INTO categoria set ?', [categories]);
  req.flash('success', 'Se guardo la categoria con exito');
  res.redirect('/links/addCategory');

});


router.get('/editCategory/:Cod_Categoria', async (req, res) => {
  const { Cod_Categoria } = req.params;
  const category = await pool.query('SELECT * FROM categoria where Cod_Categoria  =?', [Cod_Categoria]);
  res.render('links/editCategory', {
    category: category[0],

    style: 'settings.css',
    javascript: 'settings.js',
    layout: 'main'
  });
});
router.post('/editCategory/:Cod_Categoria', async (req, res) => {
  const { Cod_Categoria } = req.params;
  const { Nombre_Categoria } = req.body;
  const updateCategory = {
    Nombre_Categoria
  };

  await pool.query('update categoria set?  where Cod_Categoria =?', [updateCategory, Cod_Categoria]);
  req.flash('success', 'Se edito la categoria con exito');
  res.redirect('/links/addCategory');
});
router.get('/deleteCategory/:Cod_Categoria', async (req, res) => {
  const { Cod_Categoria } = req.params;
  await pool.query('DELETE FROM categoria WHERE Cod_Categoria =? ', [Cod_Categoria]);
  req.flash('success', 'Se elimino la categoria con exito');
  res.redirect('/links/addCategory');
});




router.get('/addRoles',  isLoggedIn, async (req, res) => {
  const roles = await pool.query('SELECT * FROM roles');
  res.render('links/addRoles', {
    roles,
    javascript:'settings.js',
    style: 'settings.css',
    layout: 'settings'
  });
});

router.post('/addRoles', async (req, res) => {
  const { Cod_Rol, Tipo_Rol } = req.body
  const roles = {
    Cod_Rol,
    Tipo_Rol
  };
  await pool.query('INSERT INTO roles set ?', [roles]);
  req.flash('success', 'Se guardo la rol con exito');
  res.redirect('/links/addRoles');

});

router.get('/editRoles/:Cod_Rol', async (req, res) => {
  const { Cod_Rol } = req.params;
  const roles = await pool.query('SELECT * FROM roles where Cod_Rol =?', [Cod_Rol]);
  res.render('links/editRoles', {
    roles: roles[0],

    style: 'settings.css',
    javascript: 'settings.js',
    layout: 'main'
  });
});

router.post('/editRoles/:Cod_Rol', async (req, res) => {
  const { Cod_Rol } = req.params;
  const { Tipo_Rol } = req.body;
  const editRole = {
    Tipo_Rol
  };

  await pool.query('update roles set?  where Cod_Rol =?', [editRole, Cod_Rol]);
  req.flash('success', 'Se modifico la rol con exito');
  res.redirect('/links/addRoles');
});


router.get('/deleteRoles/:Cod_Rol', async (req, res) => {
  const { Cod_Rol } = req.params;
  await pool.query('DELETE FROM roles WHERE Cod_Rol =? ', [Cod_Rol]);
  req.flash('success', 'Se elimino la rol con exito');
  res.redirect('/links/addRoles')
});


router.get('/addStatus',  isLoggedIn, async (req, res) => {
  const status = await pool.query('SELECT * FROM estado_evento');
  res.render('links/addStatus', {
    status,
    style: 'settings.css',
    javascript: 'settings.js',
    layout: 'settings'
  });
});

router.post('/addStatus', async (req, res) => {
  const { Cod_Estado, Nombre_Estado } = req.body

  const states = {
    Cod_Estado,
    Nombre_Estado
  };
  await pool.query('INSERT INTO estado_evento set ?', [states]);
  req.flash('success', 'Se guardo la estado con exito');
  res.redirect('/links/addStatus');

});

router.get('/editStatus/:Cod_Estado', async (req, res) => {
  const { Cod_Estado } = req.params;
  const status = await pool.query('SELECT * FROM estado_evento where Cod_Estado =?', [Cod_Estado]);
  res.render('links/editStatus', {
    status: status[0],
    javascript: 'settings.js',
    style: 'settings.css',
    layout: 'main'
  });
});

router.post('/editStatus/:Cod_Estado', async (req, res) => {
  const { Cod_Estado } = req.params;
  const { Nombre_Estado } = req.body;
  const editStatus = {
    Nombre_Estado
  };

  await pool.query('update estado_evento set?  where Cod_Estado =?', [editStatus, Cod_Estado]);
  req.flash('success', 'Se edito el estado con exito');
  res.redirect('/links/addStatus');
});

router.get('/deleteStatus/:Cod_Estado', async (req, res) => {
  const { Cod_Estado } = req.params;
  await pool.query('DELETE FROM estado_evento WHERE Cod_Estado =? ', [Cod_Estado]);
  req.flash('success', 'Se elimino el estado con exito');
  res.redirect('/links/addStatus')
});




router.get('/addTypeEvent', isLoggedIn, async (req, res) => {
  const events = await pool.query('SELECT * FROM tipo_evento');
  res.render('links/addTypeEvent', {
    events,
    style: 'settings.css',
    javascript: 'settings.js',
    layout: 'settings'
  });
});

router.post('/addTypeEvent',  async (req, res) => {
  const { Cod_Tipo_Evento, Nombre_Tipo_Evento } = req.body;
  const typeEvents = {
    Cod_Tipo_Evento,
    Nombre_Tipo_Evento
  };
  await pool.query('INSERT INTO tipo_evento set ?', [typeEvents]);
  req.flash('success', 'Se guardo el tipo evento con exito');
  res.redirect('/links/addTypeEvent');

});
router.get('/editTypeEvent/:Cod_Tipo_Evento', async (req, res) => {
  const { Cod_Tipo_Evento } = req.params;
  const events = await pool.query('SELECT * FROM tipo_evento where Cod_Tipo_Evento =?', [Cod_Tipo_Evento]);
  res.render('links/editTypeEvent', {
    events: events[0],

    style: 'settings.css',
    javascript: 'settings.js',
    layout: 'main'
  });
});

router.post('/editTypeEvent/:Cod_Tipo_Evento', async (req, res) => {
  const { Cod_Tipo_Evento } = req.params;
  const { Nombre_Tipo_Evento } = req.body;
  const editTypeEvent = {
    Nombre_Tipo_Evento
  };

  await pool.query('update tipo_evento set?  where Cod_Tipo_Evento =?', [editTypeEvent, Cod_Tipo_Evento]);
  req.flash('success', 'Se edito el tipo evento con exito');
  res.redirect('/links/addTypeEvent');
});
router.get('/deleteTypeEvent/:Cod_Tipo_Evento', async (req, res) => {
  const { Cod_Tipo_Evento } = req.params;
  await pool.query('DELETE FROM tipo_evento WHERE Cod_Tipo_Evento =? ', [Cod_Tipo_Evento]);
  req.flash('success', 'Se elimino el tipo evento con exito');
  res.redirect('/links/addTypeEvent');
});


router.get('/addQuotation', isLoggedIn, async (req, res) => {
  const client = await pool.query('SELECT * FROM clientes');
  const typeEvent = await pool.query('SELECT * FROM  tipo_evento');
  res.render('links/addQuotation', {
    client,typeEvent,
    style: 'tab.css',
    javascript: false,
    layout: 'settings'
  });
});

router.post('/addQuotation', async (req,res) =>{
 
const {
  Fecha_Cotizacion,Cantidad_Personas, Cod_Cliente, Cod_Tipo_Evento} = req.body;
const newQuotation = {
  Fecha_Cotizacion,Cantidad_Personas,Cod_Cliente, Cod_Tipo_Evento }

  await pool.query('INSERT INTO cotizacion set? ', [newQuotation]);
  // Gets as item 
 
  res.redirect('/links/showQuotations');
});

router.get('/addQuotationProducts/:Cod_Cotizacion', isLoggedIn, async (req, res) => {
  const {Cod_Cotizacion} = req.params;
 
  const lastItem = await pool.query("select  cotizacion.Cod_Cotizacion , cotizacion.Cantidad_Personas, clientes.Nombre_Cliente,clientes.Primer_Apellido, clientes.Segundo_Apellido, cotizacion.Cod_Cotizacion, date_format(cotizacion.Fecha_Cotizacion,'%d/%m/%y') as Fecha_Cotizacion  from cotizacion  inner join clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente where Cod_Cotizacion =?",[Cod_Cotizacion]);
  
  const producto = await pool.query('select * from producto' );
  const detalleAdicionales = await pool.query('select   detalle_cotizacion.Cod_Producto ,  cotizacion.Cod_Cotizacion,   detalle_cotizacion.Cantidad_Producto , producto.Nombre_Producto,  detalle_cotizacion.Precio_Producto,  cotizacion.Cantidad_Personas ,cotizacion.Fecha_Cotizacion,clientes.Nombre_Cliente , clientes.Primer_Apellido , detalle_cotizacion.Cantidad_Producto * detalle_cotizacion.Precio_Producto as total   from  cotizacion  inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join detalle_cotizacion on cotizacion.Cod_Cotizacion = detalle_cotizacion.Cod_Cotizacion inner join  producto  on detalle_cotizacion.Cod_Producto = producto.Cod_Producto WHERE Cod_Categoria not in ("C1") AND  detalle_cotizacion.cod_cotizacion = ?' ,[Cod_Cotizacion]);
  const detalle = await pool.query('select   detalle_cotizacion.Cod_Producto ,  cotizacion.Cod_Cotizacion,   detalle_cotizacion.Cantidad_Producto , producto.Nombre_Producto,  detalle_cotizacion.Precio_Producto,  cotizacion.Cantidad_Personas ,cotizacion.Fecha_Cotizacion,clientes.Nombre_Cliente , clientes.Primer_Apellido , detalle_cotizacion.Cantidad_Producto * detalle_cotizacion.Precio_Producto as total   from  cotizacion  inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join detalle_cotizacion on cotizacion.Cod_Cotizacion = detalle_cotizacion.Cod_Cotizacion inner join  producto  on detalle_cotizacion.Cod_Producto = producto.Cod_Producto WHERE Cod_Categoria not in ("C2","C3") AND  detalle_cotizacion.cod_cotizacion = ?' ,[Cod_Cotizacion]);
  const total = await pool.query('select SUM(detalle_cotizacion.Cantidad_Producto*detalle_cotizacion.Precio_Producto) as totalFinal from  cotizacion  inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join detalle_cotizacion on cotizacion.Cod_Cotizacion = detalle_cotizacion.Cod_Cotizacion inner join  producto  on detalle_cotizacion.Cod_Producto = producto.Cod_Producto where detalle_cotizacion.cod_cotizacion =?' ,[lastItem[0].Cod_Cotizacion]);
  res.render('links/addQuotationProducts', {
    lastItem: lastItem[0] ,producto,detalle,total,detalleAdicionales,
    style: 'tab.css',
    javascript: false,
    layout: 'settings'
  });
});



router.post('/addQuotationProducts/:Cod_Cotizacion', async (req, res) => {
  
  const { Cod_Cotizacion,  Cod_Producto, Cantidad_Producto, Precio_Producto } = req.body
  const newQuotation = {
    Cod_Producto,
    Cantidad_Producto,
    Cod_Cotizacion,
    Precio_Producto
  };
  await pool.query('INSERT INTO detalle_cotizacion  set ?', [newQuotation]);
  console.log(newQuotation);
  res.redirect('/links/addQuotationProducts/'+Cod_Cotizacion);
  
});

router.get('/deleteProductDetail/:Cod_Cotizacion/:Cod_Producto'   , async (req, res) => {
  const { Cod_Producto , Cod_Cotizacion } = req.params;


  console.log(req.params);
  await pool.query('DELETE  FROM detalle_cotizacion  WHERE Cod_Producto =? ', [Cod_Producto]);
  res.redirect('/links/addQuotationProducts/'+Cod_Cotizacion);
});

router.get('/showQuotations', isLoggedIn, async (req, res) => {
  const cotizaciones = await pool.query( "select  date_format(cotizacion.Fecha_Cotizacion,'%d/%m/%y') as fechaCotizacion  , cotizacion.Cod_Cotizacion,cotizacion.Cantidad_Personas, clientes.Nombre_Cliente,clientes.Primer_Apellido  from cotizacion inner join  clientes on cotizacion.Cod_Cliente = clientes.Cod_Cliente order by cotizacion.Cod_Cotizacion");
  res.render('links/showQuotations', {
    cotizaciones,
    style: 'system.css',
    javascript: 'system.js',
    layout: 'system'
  });
});

router.get('/deleteQuotation/:Cod_Cotizacion', async (req, res) => {
  const { Cod_Cotizacion } = req.params;
  await pool.query('DELETE FROM cotizacion WHERE Cod_Cotizacion =? ', [Cod_Cotizacion]);
  res.redirect('links/showWebCotations')
});


router.get('/events', (req,res) =>{
res.render('links/events',{
  style: 'settings.css',
  javascript: false,
  layout: 'settings'
});
});
 
router.get('/showEvents',  async(req,res) =>{

  const events = await pool.query( "select   date_format(eventos.Fecha_Evento,'%d/%m/%y') as Fecha_Evento, eventos.Cod_Evento, eventos.Detalles_Evento, cotizacion.Cod_Cotizacion , clientes.Nombre_Cliente , clientes.Segundo_Apellido  from cotizacion inner join clientes on cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join eventos  on cotizacion.Cod_Cotizacion = eventos.Cod_Cotizacion order by eventos.Cod_Evento");
  res.render('links/showEvents',{
    events,
    style: 'settings.css',
    javascript: false,
    layout: 'settings'
  });
  });


router.get('/addEvents', async (req,res) =>{
  const empleado = await pool.query('SELECT * FROM empleados');
  const clientes = await pool.query('select cotizacion.Cod_Cotizacion,clientes.Nombre_Cliente , clientes.Primer_Apellido    from  cotizacion  inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente ');
  const estado = await pool.query('SELECT * FROM estado_evento');

  res.render('links/addEvents',{
    empleado,clientes,estado,
    style: 'settings.css',
    javascript: 'false',
    layout: 'settings'
  });
  });

  router.post('/addEvents', async (req, res) => {
    const { Fecha_Evento, Direccion_Evento, Detalles_Evento, Cod_Cotizacion,Ced_Empleado,Cod_Estado } = req.body
    const newEvent = {
      Fecha_Evento,
      Direccion_Evento,
      Detalles_Evento,
      Cod_Cotizacion,
      Ced_Empleado,
      Cod_Estado
    };
    await pool.query('INSERT INTO eventos  set ?', [newEvent]);
    res.redirect('/links/showEvents');
    
  });



    
    router.get('/showQuotationFile/:Cod_Cotizacion', async (req, res) => {
      const { Cod_Cotizacion } = req.params;
      const detalleAdicionales = await pool.query('select   detalle_cotizacion.Cod_Producto ,  cotizacion.Cod_Cotizacion,   detalle_cotizacion.Cantidad_Producto , producto.Nombre_Producto,  detalle_cotizacion.Precio_Producto,  cotizacion.Cantidad_Personas ,cotizacion.Fecha_Cotizacion,clientes.Nombre_Cliente , clientes.Primer_Apellido , detalle_cotizacion.Cantidad_Producto * detalle_cotizacion.Precio_Producto as total   from  cotizacion  inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join detalle_cotizacion on cotizacion.Cod_Cotizacion = detalle_cotizacion.Cod_Cotizacion inner join  producto  on detalle_cotizacion.Cod_Producto = producto.Cod_Producto WHERE Cod_Categoria not in ("C1") AND  detalle_cotizacion.cod_cotizacion = ?' ,[Cod_Cotizacion]);
  const detalle = await pool.query('select   producto.Descripcion as Concepto , detalle_cotizacion.Cod_Producto ,  cotizacion.Cod_Cotizacion,   detalle_cotizacion.Cantidad_Producto , producto.Nombre_Producto,  detalle_cotizacion.Precio_Producto,  cotizacion.Cantidad_Personas ,cotizacion.Fecha_Cotizacion,clientes.Nombre_Cliente , clientes.Primer_Apellido , detalle_cotizacion.Cantidad_Producto * detalle_cotizacion.Precio_Producto as total   from  cotizacion  inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join detalle_cotizacion on cotizacion.Cod_Cotizacion = detalle_cotizacion.Cod_Cotizacion inner join  producto  on detalle_cotizacion.Cod_Producto = producto.Cod_Producto WHERE Cod_Categoria not in ("C2","C3") AND  detalle_cotizacion.cod_cotizacion = ?' ,[Cod_Cotizacion]);
     
      const cotizacion = await pool.query("select tipo_evento.Nombre_Tipo_Evento, detalle_cotizacion.Cantidad_Producto , cotizacion.Cod_Cotizacion,   cotizacion.Cantidad_Personas , producto.Nombre_Producto, producto.Descripcion as Concepto, detalle_cotizacion.Precio_Producto,  cotizacion.Cantidad_Personas ,date_format(cotizacion.Fecha_Cotizacion,'%d/%m/%y') as fechaCotizacion,clientes.Nombre_Cliente , clientes.Primer_Apellido , detalle_cotizacion.Cantidad_Producto * detalle_cotizacion.Precio_Producto as Monto   from  tipo_evento inner join cotizacion on cotizacion.Cod_Tipo_Evento = tipo_evento.Cod_Tipo_Evento   inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join detalle_cotizacion on cotizacion.Cod_Cotizacion = detalle_cotizacion.Cod_Cotizacion inner join  producto  on detalle_cotizacion.Cod_Producto = producto.Cod_Producto  where detalle_cotizacion.cod_cotizacion =?", [Cod_Cotizacion]);
      const total = await pool.query('select SUM(detalle_cotizacion.Cantidad_Producto*detalle_cotizacion.Precio_Producto) as totalFinal from  cotizacion  inner join  clientes on  cotizacion.Cod_Cliente = clientes.Cod_Cliente inner join detalle_cotizacion on cotizacion.Cod_Cotizacion = detalle_cotizacion.Cod_Cotizacion inner join  producto  on detalle_cotizacion.Cod_Producto = producto.Cod_Producto where detalle_cotizacion.cod_cotizacion =?' ,[Cod_Cotizacion]);
      res.render('links/showQuotationFile', {
        cotizacion: cotizacion[0],detalle,total,detalleAdicionales,
    
        style: 'tab.css',
        javascript: 'tab.js',
        layout: 'settings'
      });

      console.log(req.params)
    });






    router.get('/viewQuotation',  isLoggedIn, async (req, res) => {
      const roles = await pool.query('SELECT * FROM roles');
      res.render('links/viewQuotation', {
        roles,
        style: 'quotation.css',
        javascript: false,
        layout: 'settings'
      });
    });


    
    router.get('/showEventDetails/:cod_evento',  isLoggedIn, async (req, res) => {
      const { cod_evento } = req.params;
   const evento = await pool.query("select  eventos.Cod_Cotizacion, eventos.Cod_Evento, tipo_evento.Nombre_Tipo_Evento , clientes.Nombre_Cliente , clientes.Primer_Apellido , cotizacion.Cantidad_Personas, date_format(eventos.Fecha_Evento,'%d/%m/%y') as fechaCotizacion , eventos.Detalles_Evento , eventos.Direccion_Evento from  clientes  inner join  cotizacion   on clientes.Cod_Cliente = cotizacion.Cod_Cliente inner join tipo_evento on cotizacion.Cod_Tipo_Evento = tipo_evento.Cod_Tipo_Evento  inner join  eventos  on cotizacion.Cod_Cotizacion = eventos.Cod_Cotizacion where eventos.Cod_Evento =?" , [cod_evento]);
 
      res.render('links/showEventDetails', {
        evento: evento[0],
        style: 'tab.css',
        javascript: false,
        layout: 'settings'
      });

    });
    
     
    router.get('/factura',  isLoggedIn, async (req, res) => {

      res.render('links/factura.html', {
        style: 'tab.css',
        javascript: false,
        layout: 'settings'
      });

    });
    
  

module.exports = router;