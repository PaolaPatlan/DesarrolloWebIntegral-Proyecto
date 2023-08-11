import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../shared/models/eventoOrganizador';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http:HttpClient,
  ) { }

// ************************* CONSULTAR TODOS LOS EVENTOS POR ID ORGANIZADOR *************************************
  getEventosTod(idOrganizador: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.baseUrl}/evento/consultarEventos/${idOrganizador}`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  // GUARDAR EVENTO 

  guardarEvento(){

  }

  // HANDLER ERROR
  handlerError(error:any):Observable<never>{
    let message = "Ha ocurrido un error";


    if (error) {
      message = `${error.error.message}`;
    }
    console.log('Handle Error ' + message);
    return throwError(message);
  }
}
