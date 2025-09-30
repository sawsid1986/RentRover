import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserve-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve-vehicle.component.html',
  styleUrls: ['./reserve-vehicle.component.css']
})
export class ReserveVehicleComponent implements OnInit {
  vehicleId: number | null = null;

  startDate = signal<string>('');
  endDate = signal<string>('');

  availableToReserve = signal<boolean>(true);

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
  }

  reserveVehicle() {
    // Add reservation logic here
    alert(`Reserving vehicle ID: ${this.vehicleId} from ${this.startDate} to ${this.endDate}`);
  }

  cancelReservation() {
    // Add cancel logic here (e.g., navigate away or reset form)
    this.router.navigate(['/availableVehicles']);
  }
}
