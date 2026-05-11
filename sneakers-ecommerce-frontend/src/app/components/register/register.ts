import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  full_name = '';
  email = '';
  password = '';
  confirmPassword = '';
  isAdmin = false;
  private auth = inject(AuthService);
  private router = inject(Router);

  onRegister() {
    this.auth.register(this.full_name, this.email, this.password, this.isAdmin).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert('Error al registrarse: ' + err.error.error)
    });
  }
}
