import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { TableFilterType } from '../../../enums';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inline-filters',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatIconModule, FormsModule],
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
  public selectedValue: string | null = null;

  debounceChanged(event, isSelect = false) {
    debugger;
    const value = isSelect ? event.value : event.target.value;
    this.filterChange.emit({ searchText: value, column: this.name });
  }

  clearSelection() {
    this.selectedValue = null; // Clear the selected value
    this.filterChange.emit({ searchText: '', column: this.name }); // Emit clear event
  }
}
