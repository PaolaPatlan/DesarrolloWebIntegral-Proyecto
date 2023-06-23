import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({providedIn:"root"})
export class BaseForm {
    
    constructor(){

    }

    isValidField(form: AbstractControl|null){
        let flag = false;
        if (form != null) {
            flag = form.touched || form.dirty && !form.valid;
        }
        return flag;
    }

    getErrorMessage(form: AbstractControl|null){
        let message = "";
        if (form){
            const {errors} = form;
            if (errors) {
                const messages: any = {
                    required: 'Campo requerido',
                    email: 'Correo inválido',
                    pattern: 'Formato inválido',
                    minError: 'El rango no es correcto',
                    minlength: 'El mínimo de carácteres es 8',
                    maxlength: 'El máximo de carácteres es 20'
                }

                const errorKey = Object.keys(errors).find(Boolean);
                if (errorKey) {
                    message = messages[errorKey];
                }
            }
        }
        return message;
    }
}