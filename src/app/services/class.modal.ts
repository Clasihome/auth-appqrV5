// src/app/services/class.modal.ts
export interface Class {
    id: string;
    name: string;
    createdAt: Date | null; // Permitir que sea Date o null
    fecha: Date | null;     // Permitir que sea Date o null
  }