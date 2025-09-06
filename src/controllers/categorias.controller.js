const querystring = require('querystring');
const categorias=[
    {id:1,nombre:'Categoría 1'},
    {id:2,nombre:'Categoría 2'},
    {id:3,nombre:'Categoría 3'},
]

const index=(req,res)=>{
    res.render('categorias/index',{categorias});
}
const show=(req,res)=>{
    const {id}=req.params;
    const categoria=categorias.find(categorias=>categorias.id==id);
    res.render('categorias/show',{categoria});
}
module.exports={
    index,
    show
}