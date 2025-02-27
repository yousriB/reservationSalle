import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeComponent } from './modules/profile/home/home.component';
import { ReservationComponent } from './modules/profile/reservation/reservation.component';
import { SettingsComponent } from './modules/profile/settings/settings.component';
import { UsersComponent } from './modules/admin/users/users.component';
import { ReservationsComponent } from './modules/admin/reservations/reservations.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { FormComponent } from './modules/admin/form/form.component';
import { DetailsComponent } from './modules/reservation/details/details.component';
import { MainComponent } from './modules/landing/main/main.component';

const routes: Routes = [

  {path:"", component:MainComponent },
  {path:"login", component:LoginComponent },
  {path:"register", component:RegisterComponent },
  {path:"reservation", component:ReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
