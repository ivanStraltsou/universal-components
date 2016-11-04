import { NgModule } from "@angular/core";
import { ProductList } from './product-list/product-list.component';
import { UniversalModule, isNode, isBrowser } from 'angular2-universal/node';
import { ProviderComponent } from './provider.component';
import { StoreModule, Action } from '@ngrx/store';

@NgModule({
  imports: [
      UniversalModule,
      StoreModule.provideStore({data: (state = {products: [4, 5, 6], test: 'server value'}, action: Action) => {
        return state;
      }})
  ],
  declarations: [ProductList, ProviderComponent],
  bootstrap: [ProviderComponent],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode }
  ]
})
export class ProductsModule {
}

