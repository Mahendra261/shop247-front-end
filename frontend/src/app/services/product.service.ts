import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API = 'http://localhost:3000/api/v1/products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  getProducts() {
    return this._http.get(API + '/homepage/categories');
  }
  getProductsInfo() {
    return this._http.get(API);
  }
  getCategoryItems(name) {
    return this._http.get(API + `/homepage/categories/${name}`);
  }
  getProductDetails(id) {
    return this._http.get(API + `/${id}`);
  }
  addCart(req) {
    return this._http.post('http://localhost:3000/api/v1/cart/', req);
  }
  getUserCart(userId) {
    return this._http.get('http://localhost:3000/api/v1/cart/' + userId);
  }
}
