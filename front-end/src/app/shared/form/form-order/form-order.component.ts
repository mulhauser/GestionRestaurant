import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {PlatService} from '../../plat-service/plat.service';

@Component({
  selector: 'nwt-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: any;
  // private property to store cancel$ value
  private _cancel$: EventEmitter<any>;
  // private property to store submit$ value
  private _submit$: EventEmitter<any>;
  // private property to store form value
  private _form: FormGroup;

  private _plats: any[];
  stores = this._platService
    .fetch()
    .subscribe((plats: any[]) => this._plats = plats);

  /**
   * Component constructor
   */
  constructor(private _platService: PlatService) {

    this._submit$ = new EventEmitter();
    this._cancel$ = new EventEmitter();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   *
   * @param model
   */
  @Input()
  set model(model: any) {
    this._model = model;
  }

  /**
   * Returns private property _model
   *
   * @returns {any}
   */
  get model(): any {
    return this._model;
  }

  get plats(): any[] {
    return this._plats;
  }

  /**
   * Returns private property _form
   *
   * @returns {FormGroup}
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _isUpdateMode
   *
   * @returns {boolean}
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('cancel')
  get cancel$(): EventEmitter<any> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('submit')
  get submit$(): EventEmitter<any> {
    return this._submit$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to handle component update
   *
   * @param record
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue ) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._model);
    } else {
      this._model = { };
      this._isUpdateMode = false;
    }
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and ingredient
   */
  submit(order: any) {
    let ord = null;
    if (order.isPayed) {
      console.log('payé');
    } else {
      console.log('non paye');
    }
    if (order.isServed) {
      console.log('servi');
    } else {
      console.log('non servi');
    }
    if (this._isUpdateMode) {

      ord = {
        'id': order.id,
        'name': order.name,
        'isServed': order.isServed,
        'isPayed': order.isPayed,
        'dishes': [],
        'orderDate': new Date().toISOString()
      };
    }else {
      ord = {'name': order.name, 'isServed': order.isServed, 'isPayed': order.isPayed, 'dishes': [], 'orderDate': new Date().toISOString()};

    } /*else if (order.isServed.value === undefined) {
      ord = {'name': order.name, 'isServed': false, 'isPayed': false, 'dishes': [], 'orderDate': new Date().toISOString()};
    } else {
      ord = {'name': order.name, 'isServed': order.isServed, 'isPayed': false, 'dishes': [], 'orderDate': new Date().toISOString()};
    }*/
    for (const plat of order.plats) {
      this._platService
        .findByName(plat)
        .subscribe((pl: any) => ord['dishes'].push({'ref': pl.id, 'name': pl.name}));
    }
    console.log(ord);
    this._submit$.emit(ord);
  }

  /**
   * Function to build our form
   *
   * @returns {FormGroup}
   *
   * @private
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      isServed: new FormControl('', Validators.compose([
        Validators.required
      ])),
      isPayed: new FormControl('', Validators.compose([
        Validators.required
      ])),
      plats: new FormControl([], Validators.compose([
        Validators.required
      ]))
    });
    /*return new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      ingredients: new FormControl('')
    });*/
  }


}
