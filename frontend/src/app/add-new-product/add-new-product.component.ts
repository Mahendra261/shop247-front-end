import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  newProductForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.newProductForm = new FormGroup({
      productName: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
      ]),
      department: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.newProductForm.controls;
  }
  onAddProduct() {}
}
