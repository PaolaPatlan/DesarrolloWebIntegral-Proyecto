import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EventosResponse } from 'src/app/shared/models/administrador';

//pdf
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//Búsqueda
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Evento } from 'src/app/shared/models/evento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{
  eventos: EventosResponse[] = [];
  numEven: number;
  boton:false;
  totlBoletos: number = 0;
  totalCosto: number = 0;

  idCompra: number = Math.floor((Math.random() * 1200) + 1);

  //Paypal 
  @ViewChild('paymentRef', {static:true}) paymentRef!: ElementRef;

  //Paypal fin 

  public terminoBusqueda = '';
  evento: Evento = { 
    idEvento   :0,
    nomEvento  :'',
    fecha      :'',
    ubicacion  :'',
    detalles   :'',
    estatus    :'',
    costo      :'',
    cantBoleto :'',
    imagen     :'',
  };

  constructor(private userService: UsuarioService){
     // Suscripción para realizar la búsqueda después de un retraso de 500ms
     this.busquedaSubject
     .pipe(debounceTime(500), distinctUntilChanged())
     .subscribe((terminoBusqueda: string) => {
       this.realizarBusquedaEnServidor(terminoBusqueda); // Aquí puedes hacer la llamada a tu servidor para buscar eventos
     });
  }

  ngOnInit(): void {
    this.eventosAprobados();
    this.obtenerCB(this.totlBoletos);
    window.paypal.Buttons(
      {
        style:{
          layout: 'horizontal',
          color: 'silver',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data:any, actions: any) =>{
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalCosto.toString(),
                  currency_code: 'MXN'
                }
              }
            ]
          })
        },
        onApprove : (data:any, actions:any) =>{
          return actions.order.capture().then((details: any)=>{
            if (details.status === 'COMPLETED'){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra exitosa',
                text: 'Boletos adquiridos: ' + this.totlBoletos,
                footer:'ID compra: ' + this.idCompra,
                showConfirmButton: true,
                confirmButtonText: 'Descargar'               
              }).then((result) => {
                if (result.isConfirmed) {
                  this.generatePDF();
                }
              });;
            }
            this.totalCosto = 0;
            this.eventosAprobados();
          });
        },
        onError:() =>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debes seleccionar por lo menos un boleto',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

  obtenerCB(boletosC: number){
    this.totlBoletos = boletosC;
  }

  comprarEventos(eventoId: number, numEven:number, boletos:number){
    this.evento.idEvento = eventoId;

    if (numEven > boletos ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No puedes comprar más boletos de los existentes',
        showConfirmButton: false,
        timer: 1500
      });
      this.eventosAprobados();
      return;
    }

    this.userService.comprarBoletos(this.evento, numEven).subscribe((data) =>{

      if (data.data.cantBoletos <= 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Los boletos se han agotado',
          showConfirmButton: false,
          timer: 1500
        });
        this.eventosAprobados();
        return;
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha comprado el boleto correctamente',
        showConfirmButton: false,
        timer: 1500
      });
  
      // Vuelve a cargar la lista de eventos después de realizar la compra
      this.totalCosto = 0;
      this.eventosAprobados();
    });
  }
  
  actualizarTotal(eventoId: number, boletos:number, costo:number){
    this.evento.idEvento = eventoId;
    this.totlBoletos = boletos;
    this.totalCosto = boletos * costo;
  }

  eventosAprobados(): void {
    this.userService.getEventosApr().subscribe((data) => {
      this.eventos = data.list.map((evento) => ({ ...evento, numEven: 0 }));

      // Procesa la imagen 
      this.eventos.forEach((evento) => {
        this.getBase64Image(evento.imagen).then((imageUrl) => {
          evento.imagen = imageUrl;
        });
      });
    });
    this.realizarBusquedaEnServidor(this.terminoBusqueda);
  }

  private busquedaSubject = new Subject<string>();
  // Inicializar el objeto con la propiedad detalles

  resultadosBusqueda: any[] = [];

  realizarBusqueda() {
    // Emitir el término de búsqueda para realizar la búsqueda después del retraso
    this.busquedaSubject.next(this.terminoBusqueda);
  }


  realizarBusquedaEnServidor(terminoBusqueda: string) {
    if (terminoBusqueda.trim() !== '') {
      this.evento.detalles = terminoBusqueda;
      // Implementa aquí la lógica para buscar eventos en tu servidor
      this.userService.buscarEvento(this.evento).subscribe(data => {
        this.resultadosBusqueda = data.list.map((evento) => ({ ...evento, numEven: 0 }));
        for (let index = 0; index < this.resultadosBusqueda.length; index++) {
          const element = this.resultadosBusqueda[index];
          this.getBase64Image(element.imagen).then((imageUrl) => {
            element.imagen = imageUrl;
          });
        }

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

  //Genera el recibo 
  generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const documentDefinition = {
      pageSize: { width: 400, height: 300 }, 
      content: [
        { 
          alignment: 'center',
          text: 'EventickNow',
          style: 'header',
          fontSize: 30,
          bold: true,
          margin: [0, 10],
      },
      {
        canvas: [
          { type: 'line', x1: 0, y1: 10, x2: 310, y2: 10, lineWidth: 1, lineColor: '#8437D3' }
        ]
      },
        { 
          alignment: 'center',
          text: 'Gracias por tu compra',
          style: 'subheader',
          fontSize: 20,
          bold: false,
          margin: [0, 10],
      },
      { 
        alignment: 'left',
        text: `Boletos comprados: ${this.totlBoletos}`,
        fontSize: 15,
        bold: false,
        margin: [0, 10],
    },
    { 
      alignment: 'left',
      text: `ID de compra: ${this.idCompra}`,
      fontSize: 15,
      bold: false,
      margin: [0, 10],
  }
      ]
    };

    const nombre = 'Recibo.pdf';
    pdfMake.createPdf(documentDefinition).download(nombre);
  }
}
