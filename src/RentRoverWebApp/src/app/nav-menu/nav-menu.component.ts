import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectIsAuthenticated, selectUsername } from '../core/auth/auth.selectors';
import { logout } from '../core/auth/auth.actions';
import { IfAuthenticatedDirective } from '../core/auth/if-authenticated.directive';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent {
  isAuthenticated$!: Observable<boolean>;
  userName$!: Observable<string | null>;

   constructor(private store: Store<AppState>, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userName$ = this.store.select(selectUsername);
  }

  logoutUser() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

}
