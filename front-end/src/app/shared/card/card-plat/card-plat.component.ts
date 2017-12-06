import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import 'rxjs/add/observable/of';

@Component({
  selector: 'nwt-card-plat',
  templateUrl: './card-plat.component.html',
  styleUrls: ['./card-plat.component.css']
})
export class CardPlatComponent implements OnInit {
  // private property to store plat value
  private _plat: any;
  // private property to store delete$ value
  private _delete$: EventEmitter<any>;

  /**
   * Component constructor
   */
  constructor() {
    this._plat = {};
    this._delete$ = new EventEmitter();
  }

  /**
   * Returns private property _plat
   *
   * @returns {any}
   */
  get plat(): any {
    return this._plat;
  }

  /**
   * Sets private property _plat
   *
   * @param plat
   */
  @Input()
  set plat(plat: any) {
    this._plat = plat;
  }

  /**
   * Returns private property _delete$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('platDelete')
  get delete$(): EventEmitter<any> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to emit event to delete current plat
   *
   * @param plat
   */
  delete(plat: any) {
    this._delete$.emit(plat);
  }

}
