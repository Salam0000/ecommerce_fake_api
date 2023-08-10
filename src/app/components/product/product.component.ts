import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product!: Product;
  productId!: number;
  amount: number = 0;
  carts: any;

  constructor(private communicationService: CommunicationService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.communicationService.getProductById(this.productId).subscribe(
      (result) => { this.product = result; }
    );
  }
  addProduct(product: Product) {
    this.communicationService.addProductToLocalStorage(product, this.amount);
  }
  getTotalCarts() {
    if ('cart' in localStorage) {
      this.carts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log(this.carts);
  }
  addAmount() {
    this.carts[this.productId].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  minusAmount() {
    this.carts[this.productId].quantity--;
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
}
