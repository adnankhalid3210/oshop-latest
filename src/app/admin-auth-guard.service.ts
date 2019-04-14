import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }
  canActivate(route, state: RouterStateSnapshot) {

    return this.auth.user$.pipe(
      take(1),
      map((user: any) => user && user.admin),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/']);
        }
      })
    );
    // return true;
  }

}
