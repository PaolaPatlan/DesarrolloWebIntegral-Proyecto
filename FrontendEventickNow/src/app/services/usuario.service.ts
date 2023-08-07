import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

//Variable de conexión
import { environment } from 'src/environments/environment';
import { ApiResponse ,EventosResponse } from '../shared/models/administrador';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  getEventosTod(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.baseUrl}/evento/consultarTodosEventos`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

    /*
  función para errores
*/
handlerError(error: any): Observable<never> {
  let errorMessage = 'Ocurrio un error';

  if (error.status == 401) {
    errorMessage = 'No autorizado';
  }

  return throwError(() => errorMessage);
}
}
