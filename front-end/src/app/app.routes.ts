import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/home.component';
import {IngredientsComponent } from './people/ingredients.component';
import { UpdateComponent } from './update/update.component';
import {IngredientComponent } from './person/ingredient.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: 'ingredient/:id', component: IngredientComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
