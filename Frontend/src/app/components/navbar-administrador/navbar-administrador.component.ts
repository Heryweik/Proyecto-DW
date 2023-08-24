import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.scss']
})
export class NavbarAdministradorComponent implements OnInit{

  
  infoUsuario: any;    

  ngOnInit(): void {
      /* Leemos la informacion de localStorage */
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      this.infoUsuario = JSON.parse(usuarioStorage);
      console.log('usuario logueado: ', this.infoUsuario.nombre);
    }
  }
}
