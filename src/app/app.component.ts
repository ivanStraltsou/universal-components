
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'sc-app',
    template: `<div>${ (<any>global).mainTemplate }</div><product-list [products]="$products | async" [test]="test"></product-list>`
})
export class AppComponent implements OnInit {

    public value: string = 'value matched';
    public test: string = 'tested';
    public $products = new BehaviorSubject<Array<string>>([]);

    ngOnInit() {

        this.$products.next([
            'a', 'b', 'c'
        ]);
    }
}
