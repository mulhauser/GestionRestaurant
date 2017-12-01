import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {environment} from "../../environments/environment";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'nwt-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  // private property to store stock value
  private _stock: any[];
  // private property to store all backend URLs
  private _backendURL: any;
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _stockDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient, private _dialog: MatDialog) {
    this._stock = [];
    this._backendURL = {};
    this._dialogStatus = 'inactive';

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  /**
   * Returns private property _stock
   *
   * @returns {any[]}
   */
  get stock(): any[] {
    return this._stock;
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
   * OnInit implementation
   */
  ngOnInit() {
    this._getAll().subscribe((stock: any[]) => this._stock = stock);
  }

  /**
   * Function to delete one ingredient
   *
   * @param ingredient
   */
  delete(ingredient: any) {
    this._http.delete(this._backendURL.oneStock.replace(':id', ingredient.id))
      .filter(_ => !!_)
      .defaultIfEmpty([])
      .subscribe((stock: any[]) => this._stock = stock);
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._stockDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._stockDialog.afterClosed()
      .filter(_ => !!_)
      .flatMap(_ => this._add(_))
      .subscribe(
        (stock: any[]) => this._stock = stock,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Add new ingredient and fetch all stock to refresh the list
   *
   * @param ingredient to add
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _add(ingredient: any): Observable<any[]> {
    const requestOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._http.post(this._backendURL.allStock, ingredient, requestOptions).flatMap(_ => this._getAll());
  }

  /**
   * Returns Observable of all stock
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _getAll(): Observable<any[]> {
    return this._http.get(this._backendURL.allStock)
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

}
