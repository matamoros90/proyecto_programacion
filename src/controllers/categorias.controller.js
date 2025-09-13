const querystring = require('querystring');
const Categorias=[
    {id:1,nombre:'Categoría 1'},
    {id:2,nombre:'Categoría 2'},
    {id:3,nombre:'Categoría 3'},
]

const index=(req,res)=>{
    res.render('Categorias/index',{Categorias});
}
const show=(req,res)=>{
    const {id}=req.params;
    const categoria=Categorias.find(Categorias=>Categorias.id===parseInt(id));
    if(!categoria){
        return res.status(404).send('Categoría no encontrada');
    }
    else
    {
        res.render('Categorias/show',{categoria});
    }
}
const create=(req,res)=>{
    res.render('Categorias/create');
}
const store=(req,res)=>{
    const {nombre}=req.body;
    const nuevaCategoria={
        id:Categorias.length+1,
        nombre
    };
    Categorias.push(nuevaCategoria);
    res.redirect('/categorias');
}
module.exports={
    index,
    show,
    create,
    store
}