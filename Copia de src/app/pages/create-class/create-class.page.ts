import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Router } from '@angular/router';
import * as QRcode from 'qrcode';
import { Class } from 'src/app/services/class.modal';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.page.html',
  styleUrls: ['./create-class.page.scss'],
})
export class CreateClassPage implements OnInit {
  someTimestamp: any; // Aquí está el Timestamp
  convertedDate: Date | undefined; 

  className: string = '';
  qrCodeUrl: string = '';
  private _classID: string = '';
  classes: Class[] = [];
  attendances: any[] = [];
  asistencias: { email: string; fecha: Date }[] = [];

  constructor(
    private classService: ClassService,
    private attendanceService: AttendanceService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private firestore: AngularFirestore
  ) { }
  
  get classID(): string {
    return this._classID; // Getter para classID
  }

  ngOnInit() {
    this.loadClasses();
    this.loadAttendances();
  }

  // Función que convierte un Timestamp en una fecha JavaScript
  convertTimestampToDate(timestamp: any): Date | null {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000); // Convertir el timestamp en milisegundos
    } else {
      console.warn("El timestamp no está correctamente definido:", timestamp);
      return null; // Retorna null si el timestamp no está bien definido
    }
  }

  createClass() {
    if (this.className.trim() === '') {
      return alert("Por favor, ingresa un nombre para la clase.");
    }

    this.classService.createClass(this.className)
      .then((docRef) => {
        this._classID = docRef.id;
        this.generateQRCode(this._classID);
        alert("Clase creada correctamente: " + this._classID);
        this.loadClasses();
      })
      .catch((error) => {
        alert("Error al crear la clase: " + error.message);
        console.error('Error al crear la clase:', error);
      });
  }

  generateQRCode(classID: string) {
    const qrData = `${classID}`;
    QRcode.toDataURL(qrData, (err: any, url: string) => {
      if (err) {
        console.error('Error generating QR:', err);
        return;
      }
      this.qrCodeUrl = url;
    });
  }

  // Método que carga las clases y convierte el Timestamp a Date
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

  loadAttendances() {
    this.attendanceService.getAttendances().subscribe(data => {
      this.attendances = data; 
      console.log(this.attendances);
    }, error => {
      alert('Error loading attendances: ' + error);
    });
  }

  getAttendanceByClassId(classId: string) {
    return this.attendances.filter(attendance => attendance.classId === classId);
  }

  viewAttendances(classId: string) {
    this.router.navigate(['/asistentes', { id: classId }]);
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
}