import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_CLIENT } from '@utils/constants/general';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_CLIENT;

  constructor() { }

  ngOnInit(): void {
  }

}
