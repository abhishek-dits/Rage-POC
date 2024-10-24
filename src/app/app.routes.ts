import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { NgModule } from '@angular/core';
import { WelcomePageComponent } from './authentication/components/login/welcome-page/welcome-page.component';
import { TicketingComponent } from './authentication/components/ticketing/ticketing.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'ticket', component: TicketingComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
