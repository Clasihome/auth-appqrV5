import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { VolverBotonComponent } from '../volver-boton/volver-boton.component';
import { CharacterDetailPageRoutingModule } from './character-detail-routing.module';

import { CharacterDetailPage } from './character-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterDetailPageRoutingModule,
    VolverBotonComponent
  ],
  declarations: [CharacterDetailPage]
})
export class CharacterDetailPageModule {}
