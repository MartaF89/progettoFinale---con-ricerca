import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.develop';
import { JwtHelperService } from '@auth0/angular-jwt';
export interface LoggedUser {
  _id?: string;
  name: string;
  email: string;
  password?: string; // opzionale nel frontend
  role: 'admin' | 'user';

  favorites?: string[]; // array di ID film
  cart?: {
    movieId: number;
    quantity: number;
  }[];

  createdAt?: string; // data di registrazione (ISO string)

  avatarUrl?: string; // immagine profilo
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SS_KEY = 'PF';
  loggedUser?: LoggedUser;
  constructor(private http: HttpClient, private jwt: JwtHelperService) {
    this.readToken();
  } // JwtHelperService servizio di supporto per decodifica token e lettura payload
  //memorizza il jwt nel sessionstorage, con la readtoken messa qui la funzione parte subito al primo utilizzo del services
  storeToken(jwt_token: string) {
    sessionStorage.setItem(this.SS_KEY, jwt_token);
    this.readToken();
  }
  //verifica se nel sessionstorage è presente il token, ne legge il payload e crea un oggetto rappresentazione utente loggato
  readToken() {
    const token = sessionStorage.getItem(this.SS_KEY);

    try {
      if (token !== null && !this.jwt.isTokenExpired(token)) {
        this.loggedUser = this.jwt.decodeToken<LoggedUser>(token) || undefined;
      } else {
        this.loggedUser = undefined;
      }
    } catch {
      this.loggedUser = undefined;
      sessionStorage.removeItem(this.SS_KEY);
      console.error('Impossibile deserializzare il token jwt');
    }
  }
  //metodo per vedere se sono loggato
  isLoggedIn() {
    return this.loggedUser !== undefined;
  }
  // Logica per la registrazione dell'utente
  register(
    name: string,
    email: string,
    password: string,
    password_confirm: string
  ) {
    return this.http.post<{ created_user_id: string }>(
      `${environment.backendProgFin}/utenti`,
      {
        name,
        email,
        password,
        password_confirm,
      }
    );
  }
  //logica per il login
  login(name: string, email: string, password: string) {
    return this.http.post<{ access_token: string }>(
      `${environment.backendProgFin}/utenti/login`,
      {
        name,
        email,
        password,
      }
    );
  }
}
