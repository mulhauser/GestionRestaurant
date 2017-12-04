import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import 'rxjs/add/observable/of';

@Component({
  selector: 'nwt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // private property to store person value
  private _ingredient: any;
  // private property to store delete$ value
  private _delete$: EventEmitter<any>;

  /**
   * Component constructor
   */
  constructor() {
    this._ingredient = {};
    this._delete$ = new EventEmitter();
  }

  /**
   * Returns private property _person
   *
   * @returns {any}
   */
  get ingredient(): any {
    return this._ingredient;
  }

  /**
   * Sets private property _person
   *
   * @param person
   */
  @Input()
  set ingredient(ingredient: any) {
    this._ingredient = ingredient;
  }

  /**
   * Returns private property _delete$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('ingredientDelete')
  get delete$(): EventEmitter<any> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to emit event to delete current person
   *
   * @param person
   */
  delete(ingredient: any) {
    this._delete$.emit(ingredient);
  }

}
