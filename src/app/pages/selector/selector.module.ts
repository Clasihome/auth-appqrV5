import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SelectorPageRoutingModule } from './selector-routing.module';
import { VolverBotonComponent } from 'src/app/volver-boton/volver-boton.component';
import { SelectorPage } from './selector.page';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    VolverBotonComponent,
    FormsModule,
    IonicModule,
    SelectorPageRoutingModule,
  ],
  declarations: [SelectorPage]
})
export class SelectorPageModule {}
