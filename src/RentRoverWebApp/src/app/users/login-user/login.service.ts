import { DataService } from "src/app/core/services/data.service";
import { LoginUser } from "./login-user";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
    constructor(private dataService: DataService) { }
    loginUser(user: LoginUser): Observable<any> {
        return this.dataService.http.post('api/users/authenticate', user);
    }
}