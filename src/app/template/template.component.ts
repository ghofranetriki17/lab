import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  constructor(private auth: AuthServiceService, private router: Router) {}

  async logout(): Promise<void> {
    this.router.navigate(['/login']);
  }
}
