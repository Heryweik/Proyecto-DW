db.usuarios.insertMany([
   {
      "nombre":"Hery",
      "apellido":"Yass",
      "correo":"hery@gmail.com",
      "contrasenia":"1234",
      "administrador":true
   },
   {
      "nombre":"Yhonny",
      "apellido":"Aplicano",
      "correo":"yhonny@gmail.com",
      "contrasenia":"1234",
      "plan":"Profesional",
      "administrador":false,
      "proyectos":[
         {
            "_id":ObjectId(),
            "nombreProyecto":"Producto 1",
            "descripcion": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
            "archivos": [
               {
                  "nombreArchivo": "HTML",
                  "tipo": "html",
                  "contenido": "<p>Contenido HTML...</p>"
                },
                {
                  "nombreArchivo": "CSS",
                  "tipo": "css",
                  "contenido": "/* Contenido CSS... */"
                },
                {
                  "nombreArchivo": "JS",
                  "tipo": "javascript",
                  "contenido": "// Contenido JS..."
                }
            ]
         }
      ]
   }
]);
