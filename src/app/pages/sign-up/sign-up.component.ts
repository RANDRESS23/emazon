import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_CLIENT } from '@utils/constants/general';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_CLIENT;

  constructor() { }

  ngOnInit(): void {
  }

}
