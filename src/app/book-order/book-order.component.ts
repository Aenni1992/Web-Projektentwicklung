import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../shares/order";
import {BookStoreService} from "../shares/book-store.service";
import {Book} from "../shares/book";

@Component({
  selector: 'a.bs-book-order-item',
  templateUrl: './book-order.component.html',
  styles: []
})
export class BookOrderComponent implements OnInit {

    orders: Order[];
    books: Book[];

  @Input() order:Order;

  constructor(private bs: BookStoreService) { }

  ngOnInit() {

      this.bs.getAllOrders().subscribe(res => this.orders = res);
      this.bs.getAll().subscribe(res => this.books = res);
  }



}

/*getCurrentUserId()
{
    return Number.parseInt(localStorage.getItem('user'));
}*/