import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

@Component(
    {
      selector: 'product-list',
      templateUrl: './product-list.html'
    }
)
export class ProductList implements OnInit {

  @Input()
  public products: Array<string> = ['x', 'y', 'z'];

  @Input()
  public test: string = 'client default';

  ngOnInit() {
  }

}