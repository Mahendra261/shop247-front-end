import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  particularOrders: any = [];
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router
  ) {}
  id: any = localStorage.getItem('userId');
  cart: any;
  ngOnInit(): void {
    let req = {};
    this._productService.getUserCart(this.id).subscribe(
      (result: any) => {
        this.cart = result.cart;
        console.log(this.cart);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
