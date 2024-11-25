import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_ADMIN } from '@utils/constants/general';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioAdminComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_ADMIN;
  isAdminLogged: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
