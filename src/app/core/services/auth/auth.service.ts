import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@src/environments/environment';
import { TOKEN_KEY_LOCAL_STORAGE } from '@utils/constants/general';
import { TokenInterface, UserCredentials } from '@utils/interfaces/auth';
import { RoleType } from '@utils/types/roles';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = environment.BASE_URL_USER;
  private TOKEN_KEY: string = TOKEN_KEY_LOCAL_STORAGE;

  constructor(private http: HttpClient, private router: Router) { }

  login(userCredentials: UserCredentials): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${this.BASE_URL}/auth/login`, userCredentials).pipe(
      tap((response: TokenInterface) => {
        this.setToken(response.token);
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    return Date.now() < exp;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getRole(): RoleType | string {
    const token = this.getToken();

    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role;
  }
}
