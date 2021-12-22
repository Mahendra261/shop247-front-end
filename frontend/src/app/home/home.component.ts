import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _productService: ProductService,
    private _router: Router
  ) {}
  images = [
    '../../assets/image1.jpg',
    '../../assets/image2.jpg',
    '../../assets/image3.jpg',
  ];
  imgPath: string = '';
  id: number = 0;
  ngOnInit(): void {
    this.id = 0;
    this.imgPath = this.images[this.id];
    this.getCategories();
    this.getProducts();
  }
  products = [];
  productsInfo = [];
  getCategories() {
    this._productService.getProducts().subscribe((result: any) => {
      console.log(result);
      console.log(result.products);
      this.products = result.categories;
      // console.log(this.products[0].category);
    });
  }
  getProducts() {
    this._productService.getProductsInfo().subscribe(
      (result: any) => {
        this.productsInfo = result.products;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCategoryProducts(name: string) {
    this._router.navigate(['category-listing', name]);
  }
  onPrev() {
    if (this.id == 0) {
      this.id = 3;
    }
    this.id -= 1;
    this.imgPath = this.images[this.id];
  }

  onNext() {
    if (this.id == 2) {
      this.id = -1;
    }
    this.id += 1;
    this.imgPath = this.images[this.id];
  }
}
