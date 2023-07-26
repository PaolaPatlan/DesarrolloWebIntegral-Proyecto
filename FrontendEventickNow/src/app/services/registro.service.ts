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

  constructor(private http: HttpClient) { }

  
/*
  función para nuevo usuario
*/
newUser(user: registerUser):Observable<any>{
  return this.http.post(`${ environment.baseUrl }/auth/nuevo`, user).pipe(catchError( (error) => this.handlerError(error)));
}

/*
  función para errores
*/
handlerError(error: any): Observable<never> {
  let errorMessage = "Ocurrio un error";

  if(error.status == 401) {
    errorMessage = "No autorizado";
  }

  return throwError(() => errorMessage);
}
}