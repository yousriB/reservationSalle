import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BookingComponent } from './components/landing/booking/booking.component';
import { ReservationDetailsComponent } from './components/admin/reservation-details/reservation-details.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'user',
    component: UserComponent
  },  
  {
    path: 'booking',
    component: BookingComponent
  }, 
  { path: 'reservation-details/:id',
    component: ReservationDetailsComponent 
  }, 
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
