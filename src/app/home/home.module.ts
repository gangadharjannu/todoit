import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TodoComponent } from '../todo/todo.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, TodoComponent],
  imports: [CommonModule, FormsModule,  HomeRoutingModule, MaterialModule],
  exports: [HomeComponent, TodoComponent]
})
export class HomeModule {}
