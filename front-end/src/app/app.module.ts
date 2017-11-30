// CORE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// MATERIAL DESIGN MODULES
import {MatCardModule, MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { RoomComponent } from './room/room.component';
import {APP_ROUTES} from "./app.routes";

@NgModule({
  declarations: [AppComponent, HomeComponent, RoomComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
