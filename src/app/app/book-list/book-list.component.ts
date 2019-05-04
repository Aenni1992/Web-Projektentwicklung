import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Book } from '../shares/book';
import {BookStoreService} from "../shares/book-store.service";
import {BookOrderModel} from "../shares/book-order.model";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})

export class BookListComponent implements OnInit {
  books:Book[];


  constructor(private bs:BookStoreService) { }  //Independence Injection

    ngOnInit() {
    this.bs.getAll().subscribe(res => this.books = res);
    }

    addToBasket(book:Book) {
        // Add item to local storage


        // Local storage holen ==> return string
        const basketString = localStorage.getItem('basket');
        // wenn was da
        // umwandeln

        const basket:BookOrderModel[] = basketString && basketString.length > 0 ? JSON.parse(basketString) : [];

        // hier array

        let existingOrderItem = basket.find((bookOrderModel:BookOrderModel) => bookOrderModel.isbn === book.isbn);
        // schauen ob bookorder mit bookid existiert wenn ja amount erhöhen sonst appenden

        if (existingOrderItem) {
            existingOrderItem.amount += 1;
        } else {
            basket.push({isbn: book.isbn, amount: 1})
        }

        const newBasketString = JSON.stringify(basket);
        // zurückspeichern
        localStorage.setItem('basket', newBasketString)
    }
}
