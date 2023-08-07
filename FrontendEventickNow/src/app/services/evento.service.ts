import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { JwtDto } from '../shared/models/jwt-dto';
import { Evento } from '../shared/models/evento';
import { environment } from 'src/environments/environment';

//Declarar la constante helper para el token
const helper = new JwtHelperService;
// Declaracion de la constante baseURL para la conexion hacia el back end con httpClient
const baseURL = "http://localhost:8080"


@Injectable({
  providedIn: 'root'
})
export class EventoService {


  constructor( private http:HttpClient) { }



    buscarEvento(evento: Evento):Observable<any>{
      return this.http.post(`${ environment.baseUrl }/evento/consultarEventos/filtros`, evento).pipe(catchError( (error) => this.handlerError(error)));
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
