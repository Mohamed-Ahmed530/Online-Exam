import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SubjectsService } from '../../../../../Core/services/subjects/subjects.service';
import { Subjects } from '../../../../../Shared/interfaces/subjects/subjects';
@Component({
  selector: 'app-subjects',
  imports: [RouterLink],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit, OnDestroy {
  private readonly _subjectsService = inject(SubjectsService);
  subjects: WritableSignal<Subjects[]> = signal<Subjects[]>([]);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getAllSubjects();
  }

  getAllSubjects() {
    this._subjectsService.getAllSubjects()
    .pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.subjects.set(res.subjects);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}