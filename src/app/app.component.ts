import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './services/communication.service';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';

  constructor(private communicationService: CommunicationService) { }


}
