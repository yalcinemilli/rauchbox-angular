import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { Login2famodalComponent } from './login2famodal/login2famodal.component';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
 })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    homelink = '/kunden';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private alertService: AlertService,
        public authService: AuthService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        if (sessionStorage.getItem('currentUser')) {
            this.router.navigate([this.homelink]);
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    tryLogin() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        const value = {
            email: this.f.email.value,
            password: this.f.password.value
        };
        this.authService.doLogin(value)
            .then(res => {
                if (res.is2fa === 1) {
                    const modalRef = this.modalService.open(Login2famodalComponent);
                    modalRef.componentInstance.email = this.f.email.value;
                    modalRef.componentInstance.pwd = this.f.password.value;
                    modalRef.componentInstance.user.subscribe((data) => {
                        this.setUserInStorage(data);
                        localStorage.removeItem('currentLayoutStyle');
                        window.location.href = this.homelink;
                    });
                } else {

                this.setUserInStorage(res);
                localStorage.removeItem('currentLayoutStyle');
                window.location.href = this.homelink;
            }
            }, err => {
                this.submitted = false;
                this.alertService.error(err.error);
            });
          }

    setUserInStorage(res) {
            sessionStorage.setItem('currentUser', JSON.stringify(res));
            localStorage.setItem('remember', JSON.stringify(this.f.email.value));
        
        }
}
