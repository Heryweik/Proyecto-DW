var mongoose = require('mongoose');

const archivo = new mongoose.Schema({
    nombreArchivo: String,
    tipo: String,
    contenido: String
  });
  
  const proyecto = new mongoose.Schema({
    nombreProyecto: String,
    descripcion: String,
    archivos: [archivo]
  });

var esquema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasenia: String,
    plan: String,
    administrador: Boolean,
    proyectos: [proyecto]
});

module.exports = mongoose.model('usuarios', esquema);