import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { first } from 'rxjs/operators';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ti-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user = {
    name: null,
    password: null
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
  doRegister() {
    console.log(this.user);
    this.authenticationService
      .register(this.user.name, this.user.password)
      .pipe(first())
      .subscribe(
        success => {
          this.toastService
            .showToast(
              'Successfully registered. You will be directing to login screen',
              5
            )
            .afterDismissed()
            .subscribe(() => {
              this.router.navigate(['/login']);
            });
        },
        error => {
          console.error(error);
        }
      );
  }
}
