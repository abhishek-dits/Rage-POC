import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { WelcomePageComponent } from './authentication/components/login/welcome-page/welcome-page.component';
import { TicketingComponent } from './authentication/components/ticketing/ticketing.component';
import { MainLayoutComponent } from './authentication/components/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path :'welcome',component:WelcomePageComponent},
  { path: 'ticket', component: MainLayoutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
