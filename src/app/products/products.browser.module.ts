import { NgModule } from "@angular/core";
import { ProductList } from './product-list/product-list.component';
import { UniversalModule, isNode, isBrowser } from 'angular2-universal/browser';

@NgModule({
  imports: [UniversalModule],
  declarations: [ProductList],
  exports: [ProductList]
})
export class ProductsModule {
}

