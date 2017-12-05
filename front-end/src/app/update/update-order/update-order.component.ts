import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {DialogOrderComponent} from '../../shared/dialog/dialog-order/dialog-order.component';
import {OrderService} from '../../shared/order-service/order.service';

@Component({
  selector: 'nwt-update-plat',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  // private property to store dialog reference
  private _orderDialog: MatDialogRef<DialogOrderComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _orderService: OrderService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._orderService.fetchOne(id))
      .subscribe((order: any) => {
        this._orderDialog = this._dialog.open(DialogOrderComponent, {
          width: '500px',
          disableClose: true,
          data: order
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._orderDialog.afterClosed()
          .filter(_ => !!_)
          .flatMap(_ => this._orderService.update(_))
          .subscribe(null, null, () => {
            this._router.navigate(['/orders']);
          });
      });
  }
}
