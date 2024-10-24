import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'molecule-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: Record<string, string>[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
