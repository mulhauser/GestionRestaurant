import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/filter';

import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'nwt-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  // private property to store _ingredient value
  private _ingredient: any;
  // private property to store all backend URLs
  private _backendURL: any;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient) {
    this._ingredient = {};
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
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
    this._http.get(this._backendURL.oneStock)
      .filter(_ => !!_)
      .defaultIfEmpty({})
      .subscribe((ingredients: any) => this._ingredient = ingredients);
  }

}
