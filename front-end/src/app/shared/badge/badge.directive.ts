import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Directive({
  selector: '[nwtBadge]'
})
export class BadgeDirective implements OnInit {
  // private property to store ingredient value
  private _ingredient: any;

  /**
   * Component constructor
   */
  constructor(private _el: ElementRef, private _rd: Renderer2) {
  }

  /**
   * Sets private property _ingredient
   *
   * @param person
   */
  @Input()
  set ingredient(ingredient: any) {
    this._ingredient = ingredient;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    Observable
      .of(this._ingredient)
      .filter(_ => !!_)
      .subscribe(_ =>
        this._rd.setProperty(this._el.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>'));
  }
}
