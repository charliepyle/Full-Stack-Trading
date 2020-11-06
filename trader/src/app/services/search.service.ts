import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import {Stock} from '../models/Stock';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  prefix:string = 'http://127.0.0.1:3000';
  searchURL:string = `${this.prefix}/details/`;
  autocompleteURL:string = `${this.prefix}/autocomplete/`
  getLatestPricesURL:string = `${this.prefix}/tickers/`
  constructor(private http:HttpClient) { }

  getStock(ticker:String):Observable<Stock> {
    // const response = this.http.get<Stock>(`${this.searchURL}${ticker}`).subscribe(result => console.log('result'), error => console.log('error'), () => console.log('here'));;
    // console.log(response);
    return this.http.get<Stock>(`${this.searchURL}${ticker}`).pipe(catchError(this.handleError));
  }

  getAutocomplete(ticker:String):Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.autocompleteURL}${ticker}`)
  }
  getLatestPrices(ticker:String):Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.getLatestPricesURL}${ticker}`)
  }

  handleError(error: HttpErrorResponse) {
    console.log('a;lsdkflkasd')
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message)
    }
    else console.error(error.error);
    return throwError("error");
  }
}
