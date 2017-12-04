// CORE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {IngredientComponent } from './person/ingredient.component';
import {IngredientsComponent } from './people/ingredients.component';
import { CardComponent } from './shared/card/card.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { FormIngredientComponent} from './shared/form/form-ingredient.component';
import { UpdateComponent } from './update/update.component';
import { NaPipe } from './shared/na-pipe/na.pipe';
import {IngredientService} from './shared/ingredient-service/ingredient.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, IngredientComponent, IngredientsComponent, CardComponent,
    DialogComponent, FormIngredientComponent, UpdateComponent, NaPipe ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    APP_ROUTES
  ],
  providers: [IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
