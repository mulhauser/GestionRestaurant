import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IngredientService} from '../shared/ingredient-service/ingredient.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'nwt-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  // private property to store ingredient value
  private _ingredient: any;
  // private property to store flag to know if it's a ingredient
  private _isIngredient: boolean;

  /**
   * Component constructor
   */
  constructor(private _ingredientService: IngredientService, private _route: ActivatedRoute) {
    this._ingredient = {};
    this._isIngredient = false;
  }

  /**
   * Returns private property _ingredient
   *
   * @returns {any}
   */
  get ingredient(): any {
    return this._ingredient;
  }

  /**
   * Returns flag to know if we are on a profile or on HP
   *
   * @returns {boolean}
   */
  get isIngredient(): boolean {
    return this._isIngredient;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    Observable
      .merge(
        this._route.params
          .filter(params => !!params['id'])
          .flatMap(params => this._ingredientService.fetchOne(params['id']))
          .do(_ => this._isIngredient = true),
        this._route.params
          .filter(params => !params['id'])
          .flatMap(_ => this._ingredientService.fetch())
          .do(_ => this._isIngredient = false)
      )
      .subscribe((ingredient: any[]) => this._ingredient = ingredient.shift);
  }

}
