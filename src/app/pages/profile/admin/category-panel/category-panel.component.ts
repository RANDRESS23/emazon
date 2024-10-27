import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_ADMIN } from '@utils/constants/general';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.scss']
})
export class CategoryPanelComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_ADMIN;
  isAdminLogged: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
}
