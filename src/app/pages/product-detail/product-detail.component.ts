import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_CLIENT } from '@utils/constants/general';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_CLIENT;
  
  constructor() { }

  ngOnInit(): void {
  }

}
