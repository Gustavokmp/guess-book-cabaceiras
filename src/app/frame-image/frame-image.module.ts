import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrameImagePageRoutingModule } from './frame-image-routing.module';

import { FrameImagePage } from './frame-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrameImagePageRoutingModule
  ],
  declarations: [FrameImagePage]
})
export class FrameImagePageModule {}
