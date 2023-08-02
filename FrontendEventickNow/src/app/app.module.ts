import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { CreadorEventosComponent } from './pages/creador-eventos/creador-eventos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    AdministradorComponent,
    CreadorEventosComponent,
    UsuarioComponent,
    ConfirmacionComponent,
    LoginComponent,
    InicioComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, // Modulo donde se encuentran los componentes de angular material
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
