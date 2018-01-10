import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreListComponent } from './store-list.component';
import { StoreMappingComponent } from './store-mapping.component';
import { StoresComponent } from './stores.component';
import { StoresService } from './stores.service';

@NgModule({
  declarations: [
    StoreListComponent,
    StoreMappingComponent, StoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR KEY GOES HERE",
      libraries: ["places"]
    }),
  ],
  providers: [StoresService]

})
export class StoresModule { }
