import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  productsFilter: Product[] = [];
  cart: Cart | undefined;
  isFetching: boolean = false;
  addButton: boolean = false;
  amount: number = 0;

  constructor(private communicationService: CommunicationService) { }
  ngOnInit(): void {
    this.isFetching = true;
    this.communicationService.getAllProducts().subscribe(
      (result) => {
        this.products = result;
        this.products.filter((p) => {
          p.date = new Date()
        })
        this.productsFilter = this.products.filter((product) => {
          return product.category != 'electronics'
        });
        console.log(result);
        console.log(result[0].title);
      },
      (error) => {
        alert(error.message);
      }
    );
    this.isFetching = false;
  }
  getTotalProducts() {
    return this.communicationService.getAllProducts().subscribe(
      (result) => {
        this.products = result;
        this.products.filter((p) => {
          p.date = new Date()
        })
        this.productsFilter = this.products.filter((product) => {
          return product.category != 'electronics'
        });
        console.log(result);
        console.log(result[0].title);
      }
    );
  }
  fromChild(event: string) {
    if (event != 'all') {
      // this.getTotalProducts();
      this.productsFilter = this.products.filter((product) => {
        return product.category != 'electronics'
      });
      this.productsFilter = this.productsFilter.filter((e) => {
        return e.category == event;
      });
    } else {
      this.getTotalProducts();
    }
    console.log(event);
    console.log(this.productsFilter);
  }
 
}
