import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
   ],
   providers:[LoginService]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  recaptchaResponse: string | null = null;
  submitted =false;

  constructor(private router: Router,public loginService : LoginService) {
    // Check localStorage for saved username and rememberMe status
    const savedUsername = localStorage.getItem('username');
    const savedRememberMe = localStorage.getItem('rememberMe');

    if (savedUsername) {
      this.username = savedUsername;
    }
    
    this.rememberMe = savedRememberMe === 'true';
  }

    onSubmit(form: any) {
      if (form.valid && this.recaptchaResponse) {
        this.submitted =true;
        const loginData = {
          userName: this.username,
          password: this.password,
        };
  
        this.loginService.login(loginData).subscribe(
          (response: any) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/ticket']);
            
            // Save username to localStorage if "Remember Me" is checked
            if (this.rememberMe) {
              localStorage.setItem('username', this.username);
              localStorage.setItem('rememberMe', 'true');
            } else {
              localStorage.removeItem('username');
              localStorage.removeItem('rememberMe');
            }
          },
          (error) => {
            this.submitted =false;

            console.error('Login failed', error);
            // Handle login failure (e.g., show error message)
          }
        );
      } 
      else {
        console.error('Form is invalid or reCAPTCHA not completed');
      }
    }
  
    onRecaptchaResolved(captchaResponse: string) {
      this.recaptchaResponse = captchaResponse;
    }
  }
