// src/app/services/class.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Class } from './class.modal';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private firestore: AngularFirestore) {}

  createClass(className: string): Promise<any> {
    const newClass: Class = {
      id: '', // Se asignará automáticamente por Firestore
      name: className,
      createdAt: new Date(),
      fecha: new Date()
      // Fecha actual al crear la clase
    };
    return this.firestore.collection('classes').add(newClass);
  }

  getClasses(): Observable<Class[]> {
    return this.firestore.collection<Class>('classes', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' });
  }
}