import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutService } from '../services/aut.service';

@Injectable({ providedIn: 'root' })
export class goBackGuard implements CanActivate {
  constructor(private service: AutService, private route: Router) {}
  canActivate() {
    if (this.service.isLoggedIn()) {
      this.route.navigate(['/home']);
      return false;
    }
    return true;
  }
}
