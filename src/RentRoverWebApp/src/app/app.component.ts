import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  title = 'default';
}
