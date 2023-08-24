var express = require("express");
var router = express.Router();
var usuario = require("../models/usuario");
var mongoose = require('mongoose');

/* Login */
router.post('/login', async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    const usuarioEncontrado = await usuario.findOne({ correo });

    if (usuarioEncontrado && usuarioEncontrado.contrasenia === contrasenia) {
      const { contrasenia, ...usuarioLogueado } = usuarioEncontrado.toObject();
      res.json({ exito: true, mensaje: 'Inicio de sesión exitoso', id: usuarioLogueado._id, nombre: usuarioLogueado.nombre, apellido: usuarioLogueado.apellido, plan: usuarioLogueado.plan, administrador: usuarioLogueado.administrador });
    } else {
      res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error en el servidor', mensaje: error.message });
  }
});

/* Obtener todas los usuarios (administrador) */
router.get("/", function (req, res) {
  usuario
    .find({ administrador: false }, {contrasenia: false})
    .then((result) => {
      /* Vemos todos los usuarios como lo hacemos en mongosh */
      res.send(result);
      res.end();
    })
    .catch((error) => {
      res.send(error);
      res.end();
    });
});

/* Crear nuevo usuario (Registro) */
router.post("/", function (req, res) {
  let u = new usuario({
  nombre: req.body.nombre,
  apellido: req.body.apellido,
  correo: req.body.correo,
  contrasenia: req.body.contrasenia,
  plan: req.body.plan,
  administrador: false,
  proyectos: []
});

  u.save().then(result =>{
      res.send(result);
      res.end();
  }).catch(error =>{
      res.send(error);
      res.end();
  })

});

/* Obtener un usuario */
router.get("/:nombre", function (req, res) {
  usuario
    .find({nombre:req.params.nombre})
    .then((result) => {
      res.send(result[0]); /* Con [] enviamos solo un objeto no un arreglo */
      res.end();
    })
    .catch((error) => {
      res.send(error);
      res.end();
    });
});

/* Eliminar un usuario */
router.delete("/:id", function (req, res) {
  usuario.deleteOne(
    {
    _id:req.params.id
  }
  ).then(result =>{
    res.send(result);
    res.end();
  }).catch(error =>{
    res.send(error);
    res.end();
  });
});

/* Obtener proyectos de un usuario */
router.get('/:idUsuario/proyectos',function (req, res){
  usuario.find(
      {
          _id: req.params.idUsuario
      },
      {"proyectos":true})
  .then(result=>{
      res.send(result[0]);
      res.end();
  })
  .catch(error=>{
      res.send(error);
      res.end();
  });
});

/* Crear proyecto a usuario */
router.post('/:idUsuario/proyectos', function (req, res){

  usuario.updateOne(
      {
          _id: req.params.idUsuario
      },
      {
          $push:{
              proyectos:{
                  /* _id: mongoose.Types.ObjectId(), */ 
                  nombreProyecto: req.body.nombreProyecto,
                  descripcion: req.body.descripcion,
                  archivos: req.body.archivos
              }
          }
      }
  ).then(result=>{
      res.send(result);
      res.end();
  }).catch(error=>{
      res.send(error);
      res.end();
  });
  
});

/* Actualizar Proyecto a usuario (al darle en guardar un proyecto) */
router.put("/:idUsuario/proyectos/:idProyecto", function (req, res) {
  usuario.updateOne({
    _id: req.params.idUsuario,
    "proyectos._id" : req.params.idProyecto
  },
  {
    "proyectos.$":{
        nombreProyecto: req.body.nombreProyecto,
        descripcion: req.body.descripcion,
        archivos: req.body.archivos
    }
  }).then(result =>{
    res.send(result);
    res.end();
  }).catch(error =>{
    res.send(error);
    res.end();
  });
});

/* Eliminar Proyecto a usuario */
router.delete("/:idUsuario/proyectos/:idProyecto", function (req, res) {
  usuario.updateOne(
    {
      _id: req.params.idUsuario
    },
    {
      $pull: {
        proyectos: { _id: req.params.idProyecto }
      }
    }
  ).then(result =>{
    res.send(result);
    res.end();
  }).catch(error =>{
    res.send(error);
    res.end();
  });
});

module.exports = router;
