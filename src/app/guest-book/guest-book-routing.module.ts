import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestBookPage } from './guest-book.page';

const routes: Routes = [
  {
    path: '',
    component: GuestBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestBookPageRoutingModule {}
