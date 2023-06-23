import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {
   
    path: 'inicio',
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
