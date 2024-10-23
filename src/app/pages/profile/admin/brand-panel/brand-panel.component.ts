import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_ADMIN } from '@utils/constants/general';

@Component({
  selector: 'app-brand-panel',
  templateUrl: './brand-panel.component.html',
  styleUrls: ['./brand-panel.component.scss']
})
export class BrandPanelComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_ADMIN;

  constructor() { }

  ngOnInit(): void {
  }

}
