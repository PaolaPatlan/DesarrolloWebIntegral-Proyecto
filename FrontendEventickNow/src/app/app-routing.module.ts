import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { CreadorEventosComponent } from './pages/creador-eventos/creador-eventos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { CrearEventoComponent } from './pages/crear-evento/crear-evento.component';


const routes: Routes = [
  {
   
    path: '',
    component: InicioComponent
  },
  {
    path: 'registro', 
    component: RegistroUsuarioComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
   
    path: 'administrador',
    component: AdministradorComponent
  },
  {
    path: 'creador', 
    component: CreadorEventosComponent
  },
  {
    path: 'creador/crearEvento', 
    component: CrearEventoComponent
  },
  {
    path: 'usuario', 
    component: UsuarioComponent
  },
  {
    path: 'confirmar/:correo', 
    component: ConfirmacionComponent
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
