import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../shares/book";
import {BookStoreService} from "../shares/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shares/book-factory";
import {AuthService} from "../shares/authentication.service";
import {BookOrderModel} from "../shares/book-order.model";


@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  book:Book = BookFactory.empty();

    countCurrBook = 0;


  //@Input() book: Book;
 // @Output() showListEvent = new EventEmitter<any>();



  constructor(
      private bs : BookStoreService,
    private route : ActivatedRoute,
      private router: Router,
      public authService: AuthService
      ) {}

   // showBookList(){
    //  this.showListEvent.emit();
    //}

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



  ngOnInit() {
      const params = this.route.snapshot.params;
     this.bs.getSingle(params['isbn']).subscribe(b => {
       this.book=b; console.log(this.book);
     });   //wir rufen den Service bs auf
  }



  getRating (num:number){
    return new Array(num);
  }

  removeBook(){
      if(confirm('Buch wirklich löschen?')){
          this.bs.remove(this.book.isbn).subscribe(
              res => this.router.navigate(['../'], {relativeTo: this.route})
          )
      }
  }

}
