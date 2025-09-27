import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { App } from './app';
import { LoginComponent } from './users/login-user/login.component';
import { RegisterComponent } from './users/register-user/register.component';
import { ReserveVehicleComponent } from './vehicles/reserve-vehicle/reserve-vehicle.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'availableVehicles', component: VehicleListComponent },
  { path: 'main', component: App },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reserve/:id', component: ReserveVehicleComponent },
  // Add more routes here as needed
];
