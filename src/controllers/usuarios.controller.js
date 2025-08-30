const querystring = require('querystring');
const index=(req, response) => {
const query=querystring.stringify(req.query);
fetch('https://fakestoreapi.com/users?'+query)
.then(response => response.json())
.then(usuarios=>{
    response.render('usuarios',{usuarios})
});
}
module.exports={
    index
}