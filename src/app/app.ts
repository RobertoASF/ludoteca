import 'zone.js';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { FooterComponent} from './layout/footer/footer';
import { LoginModalComponent } from './shared/login-modal/login-modal';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoginModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}