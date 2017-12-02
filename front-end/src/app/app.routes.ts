import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/home.component';
import {IngredientComponent} from "./ingredient/ingredient.component";
import {StockComponent} from "./stock/stock.component";
import {UpdateComponent} from "./update/update.component";

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stock', component: StockComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: 'ingredient/:id', component: IngredientComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
