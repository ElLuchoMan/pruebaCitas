import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavItem } from '@core/model/nav-item';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'citas-front';
  $isHandset: Observable<boolean>;

  public menu: NavItem[] = [
    { url: '/tipo-citas', name: 'Tipos de Cita', icon: 'next_week' },
    { url: '/especialistas', name: 'Especialistas', icon: 'assignment_ind' },
    { url: '/usuarios', name: 'Usuarios', icon: 'people' },
    { url: '/citas', name: 'Agendar Citas', icon: 'book_online' },
  ];

  constructor(
    private breakPointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.$isHandset = this.breakPointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        tap(() => this.changeDetectorRef.detectChanges())
      );
  }
}
