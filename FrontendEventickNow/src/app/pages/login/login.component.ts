import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { BaseForm } from 'src/app/shared/utils/base-form';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: any;
  idUsuario: number;

  //Crea las intancias a utilizar 
  constructor(
    private fb: FormBuilder,
    public baseForm:BaseForm, 
    private router:Router,
    private loginService: LoginService) {}

  ngOnInit(): void {

    //Aplica las validaciones necesarias para el formulario de registro registerForm
    this.loginForm = this.fb.group({
      correoElectronico: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.maxLength(9)]],

    })
  }

     // ***************************** LOGIN ***********************************
  login() {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe((data) => {
      console.log(data);
      this.idUsuario = data.idUsuario; 
      localStorage.setItem('idUsuario', this.idUsuario.toString()); 
    },
    (error)=>{
      console.error(error);
        // Mostrar una alerta de error utilizando SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Correo electrónico o contraseña incorrectos',
          showConfirmButton: false,
          timer: 4500
        })
    });
  }

  logout(){
    this.loginService.logout();
  }

}
