import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() rating: number = 0;

  getArray(rate: number, isEmptyStar: boolean) {
    // console.log(isEmptyStar);
    // console.log("rating before ", rate);
    if (isEmptyStar == true) {
      rate = 5 - Math.floor(this.rating);
    }
    // console.log("rating after ", rate);
    return Array.from({ length: rate }, (_, i) => i + 1);
  }
}
