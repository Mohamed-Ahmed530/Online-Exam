import { Component } from '@angular/core';
import { SubjectsComponent } from "./components/subjects/subjects.component";

@Component({
  selector: 'app-home',
  imports: [SubjectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
