import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'nwt-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  // private property to store cancel$ value
  private _cancel$: EventEmitter<any>;
  // private property to store add$ value
  private _add$: EventEmitter<any>;

  constructor() {
    this._cancel$ = new EventEmitter();
  }

  /**
   * Returns private property _cancel$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('cancel') get cancel$(): EventEmitter<any> {
    return this._cancel$;
  }

  /**
   * Returns private property _add$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('personAdd') get add$(): EventEmitter<any> {
    return this._add$;
  }

  ngOnInit() {
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to add new person
   *
   * @param person
   */
  add(room: any) {
    this._add$.emit(room);
  }
}
