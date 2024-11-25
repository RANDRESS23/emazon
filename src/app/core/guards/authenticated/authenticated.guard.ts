import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { RolesEnum } from '@utils/enums/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {
        switch (this.authService.getRole()) {
          case RolesEnum.ADMIN:
            return this.router.navigate(['/perfil/admin/inicio']);
          case RolesEnum.AUX_BODEGA:
            return this.router.navigate(['/perfil/auxiliar-bodega/inicio']);
          case RolesEnum.CLIENTE:
            return this.router.navigate(['/']);
          default:
            return this.router.navigate(['/']);
        }
      }
  
      return true;
  }
}
