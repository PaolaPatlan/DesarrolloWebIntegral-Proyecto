import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { BaseForm } from 'src/app/shared/utils/base-form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: any;

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
      password: ['',[Validators.required,Validators.maxLength(20)]],

    })
  }

   // FUNCION PARA LOGEARSE 
   login(){
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value).subscribe (data=>{
      console.log(data)
    })

  }

}
