import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostEditPageRoutingModule } from './post-edit-routing.module';

import { PostEditPage } from './post-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PostEditPageRoutingModule
  ],
  declarations: [PostEditPage]
})
export class PostEditPageModule {}
