import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginUserService } from './login.service';
import { LoginUser } from './login-user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { login, logout } from 'src/app/core/auth/auth.actions';
import { Observable } from 'rxjs';
import { selectIsAuthenticated, selectUsername } from 'src/app/core/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading = false;
  errorMessage: string | null = null;
  isAuthenticated$!: Observable<boolean>;
  userName$!: Observable<string | null>;


  constructor(private store: Store<AppState>, private loginUserService: LoginUserService) { 
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userName$ = this.store.select(selectUsername);
  }

  login() {
    this.loginUserService.loginUser(new LoginUser(this.username, this.password))
    .subscribe({
        next: result => {
          this.store.dispatch(login({
            username: this.username, token: result
          }));
          this.loading = false;
          this.errorMessage = null;
        },
        error: error => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.loading = false;
        }
      });    ;
  }

  logoutUser() {
    this.store.dispatch(logout());
    this.username = '';
    this.password = '';
  }
}
