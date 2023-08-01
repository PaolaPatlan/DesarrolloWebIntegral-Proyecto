import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

//Variable de conexión con backend
import { environment } from 'src/environments/environment';
import { ApiResponse ,EventosResponse } from '../shared/models/administrador';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  constructor(private http: HttpClient) {}

  getEventosPen(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.baseUrl}/evento/consultarEventos/pendientes`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  getEventosApr(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.baseUrl}/evento/consultarEventos/aprobados`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  getEventosTod(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.baseUrl}/evento/consultarTodosEventos`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  updateEstatus(idEvento: number, newEstatus: number): Observable<EventosResponse> {
    const body = { idEvento, estatus: newEstatus };
    return this.http.put<EventosResponse>(`${environment.baseUrl}/evento/consultarEventos/actualizar`, body).pipe(catchError((error) => this.handlerError(error)));
  }

  deleteEvento(idEvento: number): Observable<any>{
    return this.http.delete(`${environment.baseUrl}/evento/eliminarEvento/${idEvento}`,).pipe(catchError((error) => this.handlerError(error)));
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
