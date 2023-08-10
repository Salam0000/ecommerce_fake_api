import { Component, EventEmitter, Output } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  categories: string[] = [];
  categoriesFilter: string[] = [];

  constructor(private communicationService: CommunicationService) { }
  ngOnInit() {
    this.communicationService.getAllCategories().subscribe(
      (result) => {
        this.categories = result;
        this.categoriesFilter = this.categories.filter((product) => {
          return product != 'electronics'
        });
        console.log(result);
      }
    );
  }

  @Output() filterRadioButtonSelectionChanged: EventEmitter<string> = new EventEmitter<string>();

  click(event: Event, id: number) {
    event.preventDefault();
    if (id == -1) {
      this.filterRadioButtonSelectionChanged.emit('all');

    } else {
      this.filterRadioButtonSelectionChanged.emit(this.categoriesFilter[id]);

    }
  }

  filter(event: any) {
    console.log(event)
    console.log(event.target.value)
    this.filterRadioButtonSelectionChanged.emit(event.target.value);
  }
}
