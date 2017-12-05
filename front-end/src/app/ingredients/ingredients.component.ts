import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogIngredientComponent } from '../shared/dialog/dialog-ingredient/dialog-ingredient.component';
import {IngredientService} from '../shared/ingredient-service/ingredient.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nwt-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  // private property to store ingredients value
  private _ingredients: any[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _ingredientDialog: MatDialogRef<DialogIngredientComponent>;
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _ingredientService: IngredientService, private _dialog: MatDialog) {
    this._ingredients = [];
    this._dialogStatus = 'inactive';
    this._view = 'card';
  }

  /**
   * Returns private property _people
   *
   * @returns {any[]}
   */
  get ingredients(): any[] {
    return this._ingredients;
  }

  /**
   * Returns private property _dialogStatus
   *
   * @returns {string}
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Returns private property _view
   *
   * @returns {string}
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._ingredientService
      .fetch()
      .subscribe((ingredients: any[]) => this._ingredients = ingredients);
  }

  /**
   * Function to delete one ingredient
   *
   * @param ingredient
   */
  delete(ingredient: any) {
    this._ingredientService
      .delete(ingredient.id)
      .flatMap(_ => this._ingredientService.fetch())
      .subscribe((ingredients: any[]) => this._ingredients = ingredients);
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._ingredientDialog = this._dialog.open(DialogIngredientComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._ingredientDialog.afterClosed()
      .filter(_ => !!_)
      .flatMap(_ => this._add(_))
      .subscribe(
        (ingredients: any[]) => this._ingredients = ingredients,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Function to switch view
   */
  switchView() {
    this._view = (this._view === 'card') ? 'list' : 'card';
  }

  /**
   * Function to navigate to current ingredient
   *
   * @param ingredient
   */
  navigate(ingredient) {
    this._router.navigate(['/ingredient', ingredient.id]);
  }

  /**
   * Add new ingredient and fetch all ingredients to refresh the list
   *
   * @param ingredient to add
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _add(ingredient: any): Observable<any[]|ArrayBuffer> {
    return this._ingredientService
      .create(ingredient)
      .flatMap(_ => this._ingredientService.fetch());
  }
}
