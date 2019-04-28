import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Author, Book, Image } from '../shares/book';
import {BookStoreService} from "../shares/book-store.service";

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

        const basket = basketString && basketString.length > 0 ? JSON.parse(basketString) : [];

        // hier array

        // schauen ob bookorder mit bookid existiert wenn ja amount erhöhen sonst appenden
        basket.push({isbn: book.isbn, amount:1})

        const newBasketString = JSON.stringify(basket);
        // zurückspeichern
        localStorage.setItem('basket', newBasketString)
    }
}
