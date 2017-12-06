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
  MatInputModule, MatSelectModule
} from '@angular/material';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {IngredientComponent } from './ingredient/ingredient.component';
import {IngredientsComponent } from './ingredients/ingredients.component';
import { CardIngredientComponent } from './shared/card/card-ingredient/card-ingredient.component';
import { DialogIngredientComponent } from './shared/dialog/dialog-ingredient/dialog-ingredient.component';
import { FormIngredientComponent} from './shared/form/form-ingredient/form-ingredient.component';
import { UpdateIngredientComponent } from './update/update-ingredient/update-ingredient.component';
import {IngredientService} from './shared/ingredient-service/ingredient.service';
import { PlatsComponent } from './plats/plats.component';
import { PlatComponent } from './plat/plat.component';
import {DialogPlatComponent} from './shared/dialog/dialog-plat/dialog-plat.component';
import {UpdatePlatComponent} from './update/update-plat/update-plat.component';
import {CardPlatComponent} from './shared/card/card-plat/card-plat.component';
import {FormPlatComponent} from './shared/form/form-plat/form-plat.component';
import {PlatService} from './shared/plat-service/plat.service';
import {DialogOrderComponent} from './shared/dialog/dialog-order/dialog-order.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderComponent} from './order/order.component';
import {CardOrderComponent} from './shared/card/card-order/card-order.component';
import {FormOrderComponent} from './shared/form/form-order/form-order.component';
import {UpdateOrderComponent} from './update/update-order/update-order.component';
import {OrderService} from './shared/order-service/order.service';
import { BackgroundDirective } from './shared/background/background.directive';

@NgModule({
  declarations: [AppComponent, HomeComponent,
    IngredientComponent, IngredientsComponent, CardIngredientComponent, DialogIngredientComponent, FormIngredientComponent,
    UpdateIngredientComponent,
    PlatsComponent, PlatComponent, DialogPlatComponent, UpdatePlatComponent, CardPlatComponent, FormPlatComponent,
    DialogOrderComponent, OrdersComponent, OrderComponent, CardOrderComponent, FormOrderComponent, UpdateOrderComponent, BackgroundDirective
  ],
  entryComponents: [DialogIngredientComponent, DialogPlatComponent, DialogOrderComponent],
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
    MatSelectModule,
    APP_ROUTES
  ],
  providers: [IngredientService, PlatService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
