import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ImgLandingComponent } from './components/img-landing/img-landing.component';
import { NavbarPricipalComponent } from './components/navbar-pricipal/navbar-pricipal.component';
import { NavbarPruebaComponent } from './components/navbar-prueba/navbar-prueba.component';
import { NavbarAdministradorComponent } from './components/navbar-administrador/navbar-administrador.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    PlanesComponent,
    PruebaComponent,
    PrincipalComponent,
    ImgLandingComponent,
    NavbarPricipalComponent,
    NavbarPruebaComponent,
    NavbarAdministradorComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
