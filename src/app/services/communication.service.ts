import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor(private http: HttpClient) { }
  login() {
    this.http.post<{ token: string }>(
      'https://fakestoreapi.com/auth/login',
      {
        username: "mor_2314",
        password: "83r5^_"
      },
    ).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);
        console.log('token' + result);
      },
      (err) => { console.log(err); }
    );
  }
  getAllProducts(): Observable<Product[]> {
    let token = localStorage.getItem('token');
    const header = new HttpHeaders().set('authentication', token ?? '');
    return this.http.get<Product[]>('https://fakestoreapi.com/products', { headers: header });
  }
  getProductsByCategory(key: string): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories' + key);
  }
  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>('https://fakestoreapi.com/carts');
  }
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }
  productCart: any[] = [];
  addProductToLocalStorage(event: Product, amount: number) {
    let obj = {
      quantity: amount,
      product: event
    }
    if ('cart' in localStorage) {
      this.productCart = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.productCart.find((element) => {
        return element.id == event.id;
      });
      if (!exist) {
        this.productCart.push(obj);
        localStorage.setItem('cart', JSON.stringify(this.productCart));
      } else {
        alert('exist');
      }
    } else {
      this.productCart.push(obj);
      localStorage.setItem('cart', JSON.stringify(this.productCart));
    }
  }
  removeProductToLocalStorage(event: Product, amount: number) {

  }
  addProductToCart(cart: any) {
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({ 'token': `${token}` });
    this.http.post<{ name: string }>(
      'https://fakestoreapi.com/carts',
      cart,
      { headers: header }
    ).subscribe(
      (result) => { console.log(result); },
      (err) => { console.log(err); }
    );
  }
  removeProductFromCart(id: number) {
    this.http.delete<{ cart: Cart }>(
      `https://fakestoreapi.com/carts/${id}`,
    ).subscribe(
      (result) => { console.log(result); },
      (err) => { console.log(err); }
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }
}
