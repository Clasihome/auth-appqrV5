import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScanPage } from './scan.page';
import { ScanPageRoutingModule } from './scan-routing.module';
import { VolverBotonComponent } from 'src/app/volver-boton/volver-boton.component';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPageRoutingModule,
    VolverBotonComponent,
  
  ],
  declarations: [ScanPage, BarcodeScanningModalComponent]
})
export class ScanPageModule {}