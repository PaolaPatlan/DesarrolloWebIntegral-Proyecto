import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreadorService } from 'src/app/services/creador.service';
import { EventoEntity } from 'src/app/shared/models/eventoEntity';
import { EventoRequest } from 'src/app/shared/models/eventoRequest';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { Response } from 'src/app/shared/models/response';

import Swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent implements OnInit {

  eventoForm: any;
  selectImagen: FileList;
  public previsualizacion: string;
  currentFile: File ;
  public fileField='';

  datos: [];
  evento = new EventoRequest();
  
  nomEvento = new FormControl('', [Validators.required]);
  fecha = new FormControl('', [Validators.required]);
  estatus = new FormControl('');
  costo = new FormControl('', [Validators.required]);
  cantBoletos  = new FormControl('', [Validators.required]);
  ubicacion  = new FormControl('', [Validators.required]);
  detalles  = new FormControl('', [Validators.required]);
  idOrganizador = new FormControl('', [Validators.required]);

  matcher = new ErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private router: Router,
    private creadorService: CreadorService
  ) {}

  ngOnInit(): void {
    
  }

  crearEvento(){
    
    this.currentFile = this.selectImagen.item(0);

    this.creadorService.crearEvento(this.evento, this.currentFile).subscribe((data:Response<EventoEntity>)=>{
      console.log(data)

      Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Evento creado correctamente',
              showConfirmButton: false,
              timer: 1500
        
              
            });
    })
  }
  
  // imagen
selectFile(event: any ): void {

  this.selectImagen = event.target.files;

 const file :File = event.target.files[0];
}

// ********* METODO SUBIR ARCHIVOS ********** //
openBottomSheet(){

}

// crearEvento(event: Event) {
//   const idUsuario = +localStorage.getItem('idUsuario');

//   if (this.eventoForm.invalid) return;

//   const formValues = this.eventoForm.value;

//   const data = new FormData(); // Utilizar FormData

//   data.append('nomEvento', formValues.nomEvento ? formValues.nomEvento : '');
//   data.append('fecha', formValues.fecha ? formValues.fecha : '');
//   data.append('ubicacion', formValues.ubicacion ? formValues.ubicacion : '');
//   data.append('detalles', formValues.detalles ? formValues.detalles : '');
//   data.append('costo', formValues.costo ? formValues.costo : '');
//   data.append('cantBoleto', formValues.cantBoleto ? formValues.cantBoleto : '');
//   data.append('estatus', '0'); // Establecer el estatus en 0
//   data.append('idOrganizador', idUsuario.toString()); // Convertir a cadena

//   // Obtener el archivo seleccionado
//   const archivoSeleccionado = (event.target as HTMLInputElement).files[0];

//   // Agregar imagen solo si se selecciona
//   if (archivoSeleccionado) {
//     data.append('imagenFile', archivoSeleccionado, archivoSeleccionado.name);
//   }

//   this.creadorService.crearEvento(data).subscribe(() => {
//     console.log('Evento creado con exito');
//     Swal.fire({
//       position: 'center',
//       icon: 'success',
//       title: 'Evento creado correctamente',
//       showConfirmButton: false,
//       timer: 1500

      
//     });
//     this.router.navigate(['/creador']);
//   });
// }

  
  
}
