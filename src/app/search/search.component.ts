import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/internal/operators";
import {BookStoreService} from "../shares/book-store.service";
import {Book} from "../shares/book";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(private bs : BookStoreService) { }

  isLoading = false;
  keyup = new EventEmitter<string>();
  foundBooks : Book[] = [];
  @Output() bookSelected = new EventEmitter<Book>()

  ngOnInit() {
    this.keyup.
    pipe(debounceTime(500)).
        pipe(distinctUntilChanged()).
        pipe(switchMap(
            searchTerm => this.bs.getAllSearch(searchTerm)))
        .pipe(tap(()=>this.isLoading = true)).   //this.Loading brauchen wir als Property
    subscribe((books)=> {
      this.foundBooks = books;
      console.log(this.foundBooks)});

  }

}
