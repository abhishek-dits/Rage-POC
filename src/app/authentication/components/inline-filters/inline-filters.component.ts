import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { TableFilterType } from '../../../enums';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inline-filters',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatIconModule],
  templateUrl: './inline-filters.component.html',
  styleUrl: './inline-filters.component.scss',
})
export class InlineFiltersComponent {
  @Input() filter: string;
  @Input() label: string;
  @Input() name: string;
  @Input() options: string[] = [];
  @Output() filterChange = new EventEmitter<{
    searchText: string;
    column: string;
  }>();

  filterTypes = TableFilterType;
  public randomId: string = Math.random().toFixed(16).substring(2);

  debounceChanged(data) {
    debugger
    this.filterChange.emit({ searchText: data, column: this.name });
  }
}
