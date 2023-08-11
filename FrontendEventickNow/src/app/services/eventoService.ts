import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventosResponse } from 'src/app/shared/models/administrador';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private eventosSubject = new BehaviorSubject<EventosResponse[]>([]);
  eventos$ = this.eventosSubject.asObservable();

  agregarEvento(evento: EventosResponse) {
    const eventosActuales = this.eventosSubject.value;
    eventosActuales.push(evento);
    this.eventosSubject.next(eventosActuales);
  }

  
}
