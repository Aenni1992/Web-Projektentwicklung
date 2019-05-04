import { Component, OnInit } from '@angular/core';
import {BookStoreService} from "../shares/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shares/authentication.service";
import {Order} from "../shares/order";
import {Book} from "../shares/book";
import {BookOrderModel} from "../shares/book-order.model";

@Component({
  selector: 'bs-book-order-detail',
  templateUrl: './book-order-detail.component.html',
  styles: []
})
export class BookOrderDetailComponent implements OnInit {
  order:Order;
  books:Book [];
    choosenState = 0;

    constructor(
        private bs : BookStoreService,
        private route : ActivatedRoute,
        public authService: AuthService
    ) {}



    ngOnInit() {
        const params = this.route.snapshot.params;
        this.bs.getSingleOrder(params['id']).subscribe(b => {
            this.order = b;
            console.log("test:" + this.order.order_items);



          //  this.order.order_items.forEach(function(book){
           //     this.bs.getSingleByID(book).subscribe(c => {
            //        this.order.push(c);
             //   });
            //});

        //    this.bs.getAll().subscribe(res => this.books = res);


        });


    }

    getState(stateNumber) {
        switch (stateNumber) {
            case 0:
                return "offen";
            case 1:
                return "bezahlt";
            case 2:
                return "versendet";
            case 3:
                return "storniert";
        }

    }

    changeState(value) {
        switch (value) {
            case "Offen":
                this.choosenState = 0;
                break;
            case "Bezahlt":
                this.choosenState = 1;
                break;
            case "Versendet":
                this.choosenState = 2;
                break;
            case "Storniert":
                this.choosenState = 3;
                break;
        }

        console.log("state=" + this.choosenState);

    }




}
