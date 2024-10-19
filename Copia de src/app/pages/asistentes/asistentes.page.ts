import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/services/class.modal';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';

interface Attendance {
  id: string;
  email: string;
  fecha: Date;
  // Incluye el tipo de fecha
}

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {
  classId: string = ''; // ID de la clase
  attendances: any[] = [];
  classes: Class[] = [];
  asistencias: { email: string; fecha: Date }[] = [];
  // Cambié el tipo a Date// Lista de asistencias

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router,
    private classService: ClassService,
    private firestore: AngularFirestore,
    private cdr: ChangeDetectorRef,// Para obtener el ID de la clase de la ruta
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.classId = params.get('id') || ''; // Verifica que aquí obtienes el ID correcto
      console.log('Class ID:', this.classId); // Agrega este log para verificar el ID
      this.loadAttendances();
    });
  }

  async consultarAsistencias() {
    this.asistencias = [];

    const snapshot = await this.firestore.collection('Asistencias').get().toPromise();

    if (snapshot) {
      snapshot.forEach((doc: QueryDocumentSnapshot<any>) => {
        const data = doc.data();

        if (data && data.email && data.fecha) {
          this.asistencias.push({
            email: data.email,
            fecha: data.fecha.toDate() // Conversión de Timestamp a Date
          });
        }
      });
    }

    this.cdr.detectChanges(); // Forzar la detección de cambios

    if (this.asistencias.length === 0) {
      console.log("No se encontraron registros de asistencia.");
    } else {
      console.log("Registros encontrados:", this.asistencias);
    }
  }

  loadClasses() {
    this.classService.getClasses().subscribe(data => {
      this.classes = data.map(item => ({
        id: item.id,
        name: item.name,
        createdAt: this.convertTimestampToDate(item.createdAt), // Conversión del campo createdAt
        fecha: this.convertTimestampToDate(item.fecha) // Conversión del campo fecha
      }));
      console.log(this.classes);
    }, error => {
      alert('Error loading classes: ' + error);
    });
  }
  convertTimestampToDate(timestamp: any): Date | null {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000); // Convertir el timestamp en milisegundos
    } else {
      console.warn("El timestamp no está correctamente definido:", timestamp);
      return null; // Retorna null si el timestamp no está bien definido
    }
  }


  loadAttendances() {
    this.attendanceService.getAttendances().subscribe(data => {
      this.attendances = data; 
      console.log(this.attendances);
    }, error => {
      alert('Error loading attendances: ' + error);
    });
  }

 
}