import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ti-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = null;
  public password = null;
  public inProgress = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {}
  ngOnInit() {}
  doLogin() {
    this.inProgress = true;
    this.authenticationService
      .login(this.username, this.password)
      .pipe(first())
      .subscribe(
        success => {
          this.toastService
            .showToast(
              'Successfully logged in. You will be directing to home screen',
              5
            )
            .afterDismissed()
            .subscribe(() => {
              this.inProgress = false;
              this.router.navigate(['/home']);
            });
        },
        error => {
          console.error(error);
        }
      );
  }
  doRegister() {
    this.router.navigate(['/register']);
  }
}
