import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router
  ) {}
  id: any;
  item: any;
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    // let req={
    //   productId:this.id,
    //   quantity
    // }
    this._productService.getProductDetails(this.id).subscribe(
      (result: any) => {
        this.item = result.product;
        console.log(this.item);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addToCart() {
    // this.cName = this._route.snapshot.params['name'];
    let req = {
      productId: this.item._id,
      quantity: 1,
    };
    this._productService.addCart(req).subscribe(
      (result: any) => {
        // this.items = result.products;
        // console.log(this.items);
      },
      (err) => {
        console.log(err);
      }
    );
    this._router.navigate(['/cart', this.item._id]);
  }
}
