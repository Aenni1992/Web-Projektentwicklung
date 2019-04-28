import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../shares/book";

@Component({
  selector: 'a.bs-book-list-item',  //muss ich a. hinzufügen, da ich ein a-Tag habe im html
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book;   //Input sagt es ist nicht eine normale Variable sondern das es von außen ein Buch gibt
  constructor() { }

  ngOnInit() {
  }


}
