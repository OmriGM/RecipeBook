import { StoresModule } from './stores/stores.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {CoreModule} from './core/core.module';
import {ChartsModule} from 'ng2-charts';
import {StatsComponent} from './statistics/stats.component';


@NgModule({
  declarations: [
    AppComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    CoreModule,
    StoresModule,
    ChartsModule
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
