import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreadorService } from 'src/app/services/creador.service';
import { EventoEntity } from 'src/app/shared/models/eventoEntity';
import { EventoRequest } from 'src/app/shared/models/eventoRequest';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { Response } from 'src/app/shared/models/response';

import Swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent implements OnInit {

  selectImagen: FileList;
  public previsualizacion: string;
  currentFile: File;
  public fileField = '';
  public formBuilder: FormBuilder;
  eventoForm: FormGroup;

  datos: [];
  public evento = new EventoRequest;

  detallesN: any;
  nomEventoN: any;
  fechaN: any;
  estatusN: any;
  costoN: any;
  cantBoletosN: any;
  ubicacionN: any;
  idOrganizadorN: any;

  nomEvento = new FormControl('', [Validators.required]);
  fecha = new FormControl('', [Validators.required]);
  estatus = new FormControl('');
  costo = new FormControl('', [Validators.required]);
  cantBoletos = new FormControl('', [Validators.required]);
  ubicacion = new FormControl('', [Validators.required]);
  detalles = new FormControl('', [Validators.required]);
  idOrganizador = new FormControl('', [Validators.required]);
  matcher = new ErrorStateMatcher();


  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private router: Router,
    private creadorService: CreadorService,
    private userService: UsuarioService
  ) {
    this.evento.cantBoletos = 0;
    this.evento.costo = 0;
    this.evento.detalles = '';
    this.evento.idOrganizador = 0;
    this.evento.multipartFile = null
    this.eventoForm = this.fb.group({
      'cantBoletos': Validators.required,
      'multipartFile': [null],
      'bytesImagen': [null],
      'detalles': Validators.required,
      'idOrganizador': Validators.required
    });
  }

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      'cantBoletos': Validators.required,
      'multipartFile': [null],
      'bytesImagen': [null],
      'detalles': Validators.required,
      'idOrganizador': Validators.required
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.evento.multipartFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = document.getElementById('previewImage');
      image.setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(file);
  }


  private convertirFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toISOString().split('T')[0]; // Convierte a formato 'yyyy-MM-dd'
  }

  crearEvento() {

    this.evento.idOrganizador = 11;
    this.evento.detalles = this.detallesN
    this.evento.cantBoletos = this.cantBoletosN;
    this.evento.costo = this.costoN;
    this.evento.ubicacion = this.ubicacionN;
    this.evento.nomEvento = this.nomEventoN;
    this.evento.fecha = this.fechaN;


    let formData = new FormData();

    formData.append('multipartFile', this.evento.multipartFile, this.evento.multipartFile.name);
    formData.append('detalles', this.evento.detalles);
    formData.append('idOrganizador', this.evento.idOrganizador);
    formData.append('cantBoletos', this.evento.cantBoletos);
    formData.append('costo', this.evento.costo);
    formData.append('ubicacion', this.evento.ubicacion);
    formData.append('nomEvento', this.evento.nomEvento);
    formData.append('fecha', this.convertirFecha(this.evento.fecha));


    this.creadorService.crearEvento(formData).subscribe((data:any) => {
      console.log(data)

      const nuevoEvento: EventoRequest = data; // Asegúrate de que el formato coincida
      this.creadorService.crearEvento(nuevoEvento);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Evento creado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    })
    this.router.navigate(['/creador']);
  }


  
}
