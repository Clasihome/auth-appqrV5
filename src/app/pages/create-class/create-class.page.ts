import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
import { Class } from 'src/app/services/class.modal';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.page.html',
  styleUrls: ['./create-class.page.scss'],
})
export class CreateClassPage implements OnInit {
  someTimestamp: any;
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
    return this._classID;
  }

  ngOnInit() {
    this.loadClasses();
  }

  // Conversión de Timestamp a Date
  convertTimestampToDate(timestamp: any): Date | null {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    } else {
      console.warn("El timestamp no está correctamente definido:", timestamp);
      return null;
    }
  }

  // Creación de la clase y generación de QR
  createClass() {
    if (this.className.trim() === '') {
      return alert("Por favor, ingresa un nombre para la clase.");
    }

    const id = this.firestore.createId();
    const newClass: Class = {
      id: id,
      name: this.className,
      createdAt: new Date(),
      fecha: new Date()
    };

    this.firestore.collection('classes').doc(id).set(newClass)
      .then(() => {
        this._classID = id;
        this.generateQRCode(this._classID); // Genera el QR
        alert("Clase creada correctamente: " + this._classID);
        this.loadClasses();
      })
      .catch((error) => {
        alert("Error al crear la clase: " + error.message);
        console.error('Error al crear la clase:', error);
      });
  }

  // Generación de código QR
  generateQRCode(classID: string) {
    const qrData = `${classID}`;
    QRCode.toDataURL(qrData, (err: any, url: string) => {
      if (err) {
        console.error('Error generating QR:', err);
        return;
      }
      this.qrCodeUrl = url;
    });
  }

  // Carga de clases con conversión de Timestamp
  loadClasses() {
    this.classService.getClasses().subscribe(data => {
      this.classes = data.map(item => ({
        id: item.id,
        name: item.name,
        createdAt: this.convertTimestampToDate(item.createdAt),
        fecha: this.convertTimestampToDate(item.fecha)
      }));
      console.log(this.classes);
    }, error => {
      alert('Error loading classes: ' + error);
    });
  }

  // Navega a la página de asistencias para una clase específica
  viewAttendances(classId: string) {
    this.attendanceService.getAttendancesByClassId(classId).subscribe(data => {
      this.attendances = data;
      console.log(`Asistencias para la clase ${classId}:`, this.attendances);
      this.router.navigate(['/asistentes', { id: classId }]);
    }, error => {
      alert('Error al cargar las asistencias: ' + error);
    });
  }

  // Consulta de asistencias y conversión de Timestamp
  async consultarAsistencias() {
    this.asistencias = [];

    const snapshot = await this.firestore.collection('Asistencias').get().toPromise();
    if (snapshot) {
      snapshot.forEach((doc: QueryDocumentSnapshot<any>) => {
        const data = doc.data();
        if (data && data.email && data.fecha) {
          this.asistencias.push({
            email: data.email,
            fecha: data.fecha.toDate() 
          });
        }
      });
    }

    this.cdr.detectChanges();

    if (this.asistencias.length === 0) {
      console.log("No se encontraron registros de asistencia.");
    } else {
      console.log("Registros encontrados:", this.asistencias);
    }
  }
}