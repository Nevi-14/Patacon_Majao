
module.exports = {

 isLoggedIn(req,res,next){
// Metodo de passport que se jala desde el onbjeto req devuelve un true
if(req.isAuthenticated()){
 return next();

}
return res.redirect('/signin');
    
 },

 isNotLoggedIn(req,res,next){
if(!req.isAuthenticated()){
    return next();
}
return res.redirect('/profile');
 }

};