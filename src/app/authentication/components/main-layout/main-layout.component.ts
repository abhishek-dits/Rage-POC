import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { TicketingComponent } from '../ticketing/ticketing.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent,HeaderComponent,TicketingComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isExpanded =false;

  toggle(){
    debugger
    this.isExpanded= !this.isExpanded;
  }

}
