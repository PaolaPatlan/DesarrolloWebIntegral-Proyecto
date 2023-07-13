import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseForm } from 'src/app/shared/utils/base-form';

import { RegistroService } from 'src/app/services/registro.service';
//Modelo para registrar usuario
import { registerUser } from '../../shared/models/nuevoUsuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent implements OnInit {
  registerForm: any;

  //Crea las intancias a utilizar
  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private router: Router,
    private registroService: RegistroService
  ) {}

  ngOnInit(): void {
    //Aplica las validaciones necesarias para el formulario de registro registerForm
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z s]*$'),
        ],
      ],
      lastnamep: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z s]*$'),
        ],
      ],
      lastnamem: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z s]*$'),
        ],
      ],
      typeUser: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  //Función para registrarse y enviar los datos
  onRegister() {

    if(this.registerForm.invalid)return;

    const formValues = this.registerForm.value;

      var data: registerUser = {
        nombre: formValues.name ? formValues.name : '',
        apellidoPaterno: formValues.lastnamep ? formValues.lastnamep : '',
        apellidoMaterno: formValues.lastnamem ? formValues.lastnamem : '',
        roles: formValues.typeUser ? formValues.typeUser : '',
        correoElectronico: formValues.email ? formValues.email : '',
        password: formValues.password ? formValues.password : '',
      }

      this.registroService.newUser(data).subscribe(() => {
        console.log('Usuario creado');
        
      });
    }
  }

