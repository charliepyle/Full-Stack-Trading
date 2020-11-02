import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Stock} from '../models/Stock';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchURL:string = 'http://127.0.0.1:3000/details/';
  constructor(private http:HttpClient) { }

  getStock(ticker:String):Observable<Stock> {
    console.log(this.searchURL)
    return this.http.get<Stock>(`${this.searchURL}${ticker}`)
  }
}
