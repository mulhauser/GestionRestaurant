import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PlatService} from '../shared/plat-service/plat.service';

@Component({
  selector: 'nwt-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {

  // private property to store ingredient value
  private _plat: any;
  // private property to store flag to know if it's a ingredient
  private _isPlat: boolean;

  /**
   * Component constructor
   */
  constructor(private _platService: PlatService, private _route: ActivatedRoute) {
    this._plat = {};
    this._isPlat = false;
  }

  /**
   * Returns private property _person
   *
   * @returns {any}
   */
  get plat(): any {
    return this._plat;
  }

  /**
   * Returns flag to know if we are on a profile or on HP
   *
   * @returns {boolean}
   */
  get isPlat(): boolean {
    return this._isPlat;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    Observable
      .merge(
        this._route.params
          .filter(params => !!params['id'])
          .flatMap(params => this._platService.fetchOne(params['id']))
          .do(_ => this._isPlat = true),
        this._route.params
          .filter(params => !params['id'])
          .flatMap(_ => this._platService.fetch())
          .do(_ => this._isPlat = false)
      )
      .subscribe((plats: any[]) => this._plat = plats.shift);
  }


}
