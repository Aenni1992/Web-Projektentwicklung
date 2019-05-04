import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./login/login.component";
import {BookBasketComponent} from "./book-basket/book-basket.component";
import {BookOrderComponent} from "./book-order/book-order.component";
import {BookOrderListComponent} from "./book-order-list/book-order-list.component";
import {BookOrderDetailComponent} from "./book-order-detail/book-order-detail.component";

const routes : Routes = [
    {path:'',redirectTo: 'home', pathMatch:'full'}, //Verweist auf die Home-Seite, pathMatch nur auf gewisse Route hinweisen
    {path:'home',component:HomeComponent},
    {path:'books',component:BookListComponent},
    {path:'books/:isbn',component:BookDetailsComponent},
    {path:'admin',component:BookFormComponent},  //fürs neu anlegen
    {path:'admin/:isbn',component:BookFormComponent}, //fürs ändern und neu befüllen
    {path:'login',component:LoginComponent},
    {path: 'basket', component:BookBasketComponent},
    {path: 'order', component:BookOrderListComponent},
    {path: 'order/:id', component:BookOrderDetailComponent}
]

@NgModule ({
    imports : [RouterModule.forRoot(routes)], //inizializiert, setzt die Routen auf, das sie bekannt sind
    exports : [RouterModule]                    //mit Angular verknüpft, bei app.module importiert
})

export class AppRoutingModule{

}