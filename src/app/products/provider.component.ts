import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { ProductState } from './product.state';

@Component(
    {
      selector: 'provider',
      template: `<product-list [products]="$products | async" [test]="$test | async"></product-list>`
    }
)
export class ProviderComponent {

  public $products: Observable<Array<string>>
  public $test: Observable<string>;
  public test: string = '13123123123';

  constructor(private store: Store<ProductState>) {

    this.store.select('data').subscribe((d) => console.log(d));

    this.$products = this.store.select((state) => state.data.products);
    this.$test = this.store.select((state) => state.data.test);
  }
}