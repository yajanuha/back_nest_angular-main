import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // ✅ Usa localhost y el puerto 3000
  private baseUrl = environment.urlServidor;

  private http = inject(HttpClient);

  constructor() {}

  // ✅ El login en NestJS es un POST, no un GET
  loginConNest(credenciales: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credenciales);
  }

  registroConNest(datos: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, datos);
  }
}
