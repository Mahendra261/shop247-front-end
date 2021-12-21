import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
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
