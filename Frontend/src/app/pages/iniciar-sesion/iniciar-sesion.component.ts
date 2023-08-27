import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TmplAstRecursiveVisitor } from '@angular/compiler';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit{
  validacion: boolean = false;

  formularioLogin = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', [Validators.required])
  });

  constructor(private usuariosServices:UsuariosService,
              private router: Router) {}

  ngOnInit(): void {

  }

  login(){
    this.usuariosServices.loginUsuario(this.formularioLogin.value).subscribe(res =>{
      console.log('Repuesta del backend: ',res);

      if (res.administrador === false) {
      this.router.navigate(['/principal/' + res.id]).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['/administrador/' + res.id]);
    }

    

      //Guardando la respuesta en localStorage
      localStorage.setItem('usuario', JSON.stringify(res));
    },
    error => {
      console.log(error)
      this.validacion= true;
    })
  }

}
