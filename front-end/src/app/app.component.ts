import { Component } from '@angular/core';

@Component({
    selector: 'nwt-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // private property to store name value
    private _name: string;

    /**
     * Component constructor
     */
    constructor() {
        this._name = 'Angular 4';
    }

    /**
     * Returns private property _name
     *
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }
}
