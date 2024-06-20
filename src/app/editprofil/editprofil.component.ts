import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { UserLevel } from 'src/app/open-api';
import { UserControllerService, UserResponse } from '../open-api';
import { PasswordChangeModalComponent } from '../users/password-change-modal/password-change-modal.component';
import { UserLevelControllerService } from './../open-api/api/userLevelController.service';
import { QrcodeModalComponent } from './qrcode-modal/qrcode-modal.component';
import { SaveModalComponent } from './save-modal/save-modal.component';

@Component({
  selector: 'app-editprofil',
  templateUrl: './editprofil.component.html',
  styleUrls: ['./editprofil.component.css']
})
export class EditprofilComponent implements OnInit, OnDestroy {

  newForm: FormGroup;
  user: UserResponse = {};
  userEvent: EventEmitter<UserResponse> = new EventEmitter<UserResponse>();
  userObservable = of(this.user);
  userid: number = JSON.parse(sessionStorage.getItem('currentUser')).id;
  userlevel: UserLevel[];
  userlevelname: string;
  check2fa: boolean = false;
  secretCode: string;
  qrCode: string;

  constructor(private userLevelControllerService: UserLevelControllerService,
    private userController: UserControllerService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.newForm = new FormGroup({
      'Vorname': new FormControl(null, Validators.required),
      'Nachname': new FormControl(null, Validators.required),
      'Email': new FormControl(null, Validators.required),
      'Passwort': new FormControl(null, Validators.required)
    });
    this.userLevelControllerService.getAllUser1().subscribe(data => {
      this.userlevel = data;
    });
    this.userController.getUserbyId(this.userid).subscribe((data: UserResponse) => {
      this.user = data;
      this.check2fa = this.int2bool(this.user.is2fa);
      this.newForm.setValue({
        'Vorname': this.user.vorname,
        'Nachname': this.user.nachname,
        'Email': this.user.email,
        'Passwort': this.user.pwd
      });
      this.userlevelname = this.getUserlevelname(this.user.userlevel);
    });

  }

  getUserlevelname(id: number): string {
    if (this.userlevel) {
      return this.userlevel.find(x => x.id == id).levelname;
    }
    return '';
  }
  ngOnDestroy(): void {
    console.log("destroy");
  }
  qrcodeModal() {
    const modalRef = this.modalService.open(QrcodeModalComponent);
    this.userController.getQRAndSecretCode().subscribe(data => {
      this.secretCode = data.secret;
      this.qrCode = data.qrCode;
    modalRef.componentInstance.qrcode = this.qrCode;
    modalRef.componentInstance.save.subscribe((data: boolean) => {
      if (data) {
        this.user.is2fa = 1;
        this.user.secretcode = this.secretCode;
        this.userController.updateUser(this.user, this.userid).subscribe(data => {
          this.user = data;
      });
      }});
    });
  }

  onChange($event) {
    this.check2fa = $event;
      }

  int2bool(value: number): boolean {
    return value == 1 ? true : false;
  }

  bool2int(value: boolean): number {
    return value == true ? 1 : 0;
  }


  onSubmit() {
    this.user.vorname = this.newForm.value.Vorname;
    this.user.nachname = this.newForm.value.Nachname;
    this.user.email = this.newForm.value.Email;
    this.user.is2fa = this.bool2int(this.check2fa);

   const modalRef = this.modalService.open(SaveModalComponent);
    modalRef.componentInstance.answer.subscribe(async (data: boolean) => {
      if (data) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.userController.updateUser(this.user, this.userid).subscribe((data: UserResponse) => {
              this.user = data;
              this.reloadCurrentRoute();
              resolve(data);
            });
          }, 1000);
        });
      }
    });
  
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    //window.location.href = currentUrl;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openModalPasswort() {
    const modalRef = this.modalService.open(PasswordChangeModalComponent);
    modalRef.componentInstance.userobj = this.user;
    if (this.user) {
      modalRef.componentInstance.user.subscribe(async (data: UserResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.userController.updatePassword(data, this.userid).subscribe((data: UserResponse) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    }
  }

}