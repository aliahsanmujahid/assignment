import { ProductService } from './../../_services/product.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  products: any = [];


  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(res =>{
      console.log(res);
      this.products = res;
    });

  }



}
