import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { RolesEnum } from '@utils/enums/roles';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated() 
        && this.authService.getRole() === RolesEnum.CLIENTE) return true;
      
      this.router.navigate(['/login']);

      return false;
  }
}
