import { Component, OnInit } from '@angular/core';
import {Book} from "../shares/book";
import {BookStoreService} from "../shares/book-store.service";
import {BookOrderModel} from "../shares/book-order.model";
import {BookFactory} from "../shares/book-factory";
import {Order} from "../shares/order";
import {AuthService} from "../shares/authentication.service";
import {OrderFactory} from "../shares/order-factory";

@Component({
    selector: 'bs-book-basket',
    templateUrl: './book-basket.component.html',
    styles: []
})
export class BookBasketComponent implements OnInit {

    booksOrdered:Book[] = [];
    bruttoPrice:number = 0;
    books:any;
    order = OrderFactory.empty();
    total_amount:number = 0;

    book:Book = BookFactory.empty();

    constructor(private bs:BookStoreService, public as:AuthService) { }

    ngOnInit() {
        // holen aus localstorage
        // umwandeln in array
        const basketString = localStorage.getItem('basket');
        const basket = JSON.parse(basketString)
        this.bs.getAll().subscribe(res => this.books = res);

        // array durchgehen
        // für jedes item
        basket.forEach((bookOrder:BookOrderModel) => {
            this.bs.getSingle(bookOrder.isbn).subscribe(
                bookDetails => {
                    this.booksOrdered.push({
                        ...bookDetails,
                        amount: bookOrder.amount
                    })

                    // Preis aufadieren
                    // this.bruttoPrice += bookDetails.price;
                }


            );
            // HIER NICHTS MEHR MACHEN WEIL ASYNCRON

        })
        // details vom server holen


        // speichern in booksOrdered

    }


    removeItemFromBasket(book:Book) {
        if (confirm('Buch wirklich löschen?')) {
            this.bs.remove(book.isbn);
        }
    }

    addToOrder(){

        const basketString = localStorage.getItem('basket');
        const basket = JSON.parse(basketString);

        // hier array

        // schauen ob bookorder mit bookid existiert wenn ja amount erhöhen sonst appenden
        // order.push({isbn: book.isbn, amount:1})

        let id = 1;
        let taxes = this.total_amount * 0.1;
        let bookIds = [];


        let currentUser = this.as.getCurrentUserId();

        for(let i =0; i< this.books.length; i++){
            for (let j =0; j < basket.length; j++){
                if(this.books[i] == basket[j]){
                    this.total_amount = basket[j].price;
                    bookIds.push(this.total_amount);
                    console.log(this.total_amount = 20);
                    //Werte schauen
                }
            }
        }

        let date = new Date();
        // const order:Order = {id, currentUser, date, price, taxes, bookIds  };

        const order:Order = OrderFactory.fromObject(id, currentUser, date, this.total_amount, taxes, bookIds );

        //in die Datenbank senden
        this.bs.createOrder(order).subscribe(res => {
            this.order = OrderFactory.empty();
        });



        console.log(order);


    }

}
