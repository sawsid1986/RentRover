import { Observable } from "rxjs";
import { Vehicle } from "./vehicle";
import { DataService } from "src/app/core/services/data.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    constructor(private dataService: DataService) { }

    getVehicles(): Observable<Vehicle[]> {
        return this.dataService.http.get<Vehicle[]>('api/vehicles');
    }
}