import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_CLIENT } from '@utils/constants/general';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_CLIENT;

  constructor() { }

  ngOnInit(): void {
  }

}
