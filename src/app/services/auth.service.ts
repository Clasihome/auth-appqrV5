import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }
  
  async login(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.angularFireAuth.signOut();
  }

   // Cambiamos el método getUser a getCurrentUser
   async getCurrentUser(): Promise<any> {
    const user = await this.angularFireAuth.currentUser; // Obtiene el usuario actual
    return user; // Devuelve el usuario
  }
  async getCurrentUserEmail(): Promise<string> {
    const user = await this.angularFireAuth.currentUser;
    if (user) {
      return user.email as string; // Asegúrate de que el email sea un string
    } else {
      throw new Error("No hay usuario autenticado.");
    }
  }
}