// CORE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// MATERIAL DESIGN MODULES
import {MatDialogModule, MatIconModule, MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { RoomComponent } from './room/room.component';
import {APP_ROUTES} from "./app.routes";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RoomFormComponent } from './form/room-form/room-form.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { IngredientComponent } from './ingredient/ingredient.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, RoomComponent, RoomFormComponent, DialogComponent, IngredientComponent],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
