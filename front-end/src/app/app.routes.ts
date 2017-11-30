import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/home.component';
import {RoomComponent} from "./room/room.component";
import {IngredientComponent} from "./ingredient/ingredient.component";

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'room', component: RoomComponent },
  { path: 'ingredient', component: IngredientComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
