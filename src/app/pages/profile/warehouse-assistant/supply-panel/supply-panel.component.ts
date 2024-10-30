import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_WAREHOUSE_ASSISTANT } from '@utils/constants/general';

@Component({
  selector: 'app-supply-panel',
  templateUrl: './supply-panel.component.html',
  styleUrls: ['./supply-panel.component.scss']
})
export class SupplyPanelComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_WAREHOUSE_ASSISTANT;
  isWarehouseAssistantLogged: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
