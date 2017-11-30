// CORE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// MATERIAL DESIGN MODULES
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { RoomComponent } from './room/room.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, RoomComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
