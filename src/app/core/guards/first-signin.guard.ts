import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { GlobalName } from '../utils/global-name';
import { LocalStorageService } from '../utils/local-stoarge-service';

/**
 * Bloque l'accès à l'application tant que l'utilisateur n'a pas changé
 * son mot de passe généré à la création du compte (première connexion).
 * Redirige vers la page dédiée /first-password.
 */
@Injectable({
  providedIn: 'root'
})
export class FirstSigninGuard implements CanActivate {
  constructor(
    private lsService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const user = this.lsService.get(GlobalName.userName);
    if (user?.first_signin) {
      return this.router.parseUrl('/first-password');
    }
    return true;
  }
}
