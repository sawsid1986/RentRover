import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { App } from './app.component';
import { ReserveVehicleComponent } from './vehicles/reserve-vehicle/reserve-vehicle.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'availableVehicles', component: VehicleListComponent },
  { path: 'main', component: App },
  { path: 'login', loadComponent: () => import('./users/login-user/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./users/register-user/register.component').then(m => m.RegisterComponent) },
  { path: 'reserve/:id', component: ReserveVehicleComponent },
  // Add more routes here as needed
];
