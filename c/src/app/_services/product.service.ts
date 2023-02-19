import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "https://www.pqstec.com/InvoiceApps/values/GetProductListAll";

  constructor(private http: HttpClient,private router: Router) { }

  getProducts() {

  return this.http.get<any>(this.baseUrl);

  }

}
