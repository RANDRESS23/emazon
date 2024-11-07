import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { CartService } from '@src/app/shared/services/cart/cart.service';
import { ToastService } from '@src/app/shared/services/toast/toast.service';
import { ERROR_CLIENT_NOT_LOGGED } from '@utils/constants/client';
import { ERROR_ICON_PATH, LOGIN_BUTTON_TEXT, SIGN_OUT_BUTTON_TEXT, SIGN_UP_BUTTON_TEXT } from '@utils/constants/general';
import { ButtonTypeEnum } from '@utils/enums/button';
import { RolesEnum } from '@utils/enums/roles';
import { SizeEnum } from '@utils/enums/size';
import { StatusEnum } from '@utils/enums/status';
import { Cart } from '@utils/interfaces/cart';
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
  isClient: boolean = false;
  cartNotEmpty: boolean = false;
  countCartProducts: number = 0;
  
  @Input() menuItems: Record<string, string>[] = [];
  @Input() isAdminOrWarehouseAssistantLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated();
    this.isClient = (this.authService.isAuthenticated() && this.authService.getRole() === RolesEnum.CLIENTE) || !this.authService.isAuthenticated();
    
    if (this.authService.isAuthenticated() && this.authService.getRole() === RolesEnum.CLIENTE) {
      this.cartService.cartClient.subscribe(({ products }) => {
        let count = 0;

        products.forEach((product) => count += product.quantity );

        this.countCartProducts = count;
        this.cartNotEmpty = count > 0;
      });
      
      this.cartService.getTotalProductsInTheCart().subscribe({
        next: (data: Cart) => {
          this.cartNotEmpty = data.products.length > 0;
          this.cartService.setCartProducts(data.products);
        },
        error: (error) => {
          console.error({ error });
        }
      })
    }
  }

  toggleNavbarMobileContent(): void {
    this.showNavbarMobileContent = !this.showNavbarMobileContent;
  }

  signOut(): void {
    this.authService.logout();
    this.cartService.setCartProducts([]);
  }

  navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  navigateToSignUpPage(): void {
    this.router.navigate(['/sign-up']);
  }
  
  navigateToCart(): void {
    if (this.authService.isAuthenticated() 
      && this.authService.getRole() === RolesEnum.CLIENTE) {
      this.router.navigate(['/perfil/cliente/carrito']);
    } else {
      this.toastService.showToast(ERROR_CLIENT_NOT_LOGGED, StatusEnum.ERROR, ERROR_ICON_PATH);
    }
  }
}
