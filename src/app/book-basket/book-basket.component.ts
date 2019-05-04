import { Component, OnInit } from '@angular/core';
import {Book} from "../shares/book";
import {BookStoreService} from "../shares/book-store.service";
import {BookOrderModel} from "../shares/book-order.model";
import {BookFactory} from "../shares/book-factory";
import {Order} from "../shares/order";
import {AuthService} from "../shares/authentication.service";
import {OrderFactory} from "../shares/order-factory";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'bs-book-basket',
    templateUrl: './book-basket.component.html',
    styles: []
})
export class BookBasketComponent implements OnInit {

    booksOrdered:Book[] = [];
    bruttoPrice:number = 0;
    order:Order = OrderFactory.empty();
    total_amount:number = 0;

    book:Book = BookFactory.empty();

    constructor(private bs:BookStoreService, public as:AuthService, private route : ActivatedRoute,
                private router: Router,) { }

    ngOnInit() {
        // holen aus localstorage
        // umwandeln in array
        const basketString = localStorage.getItem('basket');
        const basket:BookOrderModel[] = JSON.parse(basketString) || [];

        // array durchgehen
        // für jedes item
        basket.forEach((bookOrder:BookOrderModel) => {
            this.bs.getSingle(bookOrder.isbn).subscribe(
                bookDetails => {
                    this.booksOrdered.push({
                        //... hol mir die Daten vom Buch
                        ...bookDetails,
                        amount: bookOrder.amount
                    })

                    // Preis aufadieren
                     this.bruttoPrice += bookDetails.price;
                }


            );

        })

    }


    removeItemFromBasket(book:Book) {
        if (confirm('Buch wirklich löschen?')) {
            this.booksOrdered.splice(this.booksOrdered.lastIndexOf(book), 1);

            const localState:BookOrderModel[] = this.booksOrdered.map((bookOrder:Book) => ({
                isbn: bookOrder.isbn,
                amount: bookOrder.amount
            }));

            localStorage.setItem('basket', JSON.stringify(localState));
        }
    }

  /*  increaseAmount(book:Book){

        this.booksOrdered = JSON.parse(localStorage.getItem('basket'));

        for(var i in this.booksOrdered){
            if(this.booksOrdered[i].book:Book == book){
                this.booksOrdered[i].amount++;
            }

        }
        localStorage.setItem('basket', JSON.stringify(this.booksOrdered));

    }*/

    addToOrder(){ //order erstellen

        let id = 1;
        let order_item = [];


        let currentUser = this.as.getCurrentUserId();

        for(let book of this.booksOrdered){
            this.total_amount += book.price;
            //pushen die ISBN vom Book
            order_item.push(book.isbn);
            console.log(this.total_amount);
                    //Werte anschauen

        }
        let taxes = this.total_amount * 0.1;


        let date = new Date();
        // const order:Order = {id, currentUser, date, price, taxes, bookIds  };

        const addOrder:Order = OrderFactory.fromObject(id, currentUser, date, this.total_amount, taxes, order_item );

        //in die Datenbank senden
        this.bs.createOrder(addOrder).subscribe(res => {
            this.order = OrderFactory.empty();
            this.booksOrdered = [];
            localStorage.removeItem('basket');
        });
        console.log(addOrder);

    }

    checkLogin() {
        if (this.as.isLoggedIn()) {
          this.addToOrder();

        } else  {
            confirm('Bitte anmelden, um etwas zu bestellen.')
            this.router.navigate(['/login']);
        }
    }

}
/*const val = this.loginForm.value;
if (val.username && val.password) {
    this.authService.login(val.username, val.password).subscribe(res => {
        const resObj = res as Response;
        if (resObj.response === "success") {
            this.authService.setLocalStorage(resObj.result.token);
            this.router.navigateByUrl('/');

// Local storage holen ==> return string
const basketString = localStorage.getItem('basket');
// wenn was da
// umwandeln

const basket = basketString && basketString.length > 0 ? JSON.parse(basketString) : [];

// hier array

// schauen ob bookorder mit bookid existiert wenn ja amount erhöhen sonst appenden
basket.push({isbn: book.isbn, amount:1})

const newBasketString = JSON.stringify(basket);
// zurückspeichern
localStorage.setItem('basket', newBasketString)*/