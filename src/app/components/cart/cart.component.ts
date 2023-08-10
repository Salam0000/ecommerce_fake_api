import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carts: any[] = [];
  isFetching = false;
  total: number = 0;
  constructor(private communicationService: CommunicationService) { }
  ngOnInit() {
    this.getTotalCarts();
  }
  getTotalCarts() {
    this.isFetching = true;
    if ('cart' in localStorage) {
      this.carts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log(this.carts);
    this.isFetching = false;
  }
  getTotal(price: number, quantity: number) {
    return price * quantity;
  }
  getTotalCart() {
    let sum = 0;
    for (let index in this.carts) {
      sum += this.carts[index].product.price * this.carts[index].quantity;
    }
    // this.carts.forEach(element => {
    //   sum += element.products.price;
    // });
    return sum;
  }
  onCartEdit(id: number) {

  }
  onCartDelete(index: number) {
    this.carts.splice(index, 1);
    console.log(index);
    console.log(this.carts.splice(index, 1));
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  clearCart() {
    this.carts = [];
    this.getTotalCart();
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  addCart() {
    let products = this.carts.map(item => {
      return { productId: item.product.id, quantity: item.quantity };
    });
    let model = {
      userId: 5,
      date: new Date().toISOString,
      products: products
    }
    this.communicationService.addProductToCart(model);
    console.log(model);
  }
  addAmount(index: number) {
    this.carts[index].quantity++;
    this.getTotal(this.carts[index].product, this.carts[index].quantity);
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  minusAmount(index: number) {
    this.carts[index].quantity--;
    this.getTotal(this.carts[index].product, this.carts[index].quantity);
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
}
