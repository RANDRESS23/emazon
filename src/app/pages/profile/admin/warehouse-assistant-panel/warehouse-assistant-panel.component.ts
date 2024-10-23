import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_ADMIN } from '@utils/constants/general';

@Component({
  selector: 'app-warehouse-assistant-panel',
  templateUrl: './warehouse-assistant-panel.component.html',
  styleUrls: ['./warehouse-assistant-panel.component.scss']
})
export class WarehouseAssistantPanelComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_ADMIN;
  
  constructor() { }

  ngOnInit(): void {
  }

}
