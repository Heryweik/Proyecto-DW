import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  /* Administrador */
  obtenerUsuariosAdmin():Observable<any>{
    return this.httpClient.get('http://localhost:8888/usuarios',{});
  }

  obtenerUnUsuariosAdmin(nombreUsuario: any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${nombreUsuario}`,{});
  }

  eliminarUsuariosAdmin(idUsuario:any):Observable<any>{
    return this.httpClient.delete(`http://localhost:8888/usuarios/${idUsuario}`,{});
  }

  /* Principales */

  crearUsuario(data: any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios`,
    {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      contrasenia: data.contrasenia,
      plan: data.plan
    });
  }

  loginUsuario(data: any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/login`,
    {
      correo: data.correo,
      contrasenia: data.contrasenia
    });
  }

  obtenerProyectosUsuario(idUsuario: any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}/proyectos`,{});
  }

  crearProyectoUsuario(data: any, idUsuario:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/${idUsuario}/proyectos`,
    {
      nombreProyecto: data.nombreProyecto,
      descripcion: data.descripcion,
      archivos: [
        {
            nombreArchivo: "HTML",
            tipo: "html",
            contenido: data.contenidoHTML
        },
        {
            nombreArchivo: "CSS",
            tipo: "css",
            contenido: data.contenidoCSS
        },
        {
            nombreArchivo: "JS",
            tipo: "javascript",
            contenido: data.contenidoJS
        }
      ] 
    });
  }

  modificarProyectoUsuario(data: any, idUsuario:any, idProyecto:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/usuarios/${idUsuario}/proyectos/${idProyecto}`,
    {
      nombreProyecto: data.nombreProyecto,
      descripcion: data.descripcion,
      archivos: [
        {
            nombreArchivo: "HTML",
            tipo: "html",
            contenido: data.contenidoHTML
        },
        {
            nombreArchivo: "CSS",
            tipo: "css",
            contenido: data.contenidoCSS
        },
        {
            nombreArchivo: "JS",
            tipo: "javascript",
            contenido: data.contenidoJS
        }
      ] 
    });
  }

  eliminarProyectosUsuario(idUsuario: any, idProyecto:any):Observable<any>{
    return this.httpClient.delete(`http://localhost:8888/usuarios/${idUsuario}/proyectos/${idProyecto}`,{});
  }
}