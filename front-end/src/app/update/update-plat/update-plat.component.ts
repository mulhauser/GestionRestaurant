import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {PlatService} from '../../shared/plat-service/plat.service';
import {DialogPlatComponent} from '../../shared/dialog/dialog-plat/dialog-plat.component';

@Component({
  selector: 'nwt-update-plat',
  templateUrl: './update-plat.component.html',
  styleUrls: ['./update-plat.component.css']
})
export class UpdatePlatComponent implements OnInit {
  // private property to store dialog reference
  private _platDialog: MatDialogRef<DialogPlatComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _platService: PlatService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._platService.fetchOne(id))
      .subscribe((plat: any) => {
        this._platDialog = this._dialog.open(DialogPlatComponent, {
          width: '500px',
          disableClose: true,
          data: plat
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._platDialog.afterClosed()
          .filter(_ => !!_)
          .flatMap(_ => this._platService.update(_))
          .subscribe(null, null, () => this._router.navigate(['/plats']));
      });
  }
}
