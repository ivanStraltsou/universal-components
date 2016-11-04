import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.browser.module';
import { UniversalModule } from 'angular2-universal/browser';

@NgModule({
  imports: [UniversalModule, ProductsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

