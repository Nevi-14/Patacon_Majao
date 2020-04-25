const {format} = require('timeago.js');


const helpers = {}; // Este objeto sera utilizado por las vistas

helpers.timeago = (timestamp) =>{
 return format(timestamp); // Empiezza tomar un time stamp 

};

module.exports = helpers;