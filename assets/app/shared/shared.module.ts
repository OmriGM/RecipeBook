import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import { NgIoModule, NgIoConfig } from 'ng-io';

const config: NgIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    DropdownDirective
  ],
  imports:[
    NgIoModule.forRoot(config)
  ],
  exports: [
    CommonModule,
    DropdownDirective,
  ]
})
export class SharedModule {

}
