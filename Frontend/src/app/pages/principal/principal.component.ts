import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* Para que angular confie en los html */
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{

  infoUsuario: any;
  proyectos: any = [];
  currentCollapseIndex: number | null = null;
  idProyecto: any;
  nombreP: any;
  descripcionProyecto: any;


  formularioCrearProyecto = new FormGroup({
    nombreProyecto: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    contenidoHTML: new FormControl('<h1 class="saludo">¡Hola CodeWeb!</h1>', [Validators.required]),
    contenidoCSS: new FormControl(
    `.saludo {
      color: #2E3239;
      cursor: pointer;
    }`, [Validators.required]),
    contenidoJS: new FormControl(
    `document.addEventListener('DOMContentLoaded', 
    function() {
        const saludoElement = document.querySelector('.saludo');
        saludoElement.addEventListener('click', function() {
            saludoElement.style.color = '#5f7ADB';
        });
    });`, [Validators.required])
  });

  /* Editores usando Monaco */
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';

  editorOptionsHTML = {theme: 'vs-dark', language: 'html'};
  editorOptionsCSS = {theme: 'vs-dark', language: 'css'};
  editorOptionsJS = {theme: 'vs-dark', language: 'javascript'};

  /* Uso DomSanitizer para que no marque errores de seguridad, esto aparece en los videos de spotify */
  constructor(private usuariosServices:UsuariosService,
              private sanitizer: DomSanitizer) {}

  /* Vemos el resultado de todo el codigo poniendo las etiquetas style para el css y script para js */
  get result(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml( 
      this.htmlCode + '<style>' + this.cssCode + '</style><script>' + this.jsCode + '</script>'
      );
  }

  ngOnInit(): void {
    /* Leemos la informacion de localStorage */
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      this.infoUsuario = JSON.parse(usuarioStorage);
      console.log('usuario logueado: ', this.infoUsuario.nombre);
    }

    /* Consumo del endpoint para obtener los proyectos del usuario */
    this.obtenerProyectos()
  }

  obtenerProyectos() {
    this.usuariosServices.obtenerProyectosUsuario(this.infoUsuario.id).subscribe(res =>{
      console.log('Proyectos del usuario: ',res);
      this.proyectos = res.proyectos;
    },
    error => console.log(error))
  }

  crearProyecto() {
     this.usuariosServices.crearProyectoUsuario(this.formularioCrearProyecto.value, this.infoUsuario.id).subscribe(res =>{
      console.log(res);
      this.obtenerProyectos()
    },
    error => console.log(error))
  }

  /* Ayuda al colapso de los proyectos para ver sus archivos */
  toggleCollapse(index: number) {
    if (this.currentCollapseIndex === index) {
      this.currentCollapseIndex = null;
    } else {
      this.currentCollapseIndex = index;
    }
  }

  abrirProyecto(proyecto:any){
    this.idProyecto = proyecto._id;
    this.nombreP = proyecto.nombreProyecto;
    this.descripcionProyecto = proyecto.descripcion;
/*     console.log(this.idProyecto)
    console.log(this.NombreP)
    console.log(this.descripcionProyecto) */
    proyecto.archivos.forEach((item: { tipo: string; contenido: string; }) => {
      if (item.tipo === 'html') {
          this.htmlCode = item.contenido;
      } else if (item.tipo === 'css') {
          this.cssCode = item.contenido;
      } else if (item.tipo === 'javascript') {
          this.jsCode = item.contenido;
      }
  });
  }


}
