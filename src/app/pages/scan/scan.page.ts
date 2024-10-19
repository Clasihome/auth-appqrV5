import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Class } from 'src/app/services/class.modal';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Router } from '@angular/router';


interface Attendance {
  id: string;
  email: string;
  fecha: Date;
  // Incluye el tipo de fecha
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  scanResult = '';
  asistencias: { email: string; fecha: Date }[] = [];
  classes: Class[] = [];// Cambié el tipo a Date
  attendances: any[] = [];

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private classService: ClassService,
    private attendanceService: AttendanceService,
    private router : Router// Inyecta ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
      
    }

   
      this.loadClasses();
      this.loadAttendances();
    
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        format: [],
        lensFacing: LensFacing.Back,
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.scanResult = data?.barcode?.displayValue;
    }
  }

  async registrarAsistencia(scanResult: string) {
    const userEmail = await this.authService.getCurrentUserEmail();

    if (!userEmail) {
      console.log("No se pudo obtener el correo del usuario.");
      return;
    }

    const existingAttendance = await this.firestore.collection('Asistencias', (ref) =>
      ref.where('id', '==', scanResult).where('email', '==', userEmail)
    ).get().toPromise();

    if (existingAttendance && !existingAttendance.empty) {
      alert("La asistencia ya fue registrada.");
      return;
    }

    await this.firestore.collection('Asistencias').add({
      id: scanResult,
      email: userEmail,
      fecha: new Date(),
    });

    console.log("Asistencia registrada exitosamente.");
  }

  async consultarAsistencias() {
    if (!this.scanResult) {
      console.log("No se ha escaneado ningún código.");
      return;
    }
  
    this.asistencias = [];
  
    // Filtra las asistencias por el `id` de la clase escaneada
    const snapshot = await this.firestore.collection('Asistencias', ref => 
      ref.where('id', '==', this.scanResult)
    ).get().toPromise();
  
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
      console.log("No se encontraron registros de asistencia para esta clase.");
    } else {
      console.log("Registros encontrados:", this.asistencias);
    }
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
  
    getAttendanceByClassId(classId: string) {
      return this.attendances.filter(attendance => attendance.classId === classId);
    }
  
    viewAttendances(classId: string) {
      this.router.navigate(['/class-attendance', { id: classId }]);
    }
  
}