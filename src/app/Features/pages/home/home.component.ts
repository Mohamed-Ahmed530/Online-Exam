import { Component } from '@angular/core';
import { SidebarComponent } from '../../../Shared/components/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
