import { Component, OnInit } from '@angular/core';
import {BookStoreService} from "../shares/book-store.service";
import {Order} from "../shares/order";
import {Input} from '@angular/core';
import {Book} from "../shares/book";

@Component({
  selector: 'bs-book-order-list',
  templateUrl: './book-order-list.component.html',
  styles: []
})
export class BookOrderListComponent implements OnInit {

    orders:Order[];

  constructor(private bs:BookStoreService)

  {

  }

  ngOnInit() {
    this.bs.getAllOrders().subscribe(
      orders => this.orders = orders

  );
  }





}
