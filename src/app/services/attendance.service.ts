import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Cambiado a `map`

export interface Attendance {
  id: string;
  email: string;
  fecha: any; // Cambia `any` a `Date` si estás usando fechas
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private firestore: AngularFirestore) { }

  // Método para obtener todas las asistencias
  getAttendances(): Observable<any[]> {
    return this.firestore.collection('Asistencias').valueChanges(); // Asegúrate de que el nombre de la colección sea correcto
  }

  // Método para obtener asistencias de una clase específica
  getAttendancesByClassId(classId: string): Observable<Attendance[]> {
    return this.firestore.collection('Asistencias', ref => ref.where('id', '==', classId))
      .snapshotChanges()
      .pipe(
        map((actions: any[]) => actions.map(a => {
          const data = a.payload.doc.data() as Attendance;
          const docId = a.payload.doc.id;
          return { docId, ...data };
        }))
      );
  }
}