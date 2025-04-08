import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/landing/navbar/navbar.component';
import { HeroComponent } from './components/landing/hero/hero.component';
import { ServicesComponent } from './components/landing/services/services.component';
import { ContactComponent } from './components/landing/contact/contact.component';
import { ReservationsComponent } from './components/admin/reservations/reservations.component';
import { UserReservationsComponent } from './components/user/reservations/reservations.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ServicesManagementComponent } from './components/admin/services-management/services-management.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { GaleryComponent } from './components/landing/galery/galery.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FooterComponent } from './components/landing/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    ContactComponent,
    ReservationsComponent,
    UsersComponent,
    AdminComponent,
    ServicesManagementComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UserReservationsComponent,
    GaleryComponent,
    LandingComponent,
    FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
