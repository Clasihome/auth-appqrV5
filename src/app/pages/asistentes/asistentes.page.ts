import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/services/class.modal';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

interface Attendance {
  id: string;
  email: string;
  fecha: Date;
}

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {
  classId: string = ''; // ID de la clase
  attendances: Attendance[] = []; // Lista de asistencias
  className: string = ''; // Nuevo: para almacenar el nombre de la clase

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router,
    private classService: ClassService,
    private firestore: AngularFirestore,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Obtener el ID de la clase de la ruta
    this.route.paramMap.subscribe(params => {
      this.classId = params.get('id') || ''; 
      console.log('Class ID:', this.classId); // Verifica el ID
      this.loadClassName(); // Cargar el nombre de la clase
      this.loadAttendances(); // Cargar las asistencias
    });
  }

  loadClassName() {
    // Llama al servicio para obtener el nombre de la clase por ID
    this.classService.getClassById(this.classId).subscribe((classData: Class | undefined) => {
      if (classData) {
        this.className = classData.name;  // Asigna el nombre de la clase
      } else {
        console.warn(`No se encontró la clase con ID: ${this.classId}`);
      }
    }, error => {
      console.error('Error al cargar el nombre de la clase:', error);
    });
  }

  loadAttendances() {
    this.attendanceService.getAttendancesByClassId(this.classId).subscribe(data => {
      // Convierte el campo `fecha` de `Timestamp` a `Date`
      this.attendances = data.map(attendance => ({
        ...attendance,
        fecha: attendance.fecha.toDate()  // Conversión aquí
      }));
      console.log(`Asistencias para la clase ${this.classId}:`, this.attendances);
    }, error => {
      console.error('Error al cargar las asistencias:', error);
    });
  }

  // Método para convertir timestamps
  convertTimestampToDate(timestamp: any): Date | null {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000); 
    } else {
      console.warn("El timestamp no está correctamente definido:", timestamp);
      return null;
    }
  }
}