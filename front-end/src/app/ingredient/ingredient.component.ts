import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import {StockService} from "../shared/stock-service/stock.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'nwt-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  // private property to store _ingredient value
  private _ingredient: any;

  /**
   * Component constructor
   */
  constructor(private _stockService: StockService, private _route: ActivatedRoute) {
    this._ingredient = {};
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
   * OnInit implementation
   */
  ngOnInit() {
    Observable
      .merge(
        this._route.params
          .filter(params => !!params['id'])
          .flatMap(params => this._stockService.fetchOne(params['id'])),
        this._route.params
          .filter(params => !params['id'])
          .flatMap(_ => this._stockService.fetchRandom())
      )
      .subscribe((ingredient: any) => this._ingredient = ingredient);
  }

  /**
   * Returns random stock
   */
  random() {
    this._stockService
      .fetchRandom()
      .subscribe((ingredient: any) => this._ingredient = ingredient);
  }

}
