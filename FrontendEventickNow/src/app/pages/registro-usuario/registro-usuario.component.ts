import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseForm } from 'src/app/shared/utils/base-form';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})


export class RegistroUsuarioComponent implements OnInit{

  registerForm: any;
  
  
  //Crea las intancias a utilizar 
  constructor(
    private fb: FormBuilder,
    public baseForm:BaseForm, 
    private router:Router) {}

    ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(('^[A-Za-z]+$')),]],
        lastname: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(('^[A-Za-z]+$'))]],
        typeUser: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'))]],

      })
    }

    //Función para registrarse y enviar los datos
    onRegister(){

    }
}
