import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { JwtDto } from '../shared/models/jwt-dto';
import { environment } from 'src/environments/environment';

//Declarar la constante helper para el token
const helper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token = new BehaviorSubject<string>("");
  private tokenData =  new BehaviorSubject<any>({});


  constructor( private http:HttpClient,
    private router:Router) { }

    get token$(): Observable<string> {
      return this.token.asObservable();
    }
  
    get tokenData$(): Observable<any> {
      return this.tokenData.asObservable();
    }
  
    get tokenValue() {
      return this.token.getValue();
    }

    saveLocalStorage(token: string) {
      localStorage.setItem("token", token);
    }

    //AUTHGUARDS
    getAuthToken(): Observable<boolean>{
      return of(true);
    }

 // Método para verificar si el usuario ha iniciado sesión
 isAuthenticated(): boolean {
  const token = this.tokenValue;
  if (token) {
    return !helper.isTokenExpired(token);
  }
  return false;
}

//LOGUEO DE USUARIO 
    login(loginData:any): Observable<JwtDto|any>{
      return this.http.post<JwtDto>(`${environment.baseUrl}/auth/login`,loginData).pipe(
        map( (data:JwtDto) => {
          if(data.token){
            this.saveLocalStorage(data.token);
            this.token.next(data.token);
            const decoded= helper.decodeToken(data.token);

            //ADMINISTRADOR 
            if(decoded.sub == 0){
              this.router.navigate(['administrador']);
            }
            //CREADOR
            if(decoded.sub == 1){
              this.router.navigate(['creador']);
            }
            //USUARIO
            if(decoded.sub == 2){
              this.router.navigate(['usuario']);
            }
          }
          return data;
        }),
        catchError( (e) => this.handlerError (e))
      );
      
    }

    // Metodo para el signin en el formulario
    signInUser(user) {
      return this.http.post<JwtDto>(`${environment.baseUrl}/signin`, user).pipe(
        map((user: JwtDto) => {
          console.log(user);
          return user;
        })
      );
    }
  

    logout(){
      localStorage.removeItem("token");
      this.token.next("");
      this.tokenData.next(null);
      this.router.navigate(['/']);
    }

    checkToken(){
      const token = localStorage.getItem("token");
      if(token){
        const isExpired = helper.isTokenExpired(token);
        if(isExpired){
          this.logout();
        }else{
          this.token.next(token);
          //renovar los datos del perfil
          const { iat, exp, ...data} = helper.decodeToken(token);
          this.tokenData.next(data);
        }
      } else {
        this.logout();
      }
    }

    /**
   * Método para el maneno de errorres desplegados en el SnackBar
   * @param error Error enviado al método
   * @returns Lanza error en caso que el mensaje no esté nulo o vacío
   */
  handlerError(error:any):Observable<never>{
    let message = "Ha ocurrido un error";
    if (error) {
      message = `${error.error.message}`;
    }
    console.log('Handle Error ' + message);
    return throwError(message);
  }
}
