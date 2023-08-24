import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent {

  suscripcion: any;

  formularioRegistro: FormGroup | any;

  constructor(private usuariosServices:UsuariosService,
    private router: Router) {
      /* Lo ponemos aqui para poder asignar el valor de la suscripcion al elemento plan */
      this.formularioRegistro = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        contrasenia: new FormControl('', [Validators.required]),
        plan: new FormControl('', [Validators.required])
      });
    }

    ngOnInit(): void {

    }

  suscripcionElegida(plan: any){
    this.suscripcion = plan;
    console.log(this.suscripcion);

    this.formularioRegistro.patchValue({
      plan: this.suscripcion
    });
  }

  registrarse(){
    this.usuariosServices.crearUsuario(this.formularioRegistro.value).subscribe(res =>{
      console.log('Usuario creado: ',res);
      this.router.navigate(['/login']);
    },
    error => console.log(error))
  }
}
