import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_CLIENT } from '@utils/constants/general';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_CLIENT;

  constructor() { }

  ngOnInit(): void {
  }

}
