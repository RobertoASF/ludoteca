import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink,],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  constructor(public auth: AuthService) {}

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
  }
}