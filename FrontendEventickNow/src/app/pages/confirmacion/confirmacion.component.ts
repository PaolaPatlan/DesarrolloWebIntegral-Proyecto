import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { registerUser } from 'src/app/shared/models/nuevoUsuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit{


  constructor(private router: Router, private routerP: ActivatedRoute, private registroService: RegistroService) { }
   s:string;

  navigationExtras: NavigationExtras = {
    replaceUrl: true
  };
   
  ngOnInit(): void {
    throw new Error('Method not implemented.');

  }


  redireccionar(): void {

    var data: registerUser = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      roles: null,
      correoElectronico: '',
      password: '',
    };

    this.routerP.params.subscribe(params => {
      data.correoElectronico = params['correo'];

      this.registroService.confirmUser(data).subscribe(() => {
        console.log('Usuario confirmado con éxito');

      });

    });

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tu cuenta ha sido activada',
      showConfirmButton: false,
      timer: 3000
    })

    

    this.router.navigate(['login'], this.navigationExtras);
  }



}
