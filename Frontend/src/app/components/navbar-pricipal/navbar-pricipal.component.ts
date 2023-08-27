import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var bootstrap: any; // Importar Bootstrap desde el ámbito global

 @Component({
  selector: 'app-navbar-pricipal',
  templateUrl: './navbar-pricipal.component.html',
  styleUrls: ['./navbar-pricipal.component.scss']
})
export class NavbarPricipalComponent implements OnInit{

  @Input() idProyecto: any;
  @Input() nombreP: any;
  @Input() descripcionProyecto: any;
  @Input() htmlCode: any;
  @Input() cssCode: any;
  @Input() jsCode: any;

  /* Modal compartir */
  @ViewChild ('modalCompartir') modalCompartir: any;

  infoUsuario: any;
  proyectos: any = [];
  currentCollapseIndex: number | null = null;
  usuarios: any = [];
  usuario: any = '';
  proyecto:any = [];
  compartirHTML: any;
  compartirCSS: any;
  compartirJS: any;

  constructor(private usuariosServices:UsuariosService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    /* Leemos la informacion de localStorage */
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      this.infoUsuario = JSON.parse(usuarioStorage);
      console.log('usuario logueado: ', this.infoUsuario.nombre);
    }

    this.obtenerUsuarios()

    /* Obtenemos el arreglo con los proyectos del service */
    this.usuariosServices.proyectos$.subscribe(proyectos => {
      this.proyectos = proyectos;
    });
    /* this.obtenerProyectos() */
  }

  /* Usuarios que se ven al compartir un proyecto */
  obtenerUsuarios() {
    this.usuariosServices.obtenerUsuariosAdmin().subscribe(res =>{
      console.log('usuarios: ',res);
      this.usuarios = res;
    },
    error => console.log(error))
  }


  /* obtenerProyectos() {
    this.usuariosServices.obtenerProyectosUsuario(this.infoUsuario.id).subscribe(res =>{
      console.log('Proyectos del usuario: ',res);
      this.proyectos = res.proyectos;
    },
    error => console.log(error))
  } */

  /* Ayuda al colapso de los proyectos para ver sus archivos */
  toggleCollapse(index: number) {
    if (this.currentCollapseIndex === index) {
      this.currentCollapseIndex = null;
    } else {
      this.currentCollapseIndex = index;
    }
  }

  guardarProyecto(){

    const infoProyecto = {
      nombreProyecto: this.nombreP,
      descripcion: this.descripcionProyecto,
      contenidoHTML: this.htmlCode,
      contenidoCSS: this.cssCode,
      contenidoJS: this.jsCode,
    };

    console.log(infoProyecto)

    this.usuariosServices.modificarProyectoUsuario(infoProyecto, this.infoUsuario.id, this.idProyecto).subscribe(res =>{
      console.log('Proyectos actualizado: ',res);

      /* Actualizamos el arreglo de proyectos del service */
    this.usuariosServices.actualizarProyectos(this.proyectos);
    },
    error => console.log(error))

  }

  eleminarProyecto(idProyecto: any) {
    console.log('id del usuario a eliminar proyecto: ', this.infoUsuario.id)

    this.usuariosServices.eliminarProyectosUsuario(this.infoUsuario.id, idProyecto).subscribe(res =>{
      console.log('Proyecto eliminado: ',res);

      /* Se actualiza la lista de proyectos */
      this.obtenerProyectos();
    },
    error => console.log(error))
  }

  obtenerProyectos() {
    this.usuariosServices.obtenerProyectosUsuario(this.infoUsuario.id).subscribe(res => {
      this.usuariosServices.actualizarProyectos(res.proyectos); // Actualiza el servicio compartido
    },
    error => console.log(error));
  }

  compartirProyecto(proyecto: any) {
    console.log('ver información del proyecto: ', proyecto);
    this.proyecto = proyecto;

    proyecto.archivos.forEach((item: { tipo: string; contenido: string; }) => {
      if (item.tipo === 'html') {
          this.compartirHTML = item.contenido;
      } else if (item.tipo === 'css') {
          this.compartirCSS = item.contenido;
      } else if (item.tipo === 'js') {
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

}
