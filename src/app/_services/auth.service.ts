import { Injectable } from '@angular/core';
import { UserControllerService } from './../open-api/api/userController.service';


@Injectable()
export class AuthService {
  constructor(private userControllerService: UserControllerService) {}

  // Login
  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.userControllerService.login(value.email, value.password).subscribe(
        res => {
          resolve(res);
        },
        err => reject(err)
      );
    });
  }

  // Logout
  doLogout() {
    return new Promise<void>((resolve, reject) => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('remember');
        resolve();
      
    });
  }


  doLogout2() {
    localStorage.removeItem('currentUser');
   // this.router.navigate(['/login']);
      }
}
