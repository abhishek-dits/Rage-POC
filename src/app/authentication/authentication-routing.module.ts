import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomePageComponent } from './components/login/welcome-page/welcome-page.component';
import { TicketingComponent } from './components/ticketing/ticketing.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ticket', component: MainLayoutComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
