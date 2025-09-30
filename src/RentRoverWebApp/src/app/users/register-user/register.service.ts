import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "src/app/core/services/data.service";
import { RegisterUser } from "./register-user";

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService{
    constructor(private dataService: DataService) { }
    registerUser(user: RegisterUser): Observable<any> {
        return this.dataService.http.post('api/users', user);
    }
}