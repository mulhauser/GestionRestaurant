import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientService} from '../../ingredient-service/ingredient.service';
import {CustomValidators} from '../custom-validators';

@Component({
  selector: 'nwt-form-plat',
  templateUrl: './form-plat.component.html',
  styleUrls: ['./form-plat.component.css']
})
export class FormPlatComponent implements OnInit, OnChanges {
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

  private _ingredients: any[];
  stores = this._ingredientService
    .fetch()
    .subscribe((ingredients: any[]) => this._ingredients = ingredients);

  /**
   * Component constructor
   */
  constructor(private _ingredientService: IngredientService) {

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

  get ingredients(): any[] {
    return this._ingredients;
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
   * Function to emit event to submit form and plat
   */
  submit(plat: any) {
    let plt = null;
    if (this._isUpdateMode) {
      plt = {'id': plat.id, 'name': plat.name, 'price': Number.parseInt(plat.price), 'ingredients': []};
    } else {
      plt = {'name': plat.name, 'price': Number.parseInt(plat.price), 'ingredients': []};
    }
    for (const ingredient of plat.ingredients) {
      this._ingredientService
        .findByName(ingredient)
        .subscribe((ing: any) => plt['ingredients'].push({'ref': ing.id, 'name': ing.name, 'quantityUse': 1}));
    }
    this._submit$.emit(plt);
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
      price: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.isNumber
      ])),
      ingredients: new FormControl([], Validators.compose([
          Validators.required
        ]))
    });
  }


}
