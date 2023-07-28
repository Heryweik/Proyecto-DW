import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PruebaComponent } from './pages/prueba/prueba.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'login', component: IniciarSesionComponent
  },
  {
    path: 'signup', component: RegistrarseComponent 
  },
  {
    path: 'planes', component: PlanesComponent
  },
  {
    path: 'prueba', component: PruebaComponent
  },
  {
    path: 'principal', component: PrincipalComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
