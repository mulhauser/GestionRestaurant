import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import 'rxjs/add/observable/of';

@Component({
  selector: 'nwt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // private property to store ingredient value
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
   * Returns private property _ingredient
   *
   * @returns {any}
   */
  get ingredient(): any {
    console.log(this._ingredient.photo);
    return this._ingredient;
  }

  /**
   * Sets private property _ingredient
   *
   * @param ingredient
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
   * Function to emit event to delete current ingredient
   *
   * @param ingredient
   */
  delete(ingredient: any) {
    this._delete$.emit(ingredient);
  }
}
