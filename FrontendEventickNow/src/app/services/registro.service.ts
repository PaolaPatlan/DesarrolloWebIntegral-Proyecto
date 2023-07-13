import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

//Modelo para registrar usuario
import { registerUser } from '../shared/models/nuevoUsuario';

//Variable de conexión con backend
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  //Conexión con el backend para insertar nuevo usuario
  ///auth/nuevo;

  constructor(private http: HttpClient) { }

  
  newUser(user: registerUser) {
    return this.http.post(`${ environment.baseUrl }/auth/nuevo`, user)
  }
}