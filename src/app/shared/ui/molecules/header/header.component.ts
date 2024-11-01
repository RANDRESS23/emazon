import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { LOGIN_BUTTON_TEXT, SIGN_OUT_BUTTON_TEXT, SIGN_UP_BUTTON_TEXT } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { SizeEnum } from '@utils/enums/size';
import { ButtonType } from '@utils/types/button';
import { Size } from '@utils/types/size';

@Component({
  selector: 'molecule-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('mobileContainerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  showNavbarMobileContent: boolean = false;
  buttonSizeSmall: Size = SizeEnum.SMALL;
  buttonTypeButton: ButtonType = ButtonTypeEnum.BUTTON;
  buttonSignOutText: string = SIGN_OUT_BUTTON_TEXT;
  buttonSignUpText: string = SIGN_UP_BUTTON_TEXT;
  buttonLoginText: string = LOGIN_BUTTON_TEXT;
  isLogged: boolean = false;
  
  @Input() menuItems: Record<string, string>[] = [];
  @Input() isAdminOrWarehouseAssistantLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated();
  }

  toggleNavbarMobileContent(): void {
    this.showNavbarMobileContent = !this.showNavbarMobileContent;
  }

  signOut(): void {
    this.authService.logout();
  }

  navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  navigateToSignUpPage(): void {
    this.router.navigate(['/sign-up']);
  }
}
