import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


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

  infoUsuario: any;
  proyectos: any = [];
  currentCollapseIndex: number | null = null;

  constructor(private usuariosServices:UsuariosService) {}

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

    this.usuariosServices.modificarProyectoUsuario(infoProyecto, this.infoUsuario.id, this.idProyecto).subscribe(res =>{
      console.log('Proyectos actualizado: ',res);
    },
    error => console.log(error))
  }

}
