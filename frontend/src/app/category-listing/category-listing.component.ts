import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css'],
})
export class CategoryListingComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) {}
  cName: string;
  items: any;
  ngOnInit(): void {
    this.cName = this._route.snapshot.params['name'];
    this._productService.getCategoryItems(this.cName).subscribe(
      (result: any) => {
        this.items = result.products;
        console.log(this.items);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
