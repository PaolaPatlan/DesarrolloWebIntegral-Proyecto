import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private busquedaSubject = new Subject<string>();
  public terminoBusqueda = '';
  evento: Evento = { 
    idEvento   :'',
    nomEvento  :'',
    fecha      :'',
    ubicacion  :'',
    detalles   :'',
    estatus    :'',
    costo      :'',
    cantBoleto :'',
    imagen     :'',
  }; // Inicializar el objeto con la propiedad detalles

  resultadosBusqueda: any[] = [];

  constructor(private eventoService: EventoService) {
    // Suscripción para realizar la búsqueda después de un retraso de 500ms
    this.busquedaSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((terminoBusqueda: string) => {
        this.realizarBusquedaEnServidor(terminoBusqueda); // Aquí puedes hacer la llamada a tu servidor para buscar eventos
      });
  }

  realizarBusqueda() {
    // Emitir el término de búsqueda para realizar la búsqueda después del retraso
    this.busquedaSubject.next(this.terminoBusqueda);
  }


  realizarBusquedaEnServidor(terminoBusqueda: string) {
    if (terminoBusqueda.trim() !== '') {
      this.evento.detalles = terminoBusqueda;
      // Implementa aquí la lógica para buscar eventos en tu servidor
      this.eventoService.buscarEvento(this.evento).subscribe(data => {
        this.resultadosBusqueda = data.list;
        for (let index = 0; index < this.resultadosBusqueda.length; index++) {
          const element = this.resultadosBusqueda[index];
          this.getBase64Image(element.imagen).then((imageUrl) => {
            element.imagen = imageUrl;
          });
        }

        console.log(data.list);
      });
    } else {
      this.resultadosBusqueda = [];
    }
  }

  getBase64Image(base64Data: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const imageUrl = `data:image/png;base64,${base64Data}`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => resolve(imageUrl);
    });
  }


}
