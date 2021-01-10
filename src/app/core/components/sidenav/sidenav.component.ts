import { NavItem } from '@core/model/nav-item';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})



export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();

  @Input()
  menu!: NavItem[];

  constructor() {}

  ngOnInit(): void {}

  onToggle(): void {
    this.closeSidenav.emit();
  }
}
