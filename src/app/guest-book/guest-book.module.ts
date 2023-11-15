import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestBookPageRoutingModule } from './guest-book-routing.module';

import { GuestBookPage } from './guest-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GuestBookPageRoutingModule
  ],
  declarations: [GuestBookPage]
})
export class GuestBookPageModule {}
