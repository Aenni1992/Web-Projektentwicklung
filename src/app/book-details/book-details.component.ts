import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../shares/book";
import {BookStoreService} from "../shares/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shares/book-factory";
import {AuthService} from "../shares/authentication.service";


@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  book:Book = BookFactory.empty();

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
