import { Component, EventEmitter, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() product!: Product;
  addButton: boolean = false;
  amount: number = 0;

  constructor(private communicationService: CommunicationService) { }
  addProduct(product: Product) {
    this.communicationService.addProductToLocalStorage(product, this.amount);
  }
}
