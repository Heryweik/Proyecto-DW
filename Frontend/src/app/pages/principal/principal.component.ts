import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{

  infoUsuario: any;
  proyectos: any = [];
  currentCollapseIndex: number | null = null;

  formularioCrearProyecto = new FormGroup({
    nombreProyecto: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    contenidoHTML: new FormControl('<h1>Hola</h1>', [Validators.required]),
    contenidoCSS: new FormControl('cssss', [Validators.required]),
    contenidoJS: new FormControl('function hola(){}', [Validators.required])
  });

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

}
