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
    // Generar un ID manualmente
    const id = this.firestore.createId();
    const newClass: Class = {
      id: id,
      name: className,
      createdAt: new Date(),
      fecha: new Date()
    };

    // Guardar el documento con el ID especificado
    return this.firestore.collection('classes').doc(id).set(newClass);
  }

  getClasses(): Observable<Class[]> {
    // Usa `valueChanges({ idField: 'id' })` para incluir el campo `id` en los datos
    return this.firestore.collection<Class>('classes', ref => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  // Nuevo método para obtener una clase específica por ID
  getClassById(classId: string): Observable<Class | undefined> {
    return this.firestore.collection('classes').doc<Class>(classId).valueChanges();
  }
}