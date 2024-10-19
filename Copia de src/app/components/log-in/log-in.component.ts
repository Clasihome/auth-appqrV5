import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  email: string = "";
  password: string = "";


  constructor(private authService: AuthService, private router :Router) { }

  ngOnInit() { }
  async login() {
    try { 
      await this.authService.login(this.email, this.password);
      alert("Logeado exitosamente: ");
      this.router.navigate(['/selector']);

    } catch (error) {
      alert ("Error en el login:"+error)
      console.error("Error en el login: "+error);
     };
  }

  async register() {
    try { 
      await this.authService.register(this.email, this.password);
      alert("Registrado exitosamente"+ this.email);

    } catch (error) {
      console.error("Problemas al registrar usuario: "+error);
     };
  }

}
