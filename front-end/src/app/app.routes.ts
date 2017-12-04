import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/home.component';
import {IngredientsComponent } from './ingredients/ingredients.component';
import {UpdateIngredientComponent} from './update/update-ingredient/update-ingredient.component';
import {IngredientComponent } from './ingredient/ingredient.component';
import {PlatsComponent} from './plats/plats.component';
import {PlatComponent} from './plat/plat.component';
import {UpdatePlatComponent} from './update/update-plat/update-plat.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'editIngredient/:id', component: UpdateIngredientComponent },
  { path: 'ingredient/:id', component: IngredientComponent },
  { path: 'plats', component: PlatsComponent },
  { path: 'plat/:id', component: PlatComponent },
  { path: 'editPlat/:id', component: UpdatePlatComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
