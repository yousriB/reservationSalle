import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './modules/profile/home/home.component';
import { ReservationComponent } from './modules/profile/reservation/reservation.component';
import { SettingsComponent } from './modules/profile/settings/settings.component';
import { UsersComponent } from './modules/admin/users/users.component';
import { ReservationsComponent } from './modules/admin/reservations/reservations.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { FormComponent } from './modules/admin/form/form.component';
import { DetailsComponent } from './modules/reservation/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './modules/landing/main/main.component';
import { HeroComponent } from './modules/landing/components/hero/hero.component';
import { AboutComponent } from './modules/landing/components/about/about.component';
import { ServicesComponent } from './modules/landing/components/services/services.component';
import { ContactComponent } from './modules/landing/components/contact/contact.component';
import { TestimonialsComponent } from './modules/landing/components/testimonials/testimonials.component';
import { GaleryComponent } from './modules/landing/components/galery/galery.component';
import { FormulaireComponent } from './modules/reservation/formulaire/formulaire.component';  // ✅ Import this


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ReservationComponent,
    SettingsComponent,
    UsersComponent,
    ReservationsComponent,
    DashboardComponent,
    FormComponent,
    DetailsComponent,
    MainComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    TestimonialsComponent,
    GaleryComponent,
    FormulaireComponent
  ],
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
