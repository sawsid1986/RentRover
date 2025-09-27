import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from './vehicle';
import { VehicleService } from './vehicle-list.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  imports: [CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  public vehicles: Vehicle[] | undefined;

  constructor(private vehicleService: VehicleService, private router: Router) { }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }

  navigateToReserve(id: number): void {
    this.router.navigate(['/reserve', id]);
  }
}
