import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

interface Bubble {
  size: number;
  distance: number;
  position: number;
  time: number;
  delay: number;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  auth = inject(AuthService);
  cart = inject(CartService);

  bubbles: Bubble[] = Array.from({ length: 48 }, () => ({
    size: 2 + Math.random() * 4,
    distance: 6 + Math.random() * 4,
    position: -5 + Math.random() * 110,
    time: 2 + Math.random() * 2,
    delay: -1 * (2 + Math.random() * 2)
  }));
}
