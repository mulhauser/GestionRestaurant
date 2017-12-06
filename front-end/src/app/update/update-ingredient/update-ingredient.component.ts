import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';
import {
  DialogIngredientComponent
} from '../../shared/dialog/dialog-ingredient/dialog-ingredient.component';
import {IngredientService } from '../../shared/ingredient-service/ingredient.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nwt-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styleUrls: ['./update-ingredient.component.css']
})
export class UpdateIngredientComponent implements OnInit {
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogIngredientComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _ingredientService: IngredientService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._ingredientService.fetchOne(id))
      .subscribe((ingredient: any) => {
        this._peopleDialog = this._dialog.open(DialogIngredientComponent, {
          width: '500px',
          disableClose: true,
          data: ingredient
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._peopleDialog.afterClosed()
          .filter(_ => !!_)
          .flatMap(_ => this._ingredientService.update(_))
          .subscribe(null, null, () => this._router.navigate(['/ingredients']));
      });
  }
}
