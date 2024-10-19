import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';


const firebaseConfig = {
  apiKey: "AIzaSyClGdbpIs2WtOOXpAj5V45tjeN2K57BuVY",
  authDomain: "auth-appqrv3.firebaseapp.com",
  projectId: "auth-appqrv3",
  storageBucket: "auth-appqrv3.appspot.com",
  messagingSenderId: "417323201487",
  appId: "1:417323201487:web:48976c332d8c42a72858ba"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  
  ],
    
  
  
  
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  },],

  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
