import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit{
  usuarios: any = [];
  idUsuarioEliminar: any;
  usuarioBuscar: any;
  regionVisible: string = '';

  formularioBuscarUsuario = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  constructor(private usuariosServices:UsuariosService) {}

  ngOnInit(): void {
    /* Consumo del endpoint para obtener los proyectos del usuario */
    this.obtenerUsuarios()

    this.regionVisible = 'buscador';
  }

  obtenerUsuarios() {
    this.usuariosServices.obtenerUsuariosAdmin().subscribe(res =>{
      console.log('usuarios: ',res);
      this.usuarios = res;
    },
    error => console.log(error))
  }

  buscarUsuario() {
    this.usuarioBuscar = this.formularioBuscarUsuario.value;

    this.usuariosServices.obtenerUnUsuariosAdmin(this.usuarioBuscar.nombre).subscribe(res =>{
      console.log('usuario: ',res);
      this.usuarios = [res];
      this.regionVisible = 'recarga';
    },
    error => console.log(error))
  }

  recargar(){
    this.obtenerUsuarios();
    
    this.regionVisible = 'buscador';
  }

  usuarioEliminar(idUsuario: any) {
    this.idUsuarioEliminar = idUsuario;
  }

  eliminar() {
    this.usuariosServices.eliminarUsuariosAdmin(this.idUsuarioEliminar).subscribe(res =>{
      this.obtenerUsuarios();
    },
    error => console.log(error))
  }

}
