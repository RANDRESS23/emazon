import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { MENU_ITEMS_ADMIN, MENU_ITEMS_WAREHOUSE_ASSISTANT } from '@utils/constants/general';
import { RolesEnum } from '@utils/enums/roles';

@Component({
  selector: 'app-brand-panel',
  templateUrl: './brand-panel.component.html',
  styleUrls: ['./brand-panel.component.scss']
})
export class BrandPanelComponent implements OnInit {
  menuItems: Record<string, string>[] = MENU_ITEMS_ADMIN;
  isAdminLogged: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.menuItems = this.authService.getRole() === RolesEnum.ADMIN ? MENU_ITEMS_ADMIN : MENU_ITEMS_WAREHOUSE_ASSISTANT;
  }
}
