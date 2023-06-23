import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';

const routes: Routes = [
  {
   
    path: '',
    component: InicioComponent
  },
  {
    path: 'registro', 
    component: RegistroUsuarioComponent
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
