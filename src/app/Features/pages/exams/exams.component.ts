import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ExamsService } from '../../../Core/services/exams/exams.service';
import { Exam } from '../../../Shared/interfaces/exams/exams';

@Component({
  selector: 'app-exams',
  imports: [],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit, OnDestroy {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _examsComponent = inject(ExamsService);

  exams: WritableSignal<Exam[]> = signal<Exam[]>([]);
  
  private destroy$ = new Subject<void>();

  iconMap: Record<string, string> = {
    "HTML Quiz": './images/HTML-Icon.svg',
    "CSS Quiz": './images/CSS-Icon.svg',
    "BS Quiz": './images/BS-Icon.svg',
    "JavaScript Quiz": './images/JS-Icon.svg',
    "Angular Quiz": './images/Angular-Icon.svg',
    "React Quiz": './images/React-Icon.svg',
  };

  ngOnInit(): void {
    this.getId();    
  }

  getId() {
    this._activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe({
      next: (params: ParamMap) => {
        const id = params.get('id');
        this.getAllExamsOnSubject(id!);
      },
    });
  }

  getAllExamsOnSubject(id: string) {
    this._examsComponent.getAllExamsOnSubject(id)
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.exams.set(res.exams);          
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}