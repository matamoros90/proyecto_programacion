const querystring = require('querystring');
const index=(req, response) => {
const query=querystring.stringify(req.query);
fetch('https://fakestoreapi.com/carts?'+query)
.then(response => response.json())
.then(carrito=>{
    response.render('carrito',{carrito})
});
}
module.exports={
    index
}