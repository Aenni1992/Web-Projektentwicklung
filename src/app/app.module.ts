import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import {BookStoreService} from "./shares/book-store.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BookFormComponent } from './book-form/book-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import {DateValueAccessorModule} from "angular-date-value-accessor";
import {LoginComponent } from './login/login.component';
import {AuthService} from "./shares/authentication.service";
import {TokenInterceptorService} from "./shares/token-interceptor.service";
import {JwtInterceptorService} from "./shares/jwt-interceptor.service";
import { BookBasketComponent } from './book-basket/book-basket.component';
import { BookOrderComponent } from './book-order/book-order.component';
import { BookOrderListComponent } from './book-order-list/book-order-list.component';
import { BookOrderDetailComponent } from './book-order-detail/book-order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    SearchComponent,
    LoginComponent,
    BookBasketComponent,
    BookOrderComponent,
    BookOrderListComponent,
    BookOrderDetailComponent,

  ],

  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, DateValueAccessorModule
  ],
  providers: [BookStoreService, AuthService,
      {
        provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true
      }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
