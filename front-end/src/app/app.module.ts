// CORE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// MATERIAL DESIGN MODULES
import {
  MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatToolbarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {APP_ROUTES} from "./app.routes";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DialogComponent } from './shared/dialog/dialog.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { StockComponent } from './stock/stock.component';
import {CardComponent} from "./shared/card/card.component";
import {StockService} from "./shared/stock-service/stock.service";
import { FormComponent } from './shared/form/form.component';
import { UpdateComponent } from './update/update.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HomeComponent, CardComponent,
    DialogComponent, IngredientComponent, StockComponent, FormComponent, UpdateComponent],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    APP_ROUTES
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
