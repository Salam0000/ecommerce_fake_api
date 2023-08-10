import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { NavComponent } from '../components/nav/nav.component';


@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule
  ],
  exports:[
    NavComponent
  ]
})
export class ModuleModule { }
