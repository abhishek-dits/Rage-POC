import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Issues {
  value: string;
  viewValue: string;
}
interface Clocks {
  value: string;
  viewValue: string;
}
interface Branchs {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-new-ticket',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule],
  templateUrl: './add-new-ticket.component.html',
  styleUrl: './add-new-ticket.component.scss'
})
export class AddNewTicketComponent {
  favoriteSeason: string;
  seasons: string[] = ['Yes', 'No'];
  issue: Issues[] = [
    { value: 'steak-0', viewValue: 'Authorization for a keyboard/mouse' },
    { value: 'pizza-1', viewValue: 'Cables/Wires issue' },
    { value: 'tacos-2', viewValue: 'Call recording request' },
    { value: 'tacos-2', viewValue: 'Camera issue' },
    { value: 'tacos-2', viewValue: 'Clocking issue' },
    { value: 'tacos-2', viewValue: 'Computer box & screen & keyboard & mouse issue' },
    { value: 'tacos-2', viewValue: 'Data bundle requests' },
  ];
  clock: Clocks[] = [
    { value: 'steak-0', viewValue: '001 (Elaine Epstein)' },
    { value: 'steak-0', viewValue: '004 (Jane Rage)' },
    { value: 'steak-0', viewValue: '005 (Adam Freeman)' },
  ];
  branch: Branchs[] = [
    { value: 'steak-0', viewValue: 'AAR -  DE AAR' },
    { value: 'steak-0', viewValue: 'ABA -  Abqulusi Plaza' },
    { value: 'steak-0', viewValue: 'ABC -  Error Store' },
  ];
}
