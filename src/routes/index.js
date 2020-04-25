// Para almacenar todas las rutas principales de nuestra aplicacion
const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.render('index',{
      style: 'index.css',
      layout: 'index'  
    });
    });

module.exports = router;