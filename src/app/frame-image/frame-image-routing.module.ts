import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrameImagePage } from './frame-image.page';

const routes: Routes = [
  {
    path: '',
    component: FrameImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrameImagePageRoutingModule {}
