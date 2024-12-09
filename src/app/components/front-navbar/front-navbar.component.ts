import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-front-navbar',
  templateUrl: './front-navbar.component.html',
  styleUrls: ['./front-navbar.component.css']
})
export class FrontNavbarComponent implements OnInit {
  userRole: string | null = 'Default'; // Default role
  userLogin: string | null = null;
  selectedLink: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedLink(event.urlAfterRedirects);
      }
    });

    // Subscribe to user role and login
    this.authService.userRole$.subscribe(role => {
      this.userRole = role || 'Default'; // Default role if null
    });
    this.authService.userLogin$.subscribe(login => {
      this.userLogin = login;
    });
  }

  // Update the selected link based on the route
  updateSelectedLink(url: string): void {
   if (url.includes('/home')) {
      this.selectedLink = 'Home';
    } else if (url.includes('/Surplus/all')) {
      this.selectedLink = 'Surplus';
    } else if (url.includes('/surplus/create')) {
      this.selectedLink = 'Create surplus';
    } else if (url.includes('/surplus/edit')) {
      this.selectedLink = 'Edit surplus';
    } else if (url.includes('/profile')) {
      this.selectedLink = 'Profile';
    } else {
      this.selectedLink = '';
    }
  }

  setSelectedLink(linkName: string) {
    this.selectedLink = linkName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateHome(): void {
      this.router.navigate(['/home']);
  }
}
