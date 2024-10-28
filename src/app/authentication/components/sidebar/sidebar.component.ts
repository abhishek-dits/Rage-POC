import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  selectedVal = "Office2010Red"

  foods: Food[] = [
    {value: 'Office2010Blue', viewValue: 'Office2010Blue'},
    {value: 'Office2010White', viewValue: 'Office2010White'},
    {value: 'Office2010Red', viewValue: 'Office2010Red'},
    {value: 'Office2010Dark', viewValue: 'Office2010Dark'},
  ];

}
