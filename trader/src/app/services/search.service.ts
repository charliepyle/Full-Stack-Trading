import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Stock>(`${this.searchURL}${ticker}`)
  }

  getAutocomplete(ticker:String):Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.autocompleteURL}${ticker}`)
  }
  getLatestPrices(ticker:String):Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.getLatestPricesURL}${ticker}`)
  }
}
