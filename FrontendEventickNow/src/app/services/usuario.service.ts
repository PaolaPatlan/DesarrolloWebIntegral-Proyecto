import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

//Variable de conexión
import { environment } from 'src/environments/environment';
import { ApiResponse ,EventosResponse } from '../shared/models/administrador';

//Búsqueda
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtDto } from '../shared/models/jwt-dto';
import { Evento } from '../shared/models/evento';

//Declarar la constante helper para el token
const helper = new JwtHelperService;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  getEventosTod(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.baseUrl}/evento/consultarTodosEventos`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  buscarEvento(evento: Evento):Observable<any>{
    return this.http.post(`${ environment.baseUrl }/evento/consultarEventos/filtros`, evento).pipe(catchError( (error) => this.handlerError(error)));
  }

  comparBoletos(evento: Evento, boletos: number):Observable<any>{
    return this.http.post(`${ environment.baseUrl }/evento/boletoCompra/${boletos}`, evento).pipe(catchError( (error) => this.handlerError(error)));
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
