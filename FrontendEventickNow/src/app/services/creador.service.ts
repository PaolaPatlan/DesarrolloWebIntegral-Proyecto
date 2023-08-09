import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse ,EventosResponse } from '../shared/models/administrador';
import { EventoRequest } from '../shared/models/eventoRequest';
import { EventoEntity } from '../shared/models/eventoEntity';
import { Response } from '../shared/models/response';

@Injectable({
  providedIn: 'root',
})
export class CreadorService {
  constructor(private http: HttpClient) {}

  getEventosTod(idOrganizador: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.baseUrl}/evento/consultarEventos/${idOrganizador}`)
      .pipe(catchError((error) => this.handlerError(error)));
  }


//   crearEvento(evento: EventoRequest):Observable<any>{
//     return this.http.post(`${ environment.baseUrl }/evento/guardarEvento`, evento)
//     .pipe(catchError( (error) => this.handlerError(error)));
//   }

  crearEvento(evento: EventoRequest, imagen: File): Observable<Response<EventoEntity>> {
    

    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('evento', JSON.stringify(evento));

    return this.http.post<Response<EventoEntity>>(`${ environment.baseUrl }/evento/guardarEvento`, formData);
  }

  // crearEvento(eventoFormData: FormData): Observable<any> {
  //   return this.http.post(`${ environment.baseUrl }/evento/guardarEvento`, eventoFormData)
  //     .pipe(catchError((error) => this.handlerError(error)));
  // }
  

  
  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrio un error';

    if (error.status == 401) {
      errorMessage = 'No autorizado';
    }

    return throwError(() => errorMessage);
  }
}
