import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_WAREHOUSE_ASSISTANT } from '@utils/constants/general';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioWarehouseAssistantComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_WAREHOUSE_ASSISTANT;
  isWarehouseAssistantLogged: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
