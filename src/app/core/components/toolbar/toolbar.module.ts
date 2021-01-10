import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavItem } from '@core/model/nav-item';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Input()
  menu!: NavItem[];

  @Output() openMenu = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
