import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private firestore: AngularFirestore) { }

  getAttendances(): Observable<any[]> {
    return this.firestore.collection('Asistencias').valueChanges(); // Asegúrate de que el nombre de la colección sea correcto
  }
}