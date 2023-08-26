import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any; // Importar Bootstrap desde el ámbito global


/* Para que angular confie en los html */
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{

  /* Modal compartir */
  @ViewChild ('modalCompartir') modalCompartir: any;

  infoUsuario: any;
  proyectos: any = [];
  currentCollapseIndex: number | null = null;
  idProyecto: any;
  nombreP: any;
  descripcionProyecto: any;
  proyecto:any = [];
  compartirHTML: any;
  compartirCSS: any;
  compartirJS: any;
  usuario: any = '';
  usuarios:any = [];

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
              private sanitizer: DomSanitizer,
              private modalService: NgbModal) {}

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
      console.log('plan de usuario logueado: ', this.infoUsuario.plan);
    }

    /* Consumo del endpoint para obtener los proyectos del usuario */
    this.obtenerProyectos()
    this.obtenerUsuarios()

    /* Obtenemos el arreglo con los proyectos del service */
    this.usuariosServices.proyectos$.subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

  

  obtenerProyectos() {
    
    this.usuariosServices.obtenerProyectosUsuario(this.infoUsuario.id).subscribe(res =>{
      console.log('Proyectos del usuario: ',res);
      this.proyectos = res.proyectos;

      /* Actualizamos el arreglo de proyectos del service */
      this.usuariosServices.actualizarProyectos(this.proyectos);
    },
    error => console.log(error))
  }

  crearProyecto() {
    const planUsuario = this.infoUsuario.plan;
    const proyectosCreados = this.proyectos.length;
    
    this.obtenerProyectos()

    /* Limita la cantidad de proyectos segun su plan */
    if (planUsuario === 'Principiante' && proyectosCreados >= 1) {

      console.log('No puedes crear más proyectos. Límite alcanzado para tu plan.');

    } else if (planUsuario === 'Profesional' && proyectosCreados >= 10) {

      console.log('No puedes crear más proyectos. Límite alcanzado para tu plan.');

    } else if (planUsuario === 'VIP' && proyectosCreados >= 100) {
      
      console.log('No puedes crear más proyectos. Límite alcanzado para tu plan.');

    } else {

      this.usuariosServices.crearProyectoUsuario(this.formularioCrearProyecto.value, this.infoUsuario.id).subscribe(res =>{
        console.log(res);
        this.obtenerProyectos()
  
        /* Se limia el formulario */
        this.formularioCrearProyecto.controls.nombreProyecto.setValue('');
        this.formularioCrearProyecto.controls.descripcion.setValue('');
  
      },
      error => console.log(error))
    
    }   
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
    
  this.obtenerProyectos()

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

  generateDownloadLink(proyecto: any): string {
    // Aquí construyes el enlace al archivo ZIP que contiene el proyecto
    const downloadUrl = 'ruta-al-archivo-zip'; // Reemplaza con la ruta correcta
  
    return downloadUrl;
  }

  compartirProyecto(proyecto: any) {
    console.log('ver información del proyecto: ', proyecto);
    this.proyecto = proyecto;

    proyecto.archivos.forEach((item: { tipo: string; contenido: string; }) => {
      if (item.tipo === 'html') {
          this.compartirHTML = item.contenido;
      } else if (item.tipo === 'css') {
          this.compartirCSS = item.contenido;
      } else if (item.tipo === 'javascript') {
          this.compartirJS = item.contenido;
      }
  });
    this.modalService.open(this.modalCompartir, {centered: true,size: 'md'});
  }

  mandarProyecto() {
    const data = {
      nombreProyecto: this.proyecto.nombreProyecto,
      descripcion: this.proyecto.descripcion,
      contenidoHTML: this.compartirHTML,
      contenidoCSS: this.compartirCSS,
      contenidoJS: this.compartirJS,
    }

    this.usuariosServices.crearProyectoUsuario(data, this.usuario).subscribe(res =>{
      console.log(res);
      this.obtenerProyectos()
    },
    error => console.log(error))
  }

  obtenerUsuarios() {
    this.usuariosServices.obtenerUsuariosAdmin().subscribe(res =>{
      console.log('usuarios: ',res);
      this.usuarios = res;
    },
    error => console.log(error))
  }
}
