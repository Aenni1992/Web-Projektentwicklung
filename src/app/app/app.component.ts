import { Component } from '@angular/core';
import {Book} from "./shares/book";
import {AuthService} from "./shares/authentication.service";

@Component({
  selector: 'bs-root',    //sucht in HTML diesen Tag
    //findet den Inhalt --> Decorator für Komponente
    templateUrl: './app.component.html',
   /* template:' <bs-book-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-book-list>' +
                '<bs-book-details *ngIf="detailsOn" [book]="book" (showListEvent)="showList()"></bs-book-details>',
*/
  styles: []
})

export class AppComponent{
  constructor(private authService : AuthService){}

  isLogedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLogedIn()){
      return "LOGOUT"
    } else {
        return "LOGIN"
    }
  }
}
/*export class AppComponent {
  listOn = true;
  detailsOn = false;

  book: Book;

  showList(){
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book: Book){
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}*/
