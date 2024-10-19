import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RickymortyPage } from './rickymorty.page';

const routes: Routes = [
  {
    path: '',
    component: RickymortyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RickymortyPageRoutingModule {}
