import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_ADMIN } from '@utils/constants/general';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss']
})
export class ProductPanelComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_ADMIN;
  isAdminLogged: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
