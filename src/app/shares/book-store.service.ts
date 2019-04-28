import { Injectable } from '@angular/core';
import { Author, Book, Image } from '../shares/book';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/internal/operators";
import {Order} from "./order";

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
    private api = "http://bookstore19.S1610456016.student.kwmhgb.at/api";

    constructor (private http: HttpClient){

    }

  getAll() : Observable<Array<Book>>{ //liefert uns alle Bücher zurück
   return this.http.get(`${this.api}/books`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(isbn) : Observable<Book>{
      return this.http.get(`${this.api}/book/${isbn}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
      //return this.books.find(book =>book.isbn == isbn);  //Error-Function
      //(book) =>{if(book.isbn === isbn){  //Variante wie ich wie ich die Error-Function auch schreiben kann
        //  return book
      //}}


    getAllSearch(searchTerm) : Observable<Array<Book>>{
        return this.http.get(`${this.api}/book/search/${searchTerm}`).
        pipe(retry(3)).pipe(catchError(this.errorHandler));
    }


    create (book:Book) :Observable<any>{   //any --> irgendein Datentyp wird aufgerufen
        return this.http.post(`${this.api}/book`, book).
            pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    update (book:Book): Observable<any>{
        return this.http.put(`${this.api}/book/${book.isbn}`, book).
        pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    remove (isbn:string): Observable<any>{   //any --> irgendein Datentyp wird aufgerufen
        return this.http.delete(`${this.api}/book/${isbn}`).
        pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

  private errorHandler(error:Error | any): Observable<any>{
      return throwError(error);
  }

    createOrder (order:Order) :Observable<any>{   //any --> irgendein Datentyp wird aufgerufen
        return this.http.post(`${this.api}/order`, order).
        pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
}


